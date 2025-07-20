import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MartUser {
  id: string;
  email: string;
  martName: string;
  role: 'mart_owner';
  isVerified: boolean;
}

interface MartAuthContextType {
  user: MartUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  martName: string;
  ownerName: string;
  phone: string;
  address: string;
}

const MartAuthContext = createContext<MartAuthContextType | null>(null);

export const MartAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MartUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('mart_token');
    const userData = localStorage.getItem('mart_user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('mart_token');
        localStorage.removeItem('mart_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock authentication - replace with actual API call
      const mockUsers = [
        {
          id: '1',
          email: 'freshmart@example.com',
          password: 'password123',
          martName: 'FreshMart Downtown',
          role: 'mart_owner' as const,
          isVerified: true
        },
        {
          id: '2',
          email: 'quickstop@example.com',
          password: 'password123',
          martName: 'QuickStop Express',
          role: 'mart_owner' as const,
          isVerified: true
        }
      ];

      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        const token = 'mock_jwt_token_' + Date.now();
        
        localStorage.setItem('mart_token', token);
        localStorage.setItem('mart_user', JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      // Mock registration - replace with actual API call
      const newUser: MartUser = {
        id: Date.now().toString(),
        email: data.email,
        martName: data.martName,
        role: 'mart_owner',
        isVerified: false
      };

      const token = 'mock_jwt_token_' + Date.now();
      
      localStorage.setItem('mart_token', token);
      localStorage.setItem('mart_user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('mart_token');
    localStorage.removeItem('mart_user');
    setUser(null);
  };

  return (
    <MartAuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </MartAuthContext.Provider>
  );
};

export const useMartAuth = () => {
  const context = useContext(MartAuthContext);
  if (!context) {
    throw new Error('useMartAuth must be used within a MartAuthProvider');
  }
  return context;
};