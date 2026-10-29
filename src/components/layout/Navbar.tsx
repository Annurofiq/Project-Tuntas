import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Bell,
  MessageCircle,
  Menu,
  X,
  Wrench,
  ShoppingBag,
  ChevronDown,
  LogOut,
  User,
  LayoutDashboard,
  Wallet,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { notifications } from '../../data/mockData';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { mode, setMode } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const unreadNotifications = notifications.filter((n) => n.userId === user?.id && !n.isRead).length;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin');

  return (
    <>
      <header className={[styles.navbar, isScrolled ? styles.scrolled : ''].join(' ')}>
        <div className={styles.inner}>
          {/* Logo */}
          <Link to="/" className={styles.logo} aria-label="TUNTAS Home">
            <span className={styles.logoMark}>T</span>
            <span className={styles.logoText}>TUNTAS</span>
          </Link>

          {/* Mode Switch — shown in non-dashboard/public pages */}
          {!isDashboard && (
            <div className={styles.modeSwitch}>
              <button
                className={[styles.modeBtn, mode === 'jasa' ? styles.modeActive : ''].join(' ')}
                onClick={() => { setMode('jasa'); navigate('/jasa'); }}
                aria-pressed={mode === 'jasa'}
              >
                <Wrench size={15} />
                <span>Jasa</span>
              </button>
              <button
                className={[styles.modeBtn, mode === 'pasar' ? styles.modeActive : ''].join(' ')}
                onClick={() => { setMode('pasar'); navigate('/pasar'); }}
                aria-pressed={mode === 'pasar'}
              >
                <ShoppingBag size={15} />
                <span>Pasar</span>
              </button>
            </div>
          )}

          {/* Public Nav Links */}
          {!isAuthenticated && (
            <nav className={styles.navLinks} aria-label="Navigasi utama">
              <Link to="/cara-kerja" className={styles.navLink}>Cara Kerja</Link>
              <Link to="/keamanan" className={styles.navLink}>Keamanan</Link>
              <Link to="/artikel" className={styles.navLink}>Artikel</Link>
            </nav>
          )}

          {/* Authenticated Nav Links */}
          {isAuthenticated && !isDashboard && (
            <nav className={styles.navLinks} aria-label="Navigasi utama">
              <Link to="/jasa" className={[styles.navLink, mode === 'jasa' ? styles.navLinkActive : ''].join(' ')}>
                Jasa
              </Link>
              <Link to="/pasar" className={[styles.navLink, mode === 'pasar' ? styles.navLinkActive : ''].join(' ')}>
                Pasar
              </Link>
              {mode === 'jasa' ? (
                <Link to="/jasa/buat" className={styles.navLinkHighlight}>+ Posting</Link>
              ) : (
                <Link to="/pasar/jual" className={styles.navLinkHighlight}>+ Jual</Link>
              )}
            </nav>
          )}

          {/* Right Side Actions */}
          <div className={styles.actions}>
            {isAuthenticated ? (
              <>
                {/* Search */}
                <Link to={mode === 'jasa' ? '/jasa' : '/pasar'} className={styles.iconBtn} aria-label="Cari">
                  <Search size={20} />
                </Link>

                {/* Messages */}
                <Link to="/dashboard/pesan" className={styles.iconBtn} aria-label="Pesan">
                  <MessageCircle size={20} />
                </Link>

                {/* Notifications */}
                <Link to="/dashboard/notifikasi" className={styles.iconBtnBadge} aria-label="Notifikasi">
                  <Bell size={20} />
                  {unreadNotifications > 0 && (
                    <span className={styles.notifBadge}>{unreadNotifications}</span>
                  )}
                </Link>

                {/* Profile Dropdown */}
                <div className={styles.profileMenu}>
                  <button
                    className={styles.profileBtn}
                    onClick={() => setProfileOpen((p) => !p)}
                    aria-expanded={isProfileOpen}
                    aria-haspopup="true"
                    aria-label="Menu profil"
                  >
                    <Avatar src={user?.avatar} name={user?.name || ''} size="sm" isOnline={user?.isOnline} />
                    <ChevronDown size={14} className={styles.chevron} />
                  </button>

                  {isProfileOpen && (
                    <>
                      <div className={styles.dropdownOverlay} onClick={() => setProfileOpen(false)} />
                      <div className={styles.dropdown} role="menu">
                        <div className={styles.dropdownHeader}>
                          <Avatar src={user?.avatar} name={user?.name || ''} size="md" />
                          <div>
                            <p className={styles.dropdownName}>{user?.name}</p>
                            <p className={styles.dropdownEmail}>{user?.email}</p>
                          </div>
                        </div>
                        <hr className={styles.divider} />
                        <Link to="/dashboard" className={styles.dropdownItem} role="menuitem">
                          <LayoutDashboard size={16} /> Dashboard
                        </Link>
                        <Link to="/profil" className={styles.dropdownItem} role="menuitem">
                          <User size={16} /> Profil Saya
                        </Link>
                        <Link to="/dashboard/dompet" className={styles.dropdownItem} role="menuitem">
                          <Wallet size={16} /> Dompet
                        </Link>
                        <hr className={styles.divider} />
                        <button
                          className={[styles.dropdownItem, styles.dropdownDanger].join(' ')}
                          onClick={() => { logout(); navigate('/'); }}
                          role="menuitem"
                        >
                          <LogOut size={16} /> Keluar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/masuk" className={styles.loginLink}>Masuk</Link>
                <Button
                  size="sm"
                  onClick={() => navigate('/daftar')}
                  className={styles.registerBtn}
                >
                  Daftar
                </Button>
              </>
            )}

            {/* Mobile Hamburger */}
            <button
              className={styles.hamburger}
              onClick={() => setMobileOpen((p) => !p)}
              aria-label={isMobileOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className={styles.mobileMenu} role="dialog" aria-label="Menu mobile">
            <div className={styles.mobileModeSwitch}>
              <button
                className={[styles.modeBtn, mode === 'jasa' ? styles.modeActive : ''].join(' ')}
                onClick={() => { setMode('jasa'); navigate('/jasa'); }}
              >
                <Wrench size={16} /> Jasa
              </button>
              <button
                className={[styles.modeBtn, mode === 'pasar' ? styles.modeActive : ''].join(' ')}
                onClick={() => { setMode('pasar'); navigate('/pasar'); }}
              >
                <ShoppingBag size={16} /> Pasar
              </button>
            </div>

            <nav className={styles.mobileNav}>
              <Link to="/jasa" className={styles.mobileNavLink}>🔧 Jelajahi Jasa</Link>
              <Link to="/pasar" className={styles.mobileNavLink}>🛒 Jelajahi Pasar</Link>
              <Link to="/cara-kerja" className={styles.mobileNavLink}>❓ Cara Kerja</Link>
              <Link to="/keamanan" className={styles.mobileNavLink}>🔒 Keamanan</Link>
              <Link to="/artikel" className={styles.mobileNavLink}>📝 Artikel</Link>
            </nav>

            {isAuthenticated ? (
              <div className={styles.mobileActions}>
                <Link to="/dashboard" className={styles.mobileNavLink}>📊 Dashboard</Link>
                <Link to="/dashboard/pesan" className={styles.mobileNavLink}>💬 Pesan</Link>
                <Link to="/dashboard/notifikasi" className={styles.mobileNavLink}>
                  🔔 Notifikasi {unreadNotifications > 0 && `(${unreadNotifications})`}
                </Link>
                <button
                  className={styles.mobileLogout}
                  onClick={() => { logout(); navigate('/'); }}
                >
                  Keluar
                </button>
              </div>
            ) : (
              <div className={styles.mobileActions}>
                <Button variant="outline" fullWidth onClick={() => navigate('/masuk')}>
                  Masuk
                </Button>
                <Button fullWidth onClick={() => navigate('/daftar')}>
                  Daftar Gratis
                </Button>
              </div>
            )}
          </div>
        )}
      </header>
      {/* Spacer */}
      <div className={styles.navSpacer} />
    </>
  );
};
