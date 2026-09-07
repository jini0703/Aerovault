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
              <a href="#" className="hover:text-brand-primary transition-colors">About Us</a>
              <a href="#" className="hover:text-brand-primary transition-colors">Services</a>
              <a href="#" className="hover:text-brand-primary transition-colors">Pages</a>
              <a href="#" className="hover:text-brand-primary transition-colors">Blogs</a>
              <a href="#" className="hover:text-brand-primary transition-colors">Contact Us</a>
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

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-4 py-20 relative z-20 bg-brand-bg">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Team Text Content */}
          <div className="col-span-1 flex flex-col justify-center">
            <div className="flex items-center text-brand-primary text-sm font-bold mb-4">
              <Folder className="w-4 h-4 mr-2" />
              Meet Management Team
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text leading-tight mb-4">
              Handles All Of Your File Needs
            </h2>
            <p className="text-brand-text-muted text-sm mb-8 leading-relaxed">
              Aerovault provides secure, reliable, and beautifully designed cloud storage for teams and individuals.
            </p>
            <div className="flex gap-3">
              <button className="w-12 h-12 rounded-full bg-brand-surface border border-brand-border text-brand-text flex items-center justify-center hover:bg-brand-surface-secondary transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-hover transition-colors shadow-md shadow-brand-primary/20">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Team Cards */}
          <div className="col-span-3 grid md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-brand-surface rounded-3xl overflow-hidden shadow-sm border border-brand-border flex flex-col group transition-shadow hover:shadow-lg hover:shadow-brand-primary/5">
              <div className="h-64 bg-brand-surface-secondary relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" alt="CEO" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-brand-text">Paul Alexander</h3>
                  <p className="text-xs text-brand-text-muted mt-1">CEO</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-brand-primary-soft text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-brand-primary rounded-3xl overflow-hidden shadow-lg shadow-brand-primary/20 flex flex-col group text-white">
              <div className="h-64 bg-brand-surface relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop" alt="Designer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                {/* Social icons overlay */}
                <div className="absolute right-3 bottom-3 flex flex-col gap-2">
                  <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/40 transition-colors"><Globe className="w-4 h-4" /></button>
                  <button className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-md"><Mail className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold">Jessica Johns</h3>
                  <p className="text-xs text-white/80 mt-1">Designer</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/40 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-brand-surface rounded-3xl overflow-hidden shadow-sm border border-brand-border flex flex-col group transition-shadow hover:shadow-lg hover:shadow-brand-primary/5">
              <div className="h-64 bg-brand-surface-secondary relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop" alt="Manager" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-brand-text">David Smith</h3>
                  <p className="text-xs text-brand-text-muted mt-1">Engineering Manager</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-brand-primary-soft text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
