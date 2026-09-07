import { Search, Bell, Moon, Sun, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function Topbar() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="h-20 flex items-center justify-between px-6 bg-brand-bg/80 backdrop-blur-md border-b border-brand-border/50 sticky top-0 z-20">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-brand-text-muted group-focus-within:text-brand-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search files, folders..."
            className="w-full bg-brand-surface border border-brand-border rounded-full py-2.5 pl-12 pr-6 text-sm text-brand-text focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all shadow-sm shadow-brand-primary/5 placeholder:text-brand-text-muted/60"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4 ml-4">
        <button 
          onClick={toggleTheme}
          className="p-2.5 text-brand-text-muted hover:text-brand-primary bg-brand-surface border border-brand-border hover:bg-brand-primary-soft/20 rounded-full transition-all shadow-sm"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button className="p-2.5 text-brand-text-muted hover:text-brand-primary bg-brand-surface border border-brand-border hover:bg-brand-primary-soft/20 rounded-full transition-all shadow-sm relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-brand-primary rounded-full border-2 border-brand-surface" />
        </button>
        
        <div className="h-8 w-px bg-brand-border mx-1" />
        
        <div className="flex items-center gap-3 group relative bg-brand-surface border border-brand-border rounded-full p-1.5 shadow-sm pr-4">
          <div className="w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center text-white font-semibold text-sm shadow-inner shadow-brand-primary/20">
            {user?.name?.charAt(0).toUpperCase() || <User className="w-5 h-5" />}
          </div>
          <span className="text-sm font-medium text-brand-text hidden sm:block max-w-[100px] truncate">
            {user?.name || 'User'}
          </span>
          <button 
            onClick={logout}
            className="p-1.5 ml-1 text-brand-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
