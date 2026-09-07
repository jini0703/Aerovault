import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cloud, Folder, Play, ArrowRight, ArrowLeft, Users, User, Share2, Globe, Mail, Camera, Layout } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-brand-bg font-sans overflow-x-hidden transition-colors">
      
      {/* Top Section */}
      <div className="bg-brand-surface relative pt-6 pb-40">
        
        {/* Navigation Bar */}
        <div className="max-w-6xl mx-auto px-4 relative z-20">
          <div className="flex items-center justify-between bg-brand-surface-secondary rounded-full pr-2 h-16 shadow-lg shadow-brand-primary/10 border border-brand-border">
            
            {/* Logo area */}
            <div className="bg-brand-primary h-20 px-8 rounded-[40px] flex items-center justify-center -ml-2 -my-2 text-white shadow-lg shadow-brand-primary/20">
              <Cloud className="w-6 h-6 mr-2" />
              <span className="font-bold text-lg">Aerovault</span>
            </div>

            {/* Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-brand-text-muted">
              <a href="#" className="hover:text-brand-primary transition-colors">Home</a>
              <a href="#about-project" className="hover:text-brand-primary transition-colors">About Project</a>
            </div>

            {/* Profile Button */}
            <div className="w-12 h-12 bg-brand-primary-soft rounded-full flex items-center justify-center text-brand-primary mr-2">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="max-w-6xl mx-auto px-4 mt-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div>
              <div className="flex items-center text-brand-primary text-sm mb-4 font-medium px-4 py-2 bg-brand-primary/10 rounded-full w-fit">
                <Folder className="w-4 h-4 mr-2" />
                Welcome To Aerovault
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-brand-text leading-[1.1] mb-8">
                Access Your Data Anytime, Anywhere — Protected And In Sync.
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/signup" className="flex items-center bg-brand-primary text-white rounded-full py-2 pl-6 pr-2 hover:bg-brand-primary-hover transition-colors shadow-lg shadow-brand-primary/20">
                  <span className="mr-4 text-sm font-semibold">Explore More</span>
                  <div className="w-8 h-8 bg-white text-brand-primary rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
                
                <Link to="/login" className="flex items-center bg-brand-surface text-brand-text border border-brand-border rounded-full py-2 pl-6 pr-2 hover:bg-brand-surface-secondary transition-colors">
                  <span className="mr-4 text-sm font-semibold">Login</span>
                  <div className="w-8 h-8 bg-brand-primary-soft text-brand-primary rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Content - Mockup Cards */}
            <div className="relative h-[400px]">
              {/* Play Button */}
              <div className="absolute top-0 right-10 w-16 h-16 bg-brand-surface border border-brand-border shadow-lg shadow-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary z-20 cursor-pointer hover:bg-brand-surface-secondary transition-colors">
                <Play className="w-6 h-6 ml-1" />
              </div>

              {/* Upload Files Card */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                className="absolute top-10 right-0 w-64 bg-brand-surface border border-brand-border rounded-3xl p-5 shadow-xl shadow-brand-primary/5 z-10"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-brand-primary-soft text-brand-primary rounded-full flex items-center justify-center mr-3">
                    <Cloud className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm text-brand-text">Storage Status</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2"><span className="text-brand-text-muted">Total</span><span className="text-brand-text">70%</span></div>
                    <div className="h-2 bg-brand-surface-secondary rounded-full overflow-hidden"><div className="h-full bg-brand-primary rounded-full w-[70%]" /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2"><span className="text-brand-text-muted">Documents</span><span className="text-brand-text">45%</span></div>
                    <div className="h-2 bg-brand-surface-secondary rounded-full overflow-hidden"><div className="h-full bg-brand-soft-blue rounded-full w-[45%]" /></div>
                  </div>
                </div>
              </motion.div>

              {/* Stats Card */}
              <motion.div 
                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                className="absolute top-32 left-0 w-72 bg-brand-primary rounded-3xl p-6 shadow-2xl shadow-brand-primary/30 z-20 text-white"
              >
                <h3 className="font-bold text-sm mb-4">File Types</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-brand-soft-lavender mr-2"/> Images</div>
                    <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-brand-soft-blue mr-2"/> Videos</div>
                    <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-white mr-2"/> Docs</div>
                  </div>
                  {/* Custom Donut Chart */}
                  <div className="w-24 h-24 rounded-full border-[10px] border-white/20 relative">
                     <div className="absolute inset-[-10px] border-[10px] border-white rounded-full" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 50%)' }}/>
                     <div className="absolute inset-[-10px] border-[10px] border-brand-soft-blue rounded-full" style={{ clipPath: 'polygon(50% 50%, 0 0, 50% 0)' }}/>
                     <div className="absolute inset-[-10px] border-[10px] border-brand-soft-lavender rounded-full" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 0 100%, 0 0)' }}/>
                  </div>
                </div>
              </motion.div>

              {/* Total User Card */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                className="absolute bottom-0 right-10 w-56 bg-brand-surface border border-brand-border rounded-3xl p-5 shadow-xl shadow-brand-primary/5 z-30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-brand-primary-soft text-brand-primary rounded-full flex items-center justify-center mr-3">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-sm text-brand-text">Active Users</span>
                  </div>
                </div>
                <div className="font-bold text-2xl text-brand-text mb-2">10k+</div>
                {/* Fake Bar Chart */}
                <div className="flex items-end justify-between h-16 pt-2 gap-1.5">
                  {['M','T','W','T','F','S','S'].map((day, i) => (
                    <div key={i} className="flex flex-col items-center flex-1">
                      <div className={`w-full rounded-t-sm ${i > 4 ? 'bg-brand-primary' : 'bg-brand-primary-soft'}`} style={{ height: `${30 + (i*10)%40}%` }} />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Trusted People Card */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }}
                className="absolute bottom-12 left-10 bg-brand-surface-secondary border border-brand-border text-brand-text rounded-2xl py-3 px-5 shadow-lg z-20 flex items-center gap-4"
              >
                <Users className="w-8 h-8 text-brand-primary" />
                <div>
                  <div className="font-bold text-lg">99.9%</div>
                  <div className="text-xs text-brand-text-muted">Uptime Sync</div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* Credit Section */}
      <div id="about-project" className="max-w-6xl mx-auto px-4 py-32 relative z-20 bg-brand-bg flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-bold mb-6 border border-brand-primary/20"
        >
          <Folder className="w-4 h-4" />
          Aerovault Architecture
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-brand-text leading-tight mb-6 max-w-2xl"
        >
          Engineered & Designed by <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-soft-blue relative inline-block mt-2">
            Anjini Pandey
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary/0 via-brand-primary/50 to-brand-primary/0 rounded-full" />
          </span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-brand-text-muted text-base md:text-lg mb-10 max-w-2xl leading-relaxed"
        >
          A full-stack, enterprise-grade cloud storage platform featuring Java Spring Boot, PostgreSQL, AWS S3, and React. Built from the ground up for security, speed, and seamless file management.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-6"
        >
          <button className="w-14 h-14 rounded-full bg-brand-surface border border-brand-border text-brand-text flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all shadow-md hover:shadow-brand-primary/20 hover:-translate-y-1">
             <Globe className="w-6 h-6" />
          </button>
          <button className="w-14 h-14 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-hover transition-all shadow-lg shadow-brand-primary/20 hover:-translate-y-1">
             <Mail className="w-6 h-6" />
          </button>
        </motion.div>
      </div>

    </div>
  );
}
