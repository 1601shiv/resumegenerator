import React, { useState } from 'react';
import { FileText, Sun, Moon, LogIn, LogOut, Menu, X } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="global-nav no-print">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => { setView('home'); setIsOpen(false); }}>
        <div className="logo-icon">
          <FileText size={18} />
        </div>
        <span style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          CV BUILDER PRO
        </span>
      </div>
      <div className={`nav-links ${isOpen ? 'mobile-open' : ''}`}>
        <span className={`nav-link ${view === 'home' ? 'active' : ''}`} onClick={() => { setView('home'); setIsOpen(false); }}>Home</span>
        <span className={`nav-link ${view === 'templates' ? 'active' : ''}`} onClick={() => { setView('templates'); setIsOpen(false); }}>Templates</span>
        <span className={`nav-link ${view === 'about' ? 'active' : ''}`} onClick={() => { setView('about'); setIsOpen(false); }}>About Developer</span>
        {user && user.isAdmin && (
          <span className={`nav-link ${view === 'admin' ? 'active' : ''}`} onClick={() => { setView('admin'); setIsOpen(false); }} style={{ color: '#f59e0b', fontWeight: 800 }}>Admin Panel</span>
        )}
        <span className={`nav-link ${view === 'dashboard' ? 'active' : ''}`} onClick={() => {
          setIsOpen(false);
          if (!user) {
            setAuthTab('login');
            setShowAuthModal(true);
          } else {
            setView('dashboard');
          }
        }}>My Dashboard</span>
        <span className={`nav-link ${view === 'editor' ? 'active' : ''}`} onClick={() => { setView('editor'); setIsOpen(false); }}>Editor</span>
        <span className={`nav-link ${view === 'ats' ? 'active' : ''}`} onClick={() => { setView('ats'); setIsOpen(false); }}>ATS Scanner</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'inline-block', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} className="no-mobile-name">Hi, <strong>{user.name.split(' ')[0]}</strong></span>
            <button className="btn btn-secondary btn-small" onClick={() => { setIsOpen(false); handleLogout(); }} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <LogOut size={13} />
              <span className="no-mobile-name">Logout</span>
            </button>
          </div>
        ) : (
          <button className="btn btn-primary btn-small" onClick={() => { setIsOpen(false); setAuthTab('login'); setShowAuthModal(true); }} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <LogIn size={13} />
            <span>Sign In</span>
          </button>
        )}

        {/* Hamburger Menu Toggle for Mobile */}
        <button 
          className="btn btn-secondary mobile-menu-toggle-btn"
          style={{ display: 'none', padding: '0.6rem' }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={15} /> : <Menu size={15} />}
        </button>
      </div>
    </nav>
  );
}
