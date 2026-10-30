import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Star,
  MessageCircle,
  AlertTriangle,
  Scale,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import styles from './KeamananPage.module.css';

const paymentFlow = [
  { label: 'Pembeli melakukan pembayaran', icon: '💳', active: true },
  { label: 'Dana berada dalam status transaksi terlindungi', icon: '🔒', active: true },
  { label: 'Penyedia jasa mengerjakan pekerjaan', icon: '⚙️', active: false },
  { label: 'Hasil dikirimkan', icon: '📦', active: false },
  { label: 'Pembeli memeriksa hasil', icon: '👁️', active: false },
  { label: 'Transaksi diselesaikan sesuai mekanisme TUNTAS', icon: '✅', active: false },
];

const disputeFlow = [
  { label: 'Masalah terjadi', icon: '⚠️' },
  { label: 'Coba selesaikan melalui chat', icon: '💬' },
  { label: 'Jika tidak selesai, ajukan sengketa', icon: '📋' },
  { label: 'Lampirkan bukti komunikasi', icon: '📎' },
  { label: 'Proses peninjauan', icon: '🔍' },
  { label: 'Keputusan disampaikan', icon: '⚖️' },
];

const tips = [
  { num: 1, title: 'Jaga kerahasiaan password', desc: 'Jangan pernah membagikan password akunmu kepada siapapun, termasuk yang mengaku sebagai tim TUNTAS.' },
  { num: 2, title: 'Periksa profil dan rating', desc: 'Sebelum bekerja sama, luangkan waktu untuk memeriksa profil, rating, dan review pengguna lain.' },
  { num: 3, title: 'Jangan kirim data sensitif di chat', desc: 'Hindari mengirimkan data sensitif seperti nomor rekening, nomor KTP, atau informasi pribadi lainnya melalui chat.' },
  { num: 4, title: 'Pastikan detail pekerjaan tertulis jelas', desc: 'Kesepakatan yang jelas di awal mengurangi risiko kesalahpahaman. Pastikan scope, harga, dan deadline tertulis.' },
  { num: 5, title: 'Gunakan sistem transaksi TUNTAS', desc: 'Selalu gunakan mekanisme transaksi yang tersedia di platform. Hindari pembayaran di luar platform.' },
  { num: 6, title: 'Simpan bukti komunikasi', desc: 'Simpan tangkapan layar atau catatan dari percakapan penting sebagai referensi jika terjadi sengketa.' },
  { num: 7, title: 'Laporkan aktivitas mencurigakan', desc: 'Jika menemukan pengguna atau posting yang mencurigakan, segera laporkan melalui fitur pelaporan yang tersedia.' },
];

export const KeamananPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PublicLayout>
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroBlob1} />
          <div className={styles.heroBlob2} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <Badge variant="success" className={styles.badge}>
            🔒 Keamanan Platform
          </Badge>
          <h1 className={styles.heroTitle}>Transaksi Lebih Aman di TUNTAS</h1>
          <p className={styles.heroDesc}>
            Kami merancang TUNTAS agar pengguna dapat bertransaksi dengan lebih percaya diri.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statNum}>100k+</span>
              <span className={styles.statLabel}>Pengguna aktif</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNum}>97%</span>
              <span className={styles.statLabel}>Transaksi berhasil</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNum}>4.8⭐</span>
              <span className={styles.statLabel}>Rating rata-rata</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ─────────────────────────────────────── */}
      <div className="container">
        <div className={styles.disclaimer}>
          <AlertTriangle size={16} className={styles.disclaimerIcon} />
          <p>
            TUNTAS adalah platform simulasi. Sistem pembayaran yang ditampilkan merupakan konsep prototype. 
            TUNTAS bukan merupakan bank, lembaga keuangan, atau penyedia jasa pembayaran berlisensi.
          </p>
        </div>
      </div>

      {/* ── VERIFIKASI PENGGUNA ─────────────────────────────── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.twoCol}>
            <div className={styles.twoColText}>
              <Badge variant="primary">Verifikasi Pengguna</Badge>
              <h2 className={styles.sectionTitle}>
                <UserCheck size={28} className={styles.titleIcon} />
                Kenali Siapa yang Kamu Ajak Bertransaksi
              </h2>
              <p className={styles.sectionDesc}>
                Pengguna TUNTAS dapat memiliki status verifikasi yang membantu kamu mengenali akun dengan lebih baik. 
                Informasi verifikasi ditampilkan secara transparan di profil setiap pengguna.
              </p>
              <div className={styles.verifyList}>
                <div className={styles.verifyItem}>
                  <CheckCircle size={18} className={styles.verifyIcon} />
                  <div>
                    <span className={styles.verifyLabel}>Email terverifikasi</span>
                    <p className={styles.verifyDesc}>Alamat email dikonfirmasi melalui proses verifikasi.</p>
                  </div>
                </div>
                <div className={styles.verifyItem}>
                  <CheckCircle size={18} className={styles.verifyIcon} />
                  <div>
                    <span className={styles.verifyLabel}>Nomor telepon terverifikasi</span>
                    <p className={styles.verifyDesc}>Nomor telepon dikonfirmasi melalui kode OTP.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.twoColVisual}>
              <div className={styles.profileCard}>
                <div className={styles.profileHeader}>
                  <div className={styles.profileAvatar}>
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Budi"
                      alt="Budi Santoso"
                      className={styles.avatarImg}
                    />
                    <span className={styles.onlineDot} />
                  </div>
                  <div className={styles.profileInfo}>
                    <h4 className={styles.profileName}>Budi Santoso</h4>
                    <p className={styles.profileSub}>Teknisi Elektronik • Cirebon</p>
                  </div>
                </div>
                <div className={styles.profileBadges}>
                  <span className={styles.verifiedBadge}>✓ Email terverifikasi</span>
                  <span className={styles.verifiedBadge}>✓ Nomor HP terverifikasi</span>
                </div>
                <div className={styles.profileStats}>
                  <div className={styles.profileStat}>
                    <span className={styles.profileStatNum}>4.9</span>
                    <span className={styles.profileStatLabel}>⭐ Rating</span>
                  </div>
                  <div className={styles.profileStat}>
                    <span className={styles.profileStatNum}>128</span>
                    <span className={styles.profileStatLabel}>Transaksi</span>
                  </div>
                  <div className={styles.profileStat}>
                    <span className={styles.profileStatNum}>97.8%</span>
                    <span className={styles.profileStatLabel}>Sukses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REPUTASI & RATING ───────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeaderCenter}>
            <Badge variant="warning">Reputasi & Rating</Badge>
            <h2 className={styles.sectionTitle}>
              <Star size={26} className={styles.titleIcon} />
              Lihat Rekam Jejak Sebelum Memilih
            </h2>
            <p className={styles.sectionDesc}>
              Setiap pengguna memiliki profil reputasi yang transparan. Kamu bisa melihat rating, 
              jumlah ulasan, tingkat keberhasilan, dan riwayat transaksi sebelum memutuskan bekerja sama.
            </p>
          </div>
          <div className={styles.reputationGrid}>
            {[
              { name: 'Budi Santoso', avatar: 'Budi', rating: 4.9, tx: 128, role: 'Teknisi Elektronik' },
              { name: 'Andi Wijaya', avatar: 'Andi', rating: 4.8, tx: 56, role: 'Desainer Grafis' },
              { name: 'Rizky Pratama', avatar: 'Rizky', rating: 5.0, tx: 24, role: 'Full-stack Developer' },
              { name: 'Ratna Komala', avatar: 'Ratna', rating: 4.95, tx: 178, role: 'Guru Les Privat' },
            ].map(u => (
              <div key={u.name} className={styles.repCard}>
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.avatar}`}
                  alt={u.name}
                  className={styles.repAvatar}
                />
                <div className={styles.repInfo}>
                  <span className={styles.repName}>{u.name}</span>
                  <span className={styles.repRole}>{u.role}</span>
                  <div className={styles.repStats}>
                    <span className={styles.repRating}>⭐ {u.rating}</span>
                    <span className={styles.repDot}>·</span>
                    <span className={styles.repTx}>{u.tx} transaksi selesai</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PEMBAYARAN TERLINDUNGI ──────────────────────────── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.twoCol}>
            <div className={styles.twoColText}>
              <Badge variant="success">Pembayaran Terlindungi</Badge>
              <h2 className={styles.sectionTitle}>
                <ShieldCheck size={28} className={styles.titleIcon} />
                Flow Transaksi TUNTAS
              </h2>
              <p className={styles.sectionDesc}>
                Pembayaran mengikuti mekanisme transaksi TUNTAS. Dana berada dalam status terlindungi 
                selama proses pekerjaan berlangsung dan baru diteruskan setelah semua pihak sepakat.
              </p>
              <p className={styles.disclaimerInline}>
                * Sistem ini merupakan konsep prototype dalam simulasi platform TUNTAS.
              </p>
            </div>
            <div className={styles.flowList}>
              {paymentFlow.map((step, i) => (
                <div key={i} className={`${styles.flowStep} ${step.active ? styles.flowActive : ''}`}>
                  <div className={styles.flowIcon}>{step.icon}</div>
                  <div className={styles.flowLabel}>{step.label}</div>
                  {i < paymentFlow.length - 1 && (
                    <div className={styles.flowArrow}>↓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAT & KESEPAKATAN ──────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.twoColReverse}>
            <div className={styles.chatMockup}>
              <div className={styles.chatHeader}>
                <MessageCircle size={20} className={styles.chatHeaderIcon} />
                <span>Chat TUNTAS</span>
              </div>
              <div className={styles.chatMessages}>
                <div className={styles.chatBubbleLeft}>
                  <span>Harga untuk desain logo berapa ya?</span>
                </div>
                <div className={styles.chatBubbleRight}>
                  <span>Untuk logo modern, saya tawarkan Rp450.000 dengan 3x revisi, selesai 3 hari kerja.</span>
                </div>
                <div className={styles.chatBubbleLeft}>
                  <span>Oke, sudah termasuk format SVG dan PNG?</span>
                </div>
                <div className={styles.chatBubbleRight}>
                  <span>Ya, sudah termasuk semua format. Siap mulai kapan?</span>
                </div>
              </div>
            </div>
            <div className={styles.twoColText}>
              <Badge variant="primary">Chat & Kesepakatan</Badge>
              <h2 className={styles.sectionTitle}>
                <MessageCircle size={28} className={styles.titleIcon} />
                Diskusikan Semua Detail Sebelum Mulai
              </h2>
              <p className={styles.sectionDesc}>
                Gunakan chat TUNTAS untuk mendiskusikan semua hal sebelum transaksi dimulai. Kesepakatan yang tertulis jelas 
                melindungi kedua belah pihak.
              </p>
              <div className={styles.chatTopics}>
                {['Harga dan negosiasi', 'Timeline dan deadline', 'Detail pekerjaan', 'Format hasil', 'Mekanisme revisi', 'Proses pengiriman'].map(t => (
                  <span key={t} className={styles.chatTopic}>
                    <CheckCircle size={14} />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PELAPORAN ───────────────────────────────────────── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeaderCenter}>
            <Badge variant="danger">Pelaporan</Badge>
            <h2 className={styles.sectionTitle}>
              <AlertTriangle size={26} className={styles.titleIcon} />
              Laporkan Aktivitas yang Melanggar
            </h2>
            <p className={styles.sectionDesc}>
              Pengguna dapat melaporkan aktivitas yang dianggap melanggar aturan platform. 
              Setiap laporan akan ditinjau oleh tim TUNTAS.
            </p>
          </div>
          <div className={styles.reportGrid}>
            {[
              { label: 'Laporkan Pengguna', icon: '👤', desc: 'Pengguna yang berperilaku mencurigakan atau melanggar aturan.' },
              { label: 'Laporkan Posting', icon: '📝', desc: 'Posting jasa yang mengandung informasi palsu atau menyesatkan.' },
              { label: 'Laporkan Produk', icon: '📦', desc: 'Produk di marketplace yang melanggar ketentuan platform.' },
            ].map(r => (
              <div key={r.label} className={styles.reportCard}>
                <span className={styles.reportIcon}>{r.icon}</span>
                <h3 className={styles.reportTitle}>{r.label}</h3>
                <p className={styles.reportDesc}>{r.desc}</p>
                <button className={styles.reportBtn}>
                  {r.label} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PENYELESAIAN SENGKETA ───────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeaderCenter}>
            <Badge variant="neutral">Penyelesaian Sengketa</Badge>
            <h2 className={styles.sectionTitle}>
              <Scale size={26} className={styles.titleIcon} />
              Jika Terjadi Masalah
            </h2>
            <p className={styles.sectionDesc}>
              Kami menyediakan mekanisme peninjauan yang netral jika terjadi perselisihan antara pengguna.
            </p>
          </div>
          <div className={styles.disputeFlow}>
            {disputeFlow.map((step, i) => (
              <React.Fragment key={i}>
                <div className={styles.disputeStep}>
                  <div className={styles.disputeIcon}>{step.icon}</div>
                  <span className={styles.disputeLabel}>{step.label}</span>
                </div>
                {i < disputeFlow.length - 1 && (
                  <div className={styles.disputeArrow}>→</div>
                )}
              </React.Fragment>
            ))}
          </div>
          <p className={styles.disputeNote}>
            Keputusan dari proses peninjauan bersifat final dalam konteks platform TUNTAS. 
            TUNTAS tidak memberikan jaminan hukum atau pengembalian dana di luar mekanisme platform.
          </p>
        </div>
      </section>

      {/* ── TIPS KEAMANAN ───────────────────────────────────── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeaderCenter}>
            <Badge variant="accent">Tips Keamanan</Badge>
            <h2 className={styles.sectionTitle}>
              <Lightbulb size={26} className={styles.titleIcon} />
              Tips Aman Bertransaksi di TUNTAS
            </h2>
          </div>
          <div className={styles.tipsGrid}>
            {tips.map(tip => (
              <div key={tip.num} className={styles.tipCard}>
                <span className={styles.tipNum}>{String(tip.num).padStart(2, '0')}</span>
                <div className={styles.tipBody}>
                  <h4 className={styles.tipTitle}>{tip.title}</h4>
                  <p className={styles.tipDesc}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <ShieldCheck size={64} className={styles.ctaIcon} />
            <div className={styles.ctaContent}>
              <h2>Siap Bertransaksi dengan Lebih Percaya Diri?</h2>
              <p>Pahami cara kerja TUNTAS dan mulai gunakan platform dengan lebih optimal.</p>
            </div>
            <div className={styles.ctaButtons}>
              <Button size="xl" variant="outline" onClick={() => navigate('/cara-kerja')}>
                Lihat Cara Kerja
              </Button>
              <Button size="xl" onClick={() => navigate('/daftar')}>
                Mulai Menggunakan TUNTAS <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
