import React, { createContext, useContext, useState, useCallback } from 'react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
}

interface AppContextType {
  mode: 'jasa' | 'pasar';
  setMode: (mode: 'jasa' | 'pasar') => void;
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<'jasa' | 'pasar'>('jasa');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const setMode = useCallback((m: 'jasa' | 'pasar') => {
    setModeState(m);
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <AppContext.Provider
      value={{ mode, setMode, toasts, addToast, removeToast, isSearchOpen, setSearchOpen }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
