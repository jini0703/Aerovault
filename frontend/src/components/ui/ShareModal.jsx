import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Copy, Check } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import * as filesApi from '../../api/files';

export default function ShareModal({ isOpen, onClose, file }) {
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  
  const shareMutation = useMutation({
    mutationFn: (email) => filesApi.shareFile(file.id, email),
    onSuccess: () => {
      setEmail('');
      onClose();
    }
  });

  const handleShare = (e) => {
    e.preventDefault();
    if (email) shareMutation.mutate(email);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`http://localhost:8080/api/files/${file.id}/download`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

          <div className="flex items-center justify-between p-6 pb-2 border-b border-brand-border/50">
            <h3 className="text-xl font-bold text-brand-text flex items-center gap-3">
              <div className="p-2 bg-brand-primary-soft/20 text-brand-primary rounded-xl">
                <Share2 className="w-5 h-5" />
              </div>
              Share File
            </h3>
            <button onClick={onClose} className="p-2 text-brand-text-muted hover:text-brand-primary bg-brand-surface-secondary hover:bg-brand-primary-soft/20 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-brand-text mb-3 px-1">Share with email</label>
              <form onSubmit={handleShare} className="flex gap-3">
                <input
                  type="email"
                  required
                  placeholder="colleague@company.com"
                  className="flex-1 bg-brand-surface-secondary border border-brand-border rounded-2xl px-4 py-3 text-sm text-brand-text focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all hover:border-brand-primary/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={shareMutation.isPending}
                  className="px-6 py-3 bg-brand-primary text-white text-sm font-semibold rounded-2xl hover:bg-brand-primary-hover transition-all disabled:opacity-50 shadow-lg shadow-brand-primary/20"
                >
                  {shareMutation.isPending ? 'Sharing...' : 'Share'}
                </button>
              </form>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-text mb-3 px-1">Copy link</label>
              <div className="flex items-center gap-3 p-2 pl-4 bg-brand-surface-secondary border border-brand-border rounded-2xl">
                <div className="flex-1 text-xs text-brand-text-muted truncate">
                  http://localhost:8080/api/files/{file.id}/download
                </div>
                <button
                  onClick={copyLink}
                  className="p-2.5 bg-brand-surface border border-brand-border rounded-xl hover:bg-brand-primary-soft/20 transition-all text-brand-text hover:text-brand-primary shadow-sm"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
