import api from './client';

export const login = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

export const signup = async (userData) => {
  const { data } = await api.post('/auth/signup', userData);
  return data;
};

export const getMe = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};

