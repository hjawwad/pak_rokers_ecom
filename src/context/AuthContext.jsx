import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

const AUTH_KEY = 'pak-rokers-admin-auth';

const ADMIN_CREDENTIALS = {
  email: 'admin@pakrokers.com',
  password: 'admin123',
};

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const login = useCallback((email, password) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
