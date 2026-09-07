import api from './client';

export const getFolders = async (parentId = null) => {
  const url = parentId ? `/folders?parentId=${parentId}` : '/folders';
  const response = await api.get(url);
  return response.data;
};

export const createFolder = async (name, parentId = null) => {
  const response = await api.post('/folders', { name, parentId });
  return response.data;
};

export const deleteFolder = async (id) => {
  const response = await api.delete(`/folders/${id}`);
  return response.data;
};

export const updateFolder = async (id, data) => {
  const response = await api.put(`/folders/${id}`, data);
  return response.data;
};
