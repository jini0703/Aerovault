import { NavLink } from 'react-router-dom';
import { Cloud, HardDrive, Clock, Star, Share2, Trash2, Settings } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getFiles } from '../../api/files';

const NAV_ITEMS = [
  { name: 'My Files', path: '/dashboard', icon: HardDrive },
  { name: 'Recent', path: '/recent', icon: Clock },
  { name: 'Starred', path: '/starred', icon: Star },
  { name: 'Shared', path: '/shared', icon: Share2 },
  { name: 'Trash', path: '/trash', icon: Trash2 },
];

const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export default function Sidebar() {
  const { user } = useAuth();
  
  const { data: files } = useQuery({
    queryKey: ['files', null], // Root files
    queryFn: () => getFiles(),
  });

  // Calculate used storage (bytes)
  const usedStorage = files ? files.reduce((acc, file) => acc + (file.size || 0), 0) : 0;
  const maxStorage = 20 * 1024 * 1024 * 1024; // 20 GB in bytes
  const percentage = Math.min(100, Math.round((usedStorage / maxStorage) * 100));

  return (
    <div className="w-64 bg-brand-surface border-r border-brand-border flex-shrink-0 flex flex-col h-full z-20">
      <div className="h-20 flex items-center px-6 border-b border-brand-border/50 gap-3">
        <div className="w-10 h-10 bg-brand-primary-soft text-brand-primary rounded-2xl flex items-center justify-center shadow-inner shadow-brand-primary/10">
          <Cloud className="w-6 h-6" />
        </div>
        <span className="font-bold text-lg tracking-tight text-brand-text">Aerovault</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => clsx(
              'flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300',
              isActive 
                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                : 'text-brand-text-muted hover:bg-brand-primary-soft/30 hover:text-brand-primary'
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-brand-border/50">
        {/* Soft Storage Card */}
        <div className="mb-4 bg-brand-surface-secondary/50 rounded-3xl p-5 border border-brand-border shadow-sm">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="text-brand-text font-semibold">Storage</span>
            <span className="text-brand-primary font-bold">{percentage}%</span>
          </div>
          <div className="h-2 w-full bg-brand-bg rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-brand-primary rounded-full transition-all duration-700 ease-out" style={{ width: `${percentage}%` }} />
          </div>
          <div className="text-[11px] text-brand-text-muted mt-3 text-center font-medium">{formatBytes(usedStorage)} of 20 GB used</div>
        </div>

        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-sm font-medium text-brand-text-muted hover:bg-brand-surface-secondary hover:text-brand-text transition-all duration-300">
          <Settings className="w-5 h-5" />
          Settings
        </button>
      </div>
    </div>
  );
}
