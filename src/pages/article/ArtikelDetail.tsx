import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar, Tag, ChevronRight } from 'lucide-react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ArticleCard } from '../../components/ui/ArticleCard';
import { articles } from '../../data/mockData';
import styles from './ArtikelDetail.module.css';

const categoryVariant: Record<string, 'primary' | 'success' | 'warning' | 'danger' | 'neutral' | 'accent'> = {
  Karier: 'primary',
  Jasa: 'accent',
  Marketplace: 'success',
  Keamanan: 'warning',
  Tips: 'neutral',
  default: 'neutral',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Render plain-text content with basic markdown-like formatting */
function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className={styles.contentH2}>{line.slice(3)}</h2>
      );
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={i} className={styles.contentBold}>
          <strong>{line.slice(2, -2)}</strong>
        </p>
      );
    } else if (line.startsWith('- ')) {
      // Collect consecutive list items
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`list-${i}`} className={styles.contentList}>
          {listItems.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
      continue;
    } else if (line === '---') {
      elements.push(<hr key={i} className={styles.contentDivider} />);
    } else if (line.trim() === '') {
      // skip empty lines
    } else {
      // Check for inline bold **text** within paragraph
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      if (parts.length > 1) {
        elements.push(
          <p key={i} className={styles.contentP}>
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={j}>{part.slice(2, -2)}</strong>;
              }
              return part;
            })}
          </p>
        );
      } else {
        elements.push(
          <p key={i} className={styles.contentP}>{line}</p>
        );
      }
    }
    i++;
  }

  return elements;
}

export const ArtikelDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <PublicLayout>
        <div className={styles.notFound}>
          <div className="container">
            <span className={styles.notFoundIcon}>📄</span>
            <h1>Artikel tidak ditemukan</h1>
            <p>Artikel yang kamu cari tidak ada atau telah dipindahkan.</p>
            <Button onClick={() => navigate('/artikel')}>
              <ArrowLeft size={16} /> Kembali ke Artikel
            </Button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const related = articles
    .filter(a => a.id !== article.id && (a.category === article.category || a.tags.some(t => article.tags.includes(t))))
    .slice(0, 3);

  // fallback related if same category is empty
  const relatedArticles = related.length >= 3
    ? related
    : [
        ...related,
        ...articles.filter(a => a.id !== article.id && !related.find(r => r.id === a.id)).slice(0, 3 - related.length),
      ];

  const variant = categoryVariant[article.category] ?? categoryVariant.default;
  const hasFullContent = article.content.length > 100 && !article.content.startsWith('Konten lengkap');

  return (
    <PublicLayout>
      {/* ── BREADCRUMB ──────────────────────────────────────── */}
      <div className={styles.breadcrumbBar}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/" className={styles.breadLink}>Beranda</Link>
            <ChevronRight size={14} className={styles.breadSep} />
            <Link to="/artikel" className={styles.breadLink}>Artikel</Link>
            <ChevronRight size={14} className={styles.breadSep} />
            <span className={styles.breadCurrent}>{article.title}</span>
          </nav>
        </div>
      </div>

      {/* ── ARTICLE HEADER ──────────────────────────────────── */}
      <header className={styles.articleHeader}>
        <div className={`container ${styles.headerContent}`}>
          <Badge variant={variant}>{article.category}</Badge>
          <h1 className={styles.articleTitle}>{article.title}</h1>
          <p className={styles.articleExcerpt}>{article.excerpt}</p>

          <div className={styles.articleMeta}>
            <span className={styles.metaItem}>
              <User size={15} />
              {article.author}
            </span>
            <span className={styles.metaDot}>·</span>
            <span className={styles.metaItem}>
              <Calendar size={15} />
              {formatDate(article.publishedAt)}
            </span>
            <span className={styles.metaDot}>·</span>
            <span className={styles.metaItem}>
              <Clock size={15} />
              {article.readTime} menit baca
            </span>
          </div>
        </div>
      </header>

      {/* ── FEATURED IMAGE ──────────────────────────────────── */}
      <div className={styles.featuredImage}>
        <div className="container">
          <img
            src={article.image}
            alt={article.title}
            className={styles.featuredImg}
            loading="eager"
          />
        </div>
      </div>

      {/* ── ARTICLE CONTENT ─────────────────────────────────── */}
      <article className={styles.articleBody}>
        <div className={`container ${styles.articleLayout}`}>
          <div className={styles.contentArea}>
            {hasFullContent ? (
              <div className={styles.content}>
                {renderContent(article.content)}
              </div>
            ) : (
              <div className={styles.content}>
                <p className={styles.contentP}>{article.excerpt}</p>
                <p className={styles.contentP}>
                  Artikel ini membahas tentang {article.title.toLowerCase()}, 
                  yang merupakan topik penting bagi pengguna TUNTAS. 
                  Dengan memahami hal ini, kamu dapat mengoptimalkan penggunaan platform dan mendapatkan hasil yang lebih baik.
                </p>
                <h2 className={styles.contentH2}>Poin Utama</h2>
                <ul className={styles.contentList}>
                  {article.tags.map(tag => (
                    <li key={tag}>Memahami {tag} dalam konteks platform TUNTAS</li>
                  ))}
                </ul>
                <hr className={styles.contentDivider} />
                <p className={styles.contentP}>
                  Untuk informasi lebih lanjut, kamu bisa menjelajahi fitur-fitur TUNTAS secara langsung atau membaca artikel lainnya.
                </p>
              </div>
            )}

            {/* Tags */}
            <div className={styles.tagSection}>
              <span className={styles.tagLabel}>
                <Tag size={14} /> Tag:
              </span>
              <div className={styles.tags}>
                {article.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className={styles.ctaBox}>
              <div className={styles.ctaText}>
                <h3>Punya kemampuan yang bisa membantu orang lain?</h3>
                <p>Tawarkan jasamu di TUNTAS dan mulai dapatkan penghasilan dari kemampuan yang kamu miliki.</p>
              </div>
              <div className={styles.ctaBtns}>
                <Button size="lg" onClick={() => navigate('/jasa')}>
                  Mulai Cari Jasa
                </Button>
                <Button size="lg" variant="secondary" onClick={() => navigate('/jasa/buat')}>
                  Posting Kebutuhan
                </Button>
              </div>
            </div>

            {/* Back link */}
            <div className={styles.backLink}>
              <Button variant="outline" leftIcon={<ArrowLeft size={16} />} onClick={() => navigate('/artikel')}>
                Kembali ke Artikel
              </Button>
            </div>
          </div>

          {/* ── SIDEBAR ─────────────────────────────────────── */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h4 className={styles.sidebarTitle}>Tentang Penulis</h4>
              <div className={styles.authorInfo}>
                <img
                  src="https://api.dicebear.com/7.x/initials/svg?seed=TUNTAS&backgroundColor=6366f1"
                  alt="TUNTAS Editorial"
                  className={styles.authorAvatar}
                />
                <div>
                  <p className={styles.authorName}>{article.author}</p>
                  <p className={styles.authorDesc}>Tim editorial TUNTAS yang menghadirkan konten informatif dan panduan platform.</p>
                </div>
              </div>
            </div>

            <div className={styles.sidebarCard}>
              <h4 className={styles.sidebarTitle}>Detail Artikel</h4>
              <ul className={styles.sidebarList}>
                <li>
                  <span className={styles.sidebarLabel}>Kategori</span>
                  <Badge variant={variant} size="sm">{article.category}</Badge>
                </li>
                <li>
                  <span className={styles.sidebarLabel}>Diterbitkan</span>
                  <span className={styles.sidebarValue}>{formatDate(article.publishedAt)}</span>
                </li>
                <li>
                  <span className={styles.sidebarLabel}>Waktu baca</span>
                  <span className={styles.sidebarValue}>{article.readTime} menit</span>
                </li>
              </ul>
            </div>

            <div className={styles.sidebarCard}>
              <h4 className={styles.sidebarTitle}>Jelajahi TUNTAS</h4>
              <div className={styles.sidebarLinks}>
                <Link to="/jasa" className={styles.sidebarLink}>🔧 Cari Jasa</Link>
                <Link to="/pasar" className={styles.sidebarLink}>🛒 Marketplace</Link>
                <Link to="/cara-kerja" className={styles.sidebarLink}>📖 Cara Kerja</Link>
                <Link to="/keamanan" className={styles.sidebarLink}>🔒 Keamanan</Link>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* ── RELATED ARTICLES ────────────────────────────────── */}
      {relatedArticles.length > 0 && (
        <section className={styles.relatedSection}>
          <div className="container">
            <div className={styles.relatedHeader}>
              <h2 className={styles.relatedTitle}>Artikel Lainnya</h2>
              <Link to="/artikel" className={styles.relatedAll}>
                Lihat Semua Artikel →
              </Link>
            </div>
            <div className={styles.relatedGrid}>
              {relatedArticles.map(a => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </PublicLayout>
  );
};
