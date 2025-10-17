import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { AuthContextType, User, TokenResponse } from '../types';

interface DecodedToken {
  username: string;
  groups?: string[];
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access');
    if (storedAccessToken) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(storedAccessToken);
        console.log('Datos del token:', decodedToken);
        const { username } = decodedToken;
        setUser({ username });
        console.log('Datos del token:', username);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        localStorage.removeItem('access'); 
      }
    }
    setIsLoading(false);
  }, []);

  const login = (data: TokenResponse) => {
    const { access, refresh } = data;
    if (typeof access === 'string') {
      try {
        const decodedToken = jwtDecode<DecodedToken>(access);
        const { username } = decodedToken;
        setUser({ username });
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      console.error('El token de acceso no es una cadena de texto válida');
    }
  };

  const logout = () => {
  setUser(null);
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  window.location.href = '/movies';
  };

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
