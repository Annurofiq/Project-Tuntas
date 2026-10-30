import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, MapPin, Filter, X, ArrowUpDown, Wrench } from 'lucide-react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { formatRupiah, truncate, getJobTypeLabel } from '../../utils';
import { gigs, jasaCategories } from '../../data/mockData';
import styles from './JasaBrowse.module.css';

export const JasaBrowse: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('kategori') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [showFilters, setShowFilters] = useState(false);

  // Simple filtering mock
  const filteredGigs = gigs.filter((gig) => {
    if (selectedCategory && gig.category !== jasaCategories.find(c => c.slug === selectedCategory)?.name) {
      return false;
    }
    if (searchQuery && !gig.title.toLowerCase().includes(searchQuery.toLowerCase())) {
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
              <h1 className={styles.title}>Temukan Pekerjaan (Jasa)</h1>
              <p className={styles.desc}>Cari pekerjaan yang sesuai dengan keahlianmu dan ajukan penawaran.</p>
            </div>
            <div className={styles.searchWrap}>
              <div className={styles.searchInputWrap}>
                <Search className={styles.searchIcon} size={18} />
                <input
                  type="text"
                  placeholder="Cari nama pekerjaan..."
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
                {jasaCategories.map(cat => (
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
              <h4>Tipe Pekerjaan</h4>
              <div className={styles.filterList}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" defaultChecked />
                  <span>Online</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" defaultChecked />
                  <span>On-site</span>
                </label>
              </div>
            </div>

            <div className={styles.filterGroup}>
              <h4>Lokasi (Untuk On-site)</h4>
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

          {/* ── GIG LIST ─────────────────────────────────────────── */}
          <div className={styles.content}>
            <div className={styles.resultsHeader}>
              <p>Menampilkan <strong>{filteredGigs.length}</strong> pekerjaan</p>
              <div className={styles.sort}>
                <ArrowUpDown size={16} />
                <select className={styles.sortSelect}>
                  <option>Terbaru</option>
                  <option>Budget Tertinggi</option>
                  <option>Deadline Terdekat</option>
                </select>
              </div>
            </div>

            <div className={styles.gigList}>
              {filteredGigs.length > 0 ? (
                filteredGigs.map(gig => (
                  <Card key={gig.id} hoverable className={styles.gigCard} onClick={() => navigate(`/jasa/${gig.id}`)}>
                    <div className={styles.gigMain}>
                      <div className={styles.gigTop}>
                        <div className={styles.gigMetaTags}>
                          <Badge variant="primary">{gig.category}</Badge>
                          <Badge variant="outline">{getJobTypeLabel(gig.jobType)}</Badge>
                          {gig.jobType === 'on-site' && (
                            <span className={styles.locationText}><MapPin size={14} /> {gig.city}</span>
                          )}
                        </div>
                        <span className={styles.timeAgo}>{gig.createdAt.split('T')[0]}</span>
                      </div>
                      
                      <h3 className={styles.gigTitle}>{gig.title}</h3>
                      <p className={styles.gigDesc}>{truncate(gig.description, 160)}</p>
                      
                      <div className={styles.skills}>
                        {gig.requiredSkills.slice(0, 4).map(skill => (
                          <span key={skill} className={styles.skillTag}>{skill}</span>
                        ))}
                        {gig.requiredSkills.length > 4 && (
                          <span className={styles.skillTag}>+{gig.requiredSkills.length - 4}</span>
                        )}
                      </div>
                    </div>

                    <div className={styles.gigSidebar}>
                      <div className={styles.budgetBox}>
                        <span className={styles.budgetLabel}>Budget ({gig.budgetType})</span>
                        <span className={styles.budgetVal}>
                          {gig.budgetType === 'fixed' 
                            ? formatRupiah(gig.budgetMax)
                            : `${formatRupiah(gig.budgetMin)} - ${formatRupiah(gig.budgetMax)}`
                          }
                        </span>
                      </div>
                      
                      <div className={styles.proposalsCount}>
                        <strong>{gig.proposalCount}</strong> Penawaran
                      </div>

                      <div className={styles.requesterInfo}>
                        <Avatar src={gig.requester.avatar} name={gig.requester.name} size="sm" />
                        <div>
                          <div className={styles.reqName}>{gig.requester.name}</div>
                          <div className={styles.reqRating}>⭐ {gig.requester.rating}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <Wrench size={48} className={styles.emptyIcon} />
                  <h3>Pekerjaan tidak ditemukan</h3>
                  <p>Coba gunakan kata kunci lain atau hapus filter.</p>
                  <Button variant="outline" onClick={() => { setSelectedCategory(''); setSearchQuery(''); }}>
                    Reset Filter
                  </Button>
                </div>
              )}
            </div>
            
            {filteredGigs.length > 0 && (
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
