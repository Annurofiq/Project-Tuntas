import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  padding = 'md',
  onClick,
}) => {
  return (
    <div
      className={[
        styles.card,
        hoverable ? styles.hoverable : '',
        styles[`padding-${padding}`],
        onClick ? styles.clickable : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  );
};
