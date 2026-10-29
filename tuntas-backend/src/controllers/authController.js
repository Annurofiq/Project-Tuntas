const pool = require('../config/database');
const { hashPassword, verifyPassword } = require('../utils/password');
const { generateToken, hashToken } = require('../utils/token');

// Register
exports.register = async (req, res) => {
  const { name, email, password, phone } = req.body;

  // Validation
  if (!name) return res.status(400).json({ success: false, message: 'Nama tidak boleh kosong.' });
  if (!email) return res.status(400).json({ success: false, message: 'Email tidak boleh kosong.' });
  if (!password || password.length < 8) return res.status(400).json({ success: false, message: 'Password minimal 8 karakter.' });

  const normalizedEmail = email.toLowerCase();
  
  const connection = await pool.getConnection();
  try {
    // Check if email exists
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      [normalizedEmail]
    );

    if (existingUsers.length > 0) {
      connection.release();
      return res.status(409).json({ success: false, message: 'Email sudah terdaftar.' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    await connection.beginTransaction();

    // Insert to users
    const [userResult] = await connection.execute(
      `INSERT INTO users (name, email, password_hash, phone, role) 
       VALUES (?, ?, ?, ?, 'user')`,
      [name, normalizedEmail, hashedPassword, phone || null]
    );

    const userId = userResult.insertId;

    // Insert to user_profiles
    await connection.execute(
      `INSERT INTO user_profiles (user_id) VALUES (?)`,
      [userId]
    );

    await connection.commit();
    connection.release();

    return res.status(201).json({
      success: true,
      message: 'Registrasi berhasil.'
    });

  } catch (error) {
    if (connection) {
      await connection.rollback();
      connection.release();
    }
    console.error('Register error:', error);
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email dan password tidak boleh kosong.' });
  }

  const normalizedEmail = email.toLowerCase();

  try {
    // Find user
    const [users] = await pool.execute(
      'SELECT id, name, email, phone, avatar, role, status, password_hash FROM users WHERE email = ?',
      [normalizedEmail]
    );

    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Email atau password salah.' });
    }

    const user = users[0];

    // Check status
    if (user.status !== 'active') {
      return res.status(403).json({ success: false, message: 'Akun Anda ditangguhkan atau diblokir.' });
    }

    // Verify password
    const isValid = await verifyPassword(user.password_hash, password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Email atau password salah.' });
    }

    // Generate token
    const token = generateToken();
    const tokenHashed = hashToken(token);

    // Calculate expiration (7 days)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Save session
    await pool.execute(
      `INSERT INTO auth_sessions (user_id, token_hash, expires_at) 
       VALUES (?, ?, ?)`,
      [user.id, tokenHashed, expiresAt]
    );

    // Update last_login_at
    await pool.execute(
      `UPDATE users SET last_login_at = NOW() WHERE id = ?`,
      [user.id]
    );

    return res.status(200).json({
      success: true,
      message: 'Login berhasil.',
      data: {
        token: token,
        expires_at: expiresAt,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          role: user.role
        }
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    const token = req.token; // Set by authMiddleware
    const hashed = hashToken(token);

    await pool.execute(
      `UPDATE auth_sessions SET revoked_at = NOW() WHERE token_hash = ?`,
      [hashed]
    );

    return res.status(200).json({
      success: true,
      message: 'Logout berhasil.'
    });

  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
};

// Get Current User (Me)
exports.getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    // Join users and user_profiles
    const [users] = await pool.execute(
      `SELECT 
         u.id, u.name, u.email, u.phone, u.avatar, u.role, u.status,
         p.username, p.bio, p.city, p.province, p.skills, p.rating, 
         p.total_reviews, p.completed_orders
       FROM users u
       LEFT JOIN user_profiles p ON u.id = p.user_id
       WHERE u.id = ?`,
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan.' });
    }

    const user = users[0];

    return res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Get Me error:', error);
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
};
