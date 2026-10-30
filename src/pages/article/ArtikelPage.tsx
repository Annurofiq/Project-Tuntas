import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { Badge } from '../../components/ui/Badge';
import { ArticleCard } from '../../components/ui/ArticleCard';
import { articles } from '../../data/mockData';
import styles from './ArtikelPage.module.css';

const CATEGORIES = ['Semua', 'Jasa', 'Marketplace', 'Karier', 'Keamanan', 'Tips'];

export const ArtikelPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let result = [...articles];

    if (activeCategory !== 'Semua') {
      result = result.filter(a => a.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        a =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <PublicLayout>
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroContent}`}>
          <Badge variant="primary">📝 Artikel TUNTAS</Badge>
          <h1 className={styles.heroTitle}>Artikel TUNTAS</h1>
          <p className={styles.heroDesc}>
            Tips, panduan, dan informasi untuk membantu kamu menggunakan TUNTAS dengan lebih baik.
          </p>

          {/* Search */}
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="search"
              placeholder="Cari artikel, topik, atau kategori..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Cari artikel"
            />
          </div>
        </div>
      </section>

      {/* ── FILTER CATEGORIES ──────────────────────────────── */}
      <div className={styles.filterBar}>
        <div className="container">
          <div className={styles.filterInner}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={[styles.filterBtn, activeCategory === cat ? styles.filterActive : ''].join(' ')}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── ARTICLES ───────────────────────────────────────── */}
      <section className={styles.articlesSection}>
        <div className="container">
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🔍</span>
              <h3>Tidak ada artikel ditemukan</h3>
              <p>Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
              <button
                className={styles.resetBtn}
                onClick={() => { setSearchQuery(''); setActiveCategory('Semua'); }}
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featured && !searchQuery && activeCategory === 'Semua' && (
                <div className={styles.featuredSection}>
                  <p className={styles.featuredLabel}>Artikel Terbaru</p>
                  <ArticleCard article={featured} featured />
                </div>
              )}

              {/* Article Grid */}
              <div className={styles.articleGrid}>
                {(searchQuery || activeCategory !== 'Semua' ? filtered : rest).map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              <p className={styles.resultCount}>
                Menampilkan {filtered.length} artikel
                {activeCategory !== 'Semua' && ` dalam kategori "${activeCategory}"`}
                {searchQuery && ` untuk "${searchQuery}"`}
              </p>
            </>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};
