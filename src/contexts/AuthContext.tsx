import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, Subscription } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('medisafe_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // Add mock subscription for demo
      if (!userData.subscription) {
        userData.subscription = {
          id: 'sub_demo',
          userId: userData.id,
          plan: 'free',
          status: 'inactive',
          currentPeriodStart: new Date().toISOString(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          consultationsUsed: 0,
          consultationsLimit: 0
        };
      }
      setUser(userData);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would be an API call
    if (email && password.length >= 6) {
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        preferredLanguage: 'en',
        createdAt: new Date().toISOString(),
        subscription: {
          id: 'sub_demo',
          userId: '1',
          plan: 'free',
          status: 'inactive',
          currentPeriodStart: new Date().toISOString(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          consultationsUsed: 0,
          consultationsLimit: 0
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('medisafe_user', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (email: string, password: string, name: string, language: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock registration
    if (email && password.length >= 6 && name) {
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        preferredLanguage: language,
        createdAt: new Date().toISOString(),
        subscription: {
          id: 'sub_' + Date.now(),
          userId: Date.now().toString(),
          plan: 'free',
          status: 'inactive',
          currentPeriodStart: new Date().toISOString(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          consultationsUsed: 0,
          consultationsLimit: 0
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('medisafe_user', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medisafe_user');
    localStorage.removeItem('medisafe_history');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};