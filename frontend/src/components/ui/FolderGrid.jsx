import { motion } from 'framer-motion';
import { Folder } from 'lucide-react';

export default function FolderGrid({ folders, onFolderClick }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {folders.map((folder) => (
        <motion.div
          key={folder.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => onFolderClick(folder)}
          className="bg-brand-surface border border-brand-border rounded-[2rem] p-4 cursor-pointer hover:border-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/10 hover:-translate-y-1 transition-all duration-300 group flex items-center gap-4"
        >
          <div className="p-3 bg-brand-primary-soft/20 rounded-2xl group-hover:bg-brand-primary/20 transition-colors shadow-inner">
            <Folder className="w-6 h-6 text-brand-primary" fill="currentColor" fillOpacity={0.4} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-brand-text truncate group-hover:text-brand-primary transition-colors">
              {folder.name}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
