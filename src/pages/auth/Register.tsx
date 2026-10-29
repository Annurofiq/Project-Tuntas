import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import styles from './Auth.module.css';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await register(name, email, password);
      if (result.success) {
        addToast({
          type: 'success',
          title: 'Pendaftaran Berhasil',
          message: 'Akun Anda berhasil dibuat. Selamat datang di TUNTAS.',
        });
        navigate('/dashboard');
      } else {
        setError(result.message ?? 'Pendaftaran gagal. Silakan coba lagi.');
      }
    } catch {
      setError('Gagal terhubung ke server. Pastikan koneksi Anda aktif.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PublicLayout hideFooter>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoMark}>T</span>
              <span className={styles.logoText}>TUNTAS</span>
            </Link>
            <h1 className={styles.title}>Buat Akun Baru</h1>
            <p className={styles.desc}>Bergabung dengan komunitas TUNTAS dan mulai bertransaksi hari ini.</p>
          </div>

          {error && (
            <div className={styles.alert}>
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              label="Nama Lengkap"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User size={18} />}
              required
            />

            <Input
              label="Alamat Email"
              type="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={18} />}
              required
            />
            
            <Input
              label="Kata Sandi"
              type="password"
              placeholder="Minimal 8 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock size={18} />}
              required
            />

            <p className={styles.termsText}>
              Dengan mendaftar, Anda menyetujui <Link to="/syarat">Syarat & Ketentuan</Link> serta <Link to="/privasi">Kebijakan Privasi</Link> TUNTAS.
            </p>

            <Button type="submit" fullWidth size="lg" isLoading={isLoading} rightIcon={<ArrowRight size={18} />}>
              Daftar Sekarang
            </Button>
          </form>

          <div className={styles.footer}>
            Sudah punya akun? <Link to="/masuk" className={styles.link}>Masuk di sini</Link>
          </div>
        </div>

        <div className={`${styles.illustration} ${styles.illRegister}`}>
          <div className={styles.illContent}>
            <h2>Platform Terpercaya untuk Semua Kebutuhan</h2>
            <p>Jual beli barang bekas, cari jasa perbaikan, hingga tawarkan skill Anda. Semua di satu tempat.</p>
            
            <ul className={styles.featureList}>
              <li>✨ Sistem pembayaran aman (Escrow)</li>
              <li>✨ Verifikasi pengguna ketat</li>
              <li>✨ Review transparan dan asli</li>
            </ul>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
