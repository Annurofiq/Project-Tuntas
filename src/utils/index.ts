// ============================================================
// TUNTAS — Utility Functions
// ============================================================

/**
 * Format number to Indonesian Rupiah
 */
export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format price range
 */
export const formatPriceRange = (min: number, max: number, type: string): string => {
  if (type === 'fixed') return formatRupiah(min);
  if (type === 'negotiable') return `Mulai ${formatRupiah(min)}`;
  if (min === max) return formatRupiah(min);
  return `${formatRupiah(min)} – ${formatRupiah(max)}`;
};

/**
 * Format relative time (Indonesian)
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffSecs < 60) return 'baru saja';
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hari lalu`;
  if (diffWeeks < 4) return `${diffWeeks} minggu lalu`;
  if (diffMonths < 12) return `${diffMonths} bulan lalu`;
  return `${Math.floor(diffMonths / 12)} tahun lalu`;
};

/**
 * Format date to Indonesian locale
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Format short date
 */
export const formatDateShort = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Format time
 */
export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Truncate text
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Get order status label (Indonesian)
 */
export const getOrderStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    WAITING_PAYMENT: 'Menunggu Pembayaran',
    FUNDED: 'Dibayar',
    IN_PROGRESS: 'Sedang Dikerjakan',
    SUBMITTED: 'Menunggu Review',
    REVISION_REQUESTED: 'Revisi Diminta',
    COMPLETED: 'Selesai',
    RELEASED: 'Dana Diproses',
    DISPUTED: 'Dalam Sengketa',
    CANCELLED: 'Dibatalkan',
  };
  return labels[status] || status;
};

/**
 * Get order status color class
 */
export const getOrderStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    WAITING_PAYMENT: 'warning',
    FUNDED: 'primary',
    IN_PROGRESS: 'primary',
    SUBMITTED: 'accent',
    REVISION_REQUESTED: 'warning',
    COMPLETED: 'success',
    RELEASED: 'success',
    DISPUTED: 'danger',
    CANCELLED: 'neutral',
  };
  return colors[status] || 'neutral';
};

/**
 * Get purchase status label
 */
export const getPurchaseStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    WAITING_PAYMENT: 'Menunggu Pembayaran',
    PAID: 'Dibayar',
    SHIPPED: 'Dikirim',
    RECEIVED: 'Diterima',
    COMPLETED: 'Selesai',
    CANCELLED: 'Dibatalkan',
    DISPUTED: 'Dalam Sengketa',
  };
  return labels[status] || status;
};

/**
 * Get milestone status label
 */
export const getMilestoneStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending: 'Belum Dimulai',
    in_progress: 'Sedang Dikerjakan',
    submitted: 'Menunggu Persetujuan',
    approved: 'Disetujui',
    revision: 'Perlu Revisi',
  };
  return labels[status] || status;
};

/**
 * Get proposal status label
 */
export const getProposalStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending: 'Menunggu',
    accepted: 'Diterima',
    rejected: 'Ditolak',
    withdrawn: 'Ditarik',
  };
  return labels[status] || status;
};

/**
 * Get job type label
 */
export const getJobTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    online: 'Online',
    'on-site': 'On-site',
    both: 'Online/On-site',
  };
  return labels[type] || type;
};

/**
 * Get condition label
 */
export const getConditionLabel = (condition: string): string => {
  const labels: Record<string, string> = {
    new: 'Baru',
    used: 'Bekas',
  };
  return labels[condition] || condition;
};

/**
 * Render star rating
 */
export const renderStars = (rating: number): string => {
  return '⭐'.repeat(Math.floor(rating));
};

/**
 * Get avatar fallback initials
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

/**
 * Calculate platform fee
 */
export const calculatePlatformFee = (amount: number): number => {
  return Math.round(amount * 0.05); // 5% fee
};

/**
 * Generate random ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
