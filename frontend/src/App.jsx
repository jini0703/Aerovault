import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg text-brand-text">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg text-brand-text">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Landing />} />
      
      <Route element={<AuthLayout />}>
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />
      </Route>

      <Route element={
        <PrivateRoute>
          <MainLayout />
        </PrivateRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recent" element={<Dashboard />} />
        <Route path="/starred" element={<Dashboard />} />
        <Route path="/shared" element={<Dashboard />} />
        <Route path="/trash" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
