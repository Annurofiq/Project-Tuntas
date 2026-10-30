import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import styles from './Auth.module.css';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        addToast({
          type: 'success',
          title: 'Berhasil Masuk',
          message: 'Selamat datang kembali di TUNTAS.',
        });
        navigate('/dashboard');
      } else {
        setError(result.message ?? 'Email atau kata sandi salah. Silakan coba lagi.');
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
            <h1 className={styles.title}>Selamat Datang Kembali</h1>
            <p className={styles.desc}>Masuk untuk mengelola penawaran, pesanan, dan pekerjaan Anda.</p>
          </div>

          {error && (
            <div className={styles.alert}>
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              label="Alamat Email"
              type="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={18} />}
              required
            />
            
            <div className={styles.passwordWrap}>
              <Input
                label="Kata Sandi"
                type="password"
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock size={18} />}
                required
              />
              <Link to="/lupa-password" className={styles.forgotLink}>Lupa kata sandi?</Link>
            </div>

            <Button type="submit" fullWidth size="lg" isLoading={isLoading} rightIcon={<ArrowRight size={18} />}>
              Masuk
            </Button>
          </form>

          <div className={styles.footer}>
            Belum punya akun? <Link to="/daftar" className={styles.link}>Daftar sekarang</Link>
          </div>
          

        </div>

        <div className={styles.illustration}>
          <div className={styles.illContent}>
            <h2>Mulai Hasilkan Uang Tambahan Hari Ini</h2>
            <p>Ratusan pekerjaan baru ditambahkan setiap hari. Temukan yang sesuai dengan keahlian Anda.</p>
            
            <div className={styles.statsRow}>
              <div className={styles.statBox}>
                <h3>Rp 2M+</h3>
                <p>Total Transaksi</p>
              </div>
              <div className={styles.statBox}>
                <h3>50k+</h3>
                <p>Pengguna Aktif</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
