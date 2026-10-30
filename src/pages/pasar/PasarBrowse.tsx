import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, MapPin, Filter, X, ArrowUpDown, Star, ShoppingBag } from 'lucide-react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { formatRupiah, truncate } from '../../utils';
import { listings, pasarCategories } from '../../data/mockData';
import styles from './PasarBrowse.module.css';

export const PasarBrowse: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('kategori') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [showFilters, setShowFilters] = useState(false);

  // Simple filtering mock
  const filteredListings = listings.filter((item) => {
    if (selectedCategory && item.category !== pasarCategories.find(c => c.slug === selectedCategory)?.name) {
      return false;
    }
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <PublicLayout>
      {/* ── HEADER & SEARCH ────────────────────────────────────── */}
      <div className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.title}>Marketplace (Pasar)</h1>
              <p className={styles.desc}>Temukan barang baru atau bekas di sekitarmu.</p>
            </div>
            <div className={styles.searchWrap}>
              <div className={styles.searchInputWrap}>
                <Search className={styles.searchIcon} size={18} />
                <input
                  type="text"
                  placeholder="Cari barang..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="md" onClick={() => setShowFilters(!showFilters)} variant={showFilters ? 'primary' : 'outline'}>
                <Filter size={18} /> <span className="hide-mobile">Filter</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.main}>
          {/* ── SIDEBAR FILTERS ──────────────────────────────────── */}
          <aside className={[styles.filters, showFilters ? styles.filtersShow : ''].join(' ')}>
            <div className={styles.filterHeader}>
              <h3>Filter</h3>
              <button className="hide-desktop" onClick={() => setShowFilters(false)}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.filterGroup}>
              <h4>Kategori</h4>
              <div className={styles.filterList}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === ''}
                    onChange={() => setSelectedCategory('')}
                  />
                  <span>Semua Kategori</span>
                </label>
                {pasarCategories.map(cat => (
                  <label key={cat.id} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.slug}
                      onChange={() => setSelectedCategory(cat.slug)}
                    />
                    <span>{cat.name}</span>
                    <span className={styles.count}>({cat.count})</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <h4>Kondisi Barang</h4>
              <div className={styles.filterList}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" defaultChecked />
                  <span>Baru</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" defaultChecked />
                  <span>Bekas</span>
                </label>
              </div>
            </div>

            <div className={styles.filterGroup}>
              <h4>Lokasi</h4>
              <div className={styles.locationInput}>
                <MapPin size={16} />
                <input type="text" placeholder="Semua Kota" />
              </div>
            </div>
            
            <div className={styles.filterActions}>
              <Button fullWidth onClick={() => setShowFilters(false)}>Terapkan Filter</Button>
              <Button fullWidth variant="ghost" onClick={() => { setSelectedCategory(''); setSearchQuery(''); }}>Reset</Button>
            </div>
          </aside>

          {/* ── LISTINGS ─────────────────────────────────────────── */}
          <div className={styles.content}>
            <div className={styles.resultsHeader}>
              <p>Menampilkan <strong>{filteredListings.length}</strong> produk</p>
              <div className={styles.sort}>
                <ArrowUpDown size={16} />
                <select className={styles.sortSelect}>
                  <option>Terbaru</option>
                  <option>Harga: Rendah ke Tinggi</option>
                  <option>Harga: Tinggi ke Rendah</option>
                </select>
              </div>
            </div>

            <div className={styles.productGrid}>
              {filteredListings.length > 0 ? (
                filteredListings.map(item => (
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
                        <span className={styles.productLocation}><MapPin size={12} /> {item.city}</span>
                        <div className={styles.productSeller}>
                          <Star size={12} className={styles.starIcon} />
                          <span>{item.seller.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <ShoppingBag size={48} className={styles.emptyIcon} />
                  <h3>Produk tidak ditemukan</h3>
                  <p>Coba gunakan kata kunci lain atau hapus filter.</p>
                  <Button variant="outline" onClick={() => { setSelectedCategory(''); setSearchQuery(''); }}>
                    Reset Filter
                  </Button>
                </div>
              )}
            </div>
            
            {filteredListings.length > 0 && (
              <div className={styles.pagination}>
                <Button variant="outline" disabled>Sebelumnya</Button>
                <div className={styles.pageNumbers}>
                  <button className={`${styles.pageNum} ${styles.pageActive}`}>1</button>
                  <button className={styles.pageNum}>2</button>
                  <button className={styles.pageNum}>3</button>
                </div>
                <Button variant="outline">Selanjutnya</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
