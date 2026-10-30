import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Filter, MessageCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { formatRupiah, truncate } from '../../utils';
import { proposals, gigs } from '../../data/mockData';
import styles from './Dashboard.module.css';

export const PenawaranSaya: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'semua' | 'pending' | 'accepted' | 'rejected'>('semua');

  // Filter proposals where the current user is the provider
  const myProposals = proposals.filter(p => p.providerId === user?.id).map(prop => {
    // Attach gig info for display
    const gig = gigs.find(g => g.id === prop.gigId);
    return { ...prop, gig };
  });
  
  const filteredProposals = myProposals.filter(p => {
    if (activeTab === 'semua') return true;
    return p.status === activeTab;
  });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Penawaran Saya</h1>
          <p className={styles.desc}>Pantau status penawaran yang telah Anda ajukan.</p>
        </div>
        <Button onClick={() => navigate('/jasa')} size="md">Cari Pekerjaan</Button>
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
            className={[styles.tabBtn, activeTab === 'pending' ? styles.tabActive : ''].join(' ')}
            onClick={() => setActiveTab('pending')}
          >
            Menunggu ({myProposals.filter(p => p.status === 'pending').length})
          </button>
          <button 
            className={[styles.tabBtn, activeTab === 'accepted' ? styles.tabActive : ''].join(' ')}
            onClick={() => setActiveTab('accepted')}
          >
            Diterima ({myProposals.filter(p => p.status === 'accepted').length})
          </button>
          <button 
            className={[styles.tabBtn, activeTab === 'rejected' ? styles.tabActive : ''].join(' ')}
            onClick={() => setActiveTab('rejected')}
          >
            Ditolak ({myProposals.filter(p => p.status === 'rejected').length})
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
        {filteredProposals.length > 0 ? (
          filteredProposals.map(prop => (
            <Card key={prop.id} className={styles.requestCard}>
              <div className={styles.requestMain}>
                <div className={styles.requestTop}>
                  <Badge variant="neutral">Tanggal Pengajuan: {prop.createdAt.split('T')[0]}</Badge>
                  {prop.status === 'pending' && <Badge variant="warning"><Clock size={12}/> Menunggu</Badge>}
                  {prop.status === 'accepted' && <Badge variant="success"><CheckCircle size={12}/> Diterima</Badge>}
                  {prop.status === 'rejected' && <Badge variant="danger"><XCircle size={12}/> Ditolak</Badge>}
                </div>
                
                <h3 className={styles.requestTitle}>
                  <Link to={`/jasa/${prop.gigId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {prop.gig?.title || 'Pekerjaan tidak ditemukan'}
                  </Link>
                </h3>
                
                <div className={styles.requestMeta} style={{ marginTop: '12px' }}>
                  <span className={styles.metaItem}>
                    <strong>Harga Penawaran:</strong> <span style={{ color: 'var(--color-primary-600)', fontWeight: 'bold' }}>{formatRupiah(prop.price)}</span>
                  </span>
                  <span className={styles.metaItem}>
                    <strong>Estimasi:</strong> {prop.estimasi}
                  </span>
                </div>

                <div className={styles.desc} style={{ marginTop: '12px', fontSize: '13px', padding: '12px', background: 'var(--color-neutral-50)', borderRadius: '8px' }}>
                  <strong>Pesan Anda:</strong><br/>
                  {truncate(prop.message, 150)}
                </div>

                {prop.gig && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Requester:</span>
                    <Avatar src={prop.gig.requester.avatar} name={prop.gig.requester.name} size="xs" />
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>{prop.gig.requester.name}</span>
                  </div>
                )}
              </div>

              <div className={styles.requestActions}>
                {prop.status === 'accepted' ? (
                  <>
                    <Button size="sm" onClick={() => navigate('/dashboard/pekerjaan')}>Lihat Pekerjaan</Button>
                    <Button size="sm" variant="outline" leftIcon={<MessageCircle size={16} />}>Chat</Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="outline" onClick={() => navigate(`/jasa/${prop.gigId}`)}>Detail Pekerjaan</Button>
                    {prop.status === 'pending' && (
                      <Button size="sm" variant="ghost" style={{ color: 'var(--color-danger-600)' }}>Batalkan Penawaran</Button>
                    )}
                  </>
                )}
              </div>
            </Card>
          ))
        ) : (
          <div className={styles.emptyState}>
            <h3>Tidak ada penawaran</h3>
            <p>Anda belum mengajukan penawaran pekerjaan apa pun.</p>
            <Button onClick={() => navigate('/jasa')} className="mt-4">Cari Pekerjaan Sekarang</Button>
          </div>
        )}
      </div>
    </div>
  );
};
