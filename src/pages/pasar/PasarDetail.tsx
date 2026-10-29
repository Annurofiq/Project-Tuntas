import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Share2, Flag, ArrowLeft, MessageCircle, ShoppingCart, Star } from 'lucide-react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { formatRupiah, formatRelativeTime } from '../../utils';
import { listings } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import styles from './PasarDetail.module.css';

export const PasarDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [activeImage, setActiveImage] = useState(0);

  const item = listings.find(l => l.id === id);
  const isOwner = isAuthenticated && item?.sellerId === user?.id;

  if (!item) {
    return (
      <PublicLayout>
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <h2>Barang tidak ditemukan</h2>
          <Button onClick={() => navigate('/pasar')} className="mt-4">Kembali ke Pasar</Button>
        </div>
      </PublicLayout>
    );
  }

  const handleBuy = () => {
    if (!isAuthenticated) {
      navigate('/masuk');
      return;
    }
    // Simulate checkout flow
    alert('Mengalihkan ke halaman pembayaran aman (Escrow)...');
  };

  const handleChat = () => {
    if (!isAuthenticated) {
      navigate('/masuk');
      return;
    }
    navigate(`/dashboard/pesan?userId=${item.sellerId}`);
  };

  return (
    <PublicLayout>
      <div className={styles.page}>
        <div className="container">
          <button className={styles.backBtn} onClick={() => navigate('/pasar')}>
            <ArrowLeft size={20} /> Kembali ke pencarian
          </button>

          <div className={styles.grid}>
            {/* ── IMAGE GALLERY & DESCRIPTION ─────────────────────── */}
            <div className={styles.main}>
              <Card padding="none" className={styles.galleryCard}>
                <div className={styles.mainImageWrap}>
                  <img src={item.images[activeImage]} alt={item.title} className={styles.mainImage} />
                  <Badge variant={item.condition === 'new' ? 'success' : 'neutral'} className={styles.conditionBadge}>
                    {item.condition === 'new' ? 'Baru' : 'Bekas'}
                  </Badge>
                </div>
                {item.images.length > 1 && (
                  <div className={styles.thumbnailList}>
                    {item.images.map((img, idx) => (
                      <button 
                        key={idx} 
                        className={[styles.thumbBtn, activeImage === idx ? styles.thumbActive : ''].join(' ')}
                        onClick={() => setActiveImage(idx)}
                      >
                        <img src={img} alt={`Thumbnail ${idx}`} />
                      </button>
                    ))}
                  </div>
                )}
              </Card>

              <div className={styles.detailsSection}>
                <h3 className={styles.sectionTitle}>Deskripsi Produk</h3>
                <div className={styles.desc}>
                  {item.description.split('\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* ── SIDEBAR (PRICE & SELLER) ────────────────────────── */}
            <aside className={styles.sidebar}>
              <Card className={styles.actionCard}>
                <div className={styles.productHeader}>
                  <h1 className={styles.title}>{item.title}</h1>
                  <div className={styles.price}>{formatRupiah(item.price)}</div>
                  <div className={styles.metaInfo}>
                    <span>Diposting {formatRelativeTime(item.createdAt)}</span>
                    <span>•</span>
                    <span className={styles.stock}>Stok: {item.stock}</span>
                  </div>
                </div>

                {!isOwner && (
                  <div className={styles.actions}>
                    <Button fullWidth size="lg" onClick={handleBuy} leftIcon={<ShoppingCart size={18} />}>
                      Beli Langsung
                    </Button>
                    <Button fullWidth size="lg" variant="outline" onClick={handleChat} leftIcon={<MessageCircle size={18} />}>
                      Chat Penjual
                    </Button>
                  </div>
                )}

                <div className={styles.securityNote}>
                  <ShieldCheck size={20} className={styles.securityIcon} />
                  <div>
                    <strong>Transaksi Aman</strong>
                    <p>Pembayaran akan ditahan oleh sistem sampai Anda mengkonfirmasi barang telah diterima.</p>
                  </div>
                </div>
                
                <div className={styles.cardActions}>
                  <button className={styles.iconBtn}><Share2 size={18} /> Bagikan</button>
                  <button className={styles.iconBtn}><Flag size={18} /> Laporkan</button>
                </div>
              </Card>

              <Card className={styles.sellerCard}>
                <h3 className={styles.sidebarTitle}>Informasi Penjual</h3>
                <div className={styles.sellerProfile}>
                  <Avatar src={item.seller.avatar} name={item.seller.name} size="lg" isVerified={item.seller.isVerified} />
                  <div className={styles.sellerInfo}>
                    <Link to={`/profil/${item.seller.id}`} className={styles.sellerName}>
                      {item.seller.name}
                    </Link>
                    <div className={styles.sellerLocation}><MapPin size={12} /> {item.city}</div>
                  </div>
                </div>
                
                <div className={styles.sellerStats}>
                  <div className={styles.sellerStat}>
                    <span className={styles.statVal}><Star size={14} className={styles.starIcon}/> {item.seller.rating}</span>
                    <span className={styles.statLabel}>{item.seller.totalReviews} Ulasan</span>
                  </div>
                  <div className={styles.sellerStat}>
                    <span className={styles.statVal}>{item.seller.completedJobs}</span>
                    <span className={styles.statLabel}>Transaksi Berhasil</span>
                  </div>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
