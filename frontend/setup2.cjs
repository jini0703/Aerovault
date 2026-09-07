const fs = require('fs');
const path = require('path');

const files = {
  "src/pages/Landing.jsx": `import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cloud, Shield, Zap, ArrowRight, Layout, Folder, File, Share2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Landing() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-secondary/10 blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Cloud className="w-8 h-8 text-brand-primary" />
          <span className="text-xl font-bold tracking-tight">Aurora Vault</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium hover:text-brand-primary transition-colors">
            Sign In
          </Link>
          <Link to="/signup" className="px-4 py-2 text-sm font-medium bg-brand-primary text-white rounded-full hover:bg-brand-primary/90 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            Secure Cloud Storage <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
              For Modern Teams
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-text-muted mb-8"
          >
            Store, share, and collaborate on files and folders across any device. 
            Experience the next generation of cloud storage with zero compromises.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4"
          >
            <Link to="/signup" className="px-8 py-3 bg-brand-primary text-white rounded-full font-medium hover:bg-brand-primary/90 transition-colors flex items-center gap-2">
              Start for free <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Dashboard Preview & Floating Cards */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="rounded-2xl border border-brand-border bg-brand-surface shadow-2xl overflow-hidden relative z-10"
          >
            <div className="border-b border-brand-border px-4 py-3 flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 bg-brand-bg rounded-md px-3 py-1.5 text-xs text-center text-brand-text-muted">
                dashboard.auroravault.app
              </div>
            </div>
            <div className="p-6 md:p-10 grid grid-cols-12 gap-8 bg-brand-bg/50">
              <div className="col-span-3 hidden md:block space-y-4">
                <div className="h-8 w-3/4 bg-brand-border/50 rounded animate-pulse" />
                <div className="h-8 w-full bg-brand-border/50 rounded animate-pulse" />
                <div className="h-8 w-5/6 bg-brand-border/50 rounded animate-pulse" />
              </div>
              <div className="col-span-12 md:col-span-9 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="h-6 w-32 bg-brand-border/50 rounded animate-pulse" />
                  <div className="h-8 w-24 bg-brand-primary/20 rounded-full animate-pulse" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="aspect-[4/3] bg-brand-surface rounded-xl border border-brand-border shadow-sm flex items-center justify-center p-4">
                       <Folder className="w-12 h-12 text-brand-primary/50" />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-16 bg-brand-surface rounded-xl border border-brand-border shadow-sm flex items-center px-4 gap-3">
                       <File className="w-6 h-6 text-brand-secondary/50" />
                       <div className="h-4 w-1/2 bg-brand-border/50 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Orbit Elements */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -left-12 top-20 z-20 bg-brand-surface border border-brand-border rounded-xl p-4 shadow-xl flex items-center gap-3 backdrop-blur-sm"
          >
            <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-medium">Bank-grade Security</div>
              <div className="text-xs text-brand-text-muted">End-to-end encryption</div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [10, -10, 10] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute -right-8 bottom-32 z-20 bg-brand-surface border border-brand-border rounded-xl p-4 shadow-xl flex items-center gap-3 backdrop-blur-sm"
          >
            <div className="p-2 bg-brand-secondary/10 rounded-lg text-brand-secondary">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-medium">Lightning Fast</div>
              <div className="text-xs text-brand-text-muted">Global edge network</div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
`,
  "src/components/layout/AuthLayout.jsx": `import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-secondary/10 blur-[120px] pointer-events-none" />

      {/* Auth Content */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 relative z-10">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Cloud className="w-8 h-8 text-brand-primary" />
            <span className="text-2xl font-bold tracking-tight">Aurora Vault</span>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brand-surface border border-brand-border rounded-2xl shadow-xl p-8"
          >
            <Outlet />
          </motion.div>
        </div>
      </div>

      {/* Visual Side Panel */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center bg-brand-surface/50 border-l border-brand-border relative z-10 p-12 overflow-hidden">
        {/* Animated Orb */}
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "linear"
          }}
          className="relative w-96 h-96 mb-12"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary opacity-20 blur-3xl" />
          <div className="absolute inset-4 rounded-full border-2 border-brand-primary/30 border-dashed" />
          <div className="absolute inset-12 rounded-full border border-brand-secondary/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Cloud className="w-32 h-32 text-brand-text opacity-50" />
          </div>
        </motion.div>
        
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Your Digital Sanctuary</h2>
          <p className="text-brand-text-muted">
            Secure, organize, and share your files in a beautifully designed cloud environment.
          </p>
        </div>
      </div>
    </div>
  );
}
`,
  "src/components/layout/MainLayout.jsx": `import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-brand-bg text-brand-text overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full min-w-0">
        <Topbar />
        <main className="flex-1 overflow-auto bg-brand-bg p-4 md:p-6 lg:p-8 relative">
          <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-brand-primary/5 blur-[100px] pointer-events-none" />
          <div className="max-w-7xl mx-auto w-full h-full relative z-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
`,
  "src/pages/Dashboard.jsx": `import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, FolderPlus, UploadCloud, Folder, File, Search, ChevronRight } from 'lucide-react';
import * as filesApi from '../api/files';
import * as foldersApi from '../api/folders';
import UploadModal from '../components/ui/UploadModal';
import FileGrid from '../components/ui/FileGrid';
import FolderGrid from '../components/ui/FolderGrid';

export default function Dashboard() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([{ id: null, name: 'My Files' }]);
  const location = useLocation();
  const queryClient = useQueryClient();

  const getRouteContext = () => {
    const path = location.pathname;
    if (path === '/starred') return { type: 'starred', title: 'Starred Files' };
    if (path === '/shared') return { type: 'shared', title: 'Shared with me' };
    if (path === '/trash') return { type: 'trash', title: 'Trash' };
    if (path === '/recent') return { type: 'recent', title: 'Recent' };
    return { type: 'my-files', title: currentFolderId ? breadcrumbs[breadcrumbs.length-1]?.name : 'My Files' };
  };

  const routeContext = getRouteContext();

  const { data: filesData = [], isLoading: filesLoading } = useQuery({
    queryKey: ['files', routeContext.type, currentFolderId],
    queryFn: () => {
      if (routeContext.type === 'starred') return filesApi.getStarredFiles();
      if (routeContext.type === 'shared') return filesApi.getSharedFiles();
      if (routeContext.type === 'trash') return filesApi.getTrashFiles();
      if (routeContext.type === 'recent') return filesApi.getRecentFiles();
      return filesApi.getFiles(currentFolderId);
    },
  });

  const { data: foldersData = [], isLoading: foldersLoading } = useQuery({
    queryKey: ['folders', currentFolderId],
    queryFn: () => foldersApi.getFolders(currentFolderId),
    enabled: routeContext.type === 'my-files'
  });

  const createFolderMutation = useMutation({
    mutationFn: (name) => foldersApi.createFolder(name, currentFolderId),
    onSuccess: () => queryClient.invalidateQueries(['folders', currentFolderId])
  });

  const handleCreateFolder = () => {
    const name = window.prompt('Enter folder name:');
    if (name) createFolderMutation.mutate(name);
  };

  const handleFolderClick = (folder) => {
    setCurrentFolderId(folder.id);
    setBreadcrumbs([...breadcrumbs, { id: folder.id, name: folder.name }]);
  };

  const handleBreadcrumbClick = (index) => {
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(newBreadcrumbs);
    setCurrentFolderId(newBreadcrumbs[newBreadcrumbs.length - 1].id);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-medium text-brand-text">
          {routeContext.type === 'my-files' ? (
            <div className="flex items-center">
              {breadcrumbs.map((crumb, idx) => (
                <div key={crumb.id || 'root'} className="flex items-center">
                  <button 
                    onClick={() => handleBreadcrumbClick(idx)}
                    className={\`hover:text-brand-primary transition-colors \${idx === breadcrumbs.length - 1 ? 'text-brand-text' : 'text-brand-text-muted'}\`}
                  >
                    {crumb.name}
                  </button>
                  {idx < breadcrumbs.length - 1 && <ChevronRight className="w-4 h-4 mx-2 text-brand-text-muted" />}
                </div>
              ))}
            </div>
          ) : (
            <span>{routeContext.title}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleCreateFolder}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-brand-surface border border-brand-border hover:bg-brand-surface-hover transition-colors"
          >
            <FolderPlus className="w-4 h-4" />
            <span className="hidden sm:inline">New Folder</span>
          </button>
          <button 
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors"
          >
            <UploadCloud className="w-4 h-4" />
            <span className="hidden sm:inline">Upload</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto pb-8 space-y-8">
        {routeContext.type === 'my-files' && foldersData.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-brand-text-muted mb-4 uppercase tracking-wider">Folders</h3>
            <FolderGrid folders={foldersData} onFolderClick={handleFolderClick} />
          </div>
        )}

        <div>
          {routeContext.type === 'my-files' && foldersData.length > 0 && filesData.length > 0 && (
            <h3 className="text-sm font-medium text-brand-text-muted mb-4 uppercase tracking-wider">Files</h3>
          )}
          {filesLoading || foldersLoading ? (
             <div className="flex justify-center p-12">
               <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary"></div>
             </div>
          ) : (
            <FileGrid files={filesData} currentFolderId={currentFolderId} />
          )}
          
          {!filesLoading && !foldersLoading && filesData.length === 0 && foldersData.length === 0 && (
            <div className="flex flex-col items-center justify-center p-20 text-center bg-brand-surface/50 border border-brand-border border-dashed rounded-2xl">
              <UploadCloud className="w-16 h-16 text-brand-text-muted mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-brand-text mb-2">No files here</h3>
              <p className="text-brand-text-muted mb-6">Upload some files or create a folder to get started</p>
              <button 
                onClick={() => setIsUploadOpen(true)}
                className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors text-sm font-medium"
              >
                Upload File
              </button>
            </div>
          )}
        </div>
      </div>

      <UploadModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
        currentFolderId={currentFolderId}
      />
    </div>
  );
}
`,
  "src/components/layout/Sidebar.jsx": `import { NavLink } from 'react-router-dom';
import { Cloud, HardDrive, Clock, Star, Share2, Trash2, Settings } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { name: 'My Files', path: '/dashboard', icon: HardDrive },
  { name: 'Recent', path: '/recent', icon: Clock },
  { name: 'Starred', path: '/starred', icon: Star },
  { name: 'Shared', path: '/shared', icon: Share2 },
  { name: 'Trash', path: '/trash', icon: Trash2 },
];

export default function Sidebar() {
  const { user } = useAuth();
  
  return (
    <div className="w-64 bg-brand-surface border-r border-brand-border flex-shrink-0 flex flex-col h-full z-20">
      <div className="h-16 flex items-center px-6 border-b border-brand-border gap-2">
        <Cloud className="w-6 h-6 text-brand-primary" />
        <span className="font-bold text-lg tracking-tight">Aurora Vault</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => clsx(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              isActive 
                ? 'bg-brand-primary/10 text-brand-primary' 
                : 'text-brand-text-muted hover:bg-brand-surface-hover hover:text-brand-text'
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-brand-border">
        {/* Storage Bar */}
        <div className="mb-4 bg-brand-bg rounded-lg p-3 border border-brand-border">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-brand-text">Storage</span>
            <span className="text-brand-text-muted">75%</span>
          </div>
          <div className="h-1.5 w-full bg-brand-border rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary w-3/4 rounded-full" />
          </div>
          <div className="text-[10px] text-brand-text-muted mt-2">15 GB of 20 GB used</div>
        </div>

        <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-brand-text-muted hover:bg-brand-surface-hover hover:text-brand-text transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
    </div>
  );
}
`,
  "src/components/layout/Topbar.jsx": `import { Search, Bell, Moon, Sun, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function Topbar() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="h-16 flex items-center justify-between px-6 bg-brand-surface/80 backdrop-blur-md border-b border-brand-border sticky top-0 z-20">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-brand-text-muted group-focus-within:text-brand-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search files, folders..."
            className="w-full bg-brand-bg border border-brand-border rounded-full py-1.5 pl-10 pr-4 text-sm text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-shadow placeholder:text-brand-text-muted/60"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3 ml-4">
        <button 
          onClick={toggleTheme}
          className="p-2 text-brand-text-muted hover:text-brand-text hover:bg-brand-surface-hover rounded-full transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button className="p-2 text-brand-text-muted hover:text-brand-text hover:bg-brand-surface-hover rounded-full transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-primary rounded-full border border-brand-surface" />
        </button>
        
        <div className="h-6 w-px bg-brand-border mx-2" />
        
        <div className="flex items-center gap-3 group relative">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white font-medium text-sm">
            {user?.name?.charAt(0) || <User className="w-4 h-4" />}
          </div>
          <button 
            onClick={logout}
            className="p-2 text-brand-text-muted hover:text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
`,
  "src/components/ui/FolderGrid.jsx": `import { motion } from 'framer-motion';
import { Folder } from 'lucide-react';

export default function FolderGrid({ folders, onFolderClick }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {folders.map((folder) => (
        <motion.div
          key={folder.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => onFolderClick(folder)}
          className="bg-brand-surface border border-brand-border rounded-xl p-4 cursor-pointer hover:border-brand-primary/50 hover:shadow-lg hover:shadow-brand-primary/5 transition-all group flex items-center gap-3"
        >
          <div className="p-2 bg-brand-primary/10 rounded-lg group-hover:bg-brand-primary/20 transition-colors">
            <Folder className="w-6 h-6 text-brand-primary" fill="currentColor" fillOpacity={0.2} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-brand-text truncate group-hover:text-brand-primary transition-colors">
              {folder.name}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
`,
  "src/components/ui/FileGrid.jsx": `import { useState } from 'react';
import { motion } from 'framer-motion';
import { File, MoreVertical, Download, Star, Trash, Edit2, Share2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as filesApi from '../../api/files';
import ShareModal from './ShareModal';

export default function FileGrid({ files, currentFolderId }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [shareFile, setShareFile] = useState(null);
  const queryClient = useQueryClient();

  const getExt = (name) => name.split('.').pop().toLowerCase();
  
  const getFileIcon = (filename) => {
    const ext = getExt(filename);
    if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(ext)) return 'bg-pink-500/10 text-pink-500';
    if (['pdf'].includes(ext)) return 'bg-red-500/10 text-red-500';
    if (['doc', 'docx'].includes(ext)) return 'bg-blue-500/10 text-blue-500';
    if (['xls', 'xlsx'].includes(ext)) return 'bg-green-500/10 text-green-500';
    if (['mp4', 'mov', 'avi'].includes(ext)) return 'bg-purple-500/10 text-purple-500';
    return 'bg-brand-secondary/10 text-brand-secondary';
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => filesApi.deleteFile(id),
    onSuccess: () => queryClient.invalidateQueries(['files'])
  });

  const starMutation = useMutation({
    mutationFn: ({id, isStarred}) => filesApi.updateFile(id, { isStarred: !isStarred }),
    onSuccess: () => queryClient.invalidateQueries(['files'])
  });

  const renameMutation = useMutation({
    mutationFn: ({id, name}) => filesApi.updateFile(id, { name }),
    onSuccess: () => queryClient.invalidateQueries(['files'])
  });

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Move to trash?')) deleteMutation.mutate(id);
    setActiveMenu(null);
  };

  const handleStar = (e, file) => {
    e.stopPropagation();
    starMutation.mutate({ id: file.id, isStarred: file.isStarred });
    setActiveMenu(null);
  };

  const handleRename = (e, file) => {
    e.stopPropagation();
    const newName = window.prompt('New name:', file.name);
    if (newName && newName !== file.name) {
      renameMutation.mutate({ id: file.id, name: newName });
    }
    setActiveMenu(null);
  };

  const handleDownload = (e, id) => {
    e.stopPropagation();
    window.open(\`http://localhost:8080/api/files/\${id}/download\`, '_blank');
    setActiveMenu(null);
  };

  const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {files.map((file) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brand-surface border border-brand-border rounded-xl p-4 flex items-center gap-3 hover:border-brand-primary/50 hover:shadow-lg transition-all relative group"
            onClick={() => setActiveMenu(null)}
          >
            <div className={\`p-3 rounded-lg \${getFileIcon(file.name)}\`}>
              <File className="w-6 h-6" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-brand-text truncate pr-6" title={file.name}>
                {file.name}
              </div>
              <div className="text-xs text-brand-text-muted mt-0.5">
                {formatSize(file.size)}
              </div>
            </div>

            {file.isStarred && (
              <Star className="w-3 h-3 text-yellow-400 absolute top-4 right-10" fill="currentColor" />
            )}

            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveMenu(activeMenu === file.id ? null : file.id);
              }}
              className="p-1 text-brand-text-muted hover:text-brand-text rounded-md hover:bg-brand-bg transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {/* Menu */}
            {activeMenu === file.id && (
              <div className="absolute top-12 right-2 w-48 bg-brand-surface border border-brand-border rounded-lg shadow-xl z-30 py-1 overflow-hidden">
                <button onClick={(e) => handleDownload(e, file.id)} className="w-full px-4 py-2 text-sm text-left text-brand-text hover:bg-brand-bg flex items-center gap-2">
                  <Download className="w-4 h-4" /> Download
                </button>
                <button onClick={(e) => handleRename(e, file)} className="w-full px-4 py-2 text-sm text-left text-brand-text hover:bg-brand-bg flex items-center gap-2">
                  <Edit2 className="w-4 h-4" /> Rename
                </button>
                <button onClick={(e) => { e.stopPropagation(); setShareFile(file); setActiveMenu(null); }} className="w-full px-4 py-2 text-sm text-left text-brand-text hover:bg-brand-bg flex items-center gap-2">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button onClick={(e) => handleStar(e, file)} className="w-full px-4 py-2 text-sm text-left text-brand-text hover:bg-brand-bg flex items-center gap-2">
                  <Star className="w-4 h-4" /> {file.isStarred ? 'Unstar' : 'Star'}
                </button>
                <div className="h-px bg-brand-border my-1" />
                <button onClick={(e) => handleDelete(e, file.id)} className="w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-red-500/10 flex items-center gap-2">
                  <Trash className="w-4 h-4" /> Delete
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      {shareFile && (
        <ShareModal 
          isOpen={!!shareFile} 
          onClose={() => setShareFile(null)} 
          file={shareFile} 
        />
      )}
    </>
  );
}
`,
  "src/components/ui/UploadModal.jsx": `import { useCallback } from 'react';
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-bg/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-brand-surface border border-brand-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
        >
          <div className="flex items-center justify-between p-4 border-b border-brand-border">
            <h3 className="text-lg font-medium text-brand-text">Upload Files</h3>
            <button onClick={onClose} className="p-1 text-brand-text-muted hover:text-brand-text hover:bg-brand-bg rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6">
            <div 
              {...getRootProps()} 
              className={\`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors \${isDragActive ? 'border-brand-primary bg-brand-primary/5' : 'border-brand-border hover:border-brand-primary/50 bg-brand-bg'}\`}
            >
              <input {...getInputProps()} />
              <UploadCloud className={\`w-12 h-12 mx-auto mb-4 \${isDragActive ? 'text-brand-primary' : 'text-brand-text-muted'}\`} />
              <p className="text-sm font-medium text-brand-text mb-1">
                {isDragActive ? "Drop files here" : "Drag & drop files here"}
              </p>
              <p className="text-xs text-brand-text-muted">
                or click to browse from your computer
              </p>
            </div>

            {uploadMutation.isPending && (
              <div className="mt-6 flex items-center gap-3 p-3 bg-brand-bg rounded-lg border border-brand-border">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-brand-primary"></div>
                <div className="text-sm text-brand-text">Uploading file...</div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
`,
  "src/components/ui/ShareModal.jsx": `import { useState } from 'react';
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
    navigator.clipboard.writeText(\`http://localhost:8080/api/files/\${file.id}/download\`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-bg/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-brand-surface border border-brand-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
        >
          <div className="flex items-center justify-between p-4 border-b border-brand-border">
            <h3 className="text-lg font-medium text-brand-text flex items-center gap-2">
              <Share2 className="w-5 h-5 text-brand-primary" /> Share File
            </h3>
            <button onClick={onClose} className="p-1 text-brand-text-muted hover:text-brand-text hover:bg-brand-bg rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">Share with email</label>
              <form onSubmit={handleShare} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="colleague@company.com"
                  className="flex-1 bg-brand-bg border border-brand-border rounded-lg px-3 py-2 text-sm text-brand-text focus:outline-none focus:border-brand-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={shareMutation.isPending}
                  className="px-4 py-2 bg-brand-primary text-white text-sm font-medium rounded-lg hover:bg-brand-primary/90 transition-colors disabled:opacity-50"
                >
                  {shareMutation.isPending ? 'Sharing...' : 'Share'}
                </button>
              </form>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">Copy link</label>
              <div className="flex items-center gap-2 p-2 bg-brand-bg border border-brand-border rounded-lg">
                <div className="flex-1 text-xs text-brand-text-muted truncate">
                  http://localhost:8080/api/files/{file.id}/download
                </div>
                <button
                  onClick={copyLink}
                  className="p-1.5 bg-brand-surface border border-brand-border rounded hover:bg-brand-surface-hover transition-colors text-brand-text"
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
`,
  "src/pages/Login.jsx": `import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-brand-text">Welcome back</h2>
      {error && <div className="p-3 mb-4 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-brand-text-muted mb-1">Email</label>
          <div className="relative">
            <Mail className="w-5 h-5 text-brand-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="email" 
              required
              className="w-full bg-brand-bg border border-brand-border rounded-lg py-2 pl-10 pr-4 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-brand-text-muted mb-1">Password</label>
          <div className="relative">
            <Lock className="w-5 h-5 text-brand-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="password" 
              required
              className="w-full bg-brand-bg border border-brand-border rounded-lg py-2 pl-10 pr-4 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-2.5 bg-brand-primary text-white rounded-lg font-medium hover:bg-brand-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
        </button>
      </form>
      
      <p className="mt-6 text-center text-sm text-brand-text-muted">
        Don't have an account? <Link to="/signup" className="text-brand-primary hover:underline font-medium">Sign up</Link>
      </p>
    </div>
  );
}
`,
  "src/pages/Signup.jsx": `import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, loading } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-brand-text">Create Account</h2>
      {error && <div className="p-3 mb-4 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-brand-text-muted mb-1">Full Name</label>
          <div className="relative">
            <User className="w-5 h-5 text-brand-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              required
              className="w-full bg-brand-bg border border-brand-border rounded-lg py-2 pl-10 pr-4 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-text-muted mb-1">Email</label>
          <div className="relative">
            <Mail className="w-5 h-5 text-brand-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="email" 
              required
              className="w-full bg-brand-bg border border-brand-border rounded-lg py-2 pl-10 pr-4 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-brand-text-muted mb-1">Password</label>
          <div className="relative">
            <Lock className="w-5 h-5 text-brand-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="password" 
              required
              className="w-full bg-brand-bg border border-brand-border rounded-lg py-2 pl-10 pr-4 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-2.5 bg-brand-primary text-white rounded-lg font-medium hover:bg-brand-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign Up'}
        </button>
      </form>
      
      <p className="mt-6 text-center text-sm text-brand-text-muted">
        Already have an account? <Link to="/login" className="text-brand-primary hover:underline font-medium">Sign in</Link>
      </p>
    </div>
  );
}
`,
  "src/api/files.js": `import api from './client';

export const getFiles = async (folderId = null) => {
  const url = folderId ? \`/files?folderId=\${folderId}\` : '/files';
  const response = await api.get(url);
  return response.data;
};

export const getStarredFiles = async () => {
  const response = await api.get('/files/starred');
  return response.data;
};

export const getSharedFiles = async () => {
  const response = await api.get('/files/shared');
  return response.data;
};

export const getTrashFiles = async () => {
  const response = await api.get('/files/trash');
  return response.data;
};

export const getRecentFiles = async () => {
  const response = await api.get('/files/recent');
  return response.data;
};

export const uploadFile = async (file, folderId = null) => {
  const formData = new FormData();
  formData.append('file', file);
  if (folderId) formData.append('folderId', folderId);
  const response = await api.post('/files/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteFile = async (id) => {
  const response = await api.delete(\`/files/\${id}\`);
  return response.data;
};

export const updateFile = async (id, data) => {
  const response = await api.put(\`/files/\${id}\`, data);
  return response.data;
};

export const shareFile = async (id, email) => {
  const response = await api.post(\`/files/\${id}/share\`, { email });
  return response.data;
};
`,
  "src/api/folders.js": `import api from './client';

export const getFolders = async (parentId = null) => {
  const url = parentId ? \`/folders?parentId=\${parentId}\` : '/folders';
  const response = await api.get(url);
  return response.data;
};

export const createFolder = async (name, parentId = null) => {
  const response = await api.post('/folders', { name, parentId });
  return response.data;
};

export const deleteFolder = async (id) => {
  const response = await api.delete(\`/folders/\${id}\`);
  return response.data;
};

export const updateFolder = async (id, data) => {
  const response = await api.put(\`/folders/\${id}\`, data);
  return response.data;
};
`
};

Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  console.log('Wrote', filePath);
});
