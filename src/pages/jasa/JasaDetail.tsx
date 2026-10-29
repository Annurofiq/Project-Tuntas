import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Calendar, CheckCircle, AlertCircle, Share2, Flag, ArrowLeft, Send } from 'lucide-react';
import { PublicLayout } from '../../layouts/PublicLayout';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { formatRupiah, formatDate, getJobTypeLabel, formatRelativeTime } from '../../utils';
import { gigs, proposals } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import styles from './JasaDetail.module.css';

export const JasaDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useApp();
  
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalPrice, setProposalPrice] = useState('');
  const [proposalTime, setProposalTime] = useState('');
  const [proposalMsg, setProposalMsg] = useState('');

  const gig = gigs.find(g => g.id === id);
  const gigProposals = proposals.filter(p => p.gigId === id);
  const hasApplied = isAuthenticated && gigProposals.some(p => p.providerId === user?.id);
  const isOwner = isAuthenticated && gig?.requesterId === user?.id;

  if (!gig) {
    return (
      <PublicLayout>
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <h2>Pekerjaan tidak ditemukan</h2>
          <Button onClick={() => navigate('/jasa')} className="mt-4">Kembali ke Jasa</Button>
        </div>
      </PublicLayout>
    );
  }

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/masuk');
      return;
    }
    
    // Simulate submit
    addToast({
      type: 'success',
      title: 'Penawaran Berhasil Dikirim',
      message: 'Requester akan mereview penawaran Anda.'
    });
    setShowProposalForm(false);
  };

  return (
    <PublicLayout>
      <div className={styles.page}>
        <div className="container">
          <button className={styles.backBtn} onClick={() => navigate('/jasa')}>
            <ArrowLeft size={20} /> Kembali ke pencarian
          </button>

          <div className={styles.grid}>
            {/* ── MAIN CONTENT ────────────────────────────────────── */}
            <div className={styles.main}>
              <div className={styles.header}>
                <div className={styles.metaRow}>
                  <Badge variant="primary">{gig.category}</Badge>
                  <span className={styles.timeAgo}>Diposting {formatRelativeTime(gig.createdAt)}</span>
                </div>
                <h1 className={styles.title}>{gig.title}</h1>
                <div className={styles.locationRow}>
                  <span className={styles.locItem}>
                    <MapPin size={16} /> {getJobTypeLabel(gig.jobType)}
                    {gig.jobType === 'on-site' && ` • ${gig.city}`}
                  </span>
                  <span className={styles.locItem}>
                    <Calendar size={16} /> Deadline: {formatDate(gig.deadline)}
                  </span>
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Deskripsi Kebutuhan</h3>
                <div className={styles.desc}>
                  {gig.description.split('\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Keahlian yang Dibutuhkan</h3>
                <div className={styles.skills}>
                  {gig.requiredSkills.map(skill => (
                    <span key={skill} className={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Hasil yang Diharapkan (Deliverables)</h3>
                <ul className={styles.list}>
                  {gig.deliverables.map((item, i) => (
                    <li key={i}><CheckCircle size={16} className={styles.checkIcon} /> {item}</li>
                  ))}
                </ul>
              </div>

              {/* Proposals List (If Owner) */}
              {isOwner && (
                <div className={styles.proposalsSection}>
                  <div className={styles.proposalsHeader}>
                    <h3 className={styles.sectionTitle}>Penawaran Masuk ({gigProposals.length})</h3>
                  </div>
                  
                  {gigProposals.length > 0 ? (
                    <div className={styles.proposalList}>
                      {gigProposals.map(prop => (
                        <Card key={prop.id} className={styles.proposalCard}>
                          <div className={styles.propHeader}>
                            <div className={styles.propProvider}>
                              <Avatar src={prop.provider.avatar} name={prop.provider.name} />
                              <div>
                                <Link to={`/profil/${prop.provider.id}`} className={styles.propName}>
                                  {prop.provider.name}
                                </Link>
                                <div className={styles.propRating}>
                                  ⭐ {prop.provider.rating} ({prop.provider.totalReviews} ulasan)
                                </div>
                              </div>
                            </div>
                            <div className={styles.propPriceBox}>
                              <div className={styles.propPrice}>{formatRupiah(prop.price)}</div>
                              <div className={styles.propTime}>{prop.estimasi}</div>
                            </div>
                          </div>
                          <div className={styles.propMessage}>
                            <p><strong>Pesan:</strong> {prop.message}</p>
                            <p><strong>Pengalaman:</strong> {prop.experience}</p>
                          </div>
                          <div className={styles.propActions}>
                            <Button size="sm">Chat & Nego</Button>
                            <Button size="sm" variant="success">Terima Penawaran</Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.emptyState}>
                      <p>Belum ada penawaran yang masuk.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── SIDEBAR ─────────────────────────────────────────── */}
            <aside className={styles.sidebar}>
              <Card className={styles.actionCard}>
                <div className={styles.budgetWrap}>
                  <span className={styles.budgetLabel}>Budget ({gig.budgetType})</span>
                  <span className={styles.budgetAmount}>
                    {gig.budgetType === 'fixed' 
                      ? formatRupiah(gig.budgetMax)
                      : `${formatRupiah(gig.budgetMin)} - ${formatRupiah(gig.budgetMax)}`
                    }
                  </span>
                </div>

                {!isOwner && (
                  <div className={styles.applyWrap}>
                    {hasApplied ? (
                      <div className={styles.appliedState}>
                        <CheckCircle size={20} className={styles.checkIcon} />
                        Anda sudah mengajukan penawaran
                      </div>
                    ) : showProposalForm ? (
                      <form className={styles.proposalForm} onSubmit={handleApply}>
                        <h4>Ajukan Penawaran</h4>
                        <div className={styles.formGroup}>
                          <label>Harga Penawaran (Rp)</label>
                          <input 
                            type="number" 
                            required 
                            className={styles.input}
                            value={proposalPrice}
                            onChange={(e) => setProposalPrice(e.target.value)}
                            placeholder="Contoh: 200000"
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label>Estimasi Waktu</label>
                          <input 
                            type="text" 
                            required 
                            className={styles.input}
                            value={proposalTime}
                            onChange={(e) => setProposalTime(e.target.value)}
                            placeholder="Contoh: 2 hari"
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label>Pesan untuk Requester</label>
                          <textarea 
                            required 
                            className={styles.textarea}
                            value={proposalMsg}
                            onChange={(e) => setProposalMsg(e.target.value)}
                            placeholder="Jelaskan mengapa Anda cocok untuk pekerjaan ini..."
                          />
                        </div>
                        <div className={styles.formActions}>
                          <Button type="button" variant="ghost" onClick={() => setShowProposalForm(false)}>Batal</Button>
                          <Button type="submit" leftIcon={<Send size={16} />}>Kirim</Button>
                        </div>
                      </form>
                    ) : (
                      <Button fullWidth size="lg" onClick={() => setShowProposalForm(true)}>
                        Ajukan Penawaran
                      </Button>
                    )}
                  </div>
                )}
                
                <div className={styles.cardActions}>
                  <button className={styles.iconBtn}><Share2 size={18} /> Bagikan</button>
                  <button className={styles.iconBtn}><Flag size={18} /> Laporkan</button>
                </div>
              </Card>

              <Card className={styles.requesterCard}>
                <h3 className={styles.sidebarTitle}>Tentang Requester</h3>
                <div className={styles.reqProfile}>
                  <Avatar src={gig.requester.avatar} name={gig.requester.name} size="lg" isVerified={gig.requester.isVerified} />
                  <div className={styles.reqInfo}>
                    <div className={styles.reqName}>{gig.requester.name}</div>
                    <div className={styles.reqLocation}><MapPin size={12} /> {gig.requester.city}</div>
                  </div>
                </div>
                
                <div className={styles.reqStats}>
                  <div className={styles.reqStat}>
                    <span className={styles.statVal}>⭐ {gig.requester.rating}</span>
                    <span className={styles.statLabel}>{gig.requester.totalReviews} Ulasan</span>
                  </div>
                  <div className={styles.reqStat}>
                    <span className={styles.statVal}>{gig.requester.completedJobs}</span>
                    <span className={styles.statLabel}>Pekerjaan Selesai</span>
                  </div>
                </div>
                
                <div className={styles.reqMember}>
                  Anggota sejak {gig.requester.memberSince.split('-')[0]}
                </div>
              </Card>

              {gig.evidenceRequired && (
                <div className={styles.securityNote}>
                  <AlertCircle size={16} />
                  <div>
                    <strong>Pekerjaan ini butuh bukti (evidence)</strong>
                    <p>Requester meminta bukti foto/dokumen saat pekerjaan selesai.</p>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
