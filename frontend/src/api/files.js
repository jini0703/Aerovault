import api from './client';

export const getFiles = async (folderId = null) => {
  const url = folderId ? `/files?folderId=${folderId}` : '/files';
  const response = await api.get(url);
  return response.data;
};

export const getStarredFiles = async () => {
  const response = await api.get('/files?isStarred=true');
  return response.data;
};

export const shareFile = async (id, email) => {
  const response = await api.post(`/shares/file/${id}`, { email, permission: 'READ' });
  return response.data;
};

export const getSharedFiles = async () => {
  const response = await api.get('/shares/me');
  return response.data.map(share => share.file);
};

export const getTrashFiles = async () => {
  const response = await api.get('/files?isTrashed=true');
  return response.data;
};

export const getRecentFiles = async () => {
  const response = await api.get('/files');
  return response.data;
};

export const uploadFile = async (file, folderId = null) => {
  const formData = new FormData();
  formData.append('file', file);
  if (folderId) formData.append('folderId', folderId);
  const response = await api.post('/files', formData);
  return response.data;
};

export const deleteFile = async (id) => {
  const response = await api.delete(`/files/${id}`);
  return response.data;
};

export const trashFile = async (id) => {
  const response = await api.post(`/files/${id}/trash`);
  return response.data;
};

export const restoreFile = async (id) => {
  const response = await api.post(`/files/${id}/restore`);
  return response.data;
};

export const updateFile = async (id, data) => {
  const response = await api.put(`/files/${id}`, data);
  return response.data;
};
