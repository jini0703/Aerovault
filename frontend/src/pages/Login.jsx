import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Loader2, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { login as loginApi } from '../api/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await loginApi({ email, password });
      login(data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative">
      <button 
        onClick={toggleTheme}
        className="absolute -top-12 right-0 p-2 text-brand-text-muted hover:text-brand-text bg-brand-surface-secondary/50 rounded-full transition-colors hover:bg-brand-surface-secondary"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
      <h2 className="text-2xl font-bold mb-6 text-center text-brand-text">Welcome back</h2>
      {error && <div className="p-3 mb-4 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-2xl">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-brand-text-muted mb-2 px-1">Email</label>
          <div className="relative group">
            <Mail className="w-5 h-5 text-brand-text-muted absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-brand-primary transition-colors" />
            <input 
              type="email" 
              required
              autoComplete="username"
              className="w-full bg-brand-bg/50 border border-brand-border rounded-2xl py-3 pl-12 pr-4 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all hover:border-brand-primary/50"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-brand-text-muted mb-2 px-1">Password</label>
          <div className="relative group">
            <Lock className="w-5 h-5 text-brand-text-muted absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-brand-primary transition-colors" />
            <input 
              type="password" 
              required
              autoComplete="current-password"
              className="w-full bg-brand-bg/50 border border-brand-border rounded-2xl py-3 pl-12 pr-4 text-brand-text focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all hover:border-brand-primary/50"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3 mt-2 bg-brand-primary text-white rounded-2xl font-medium hover:bg-brand-primary-hover transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-brand-primary/20"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
        </button>
      </form>
      
      <p className="mt-8 text-center text-sm text-brand-text-muted">
        Don't have an account? <Link to="/signup" className="text-brand-primary hover:text-brand-primary-hover hover:underline font-semibold ml-1">Sign up</Link>
      </p>
    </div>
  );
}
