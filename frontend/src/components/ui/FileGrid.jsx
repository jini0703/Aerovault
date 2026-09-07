import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { File, MoreVertical, Download, Star, Trash, Edit2, Share2, CheckSquare, Square, RotateCcw, X, AlertTriangle } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import * as filesApi from '../../api/files';
import ShareModal from './ShareModal';
import PromptModal from './PromptModal';

export default function FileGrid({ files, currentFolderId }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [shareFile, setShareFile] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(new Set());
  const [renamePrompt, setRenamePrompt] = useState(null);
  
  const queryClient = useQueryClient();
  const location = useLocation();
  const isTrashView = location.pathname === '/trash';

  const getExt = (name) => name?.split('.').pop().toLowerCase() || '';
  
  const getFileIcon = (filename) => {
    const ext = getExt(filename);
    if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(ext)) return 'bg-brand-soft-blue/20 text-brand-soft-blue';
    if (['pdf'].includes(ext)) return 'bg-red-500/10 text-red-500';
    if (['doc', 'docx'].includes(ext)) return 'bg-blue-500/10 text-blue-500';
    if (['xls', 'xlsx'].includes(ext)) return 'bg-green-500/10 text-green-500';
    if (['mp4', 'mov', 'avi'].includes(ext)) return 'bg-brand-soft-lavender/30 text-brand-primary';
    return 'bg-brand-primary/10 text-brand-primary';
  };

  const invalidate = () => {
    queryClient.invalidateQueries(['files']);
    setSelectedFiles(new Set());
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => filesApi.deleteFile(id),
    onSuccess: invalidate
  });

  const trashMutation = useMutation({
    mutationFn: (id) => filesApi.trashFile(id),
    onSuccess: invalidate
  });

  const restoreMutation = useMutation({
    mutationFn: (id) => filesApi.restoreFile(id),
    onSuccess: invalidate
  });

  const starMutation = useMutation({
    mutationFn: ({id, isStarred}) => filesApi.updateFile(id, { isStarred: !isStarred }),
    onSuccess: () => queryClient.invalidateQueries(['files'])
  });

  const renameMutation = useMutation({
    mutationFn: ({id, name}) => filesApi.updateFile(id, { name }),
    onSuccess: () => queryClient.invalidateQueries(['files'])
  });

  const handleAction = (e, fileId, actionType) => {
    e.stopPropagation();
    setConfirmDialog({ type: actionType, fileId, multiple: false });
    setActiveMenu(null);
  };

  const confirmAction = () => {
    if (!confirmDialog) return;
    const { type, fileId, multiple } = confirmDialog;
    
    const idsToProcess = multiple ? Array.from(selectedFiles) : [fileId];
    
    idsToProcess.forEach(id => {
      if (type === 'trash') trashMutation.mutate(id);
      if (type === 'delete') deleteMutation.mutate(id);
      if (type === 'restore') restoreMutation.mutate(id);
    });
    
    setConfirmDialog(null);
  };

  const handleStar = (e, file) => {
    e.stopPropagation();
    starMutation.mutate({ id: file.id, isStarred: file.isStarred });
    setActiveMenu(null);
  };

  const handleRename = (e, file) => {
    e.stopPropagation();
    setRenamePrompt(file);
    setActiveMenu(null);
  };

  const submitRename = (newName) => {
    if (newName && renamePrompt && newName !== renamePrompt.name) {
      renameMutation.mutate({ id: renamePrompt.id, name: newName });
    }
    setRenamePrompt(null);
  };

  const handleDownload = (e, id) => {
    e.stopPropagation();
    window.open(`http://localhost:8080/api/files/${id}/download`, '_blank');
    setActiveMenu(null);
  };

  const toggleSelection = (e, id) => {
    e.stopPropagation();
    const newSet = new Set(selectedFiles);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedFiles(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedFiles.size === files.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(files.map(f => f.id)));
    }
  };

  const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  if (files.length === 0) return null;

  return (
    <>
      <div className="flex items-center justify-between bg-brand-surface border border-brand-border rounded-2xl p-4 mb-6 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={toggleSelectAll} className="text-brand-text hover:text-brand-primary transition-colors flex items-center gap-2">
            {selectedFiles.size === files.length && files.length > 0 ? (
              <CheckSquare className="w-5 h-5 text-brand-primary" />
            ) : (
              <Square className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">Select All</span>
          </button>
          {selectedFiles.size > 0 && (
            <span className="text-sm text-brand-text-muted font-medium bg-brand-surface-secondary px-3 py-1 rounded-full">
              {selectedFiles.size} selected
            </span>
          )}
        </div>
        
        {selectedFiles.size > 0 && (
          <div className="flex items-center gap-2">
            {isTrashView ? (
              <>
                <button onClick={() => setConfirmDialog({ type: 'restore', multiple: true })} className="px-4 py-2 text-sm font-medium text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 rounded-xl transition-colors">
                  Restore All
                </button>
                <button onClick={() => setConfirmDialog({ type: 'delete', multiple: true })} className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors">
                  Delete Permanently
                </button>
              </>
            ) : (
              <button onClick={() => setConfirmDialog({ type: 'trash', multiple: true })} className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors">
                Move to Trash
              </button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {files.map((file) => {
          const isSelected = selectedFiles.has(file.id);
          return (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-brand-surface border rounded-[2rem] p-4 flex items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative group ${activeMenu === file.id ? 'z-40' : 'z-10'} ${isSelected ? 'border-brand-primary shadow-brand-primary/20 ring-2 ring-brand-primary/20' : 'border-brand-border hover:border-brand-primary/30 hover:shadow-brand-primary/5'}`}
            onClick={() => setActiveMenu(null)}
          >
            <div 
              className={`absolute -top-2 -left-2 p-1.5 rounded-full bg-brand-surface border transition-opacity z-20 ${isSelected ? 'opacity-100 border-brand-primary text-brand-primary shadow-md' : 'opacity-0 group-hover:opacity-100 border-brand-border text-brand-text-muted hover:text-brand-primary hover:border-brand-primary/50'} cursor-pointer`}
              onClick={(e) => toggleSelection(e, file.id)}
            >
              {isSelected ? <CheckSquare className="w-5 h-5 fill-brand-primary text-white" /> : <Square className="w-5 h-5" />}
            </div>

            <div className={`p-4 rounded-2xl shadow-inner ${getFileIcon(file.name)}`}>
              <File className="w-6 h-6" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-brand-text truncate pr-6" title={file.name}>
                {file.name}
              </div>
              <div className="text-xs text-brand-text-muted mt-1 font-medium">
                {formatSize(file.size)}
              </div>
            </div>

            {file.isStarred && (
              <Star className="w-4 h-4 text-yellow-400 absolute top-5 right-12" fill="currentColor" />
            )}

            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveMenu(activeMenu === file.id ? null : file.id);
              }}
              className="p-2 text-brand-text-muted hover:text-brand-primary rounded-xl hover:bg-brand-surface-secondary transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {activeMenu === file.id && (
              <div className="absolute top-16 right-4 w-48 bg-brand-surface border border-brand-border rounded-2xl shadow-2xl shadow-brand-primary/10 z-30 py-2 overflow-hidden">
                {!isTrashView && (
                  <>
                    <button onClick={(e) => handleDownload(e, file.id)} className="w-full px-4 py-2.5 text-sm text-left text-brand-text hover:bg-brand-surface-secondary flex items-center gap-3 transition-colors">
                      <Download className="w-4 h-4 text-brand-primary" /> Download
                    </button>
                    <button onClick={(e) => handleRename(e, file)} className="w-full px-4 py-2.5 text-sm text-left text-brand-text hover:bg-brand-surface-secondary flex items-center gap-3 transition-colors">
                      <Edit2 className="w-4 h-4 text-brand-primary" /> Rename
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setShareFile(file); setActiveMenu(null); }} className="w-full px-4 py-2.5 text-sm text-left text-brand-text hover:bg-brand-surface-secondary flex items-center gap-3 transition-colors">
                      <Share2 className="w-4 h-4 text-brand-primary" /> Share
                    </button>
                    <button onClick={(e) => handleStar(e, file)} className="w-full px-4 py-2.5 text-sm text-left text-brand-text hover:bg-brand-surface-secondary flex items-center gap-3 transition-colors">
                      <Star className="w-4 h-4 text-yellow-400" /> {file.isStarred ? 'Unstar' : 'Star'}
                    </button>
                    <div className="h-px bg-brand-border/50 my-1 mx-2" />
                  </>
                )}
                
                {isTrashView ? (
                  <>
                    <button onClick={(e) => handleAction(e, file.id, 'restore')} className="w-full px-4 py-2.5 text-sm text-left text-brand-primary hover:bg-brand-surface-secondary flex items-center gap-3 transition-colors">
                      <RotateCcw className="w-4 h-4" /> Restore
                    </button>
                    <button onClick={(e) => handleAction(e, file.id, 'delete')} className="w-full px-4 py-2.5 text-sm text-left text-red-500 hover:bg-red-500/10 flex items-center gap-3 transition-colors">
                      <Trash className="w-4 h-4" /> Delete Forever
                    </button>
                  </>
                ) : (
                  <button onClick={(e) => handleAction(e, file.id, 'trash')} className="w-full px-4 py-2.5 text-sm text-left text-red-500 hover:bg-red-500/10 flex items-center gap-3 transition-colors">
                    <Trash className="w-4 h-4" /> Move to Trash
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )})}
      </div>
      
      {shareFile && (
        <ShareModal 
          isOpen={!!shareFile} 
          onClose={() => setShareFile(null)} 
          file={shareFile} 
        />
      )}

      <AnimatePresence>
        {confirmDialog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-bg/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-brand-surface border border-brand-border rounded-[2rem] p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-2xl ${confirmDialog.type === 'delete' ? 'bg-red-500/10 text-red-500' : 'bg-brand-primary/10 text-brand-primary'}`}>
                  {confirmDialog.type === 'delete' ? <AlertTriangle className="w-6 h-6" /> : <Trash className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-text">
                    {confirmDialog.type === 'trash' && 'Move to Trash?'}
                    {confirmDialog.type === 'delete' && 'Delete Permanently?'}
                    {confirmDialog.type === 'restore' && 'Restore Files?'}
                  </h3>
                  <p className="text-sm text-brand-text-muted mt-1">
                    {confirmDialog.type === 'trash' && 'Files will be kept in trash for 30 days.'}
                    {confirmDialog.type === 'delete' && 'This action cannot be undone. Files will be lost forever.'}
                    {confirmDialog.type === 'restore' && 'Files will be moved back to your drive.'}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-8">
                <button 
                  onClick={() => setConfirmDialog(null)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-brand-text hover:bg-brand-surface-secondary transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmAction}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-colors shadow-lg ${
                    confirmDialog.type === 'delete' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-brand-primary hover:bg-brand-primary-hover shadow-brand-primary/20'
                  }`}
                >
                  {confirmDialog.type === 'trash' && 'Move to Trash'}
                  {confirmDialog.type === 'delete' && 'Yes, Delete'}
                  {confirmDialog.type === 'restore' && 'Restore'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <PromptModal
        isOpen={!!renamePrompt}
        onClose={() => setRenamePrompt(null)}
        onSubmit={submitRename}
        title="Rename File"
        placeholder="Enter new file name..."
        initialValue={renamePrompt?.name}
        icon="edit"
      />
    </>
  );
}
