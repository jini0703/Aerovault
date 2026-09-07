import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, File } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as filesApi from '../../api/files';

export default function UploadModal({ isOpen, onClose, currentFolderId }) {
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: (file) => filesApi.uploadFile(file, currentFolderId),
    onSuccess: () => {
      queryClient.invalidateQueries(['files']);
      onClose();
    }
  });

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(file => {
      uploadMutation.mutate(file);
    });
  }, [uploadMutation]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-bg/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-brand-surface border border-brand-border rounded-[2.5rem] shadow-2xl shadow-brand-primary/10 w-full max-w-md overflow-hidden relative"
        >
          {/* Top soft gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-primary-soft via-brand-primary to-brand-soft-blue" />
          
          <div className="flex items-center justify-between p-6 pb-2">
            <h3 className="text-xl font-bold text-brand-text">Upload Files</h3>
            <button onClick={onClose} className="p-2 text-brand-text-muted hover:text-brand-primary bg-brand-surface-secondary hover:bg-brand-primary-soft/20 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6">
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-[2rem] p-10 text-center cursor-pointer transition-all duration-300 ${isDragActive ? 'border-brand-primary bg-brand-primary-soft/10 scale-[1.02]' : 'border-brand-border/80 hover:border-brand-primary/50 bg-brand-surface-secondary/30 hover:bg-brand-surface-secondary'}`}
            >
              <input {...getInputProps()} />
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors ${isDragActive ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-brand-surface border border-brand-border text-brand-primary'}`}>
                <UploadCloud className="w-8 h-8" />
              </div>
              <p className="text-base font-bold text-brand-text mb-1">
                {isDragActive ? "Drop files here" : "Drag & drop files here"}
              </p>
              <p className="text-sm text-brand-text-muted">
                or click to browse from your computer
              </p>
            </div>

            {uploadMutation.isPending && (
              <div className="mt-6 flex items-center gap-4 p-4 bg-brand-surface-secondary rounded-[1.5rem] border border-brand-border shadow-sm">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-brand-primary"></div>
                <div className="text-sm font-medium text-brand-text">Uploading file...</div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
