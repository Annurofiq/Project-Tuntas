import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <span className={styles.logoMark}>T</span>
              <span className={styles.logoText}>TUNTAS</span>
            </Link>
            <p className={styles.tagline}>
              Cari bantuan. Ambil pekerjaan. Jual & beli.
            </p>
            <p className={styles.desc}>
              Platform marketplace dua sisi yang menghubungkan orang yang membutuhkan dengan orang yang bisa membantu.
            </p>
            <div className={styles.socials}>
              <a href="#" aria-label="Instagram" className={styles.socialLink}>📷</a>
              <a href="#" aria-label="Twitter" className={styles.socialLink}>🐦</a>
              <a href="#" aria-label="Facebook" className={styles.socialLink}>📘</a>
              <a href="#" aria-label="TikTok" className={styles.socialLink}>🎵</a>
            </div>
          </div>

          {/* Platform */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Platform</h4>
            <ul className={styles.colLinks}>
              <li><Link to="/jasa">Jasa & Gig</Link></li>
              <li><Link to="/pasar">Jual & Beli</Link></li>
              <li><Link to="/jasa/buat">Posting Kebutuhan</Link></li>
              <li><Link to="/pasar/jual">Jual Barang</Link></li>
              <li><Link to="/cara-kerja">Cara Kerja</Link></li>
            </ul>
          </div>

          {/* Informasi */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Informasi</h4>
            <ul className={styles.colLinks}>
              <li><Link to="/tentang">Tentang TUNTAS</Link></li>
              <li><Link to="/keamanan">Keamanan</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/bantuan">Pusat Bantuan</Link></li>
              <li><Link to="/artikel">Artikel & Tips</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Legal</h4>
            <ul className={styles.colLinks}>
              <li><Link to="/syarat">Syarat & Ketentuan</Link></li>
              <li><Link to="/privasi">Kebijakan Privasi</Link></li>
              <li><Link to="/cookie">Kebijakan Cookie</Link></li>
            </ul>
            <div className={styles.trust}>
              <div className={styles.trustBadge}>
                <span>🔒</span>
                <div>
                  <p className={styles.trustTitle}>Dana Aman</p>
                  <p className={styles.trustDesc}>Protected payment concept</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2026 TUNTAS. Seluruh hak dilindungi.
          </p>
          <p className={styles.disclaimer}>
            TUNTAS adalah platform simulasi. Sistem pembayaran adalah konsep prototype.
          </p>
        </div>
      </div>
    </footer>
  );
};
