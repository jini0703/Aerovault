import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, FolderPlus, UploadCloud, Folder, File, Search, ChevronRight, HardDrive, Image as ImageIcon, FileText } from 'lucide-react';
import * as filesApi from '../api/files';
import * as foldersApi from '../api/folders';
import UploadModal from '../components/ui/UploadModal';
import FileGrid from '../components/ui/FileGrid';
import FolderGrid from '../components/ui/FolderGrid';
import PromptModal from '../components/ui/PromptModal';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([{ id: null, name: 'My Files' }]);
  const [folderPrompt, setFolderPrompt] = useState(false);
  const location = useLocation();
  const queryClient = useQueryClient();
  const { user } = useAuth();

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
    setFolderPrompt(true);
  };

  const submitCreateFolder = (name) => {
    if (name && name.trim()) {
      createFolderMutation.mutate(name.trim());
    }
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
  
  const [activeFilter, setActiveFilter] = useState(null); // 'media' | 'documents' | null

  const isRoot = routeContext.type === 'my-files' && !currentFolderId;

  // Calculate real stats for root files
  const getExt = (name) => name?.split('.').pop().toLowerCase() || '';
  const isMedia = (filename) => ['jpg', 'jpeg', 'png', 'gif', 'svg', 'mp4', 'mov', 'avi'].includes(getExt(filename));
  const isDocument = (filename) => ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'csv'].includes(getExt(filename));
  
  const mediaCount = filesData?.filter(f => isMedia(f.name)).length || 0;
  const documentCount = filesData?.filter(f => isDocument(f.name)).length || 0;

  // Filter files for display
  const displayFiles = filesData?.filter(f => {
    if (activeFilter === 'media') return isMedia(f.name);
    if (activeFilter === 'documents') return isDocument(f.name);
    return true;
  }) || [];

  return (
    <div className="h-full flex flex-col space-y-6">
      
      {/* Welcome Header at Root */}
      {isRoot && (
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-brand-text">Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋</h1>
          <p className="text-brand-text-muted text-sm mt-1">Here is what's happening with your files today.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {/* Soft Status Cards */}
            <div 
              onClick={() => setActiveFilter(null)}
              className={`bg-brand-surface border rounded-3xl p-5 flex items-center gap-4 transition-all cursor-pointer ${activeFilter === null ? 'border-brand-primary shadow-md shadow-brand-primary/10 ring-2 ring-brand-primary/10' : 'border-brand-border shadow-sm hover:shadow-md'}`}
            >
               <div className="w-12 h-12 rounded-full bg-brand-primary-soft/30 text-brand-primary flex items-center justify-center">
                 <HardDrive className="w-6 h-6" />
               </div>
               <div>
                 <div className="text-brand-text font-bold text-lg">{filesData?.length || 0} Files, {foldersData?.length || 0} Folders</div>
                 <div className="text-brand-text-muted text-xs">Total in Root</div>
               </div>
            </div>
            <div 
              onClick={() => setActiveFilter('media')}
              className={`bg-brand-surface border rounded-3xl p-5 flex items-center gap-4 transition-all cursor-pointer ${activeFilter === 'media' ? 'border-brand-soft-blue shadow-md shadow-brand-soft-blue/20 ring-2 ring-brand-soft-blue/20' : 'border-brand-border shadow-sm hover:shadow-md'}`}
            >
               <div className="w-12 h-12 rounded-full bg-brand-soft-blue/20 text-brand-soft-blue flex items-center justify-center">
                 <ImageIcon className="w-6 h-6" />
               </div>
               <div>
                 <div className="text-brand-text font-bold text-lg">{mediaCount} Items</div>
                 <div className="text-brand-text-muted text-xs">Media (Photos & Videos)</div>
               </div>
            </div>
            <div 
              onClick={() => setActiveFilter('documents')}
              className={`bg-brand-surface border rounded-3xl p-5 flex items-center gap-4 transition-all cursor-pointer ${activeFilter === 'documents' ? 'border-brand-primary shadow-md shadow-brand-primary/20 ring-2 ring-brand-primary/20' : 'border-brand-border shadow-sm hover:shadow-md'}`}
            >
               <div className="w-12 h-12 rounded-full bg-brand-soft-lavender/30 text-brand-primary flex items-center justify-center">
                 <FileText className="w-6 h-6" />
               </div>
               <div>
                 <div className="text-brand-text font-bold text-lg">{documentCount} Items</div>
                 <div className="text-brand-text-muted text-xs">Documents (PDFs & Texts)</div>
               </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-medium text-brand-text">
          {routeContext.type === 'my-files' ? (
            <div className="flex items-center">
              {breadcrumbs.map((crumb, idx) => (
                <div key={crumb.id || 'root'} className="flex items-center">
                  <button 
                    onClick={() => handleBreadcrumbClick(idx)}
                    className={`hover:text-brand-primary transition-colors font-semibold ${idx === breadcrumbs.length - 1 ? 'text-brand-text' : 'text-brand-text-muted'}`}
                  >
                    {crumb.name}
                  </button>
                  {idx < breadcrumbs.length - 1 && <ChevronRight className="w-4 h-4 mx-2 text-brand-text-muted" />}
                </div>
              ))}
            </div>
          ) : (
            <span className="font-semibold">{routeContext.title}</span>
          )}
        </div>
        
        {routeContext.type === 'my-files' && (
          <div className="flex items-center gap-3">
            <button 
              onClick={handleCreateFolder}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-2xl bg-brand-surface border border-brand-border hover:bg-brand-surface-secondary text-brand-text transition-all shadow-sm"
            >
              <FolderPlus className="w-4 h-4" />
              <span className="hidden sm:inline">New Folder</span>
            </button>
            <button 
              onClick={() => setIsUploadOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-2xl bg-brand-primary text-white hover:bg-brand-primary-hover transition-all shadow-lg shadow-brand-primary/20"
            >
              <UploadCloud className="w-4 h-4" />
              <span className="hidden sm:inline">Upload</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto pb-8 space-y-8">
        {routeContext.type === 'my-files' && foldersData.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-brand-text-muted mb-4 uppercase tracking-wider">Folders</h3>
            <FolderGrid folders={foldersData} onFolderClick={handleFolderClick} />
          </div>
        )}

        <div>
          {routeContext.type === 'my-files' && foldersData.length > 0 && displayFiles.length > 0 && (
            <h3 className="text-xs font-bold text-brand-text-muted mb-4 uppercase tracking-wider">Files</h3>
          )}
          {filesLoading || foldersLoading ? (
             <div className="flex justify-center p-12">
               <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary"></div>
             </div>
          ) : (
            <FileGrid files={displayFiles} currentFolderId={currentFolderId} />
          )}
          
          {!filesLoading && !foldersLoading && displayFiles.length === 0 && foldersData.length === 0 && (
            <div className="flex flex-col items-center justify-center p-20 text-center bg-brand-surface-secondary/50 border border-brand-border border-dashed rounded-[2rem]">
              {routeContext.type === 'my-files' ? (
                <>
                  <div className="w-20 h-20 bg-brand-surface rounded-full flex items-center justify-center mb-4 shadow-sm border border-brand-border">
                    <UploadCloud className="w-10 h-10 text-brand-primary opacity-80" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-text mb-2">No files here</h3>
                  <p className="text-brand-text-muted mb-6 text-sm">Upload some files or create a folder to get started</p>
                  <button 
                    onClick={() => setIsUploadOpen(true)}
                    className="px-5 py-2.5 bg-brand-primary text-white rounded-2xl hover:bg-brand-primary-hover transition-all text-sm font-medium shadow-lg shadow-brand-primary/20"
                  >
                    Upload File
                  </button>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-brand-surface rounded-full flex items-center justify-center mb-4 shadow-sm border border-brand-border">
                    <File className="w-10 h-10 text-brand-primary opacity-80" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-text mb-2">It's empty here</h3>
                  <p className="text-brand-text-muted mb-6 text-sm">No files found in {routeContext.title.toLowerCase()}</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <UploadModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
        currentFolderId={currentFolderId}
      />

      <PromptModal
        isOpen={folderPrompt}
        onClose={() => setFolderPrompt(false)}
        onSubmit={submitCreateFolder}
        title="Create New Folder"
        placeholder="Enter folder name..."
        icon="folder"
      />
    </div>
  );
}
