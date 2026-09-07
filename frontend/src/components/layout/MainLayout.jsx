import { Outlet } from 'react-router-dom';
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
