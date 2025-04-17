import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const [initialized, setInitialized] = useState(false);
  
  // Задержка инициализации, чтобы избежать несоответствия SSR/CSR
  useEffect(() => {
    setInitialized(true);
  }, []);
  
  if (!initialized) {
    return <>{children}</>;
  }
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}