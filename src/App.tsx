import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from './components/ui/Toast';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Home } from './pages/public/Home';
import { CakerjaPage } from './pages/public/CakerjaPage';
import { KeamananPage } from './pages/public/KeamananPage';
import { JasaBrowse } from './pages/jasa/JasaBrowse';
import { JasaDetail } from './pages/jasa/JasaDetail';
import { PasarBrowse } from './pages/pasar/PasarBrowse';
import { PasarDetail } from './pages/pasar/PasarDetail';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { PermintaanSaya } from './pages/dashboard/PermintaanSaya';
import { PenawaranSaya } from './pages/dashboard/PenawaranSaya';
import { ArtikelPage } from './pages/article/ArtikelPage';
import { ArtikelDetail } from './pages/article/ArtikelDetail';

// Placeholder Components (Will be replaced with actual pages)
const NotFound = () => {
  return (
    <PublicLayout>
      <div className="container" style={{ padding: '120px 0', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '24px' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 800, margin: 0, color: 'var(--color-primary-600)' }}>404</h1>
        <h2 style={{ fontSize: '2rem', margin: 0, color: 'var(--color-neutral-900)' }}>Halaman tidak ditemukan</h2>
        <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', maxWidth: '500px', marginBottom: '16px' }}>
          Maaf, halaman yang Anda cari mungkin telah dihapus, namanya diubah, atau sementara tidak tersedia.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          style={{ padding: '12px 24px', background: 'var(--color-primary-600)', color: 'white', border: 'none', borderRadius: 'var(--radius-lg)', fontWeight: 600, cursor: 'pointer' }}
        >
          Kembali ke Beranda
        </button>
      </div>
    </PublicLayout>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/masuk" replace />;
  return <>{children}</>;
};

export const App = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/cara-kerja" element={<CakerjaPage />} />
            <Route path="/keamanan" element={<KeamananPage />} />
            <Route path="/artikel" element={<ArtikelPage />} />
            <Route path="/artikel/:slug" element={<ArtikelDetail />} />
            <Route path="/jasa" element={<JasaBrowse />} />
            <Route path="/jasa/:id" element={<JasaDetail />} />
            <Route path="/pasar" element={<PasarBrowse />} />
            <Route path="/pasar/:id" element={<PasarDetail />} />
            
            {/* Auth Routes */}
            <Route path="/masuk" element={<Login />} />
            <Route path="/daftar" element={<Register />} />
            
            {/* Dashboard Routes (Protected) */}
            <Route 
              path="/dashboard/*" 
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="/" element={<DashboardOverview />} />
                    <Route path="/permintaan" element={<PermintaanSaya />} />
                    <Route path="/penawaran" element={<PenawaranSaya />} />
                    <Route path="/pekerjaan" element={<DashboardLayout><h1>Pekerjaan</h1></DashboardLayout>} />
                    <Route path="/pesanan" element={<DashboardLayout><h1>Pesanan</h1></DashboardLayout>} />
                    <Route path="/pesan" element={<DashboardLayout><h1>Pesan</h1></DashboardLayout>} />
                    <Route path="/notifikasi" element={<DashboardLayout><h1>Notifikasi</h1></DashboardLayout>} />
                    <Route path="/dompet" element={<DashboardLayout><h1>Dompet</h1></DashboardLayout>} />
                    <Route path="/transaksi" element={<DashboardLayout><h1>Transaksi</h1></DashboardLayout>} />
                    <Route path="/profil" element={<DashboardLayout><h1>Profil</h1></DashboardLayout>} />
                    <Route path="/pengaturan" element={<DashboardLayout><h1>Pengaturan</h1></DashboardLayout>} />
                  </Routes>
                </ProtectedRoute>
              } 
            />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </AuthProvider>
    </AppProvider>
  );
};

export default App;
