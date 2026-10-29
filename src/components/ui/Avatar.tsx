import React from 'react';
import styles from './Avatar.module.css';
import { getInitials } from '../../utils';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  isOnline?: boolean;
  isVerified?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  isOnline,
  isVerified,
  className = '',
}) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className={[styles.avatarWrapper, styles[`size-${size}`], className].filter(Boolean).join(' ')}>
      {src && !imgError ? (
        <img
          src={src}
          alt={name}
          className={styles.avatar}
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        <div className={styles.fallback} aria-label={name}>
          {getInitials(name)}
        </div>
      )}
      {isOnline !== undefined && (
        <span className={[styles.indicator, isOnline ? styles.online : styles.offline].join(' ')} />
      )}
      {isVerified && (
        <span className={styles.verifiedBadge} title="Terverifikasi">
          ✓
        </span>
      )}
    </div>
  );
};
