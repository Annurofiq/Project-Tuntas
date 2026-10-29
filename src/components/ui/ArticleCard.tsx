import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ArrowRight } from 'lucide-react';
import type { Article } from '../../types';
import { Badge } from './Badge';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

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

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured = false }) => {
  const variant = categoryVariant[article.category] ?? categoryVariant.default;

  return (
    <Link
      to={`/artikel/${article.slug}`}
      className={[styles.card, featured ? styles.featured : ''].filter(Boolean).join(' ')}
      aria-label={`Baca artikel: ${article.title}`}
    >
      <div className={styles.imageWrap}>
        <img
          src={article.image}
          alt={article.title}
          className={styles.image}
          loading="lazy"
        />
        <span className={styles.categoryOverlay}>
          <Badge variant={variant}>{article.category}</Badge>
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.excerpt}>{article.excerpt}</p>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <User size={13} />
            {article.author}
          </span>
          <span className={styles.metaDot}>·</span>
          <span className={styles.metaItem}>
            <Clock size={13} />
            {article.readTime} menit baca
          </span>
          <span className={styles.metaDot}>·</span>
          <span className={styles.metaDate}>{formatDate(article.publishedAt)}</span>
        </div>

        <span className={styles.cta}>
          Baca Selengkapnya <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
};
