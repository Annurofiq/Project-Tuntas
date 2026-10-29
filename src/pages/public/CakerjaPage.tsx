import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrench, ShoppingBag, CheckCircle, ArrowRight, Search } from 'lucide-react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import styles from './CakerjaPage.module.css';

type ActiveTab = 'jasa' | 'pasar';

const jasaRequesterSteps = [
  {
    num: '01',
    title: 'Posting kebutuhan',
    desc: 'Jelaskan apa yang kamu butuhkan, tentukan budget, lokasi, dan deadline.',
    icon: '📝',
  },
  {
    num: '02',
    title: 'Terima penawaran',
    desc: 'Penyedia jasa yang tertarik dapat melihat postingmu dan mengajukan penawaran.',
    icon: '📬',
  },
  {
    num: '03',
    title: 'Pilih penyedia jasa',
    desc: 'Bandingkan harga, pengalaman, rating, dan profil penyedia jasa.',
    icon: '🔍',
  },
  {
    num: '04',
    title: 'Diskusikan melalui chat',
    desc: 'Gunakan chat TUNTAS untuk membahas detail pekerjaan dan kesepakatan.',
    icon: '💬',
  },
  {
    num: '05',
    title: 'Lakukan pembayaran',
    desc: 'Pembayaran mengikuti mekanisme transaksi TUNTAS sebelum pekerjaan dimulai.',
    icon: '💳',
  },
  {
    num: '06',
    title: 'Pekerjaan dikerjakan',
    desc: 'Penyedia jasa menyelesaikan pekerjaan sesuai kesepakatan.',
    icon: '⚙️',
  },
  {
    num: '07',
    title: 'Konfirmasi hasil',
    desc: 'Periksa hasil pekerjaan dan berikan persetujuan atau minta revisi jika diperlukan.',
    icon: '✅',
  },
  {
    num: '08',
    title: 'Selesaikan transaksi',
    desc: 'Setelah pekerjaan selesai, transaksi ditandai selesai dan kedua pihak dapat memberikan review.',
    icon: '🏆',
  },
];

const jasaProviderSteps = [
  {
    num: '01',
    title: 'Cari kebutuhan',
    desc: 'Temukan posting yang sesuai dengan kemampuan dan bidangmu.',
    icon: '🔎',
  },
  {
    num: '02',
    title: 'Ajukan penawaran',
    desc: 'Tentukan harga, estimasi waktu, dan jelaskan pengalamanmu.',
    icon: '📤',
  },
  {
    num: '03',
    title: 'Tunggu konfirmasi',
    desc: 'Pemilik kebutuhan dapat melihat dan membandingkan penawaran yang masuk.',
    icon: '⏳',
  },
  {
    num: '04',
    title: 'Diskusikan pekerjaan',
    desc: 'Gunakan chat TUNTAS untuk menyepakati detail pekerjaan.',
    icon: '💬',
  },
  {
    num: '05',
    title: 'Kerjakan',
    desc: 'Mulai pekerjaan setelah order dikonfirmasi dan pembayaran masuk.',
    icon: '🛠️',
  },
  {
    num: '06',
    title: 'Kirim hasil',
    desc: 'Upload atau kirimkan hasil pekerjaan melalui sistem TUNTAS.',
    icon: '📦',
  },
  {
    num: '07',
    title: 'Selesaikan transaksi',
    desc: 'Setelah hasil diterima dan disetujui, transaksi dapat diselesaikan.',
    icon: '🏆',
  },
];

const pasarBuyerSteps = [
  { num: '01', title: 'Cari barang', desc: 'Gunakan pencarian dan kategori untuk menemukan barang yang kamu inginkan.', icon: '🔍' },
  { num: '02', title: 'Lihat detail', desc: 'Periksa foto, kondisi, harga, lokasi, dan profil penjual secara seksama.', icon: '👁️' },
  { num: '03', title: 'Chat atau beli', desc: 'Hubungi penjual melalui chat atau gunakan opsi pembelian yang tersedia.', icon: '💬' },
  { num: '04', title: 'Bayar', desc: 'Ikuti proses pembayaran TUNTAS yang aman.', icon: '💳' },
  { num: '05', title: 'Terima barang', desc: 'Tunggu proses pengiriman atau serah terima barang dengan penjual.', icon: '📦' },
  { num: '06', title: 'Konfirmasi', desc: 'Konfirmasi setelah barang diterima dalam kondisi sesuai yang diharapkan.', icon: '✅' },
];

const pasarSellerSteps = [
  { num: '01', title: 'Buat listing', desc: 'Tambahkan foto, nama barang, kondisi, harga, dan deskripsi yang lengkap.', icon: '📝' },
  { num: '02', title: 'Publikasikan', desc: 'Barang akan muncul di marketplace PASAR dan bisa ditemukan pembeli.', icon: '🌐' },
  { num: '03', title: 'Terima pertanyaan / penawaran', desc: 'Pembeli dapat menghubungimu dan melakukan negosiasi harga.', icon: '📬' },
  { num: '04', title: 'Proses transaksi', desc: 'Setelah transaksi disepakati, proses pengiriman atau serah terima dapat dilakukan.', icon: '🤝' },
  { num: '05', title: 'Selesaikan transaksi', desc: 'Pembeli mengonfirmasi barang diterima, dan transaksi selesai.', icon: '🏆' },
];

export const CakerjaPage: React.FC = () => {
  const [tab, setTab] = useState<ActiveTab>('jasa');

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
          <Badge variant="primary" className={styles.badge}>
            📖 Cara Kerja TUNTAS
          </Badge>
          <h1 className={styles.heroTitle}>Cara Kerja TUNTAS</h1>
          <p className={styles.heroDesc}>
            Satu tempat untuk menemukan bantuan, mengambil pekerjaan, serta jual dan beli barang.
          </p>

          {/* Tab Switch */}
          <div className={styles.tabSwitch}>
            <button
              className={[styles.tabBtn, tab === 'jasa' ? styles.tabActive : ''].join(' ')}
              onClick={() => setTab('jasa')}
              aria-pressed={tab === 'jasa'}
            >
              <Wrench size={16} />
              JASA
            </button>
            <button
              className={[styles.tabBtn, tab === 'pasar' ? styles.tabActive : ''].join(' ')}
              onClick={() => setTab('pasar')}
              aria-pressed={tab === 'pasar'}
            >
              <ShoppingBag size={16} />
              PASAR
            </button>
          </div>
        </div>
      </section>

      {/* ── JASA CONTENT ───────────────────────────────────── */}
      {tab === 'jasa' && (
        <>
          {/* Untuk Yang Membutuhkan Bantuan */}
          <section className={styles.section}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <Badge variant="primary">Untuk yang membutuhkan bantuan</Badge>
                <h2 className={styles.sectionTitle}>Cara Kerja — Jasa (Requester)</h2>
                <p className={styles.sectionDesc}>
                  Butuh seseorang untuk menyelesaikan pekerjaanmu? Posting kebutuhanmu dan terima penawaran dari penyedia jasa.
                </p>
              </div>

              <div className={styles.stepsGrid}>
                {jasaRequesterSteps.map((step, i) => (
                  <div key={step.num} className={styles.stepCard}>
                    <div className={styles.stepIconWrap}>
                      <span className={styles.stepEmoji}>{step.icon}</span>
                      <span className={styles.stepNum}>{step.num}</span>
                    </div>
                    {i < jasaRequesterSteps.length - 1 && (
                      <div className={styles.stepConnector} />
                    )}
                    <div className={styles.stepBody}>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <p className={styles.stepDesc}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.ctaGroup}>
                <Button size="lg" leftIcon={<Search size={18} />} onClick={() => navigate('/jasa')}>
                  Mulai Cari Jasa
                </Button>
                <Button size="lg" variant="secondary" leftIcon={<ArrowRight size={18} />} onClick={() => navigate('/jasa/buat')}>
                  Posting Kebutuhan
                </Button>
              </div>
            </div>
          </section>

          {/* Untuk Penyedia Jasa */}
          <section className={`${styles.section} ${styles.sectionAlt}`}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <Badge variant="accent">Untuk penyedia jasa</Badge>
                <h2 className={styles.sectionTitle}>Cara Kerja — Penyedia Jasa</h2>
                <p className={styles.sectionDesc}>
                  Punya keahlian? Cari kebutuhan yang sesuai dan mulai dapatkan penghasilan tambahan.
                </p>
              </div>

              <div className={styles.stepsGrid}>
                {jasaProviderSteps.map((step, i) => (
                  <div key={step.num} className={styles.stepCard}>
                    <div className={styles.stepIconWrap}>
                      <span className={styles.stepEmoji}>{step.icon}</span>
                      <span className={styles.stepNum}>{step.num}</span>
                    </div>
                    {i < jasaProviderSteps.length - 1 && (
                      <div className={styles.stepConnector} />
                    )}
                    <div className={styles.stepBody}>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <p className={styles.stepDesc}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── PASAR CONTENT ──────────────────────────────────── */}
      {tab === 'pasar' && (
        <>
          {/* Untuk Pembeli */}
          <section className={styles.section}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <Badge variant="success">Untuk pembeli</Badge>
                <h2 className={styles.sectionTitle}>Cara Kerja — Pasar (Pembeli)</h2>
                <p className={styles.sectionDesc}>
                  Temukan barang baru dan bekas berkualitas dari penjual terpercaya di sekitarmu.
                </p>
              </div>

              <div className={styles.stepsGrid}>
                {pasarBuyerSteps.map((step, i) => (
                  <div key={step.num} className={styles.stepCard}>
                    <div className={styles.stepIconWrap}>
                      <span className={styles.stepEmoji}>{step.icon}</span>
                      <span className={styles.stepNum}>{step.num}</span>
                    </div>
                    {i < pasarBuyerSteps.length - 1 && (
                      <div className={styles.stepConnector} />
                    )}
                    <div className={styles.stepBody}>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <p className={styles.stepDesc}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.ctaGroup}>
                <Button size="lg" leftIcon={<ShoppingBag size={18} />} onClick={() => navigate('/pasar')}>
                  Jelajahi Pasar
                </Button>
              </div>
            </div>
          </section>

          {/* Untuk Penjual */}
          <section className={`${styles.section} ${styles.sectionAlt}`}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <Badge variant="warning">Untuk penjual</Badge>
                <h2 className={styles.sectionTitle}>Cara Kerja — Pasar (Penjual)</h2>
                <p className={styles.sectionDesc}>
                  Jual barang yang tidak terpakai atau buka toko online di PASAR TUNTAS.
                </p>
              </div>

              <div className={styles.stepsGrid}>
                {pasarSellerSteps.map((step, i) => (
                  <div key={step.num} className={styles.stepCard}>
                    <div className={styles.stepIconWrap}>
                      <span className={styles.stepEmoji}>{step.icon}</span>
                      <span className={styles.stepNum}>{step.num}</span>
                    </div>
                    {i < pasarSellerSteps.length - 1 && (
                      <div className={styles.stepConnector} />
                    )}
                    <div className={styles.stepBody}>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <p className={styles.stepDesc}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.ctaGroup}>
                <Button size="lg" variant="secondary" leftIcon={<ArrowRight size={18} />} onClick={() => navigate('/pasar/jual')}>
                  Mulai Jual Barang
                </Button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── BENEFITS ───────────────────────────────────────── */}
      <section className={styles.benefitSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitleLight}>Kenapa Memilih TUNTAS?</h2>
            <p className={styles.sectionDescLight}>
              Dirancang untuk memberikan pengalaman terbaik bagi semua pengguna.
            </p>
          </div>
          <div className={styles.benefitGrid}>
            {[
              { icon: '🔒', title: 'Transaksi Lebih Aman', desc: 'Pembayaran mengikuti mekanisme transaksi TUNTAS yang dirancang untuk melindungi kedua belah pihak.' },
              { icon: '⭐', title: 'Sistem Reputasi', desc: 'Rating dan review nyata dari pengguna lain membantu kamu memilih dengan lebih percaya diri.' },
              { icon: '💬', title: 'Chat Langsung', desc: 'Komunikasi langsung dengan penyedia jasa atau penjual untuk menyepakati detail sebelum transaksi.' },
              { icon: '🤝', title: 'Penyelesaian Sengketa', desc: 'Jika terjadi masalah, kamu bisa mengajukan peninjauan melalui mekanisme yang tersedia.' },
            ].map(b => (
              <div key={b.title} className={styles.benefitCard}>
                <span className={styles.benefitIcon}>{b.icon}</span>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <div className={styles.ctaContent}>
              <h2>Siap untuk mulai?</h2>
              <p>Bergabung dengan ribuan pengguna TUNTAS dan rasakan kemudahannya hari ini.</p>
            </div>
            <div className={styles.ctaButtons}>
              <Button size="xl" onClick={() => navigate('/daftar')}>
                Daftar Gratis
              </Button>
              <Button size="xl" variant="outline" onClick={() => navigate('/keamanan')}>
                Pelajari Keamanan
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ QUICK ──────────────────────────────────────── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Pertanyaan Umum</h2>
          </div>
          <div className={styles.faqGrid}>
            {[
              { q: 'Apakah TUNTAS gratis untuk digunakan?', a: 'Mendaftar dan menjelajahi TUNTAS sepenuhnya gratis. Biaya layanan hanya berlaku saat transaksi berhasil diselesaikan.' },
              { q: 'Bagaimana jika penyedia jasa tidak menyelesaikan pekerjaan?', a: 'TUNTAS menyediakan mekanisme peninjauan jika terjadi sengketa antara pengguna. Kamu bisa mengajukan laporan dengan melampirkan bukti komunikasi.' },
              { q: 'Apakah saya bisa menjadi penyedia jasa sekaligus pembeli?', a: 'Tentu saja. Satu akun TUNTAS bisa digunakan untuk berbagai peran: mencari jasa, menawarkan jasa, membeli, maupun menjual barang.' },
              { q: 'Bagaimana sistem pembayaran bekerja?', a: 'Pembayaran mengikuti mekanisme transaksi TUNTAS. Setelah pekerjaan selesai dan disetujui, transaksi dapat diselesaikan sesuai alur yang sudah ditetapkan.' },
            ].map(item => (
              <div key={item.q} className={styles.faqCard}>
                <div className={styles.faqIcon}>
                  <CheckCircle size={20} />
                </div>
                <div className={styles.faqBody}>
                  <h4 className={styles.faqQ}>{item.q}</h4>
                  <p className={styles.faqA}>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
