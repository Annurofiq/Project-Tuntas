import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Wrench, ShoppingBag, ShieldCheck, Star, Clock, ArrowRight } from 'lucide-react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { formatRupiah, truncate } from '../../utils';
import { gigs, listings, users, jasaCategories } from '../../data/mockData';
import styles from './Home.module.css';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  
  // Rotating placeholder for hero search
  const placeholders = [
    "Servis mesin cuci...",
    "Jasa desain logo...",
    "Orang untuk antri...",
    "Laptop bekas...",
    "Jasa fotografi..."
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  return (
    <PublicLayout>
      {/* ── HERO SECTION ────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroBlob1} />
          <div className={styles.heroBlob2} />
        </div>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <Badge variant="primary" className={styles.heroBadge}>
              ✨ Platform Marketplace Terlengkap di Indonesia
            </Badge>
            <h1 className={styles.heroTitle}>
              Cari bantuan. Ambil pekerjaan. <span className={styles.highlight}>Jual & beli.</span>
            </h1>
            <p className={styles.heroDesc}>
              Temukan orang yang tepat untuk menyelesaikan kebutuhanmu, ambil pekerjaan sesuai kemampuanmu, atau jual dan temukan barang di sekitarmu.
            </p>

            <div className={styles.heroSearch}>
              <div className={styles.searchBox}>
                <Search className={styles.searchIcon} size={20} />
                <input 
                  type="text" 
                  placeholder={`Cari: ${placeholders[placeholderIndex]}`}
                  className={styles.searchInput}
                />
                <Button size="md" className={styles.searchBtn}>Cari</Button>
              </div>
            </div>

            <div className={styles.heroCta}>
              <Button size="lg" onClick={() => navigate('/jasa')} leftIcon={<Wrench size={20} />}>
                Cari Jasa
              </Button>
              <Button size="lg" variant="secondary" onClick={() => navigate('/pasar')} leftIcon={<ShoppingBag size={20} />}>
                Jual & Beli
              </Button>
            </div>
            
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>10k+</span>
                <span className={styles.statLabel}>Penyedia Jasa</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>50k+</span>
                <span className={styles.statLabel}>Barang Terjual</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <div className={styles.avatars}>
                  {users.slice(0, 4).map(u => (
                    <Avatar key={u.id} src={u.avatar} name={u.name} size="sm" className={styles.statAvatar} />
                  ))}
                </div>
                <span className={styles.statLabel}>Dipercaya 100k+ User</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Kategori Populer</h2>
            <p className={styles.sectionDesc}>Temukan layanan atau barang sesuai kebutuhanmu.</p>
          </div>
          
          <div className={styles.categoryTabs}>
            <h3 className={styles.tabTitle}>Layanan Jasa</h3>
            <div className={styles.categoryGrid}>
              {jasaCategories.slice(0, 8).map(cat => (
                <Link to={`/jasa?kategori=${cat.slug}`} key={cat.id} className={styles.categoryCard}>
                  <span className={styles.catIcon}>{cat.icon}</span>
                  <span className={styles.catName}>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── JASA & GIGS ───────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.bgNeutral}`}>
        <div className="container">
          <div className={styles.sectionHeaderRow}>
            <div>
              <h2 className={styles.sectionTitle}>Pekerjaan Terbaru</h2>
              <p className={styles.sectionDesc}>Bantu mereka dan dapatkan penghasilan tambahan.</p>
            </div>
            <Button variant="outline" rightIcon={<ArrowRight size={16} />} onClick={() => navigate('/jasa')}>
              Lihat Semua
            </Button>
          </div>

          <div className={styles.gigGrid}>
            {gigs.slice(0, 6).map(gig => (
              <Card key={gig.id} hoverable className={styles.gigCard} onClick={() => navigate(`/jasa/${gig.id}`)}>
                <div className={styles.gigHeader}>
                  <Badge variant="primary">{gig.category}</Badge>
                  <span className={styles.gigTime}>{gig.createdAt.split('T')[0]}</span>
                </div>
                <h3 className={styles.gigTitle}>{gig.title}</h3>
                <p className={styles.gigDesc}>{truncate(gig.description, 100)}</p>
                <div className={styles.gigFooter}>
                  <div className={styles.gigRequester}>
                    <Avatar src={gig.requester.avatar} name={gig.requester.name} size="sm" />
                    <span className={styles.requesterName}>{gig.requester.name}</span>
                  </div>
                  <div className={styles.gigBudget}>
                    {formatRupiah(gig.budgetMax)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── PASAR (JUAL BELI) ─────────────────────────────────── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeaderRow}>
            <div>
              <h2 className={styles.sectionTitle}>Marketplace Pilihan</h2>
              <p className={styles.sectionDesc}>Temukan barang baru dan bekas berkualitas.</p>
            </div>
            <Button variant="outline" rightIcon={<ArrowRight size={16} />} onClick={() => navigate('/pasar')}>
              Lihat Semua
            </Button>
          </div>

          <div className={styles.productGrid}>
            {listings.slice(0, 5).map(item => (
              <Card key={item.id} hoverable padding="none" className={styles.productCard} onClick={() => navigate(`/pasar/${item.id}`)}>
                <div className={styles.productImageWrap}>
                  <img src={item.images[0]} alt={item.title} className={styles.productImage} />
                  <Badge variant={item.condition === 'new' ? 'success' : 'neutral'} className={styles.conditionBadge}>
                    {item.condition === 'new' ? 'Baru' : 'Bekas'}
                  </Badge>
                </div>
                <div className={styles.productContent}>
                  <h3 className={styles.productTitle}>{truncate(item.title, 50)}</h3>
                  <div className={styles.productPrice}>{formatRupiah(item.price)}</div>
                  <div className={styles.productMeta}>
                    <span className={styles.productLocation}>{item.city}</span>
                    <div className={styles.productSeller}>
                      <Star size={12} className={styles.starIcon} />
                      <span>{item.seller.rating}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.bgDark}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitleInverse}>Bagaimana TUNTAS Bekerja?</h2>
            <p className={styles.sectionDescInverse}>Pilih mode yang sesuai dengan kebutuhanmu hari ini.</p>
          </div>

          <div className={styles.howGrid}>
            <div className={styles.howCol}>
              <div className={styles.howHeader}>
                <Wrench className={styles.howIconMain} size={32} />
                <h3 className={styles.howTitle}>Butuh Bantuan? (Jasa)</h3>
              </div>
              <ul className={styles.howSteps}>
                <li>
                  <span className={styles.stepNum}>1</span>
                  <div>
                    <h4>Posting Kebutuhan</h4>
                    <p>Jelaskan apa yang kamu butuhkan dan budgetmu.</p>
                  </div>
                </li>
                <li>
                  <span className={styles.stepNum}>2</span>
                  <div>
                    <h4>Terima Penawaran</h4>
                    <p>Penyedia jasa akan memberikan penawaran harga & waktu.</p>
                  </div>
                </li>
                <li>
                  <span className={styles.stepNum}>3</span>
                  <div>
                    <h4>Pilih & Bayar Aman</h4>
                    <p>Pilih yang terbaik, dana akan diamankan sistem kami.</p>
                  </div>
                </li>
                <li>
                  <span className={styles.stepNum}>4</span>
                  <div>
                    <h4>Pekerjaan Selesai</h4>
                    <p>Review hasil kerja sebelum dana diteruskan ke penyedia jasa.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className={styles.howCol}>
              <div className={styles.howHeader}>
                <ShoppingBag className={styles.howIconMain} size={32} />
                <h3 className={styles.howTitle}>Cari Barang? (Pasar)</h3>
              </div>
              <ul className={styles.howSteps}>
                <li>
                  <span className={styles.stepNum}>1</span>
                  <div>
                    <h4>Cari Barang</h4>
                    <p>Temukan barang baru atau bekas di sekitarmu.</p>
                  </div>
                </li>
                <li>
                  <span className={styles.stepNum}>2</span>
                  <div>
                    <h4>Chat & Nego</h4>
                    <p>Tanya detail dan nego harga langsung dengan penjual.</p>
                  </div>
                </li>
                <li>
                  <span className={styles.stepNum}>3</span>
                  <div>
                    <h4>Bayar & Kirim</h4>
                    <p>Bayar melalui platform, barang dikirim oleh penjual.</p>
                  </div>
                </li>
                <li>
                  <span className={styles.stepNum}>4</span>
                  <div>
                    <h4>Barang Diterima</h4>
                    <p>Konfirmasi penerimaan dan dana akan diteruskan ke penjual.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST & SAFETY ────────────────────────────────────── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.trustGrid}>
            <div className={styles.trustContent}>
              <Badge variant="success">Trust & Safety</Badge>
              <h2 className={styles.sectionTitle}>Transaksi dibuat lebih aman.</h2>
              <p className={styles.sectionDesc}>
                Kami merancang sistem yang melindungi kedua belah pihak. Tidak perlu khawatir tentang penipuan atau pekerjaan yang tidak selesai.
              </p>
              <ul className={styles.trustFeatures}>
                <li>
                  <ShieldCheck size={24} className={styles.trustIcon} />
                  <div>
                    <h4>Protected Payment Concept</h4>
                    <p>Dana disimpan dengan aman oleh platform sampai pekerjaan selesai atau barang diterima.</p>
                  </div>
                </li>
                <li>
                  <Star size={24} className={styles.trustIcon} />
                  <div>
                    <h4>Sistem Reputasi Transparan</h4>
                    <p>Lihat rating dan review nyata dari pengguna lain sebelum mengambil keputusan.</p>
                  </div>
                </li>
                <li>
                  <Clock size={24} className={styles.trustIcon} />
                  <div>
                    <h4>Resolusi Sengketa (Dispute)</h4>
                    <p>Tim admin kami siap menengahi jika terjadi masalah antara pembeli dan penjual.</p>
                  </div>
                </li>
              </ul>
              <Button className={styles.trustBtn} variant="outline" onClick={() => navigate('/keamanan')}>
                Pelajari Kebijakan Keamanan Kami
              </Button>
            </div>
            <div className={styles.trustImageWrap}>
              {/* Replace with actual image in real app */}
              <div className={styles.trustMockup}>
                <div className={styles.mockupHeader}>
                  <ShieldCheck size={48} className={styles.mockupIcon} />
                  <h3>Pembayaran Dilindungi</h3>
                  <p>Dana Rp 2.000.000 sedang diamankan.</p>
                </div>
                <div className={styles.mockupSteps}>
                  <div className={`${styles.mockupStep} ${styles.stepDone}`}>1. Pembeli Membayar</div>
                  <div className={`${styles.mockupStep} ${styles.stepActive}`}>2. Dana Diamankan</div>
                  <div className={styles.mockupStep}>3. Penjual Mengirim/Mengerjakan</div>
                  <div className={styles.mockupStep}>4. Pembeli Konfirmasi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Siap untuk mulai?</h2>
            <p>Bergabung dengan ribuan pengguna lain di TUNTAS hari ini.</p>
            <div className={styles.ctaButtons}>
              <Button size="xl" onClick={() => navigate('/daftar')}>Daftar Gratis</Button>
              <Button size="xl" variant="secondary" onClick={() => navigate('/jasa/buat')}>Posting Kebutuhan</Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
