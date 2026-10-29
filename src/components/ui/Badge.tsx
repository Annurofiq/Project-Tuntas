import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' | 'accent' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  dot = false,
  className = '',
}) => {
  return (
    <span
      className={[styles.badge, styles[`badge-${variant}`], styles[`badge-${size}`], className]
        .filter(Boolean)
        .join(' ')}
    >
      {dot && <span className={styles.dot} />}
      {children}
    </span>
  );
};
