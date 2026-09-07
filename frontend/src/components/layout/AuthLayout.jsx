import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-primary-soft/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-soft-blue/20 blur-[120px] pointer-events-none" />

      {/* Visual Side Panel (Left) */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center bg-brand-surface-secondary/50 border-r border-brand-border relative z-10 p-12 overflow-hidden">
        {/* Soft Cloud Illustration */}
        <motion.div 
          animate={{ 
            y: [-10, 10, -10]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6,
            ease: "easeInOut"
          }}
          className="relative w-96 h-96 mb-12"
        >
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-brand-primary-soft to-brand-soft-blue opacity-40 blur-2xl" />
          <div className="absolute inset-8 bg-brand-surface rounded-[3rem] shadow-xl shadow-brand-primary/10 flex items-center justify-center border border-brand-border">
             <Cloud className="w-32 h-32 text-brand-primary" fill="currentColor" fillOpacity={0.2} />
          </div>
          {/* Floating elements */}
          <motion.div 
             animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-10 -left-10 w-20 h-20 bg-brand-primary/20 backdrop-blur-md rounded-2xl border border-white/20" 
          />
          <motion.div 
             animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-10 -right-5 w-16 h-16 bg-brand-soft-blue/30 backdrop-blur-md rounded-full border border-white/20" 
          />
        </motion.div>
        
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-brand-text">Your Digital Cloud</h2>
          <p className="text-brand-text-muted">
            Secure, organize, and share your files in a beautifully soft cloud environment.
          </p>
        </div>
      </div>

      {/* Auth Content (Right) */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 relative z-10">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Cloud className="w-8 h-8 text-brand-primary" />
            <span className="text-2xl font-bold tracking-tight">Aerovault</span>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-brand-surface border border-brand-border rounded-3xl shadow-2xl shadow-brand-primary/5 p-8 relative overflow-hidden"
          >
            {/* Soft top gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary-soft via-brand-primary to-brand-soft-blue" />
            
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
