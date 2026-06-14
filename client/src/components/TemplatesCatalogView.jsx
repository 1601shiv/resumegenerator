import React from 'react';
import { motion } from 'framer-motion';

export default function TemplatesCatalogView({
  setView,
  filterSearch,
  setFilterSearch,
  filterLayout,
  setFilterLayout,
  filterColor,
  setFilterColor,
  SWATCH_HUES,
  filteredPresets,
  resume,
  selectTemplate,
  setResume,
  showToast
}) {
  return (
    <motion.div
      key="templates"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      style={{ height: '100%', overflowY: 'auto', paddingBottom: '4rem' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: 0, textTransform: 'uppercase' }}>Templates Catalog</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Choose from 120+ pre-seeded layout styles to jumpstart your resume design.</p>
        </div>

        <div className="template-filters">
          <input 
            type="text" 
            className="filter-input" 
            placeholder="Search templates..." 
            value={filterSearch} 
            onChange={e => setFilterSearch(e.target.value)} 
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredPresets.map(tpl => (
            <div
              key={tpl.id}
              className="feature-glass-card"
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '190px' }}
              onClick={() => {
                if (resume) {
                  selectTemplate(tpl);
                } else {
                  setResume({
                    title: `CV - ${tpl.name}`,
                    personalInfo: { name: 'Your Name', email: 'email@example.com', phone: '123-456-7890', linkedin: '', github: '' },
                    summary: 'A short summary of your professional background.',
                    experience: [],
                    projects: [],
                    education: [],
                    certifications: [],
                    skills: { core: [], languages: [], backend: [], frontend: [], tools: [] },
                    settings: {
                      templateId: tpl.id,
                      accentColor: tpl.defaultColor.replace('hsl(', '').replace(')', ''),
                      fontFamily: tpl.fontPairing,
                      borderStyle: tpl.borderStyle,
                      margins: 'standard'
                    }
                  });
                }
                setView('editor');
                showToast(`Loaded Template: ${tpl.name}`);
              }}
            >
              <div>
                <span className="hero-badge" style={{ backgroundColor: tpl.defaultColor + '20', color: tpl.defaultColor, marginBottom: '0.5rem' }}>
                  {tpl.layoutType.toUpperCase()}
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0.5rem 0 0.25rem 0' }}>{tpl.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>{tpl.description}</p>
              </div>
              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Font: {tpl.fontPairing}</span>
                <span className="resume-accent-text" style={{ fontSize: '0.8rem', fontWeight: 800, color: tpl.defaultColor }}>Use Style →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
