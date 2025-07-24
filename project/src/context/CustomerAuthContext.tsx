import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CustomerAuthContextType {
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, phone: string) => Promise<boolean>;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

export const useCustomerAuth = () => {
  const context = useContext(CustomerAuthContext);
  if (!context) throw new Error('useCustomerAuth must be used within CustomerAuthProvider');
  return context;
};

export const CustomerAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  const login = async (email: string, password: string) => {
    // Mock: accept any non-empty email/password
    if (email && password) {
      setUser({ email });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const register = async (name: string, email: string, password: string, phone: string) => {
    // Mock: accept any non-empty fields
    if (name && email && password && phone) {
      return true;
    }
    return false;
  };

  return (
    <CustomerAuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </CustomerAuthContext.Provider>
  );
}; 