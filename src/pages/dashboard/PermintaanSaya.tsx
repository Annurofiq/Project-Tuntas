import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Eye, Edit2, Trash2, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { formatRupiah, truncate } from '../../utils';
import { gigs } from '../../data/mockData';
import styles from './Dashboard.module.css';

export const PermintaanSaya: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'semua' | 'open' | 'in_progress' | 'completed'>('semua');

  // Filter gigs where the current user is the requester
  const myRequests = gigs.filter(g => g.requesterId === user?.id);
  
  const filteredRequests = myRequests.filter(g => {
    if (activeTab === 'semua') return true;
    return g.status === activeTab;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Permintaan Saya</h1>
          <p className={styles.desc}>Kelola pekerjaan jasa yang Anda posting.</p>
        </div>
        <Button onClick={() => navigate('/jasa/buat')} leftIcon={<Plus size={18} />}>
          Posting Baru
        </Button>
      </div>

      <div className={styles.filtersRow}>
        <div className={styles.tabs}>
          <button 
            className={[styles.tabBtn, activeTab === 'semua' ? styles.tabActive : ''].join(' ')}
            onClick={() => setActiveTab('semua')}
          >
            Semua
          </button>
          <button 
            className={[styles.tabBtn, activeTab === 'open' ? styles.tabActive : ''].join(' ')}
            onClick={() => setActiveTab('open')}
          >
            Terbuka ({myRequests.filter(g => g.status === 'open').length})
          </button>
          <button 
            className={[styles.tabBtn, activeTab === 'in_progress' ? styles.tabActive : ''].join(' ')}
            onClick={() => setActiveTab('in_progress')}
          >
            Berjalan ({myRequests.filter(g => g.status === 'in_progress').length})
          </button>
          <button 
            className={[styles.tabBtn, activeTab === 'completed' ? styles.tabActive : ''].join(' ')}
            onClick={() => setActiveTab('completed')}
          >
            Selesai ({myRequests.filter(g => g.status === 'completed').length})
          </button>
        </div>
        
        <div className={styles.searchFilter}>
          <div className={styles.searchInputWrap}>
            <Search size={16} className={styles.searchIcon} />
            <input type="text" placeholder="Cari..." className={styles.searchInput} />
          </div>
          <Button variant="outline" size="md"><Filter size={16} /></Button>
        </div>
      </div>

      <div className={styles.requestList}>
        {filteredRequests.length > 0 ? (
          filteredRequests.map(gig => (
            <Card key={gig.id} className={styles.requestCard}>
              <div className={styles.requestMain}>
                <div className={styles.requestTop}>
                  <Badge variant="primary">{gig.category}</Badge>
                  {gig.status === 'open' && <Badge variant="warning">Terbuka</Badge>}
                  {gig.status === 'in_progress' && <Badge variant="primary"><Clock size={12}/> Proses</Badge>}
                  {gig.status === 'completed' && <Badge variant="success"><CheckCircle size={12}/> Selesai</Badge>}
                </div>
                
                <h3 className={styles.requestTitle}>{gig.title}</h3>
                <p className={styles.requestDesc}>{truncate(gig.description, 100)}</p>
                
                <div className={styles.requestMeta}>
                  <span className={styles.metaItem}>
                    <strong>Budget:</strong> {gig.budgetType === 'fixed' ? formatRupiah(gig.budgetMax) : `${formatRupiah(gig.budgetMin)} - ${formatRupiah(gig.budgetMax)}`}
                  </span>
                  <span className={styles.metaItem}>
                    <strong>Penawaran:</strong> {gig.proposalCount}
                  </span>
                  <span className={styles.metaItem}>
                    <strong>Diposting:</strong> {gig.createdAt.split('T')[0]}
                  </span>
                </div>
              </div>

              <div className={styles.requestActions}>
                <Button size="sm" onClick={() => navigate(`/jasa/${gig.id}`)} leftIcon={<Eye size={16} />}>Lihat Detail</Button>
                {gig.status === 'open' && (
                  <>
                    <Button size="sm" variant="outline" leftIcon={<Edit2 size={16} />}>Edit</Button>
                    <Button size="sm" variant="danger" leftIcon={<Trash2 size={16} />}>Tutup</Button>
                  </>
                )}
              </div>
            </Card>
          ))
        ) : (
          <div className={styles.emptyState}>
            <h3>Tidak ada permintaan</h3>
            <p>Anda belum memposting permintaan pekerjaan atau tidak ada yang cocok dengan filter.</p>
            <Button onClick={() => navigate('/jasa/buat')} className="mt-4">Posting Sekarang</Button>
          </div>
        )}
      </div>
    </div>
  );
};
