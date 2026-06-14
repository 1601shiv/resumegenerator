import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Printer } from 'lucide-react';
import { ResumeBloom } from './UIComponents';

export default function LandingView({ setView }) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      style={{ height: '100%', overflowY: 'auto', paddingBottom: '4rem' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '6.5rem 1.5rem 4rem 1.5rem', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }} className="hero-grid-responsive">
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <span className="hero-badge" style={{ alignSelf: 'flex-start', margin: 0 }}>✨ Free Unlimited CV Builder</span>
          <h1 className="hero-title" style={{ textAlign: 'left', margin: 0 }}>Create Standout Resumes in Minutes</h1>
          <p className="hero-subtitle" style={{ textAlign: 'left', margin: 0 }}>
            Use professional layouts, customize fonts, colors, and margins with zero restrictions. Enhance bullet points with our built-in suggestion engine and compare with Indeed job compatibility scores.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button className="btn btn-primary" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem' }} onClick={() => setView('templates')}>
              Explore 120+ Templates
            </button>
            <button className="btn btn-secondary" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem' }} onClick={() => setView('editor')}>
              Start Designing CV
            </button>
          </div>
        </div>
        
        {/* Resume Bloom Canvas Preview */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ResumeBloom />
        </div>
      </div>

      {/* Features Grid */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-glass-card">
            <div className="feature-icon-box">
              <Layout size={24} />
            </div>
            <h3 className="feature-title">120+ Preset Combinations</h3>
            <p className="feature-desc">
              Explore over 120 template layouts, headers, margins, and borders in real-time to match your desired industry standard.
            </p>
          </div>
          <div className="feature-glass-card">
            <div className="feature-icon-box">
              <span style={{ fontSize: '1.4rem' }}>✨</span>
            </div>
            <h3 className="feature-title">Interactive AI Suggestions</h3>
            <p className="feature-desc">
              Craft high-quality achievements using our interactive text suggestion boxes to polish your experience descriptions.
            </p>
          </div>
          <div className="feature-glass-card">
            <div className="feature-icon-box">
              <Printer size={24} />
            </div>
            <h3 className="feature-title">Indeed Compatibility Tracker</h3>
            <p className="feature-desc">
              Measure your CV skills score dynamically against real-time indeed job requirements and apply instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">120+</span>
            <span className="stat-label">Template Designs</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Free Unlocked Features</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">Instant</span>
            <span className="stat-label">PDF Downloads</span>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
