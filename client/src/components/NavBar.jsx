import React from 'react';
import { FileText, Sun, Moon, LogIn, LogOut } from 'lucide-react';

export default function NavBar({
  view,
  setView,
  user,
  theme,
  setTheme,
  handleLogout,
  setAuthTab,
  setShowAuthModal
}) {
  return (
    <nav className="global-nav no-print">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setView('home')}>
        <div className="logo-icon">
          <FileText size={18} />
        </div>
        <span style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          CV BUILDER PRO
        </span>
      </div>
      <div className="nav-links">
        <span className={`nav-link ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>Home</span>
        <span className={`nav-link ${view === 'templates' ? 'active' : ''}`} onClick={() => setView('templates')}>Templates</span>
        <span className={`nav-link ${view === 'about' ? 'active' : ''}`} onClick={() => setView('about')}>About Developer</span>
        {user && user.isAdmin && (
          <span className={`nav-link ${view === 'admin' ? 'active' : ''}`} onClick={() => setView('admin')} style={{ color: '#f59e0b', fontWeight: 800 }}>Admin Panel</span>
        )}
        <span className={`nav-link ${view === 'dashboard' ? 'active' : ''}`} onClick={() => {
          if (!user) {
            setAuthTab('login');
            setShowAuthModal(true);
          } else {
            setView('dashboard');
          }
        }}>My Dashboard</span>
        <span className={`nav-link ${view === 'editor' ? 'active' : ''}`} onClick={() => setView('editor')}>Editor</span>
        <span className={`nav-link ${view === 'ats' ? 'active' : ''}`} onClick={() => setView('ats')}>ATS Scanner</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        
        {/* Theme Toggle switch */}
        <button 
          className="btn btn-secondary" 
          onClick={() => {
            const nt = theme === 'dark' ? 'light' : 'dark';
            setTheme(nt);
            localStorage.setItem('dashboard-theme', nt);
          }}
          style={{ padding: '0.6rem' }}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Profile sign in / out */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Hi, <strong>{user.name.split(' ')[0]}</strong></span>
            <button className="btn btn-secondary btn-small" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <button className="btn btn-primary btn-small" onClick={() => { setAuthTab('login'); setShowAuthModal(true); }} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <LogIn size={13} />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </nav>
  );
}
