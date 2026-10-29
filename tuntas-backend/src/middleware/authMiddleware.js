const pool = require('../config/database');
const { hashToken } = require('../utils/token');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Akses ditolak. Token tidak ditemukan.'
      });
    }

    const token = authHeader.split(' ')[1];
    const hashed = hashToken(token);

    const [sessions] = await pool.execute(
      `SELECT user_id, expires_at, revoked_at 
       FROM auth_sessions 
       WHERE token_hash = ?`,
      [hashed]
    );

    if (sessions.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Sesi tidak valid.'
      });
    }

    const session = sessions[0];

    if (session.revoked_at !== null) {
      return res.status(401).json({
        success: false,
        message: 'Sesi telah dibatalkan (revoked).'
      });
    }

    if (new Date(session.expires_at) <= new Date()) {
      return res.status(401).json({
        success: false,
        message: 'Sesi telah kedaluwarsa.'
      });
    }

    // Get user details
    const [users] = await pool.execute(
      `SELECT id, status FROM users WHERE id = ?`,
      [session.user_id]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Pengguna tidak ditemukan.'
      });
    }

    const user = users[0];

    if (user.status !== 'active') {
      return res.status(403).json({
        success: false,
        message: 'Akun Anda ditangguhkan atau diblokir.'
      });
    }

    // Attach user id and token to request object
    req.user = {
      id: user.id,
      status: user.status
    };
    req.token = token;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada autentikasi.'
    });
  }
};

module.exports = authMiddleware;
