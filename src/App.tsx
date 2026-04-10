import { useState, useEffect } from 'react';
import { TypeformInterface } from './components/TypeformInterface';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLogin } from './components/AdminLogin';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if admin panel should be shown based on URL
  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.get('admin') === 'true' || window.location.pathname.includes('/admin');

  // Check for existing admin session on component mount
  useEffect(() => {
    if (isAdmin) {
      const session = localStorage.getItem('admin-session');
      if (session) {
        try {
          const parsed = JSON.parse(session);
          // Check if session is less than 24 hours old
          const isValidSession = parsed.authenticated && 
            (Date.now() - parsed.timestamp) < 24 * 60 * 60 * 1000;
          setIsAuthenticated(isValidSession);
          
          if (!isValidSession) {
            localStorage.removeItem('admin-session');
          }
        } catch (error) {
          console.error('Error parsing admin session:', error);
          localStorage.removeItem('admin-session');
          setIsAuthenticated(false);
        }
      }
    }
  }, [isAdmin]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-session');
    setIsAuthenticated(false);
  };

  // Show main form if not admin route
  if (!isAdmin) {
    return (
      <>
        <TypeformInterface />
        <Toaster />
      </>
    );
  }

  // Show admin login if admin route but not authenticated
  if (isAdmin && !isAuthenticated) {
    return (
      <>
        <AdminLogin onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  // Show admin dashboard if authenticated
  return (
    <>
      <AdminDashboard onLogout={handleLogout} />
      <Toaster />
    </>
  );
}