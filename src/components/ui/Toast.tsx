import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import styles from './Toast.module.css';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className={styles.container} role="region" aria-label="Notifikasi">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={[styles.toast, styles[`toast-${toast.type}`]].join(' ')}
          role="alert"
        >
          <span className={styles.icon}>
            {toast.type === 'success' && <CheckCircle size={18} />}
            {toast.type === 'error' && <XCircle size={18} />}
            {toast.type === 'warning' && <AlertTriangle size={18} />}
            {toast.type === 'info' && <Info size={18} />}
          </span>
          <div className={styles.content}>
            <p className={styles.title}>{toast.title}</p>
            {toast.message && <p className={styles.message}>{toast.message}</p>}
          </div>
          <button
            className={styles.close}
            onClick={() => removeToast(toast.id)}
            aria-label="Tutup notifikasi"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
