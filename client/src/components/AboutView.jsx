import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function AboutView() {
  return (
    <motion.div
      key="about"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      style={{ height: '100%', overflowY: 'auto', paddingBottom: '4rem' }}
    >
      <div className="about-page-container">
        <div className="about-header">
          <div className="developer-avatar">S</div>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: 0, color: 'var(--text-main)', textTransform: 'uppercase' }}>Shiv Pratap Singh</h1>
            <p style={{ fontSize: '1rem', color: 'var(--accent-color)', fontWeight: 700, margin: '0.25rem 0 0 0' }}>MCA Student & Full-Stack Developer</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>Haldia Institute of Technology</p>
          </div>
        </div>

        <section className="feature-glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Biography</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
            I am an MCA student at Haldia Institute of Technology with a strong passion for web technologies and full-stack development. I engineered this production-ready, feature-rich CV builder application to enable job-seekers to craft outstanding, structured, and modern resumes. This tool is completely free, unlocked, and integrates advanced career features inspired by industry leaders.
          </p>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: '1rem 0 0 0' }}>Tech Stack & Expertise</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['React.js', 'Node.js', 'Express', 'MongoDB', 'Vanilla CSS', 'REST APIs', 'JWT Auth', 'Vite', 'Git & GitHub'].map(skill => (
              <span key={skill} className="skill-badge">{skill}</span>
            ))}
          </div>

          <div className="about-info-grid">
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>Education</h4>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                <strong>Master of Computer Applications (MCA)</strong><br />
                Haldia Institute of Technology<br />
                <em>Pursuing</em>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 0.5rem 0', textTransform: 'uppercase' }}>Connect With Me</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  LinkedIn Profile <ExternalLink size={12} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  GitHub Repositories <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
