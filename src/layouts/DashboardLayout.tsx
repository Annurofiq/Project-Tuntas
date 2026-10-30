import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  MessageCircle,
  Bell,
  Wallet,
  CreditCard,
  User,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Package,
  ClipboardList,
  LogOut,
  Menu,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '../components/ui/Avatar';
import { notifications } from '../data/mockData';
import styles from './DashboardLayout.module.css';

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const unreadNotifications = notifications.filter((n) => n.userId === user?.id && !n.isRead).length;

  const navItems: NavItem[] = [
    { to: '/dashboard', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { to: '/dashboard/permintaan', label: 'Permintaan Saya', icon: <FileText size={18} /> },
    { to: '/dashboard/penawaran', label: 'Penawaran Saya', icon: <ClipboardList size={18} /> },
    { to: '/dashboard/pekerjaan', label: 'Pekerjaan', icon: <Briefcase size={18} /> },
    { to: '/dashboard/pesanan', label: 'Pesanan', icon: <Package size={18} /> },
    { to: '/dashboard/pesan', label: 'Pesan', icon: <MessageCircle size={18} />, badge: 2 },
    { to: '/dashboard/notifikasi', label: 'Notifikasi', icon: <Bell size={18} />, badge: unreadNotifications },
    { to: '/dashboard/dompet', label: 'Dompet', icon: <Wallet size={18} /> },
    { to: '/dashboard/transaksi', label: 'Transaksi', icon: <CreditCard size={18} /> },
  ];

  const bottomItems: NavItem[] = [
    { to: '/dashboard/profil', label: 'Profil', icon: <User size={18} /> },
    { to: '/dashboard/pengaturan', label: 'Pengaturan', icon: <Settings size={18} /> },
    { to: '/bantuan', label: 'Bantuan', icon: <HelpCircle size={18} /> },
  ];

  const isActive = (to: string) => {
    if (to === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(to);
  };

  const Sidebar = () => (
    <aside className={[styles.sidebar, collapsed ? styles.collapsed : '', mobileSidebarOpen ? styles.mobileOpen : ''].join(' ')}>
      {/* Header */}
      <div className={styles.sidebarHeader}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMark}>T</span>
          {!collapsed && <span className={styles.logoText}>TUNTAS</span>}
        </Link>
        <button
          className={styles.collapseBtn}
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Perluas sidebar' : 'Perkecil sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* User Card */}
      <div className={styles.userCard}>
        <Avatar src={user?.avatar} name={user?.name || ''} size="sm" isOnline={user?.isOnline} />
        {!collapsed && (
          <div className={styles.userInfo}>
            <p className={styles.userName}>{user?.name}</p>
            <p className={styles.userRole}>
              ⭐ {user?.rating || '-'} · {user?.totalTransactions} transaksi
            </p>
          </div>
        )}
      </div>

      {/* Main Nav */}
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={[styles.navItem, isActive(item.to) ? styles.navActive : ''].join(' ')}
            title={collapsed ? item.label : undefined}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
            {!collapsed && item.badge && item.badge > 0 ? (
              <span className={styles.navBadge}>{item.badge}</span>
            ) : null}
          </Link>
        ))}
      </nav>

      {/* Bottom Nav */}
      <div className={styles.bottomNav}>
        {bottomItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={[styles.navItem, isActive(item.to) ? styles.navActive : ''].join(' ')}
            title={collapsed ? item.label : undefined}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
          </Link>
        ))}
        <button
          className={[styles.navItem, styles.logoutBtn].join(' ')}
          onClick={() => { logout(); navigate('/'); }}
          title={collapsed ? 'Keluar' : undefined}
        >
          <span className={styles.navIcon}><LogOut size={18} /></span>
          {!collapsed && <span className={styles.navLabel}>Keluar</span>}
        </button>
      </div>
    </aside>
  );

  return (
    <div className={styles.layout}>
      {/* Mobile Header */}
      <div className={styles.mobileHeader}>
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setMobileSidebarOpen(true)}
          aria-label="Buka menu"
        >
          <Menu size={20} />
        </button>
        <Link to="/" className={styles.mobileLogo}>
          <span className={styles.logoMark}>T</span>
          <span className={styles.logoText}>TUNTAS</span>
        </Link>
        <Link to="/dashboard/notifikasi" className={styles.mobileNotif}>
          <Bell size={20} />
          {unreadNotifications > 0 && <span className={styles.notifDot} />}
        </Link>
      </div>

      {/* Overlay */}
      {mobileSidebarOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar />

      <main className={[styles.main, collapsed ? styles.mainExpanded : ''].join(' ')}>
        {children}
      </main>
    </div>
  );
};
