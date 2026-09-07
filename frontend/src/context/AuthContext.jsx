import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from '../api/auth';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const { data: user, isLoading, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: getMe,
    enabled: !!token,
    retry: false,
  });

  const queryClient = useQueryClient();

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    refetch();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    queryClient.clear();
  };

  useEffect(() => {
    if (!token) {
      logout();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
