import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Edit2 } from 'lucide-react';

export default function PromptModal({ isOpen, onClose, onSubmit, title, placeholder, initialValue = '', icon = 'folder' }) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (isOpen) setValue(initialValue);
  }, [isOpen, initialValue]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-bg/80 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-brand-surface border border-brand-border rounded-[2rem] p-6 max-w-md w-full shadow-2xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-brand-primary/10 text-brand-primary">
              {icon === 'folder' ? <Folder className="w-6 h-6" /> : <Edit2 className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-text">{title}</h3>
            </div>
          </div>
          
          <div className="mb-6">
            <input 
              type="text" 
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSubmit(value);
                  onClose();
                }
              }}
              placeholder={placeholder}
              className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-brand-text hover:bg-brand-surface-secondary transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                onSubmit(value);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary-hover shadow-lg shadow-brand-primary/20 transition-colors"
            >
              Confirm
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

