import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, 
  Briefcase, 
  FileText, 
  Package, 
  ArrowUpRight, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatRupiah } from '../../utils';
import { orders, gigs } from '../../data/mockData';
import styles from './Dashboard.module.css';

export const DashboardOverview: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data for overview
  const activeJobs = orders.filter(o => o.providerId === user?.id && o.status === 'IN_PROGRESS').length;
  const pendingRequests = gigs.filter(g => g.requesterId === user?.id && g.status === 'open').length;
  
  const recentOrders = orders.filter(o => o.requesterId === user?.id || o.providerId === user?.id).slice(0, 3);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Halo, {user?.name}! 👋</h1>
          <p className={styles.desc}>Berikut adalah ringkasan aktivitas akun Anda hari ini.</p>
        </div>
        <div className={styles.headerActions}>
          <Button onClick={() => navigate('/jasa/buat')} size="sm">Posting Pekerjaan</Button>
          <Button variant="outline" onClick={() => navigate('/pasar/jual')} size="sm">Jual Barang</Button>
        </div>
      </div>

      {/* ── STATS GRID ──────────────────────────────────────── */}
      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <div className={styles.statIconWrap} style={{ background: 'var(--color-success-50)', color: 'var(--color-success-600)' }}>
            <Wallet size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Saldo Dompet</p>
            <h3 className={styles.statValue}>{formatRupiah(user?.balance || 0)}</h3>
            <p className={styles.statTrend} style={{ color: 'var(--color-success-600)' }}>
              <ArrowUpRight size={14} /> +Rp 500.000 minggu ini
            </p>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIconWrap} style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary-600)' }}>
            <Briefcase size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Pekerjaan Aktif</p>
            <h3 className={styles.statValue}>{activeJobs}</h3>
            <p className={styles.statTrend} style={{ color: 'var(--color-text-secondary)' }}>
              Sebagai penyedia jasa
            </p>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIconWrap} style={{ background: 'var(--color-warning-50)', color: 'var(--color-warning-600)' }}>
            <FileText size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Permintaan Terbuka</p>
            <h3 className={styles.statValue}>{pendingRequests}</h3>
            <p className={styles.statTrend} style={{ color: 'var(--color-text-secondary)' }}>
              Menunggu penawaran
            </p>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIconWrap} style={{ background: 'var(--color-accent-50)', color: 'var(--color-accent-600)' }}>
            <Package size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Pesanan Pasar</p>
            <h3 className={styles.statValue}>1</h3>
            <p className={styles.statTrend} style={{ color: 'var(--color-text-secondary)' }}>
              Dalam pengiriman
            </p>
          </div>
        </Card>
      </div>

      <div className={styles.grid}>
        {/* ── RECENT ACTIVITY ─────────────────────────────────── */}
        <div className={styles.mainCol}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Aktivitas Terbaru</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/transaksi')}>Lihat Semua</Button>
          </div>
          
          <Card padding="none" className={styles.tableCard}>
            <div className={styles.tableResponsive}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Detail Pesanan</th>
                    <th>Tipe</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                    <th>Nominal</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td>
                        <div className={styles.orderInfo}>
                          <strong>{order.id}</strong>
                          <span>Untuk: Pekerjaan Jasa</span>
                        </div>
                      </td>
                      <td>
                        <Badge variant={order.requesterId === user?.id ? 'warning' : 'success'}>
                          {order.requesterId === user?.id ? 'Pembelian' : 'Pendapatan'}
                        </Badge>
                      </td>
                      <td>{order.createdAt.split('T')[0]}</td>
                      <td>
                        {order.status === 'IN_PROGRESS' && <Badge variant="primary"><Clock size={12}/> Proses</Badge>}
                        {order.status === 'COMPLETED' && <Badge variant="success"><CheckCircle size={12}/> Selesai</Badge>}
                        {order.status === 'DISPUTED' && <Badge variant="danger"><AlertCircle size={12}/> Sengketa</Badge>}
                      </td>
                      <td className={styles.amountCol}>
                        {formatRupiah(order.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* ── SIDEBAR ALERTS ──────────────────────────────────── */}
        <div className={styles.sideCol}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Tindakan Diperlukan</h2>
          </div>
          
          <div className={styles.alertList}>
            <Card className={styles.alertItem}>
              <div className={styles.alertIcon} style={{ background: 'var(--color-warning-100)', color: 'var(--color-warning-700)' }}>
                <Clock size={20} />
              </div>
              <div className={styles.alertContent}>
                <h4>Konfirmasi Selesai</h4>
                <p>Pekerjaan "Pembuatan Website Profile" telah ditandai selesai oleh penyedia.</p>
                <Button size="xs" className="mt-2">Review Hasil</Button>
              </div>
            </Card>

            <Card className={styles.alertItem}>
              <div className={styles.alertIcon} style={{ background: 'var(--color-primary-100)', color: 'var(--color-primary-700)' }}>
                <FileText size={20} />
              </div>
              <div className={styles.alertContent}>
                <h4>3 Penawaran Baru</h4>
                <p>Ada penawaran baru untuk permintaan "Servis AC Standing".</p>
                <Button size="xs" variant="outline" className="mt-2">Lihat Penawaran</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
