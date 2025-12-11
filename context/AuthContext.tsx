import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { AuthContextType, User, Role } from '../types';
import { login as authLogin, register as authRegister } from '../services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load user from local storage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const loggedInUser = await authLogin(email, password);
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  const register = useCallback(
    async (userData: Omit<User, 'id' | 'role' | 'token'>) => {
      setLoading(true);
      try {
        const registeredUser = await authRegister(userData);
        setUser(registeredUser);
        localStorage.setItem('user', JSON.stringify(registeredUser));
      } finally {
        setLoading(false);
      }
    },
    [],
  ); // eslint-disable-next-line react-hooks/exhaustive-deps

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const value = React.useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
