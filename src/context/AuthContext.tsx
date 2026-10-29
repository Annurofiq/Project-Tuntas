import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User } from '../types';

const API_URL = 'http://localhost:5000/api';

// Mapping dari response API backend ke tipe User frontend
function mapApiUserToUser(apiUser: Record<string, unknown>): User {
  return {
    id: String(apiUser.id),
    name: String(apiUser.name ?? ''),
    email: String(apiUser.email ?? ''),
    phone: apiUser.phone ? String(apiUser.phone) : undefined,
    avatar: apiUser.avatar
      ? String(apiUser.avatar)
      : `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(String(apiUser.name ?? 'user'))}`,
    location: '',
    city: String(apiUser.city ?? ''),
    province: String(apiUser.province ?? ''),
    about: String(apiUser.bio ?? ''),
    skills: Array.isArray(apiUser.skills) ? (apiUser.skills as string[]) : [],
    rating: Number(apiUser.rating ?? 0),
    totalReviews: Number(apiUser.total_reviews ?? 0),
    totalTransactions: 0,
    completedJobs: Number(apiUser.completed_orders ?? 0),
    successRate: 0,
    responseRate: 0,
    responseTime: '-',
    memberSince: String(apiUser.memberSince ?? new Date().toISOString().split('T')[0]),
    isVerified: false,
    isOnline: true,
    balance: 0,
    roles: apiUser.role === 'admin' ? ['admin'] : ['requester', 'buyer'],
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  register: (name: string, email: string, password: string, phone?: string) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('tuntas_user');
    if (stored) {
      try {
        return JSON.parse(stored) as User;
      } catch {
        return null;
      }
    }
    return null;
  });

  // Login — memanggil POST /api/auth/login
  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json() as { success: boolean; message?: string; data?: { token: string; user: Record<string, unknown> } };

    if (!res.ok || !data.success) {
      return { success: false, message: data.message ?? 'Email atau password salah.' };
    }

    const token = data.data!.token;
    const apiUser = data.data!.user;
    const mappedUser = mapApiUserToUser(apiUser);

    localStorage.setItem('tuntas_token', token);
    localStorage.setItem('tuntas_user', JSON.stringify(mappedUser));
    setUser(mappedUser);

    return { success: true };
  }, []);

  // Logout — memanggil POST /api/auth/logout lalu bersihkan storage
  const logout = useCallback(async () => {
    const token = localStorage.getItem('tuntas_token');
    if (token) {
      try {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        // Abaikan error jaringan saat logout
      }
    }
    setUser(null);
    localStorage.removeItem('tuntas_user');
    localStorage.removeItem('tuntas_token');
  }, []);

  // Register — memanggil POST /api/auth/register lalu auto-login
  const register = useCallback(
    async (name: string, email: string, password: string, phone?: string): Promise<{ success: boolean; message?: string }> => {
      // Langkah 1: Daftarkan akun
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone: phone ?? null }),
      });

      const data = await res.json() as { success: boolean; message?: string };

      if (!res.ok || !data.success) {
        return { success: false, message: data.message ?? 'Pendaftaran gagal.' };
      }

      // Langkah 2: Auto-login setelah daftar berhasil
      const loginResult = await login(email, password);
      return loginResult;
    },
    [login]
  );

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
