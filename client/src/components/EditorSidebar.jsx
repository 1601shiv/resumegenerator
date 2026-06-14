import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Layout, User, Briefcase, FolderGit2, GraduationCap, 
  Settings2, Plus, Trash2, Check, Eye, ExternalLink,
  ChevronUp, ChevronDown, ArrowUp, ArrowDown,
  Undo, Redo, Sparkles, Shield, Lock, X, CheckCircle, Download, Share2, History, ArrowUpDown
} from 'lucide-react';

// Swatch hues
const SWATCH_HUES = [
  { name: 'Red', hue: '0', sat: '85%', lit: '45%' },
  { name: 'Orange', hue: '24', sat: '90%', lit: '50%' },
  { name: 'Gold', hue: '45', sat: '80%', lit: '40%' },
  { name: 'Green', hue: '142', sat: '70%', lit: '35%' },
  { name: 'Teal', hue: '180', sat: '60%', lit: '35%' },
  { name: 'Navy', hue: '215', sat: '80%', lit: '30%' },
  { name: 'Royal Blue', hue: '224', sat: '75%', lit: '50%' },
  { name: 'Violet', hue: '262', sat: '70%', lit: '50%' },
  { name: 'Purple', hue: '280', sat: '80%', lit: '45%' },
  { name: 'Pink', hue: '325', sat: '75%', lit: '50%' },
  { name: 'Slate', hue: '200', sat: '10%', lit: '30%' },
  { name: 'Charcoal', hue: '0', sat: '0%', lit: '10%' }
];

// Guided Step Wizard configuration
const WIZARD_STEPS = [
  { id: 'personal', label: 'Profile' },
  { id: 'experience', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Studies' },
  { id: 'customizer', label: 'Design' }
];

import { BulletAIAssistant, getMarketSkillsForRole, getMockJobs } from './AIAssistants';
import { InteractiveSkillsManager } from './InteractiveSkillsManager';
import { SectionStatusIndicator, CountUp } from './UIComponents';

export default function EditorSidebar({
  isWizardMode,
  setIsWizardMode,
  activeTab,
  setActiveTab,
  resume,
  setResume,
  presets,
  filterSearch,
  setFilterSearch,
  filterLayout,
  setFilterLayout,
  filterColor,
  setFilterColor,
  filteredPresets,
  selectTemplate,
  updatePersonalInfo,
  updateSummary,
  addExperience,
  moveExperience,
  deleteExperience,
  editExperience,
  addExpBullet,
  editExpBullet,
  deleteExpBullet,
  addProject,
  moveProject,
  deleteProject,
  editProject,
  addProjBullet,
  editProjBullet,
  deleteProjBullet,
  updateSkillsString,
  addEducation,
  moveEducation,
  deleteEducation,
  editEducation,
  addCertification,
  editCertification,
  deleteCertification,
  updateSetting,
  expandedExpIndex,
  setExpandedExpIndex,
  expandedProjIndex,
  setExpandedProjIndex,
  expandedEduIndex,
  setExpandedEduIndex,
  getATSAnalysis,
  getCVSkills,
  calculateMatch,
  addSkillToCV,
  showToast,
  isPro,
  handleUpgradeToPro,
  handleUndo,
  handleRedo,
  canUndo,
  canRedo,
  handlePrint
}) {
  const [showUpgradeModal, setShowUpgradeModal] = React.useState(false);

  return (
    <aside className={`editor-panel no-print ${activeTab === null ? 'collapsed' : ''}`}>
      
      {/* Slim vertical toolbar */}
      <div className="editor-slim-toolbar">
        <div className="slim-toolbar-top">
          {/* Logo / Sparkles */}
          <div className="logo-icon" style={{ cursor: 'pointer', marginBottom: '0.25rem' }} onClick={() => setActiveTab('templates')}>
            <Sparkles size={16} />
          </div>

          {/* Undo / Redo history */}
          <div className="slim-history-container">
            <button
              className="slim-history-btn"
              disabled={!canUndo}
              onClick={handleUndo}
              title="Undo last edit"
            >
              <Undo size={12} />
            </button>
            <button
              className="slim-history-btn"
              disabled={!canRedo}
              onClick={handleRedo}
              title="Redo edit"
            >
              <Redo size={12} />
            </button>
          </div>

          {/* Tab buttons */}
          {[
            { id: 'add_section', label: 'Add Section', icon: Plus },
            { id: 'rearrange', label: 'Rearrange', icon: ArrowUpDown },
            { id: 'templates', label: 'Templates', icon: Layout },
            { id: 'customizer', label: 'Design & Font', icon: Eye },
            { id: 'improve_text', label: 'Improve Text', icon: Sparkles, badge: { count: 1, type: 'red' } },
            { id: 'indeed', label: 'ATS Check', icon: Shield, badge: { count: '68%', type: 'green' } },
            { id: 'coverletter', label: 'AI Assistant', icon: FileText }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)}
              className={`slim-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              title={tab.label}
            >
              <tab.icon size={18} />
              <span className="slim-tab-btn-label">{tab.label}</span>
              {tab.badge && (
                <span className={`slim-btn-badge ${tab.badge.type}`}>
                  {tab.badge.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="slim-toolbar-bottom">
          {/* Download PDF button */}
          <button
            className="slim-tab-btn"
            onClick={handlePrint}
            title="Download PDF"
          >
            <Download size={18} />
            <span className="slim-tab-btn-label">Download</span>
          </button>

          {/* Share button */}
          <button
            className="slim-tab-btn"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              showToast('Share link copied to clipboard!');
            }}
            title="Share CV"
          >
            <Share2 size={18} />
            <span className="slim-tab-btn-label">Share</span>
          </button>

          {/* History Revisions button */}
          <button
            className="slim-tab-btn"
            onClick={() => showToast('Initial version loaded successfully!')}
            title="Version History"
          >
            <History size={18} />
            <span className="slim-tab-btn-label">History</span>
          </button>

          {/* Branding Toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', marginTop: '0.25rem' }}>
            <span style={{ fontSize: '0.5rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Branding</span>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                className="toggle-switch-input"
                checked={resume?.settings?.showBranding !== false}
                onChange={e => updateSetting('showBranding', e.target.checked)}
              />
              <span className="toggle-switch-slider"></span>
            </label>
          </div>
        </div>
      </div>

      {/* Main Drawer Panel */}
      {activeTab !== null && (
        <div className="editor-drawer-content">
          <div className="drawer-header">
            <h3 style={{ fontSize: '0.9rem', fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-main)' }}>
              {activeTab === 'templates' && 'Templates Catalog'}
              {activeTab === 'personal' && 'Personal Profile'}
              {activeTab === 'experience' && 'Work Experience'}
              {activeTab === 'projects' && 'Projects Catalog'}
              {activeTab === 'skills' && 'Skills Manager'}
              {activeTab === 'education' && 'Education & Studies'}
              {activeTab === 'customizer' && 'Design & Font Options'}
              {activeTab === 'coverletter' && 'Cover Letter AI'}
              {activeTab === 'indeed' && 'ATS Audit'}
              {activeTab === 'improve_text' && 'Improve Text'}
              {activeTab === 'add_section' && 'Add Section'}
              {activeTab === 'rearrange' && 'Rearrange Layout'}
            </h3>
            <button
              className="drawer-close-btn"
              onClick={() => setActiveTab(null)}
              title="Close Drawer"
            >
              <X size={14} />
            </button>
          </div>

          <div className="drawer-inner-scroll">
            
            {/* Guided Wizard steps dots (only if wizard mode is on) */}
            {isWizardMode && (
              <div className="wizard-progress-bar" style={{ marginBottom: '1.25rem' }}>
                {WIZARD_STEPS.map((step, idx) => {
                  const stepIdx = WIZARD_STEPS.findIndex(s => s.id === activeTab);
                  const isCompleted = idx < stepIdx;
                  const isActive = step.id === activeTab;
                  return (
                    <div 
                      key={step.id} 
                      className={`wizard-step-dot ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                      onClick={() => setActiveTab(step.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <span style={{ 
                        width: '18px', 
                        height: '18px', 
                        borderRadius: '50%', 
                        border: '2px solid', 
                        borderColor: isActive ? 'var(--accent-color)' : (isCompleted ? 'var(--text-main)' : 'var(--text-muted)'),
                        backgroundColor: isActive ? 'var(--accent-color)' : 'transparent',
                        color: isActive ? 'white' : 'inherit',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '9px',
                        fontWeight: 800
                      }}>
                        {isCompleted ? '✓' : idx + 1}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <AnimatePresence mode="wait">
              {activeTab && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  style={{ display: 'flex', flexDirection: 'column', width: '100%', flex: 1 }}
                >
                  {/* TEMPLATES CATALOG */}
                  {activeTab === 'templates' && (
              <div className="form-section">
            <h3 className="form-section-title">Select Preset Style (120+ Templates)</h3>
            
            <div className="template-filters">
              <input 
                type="text" 
                className="filter-input" 
                placeholder="Search templates..." 
                value={filterSearch} 
                onChange={e => setFilterSearch(e.target.value)} 
              />
            </div>

            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Showing {filteredPresets.length} of {presets.length} professional layout variations.
            </p>

            <div className="templates-list-grid" style={{ maxHeight: '420px', overflowY: 'auto', paddingRight: '0.25rem' }}>
              {filteredPresets.map(tpl => (
                <div
                  key={tpl.id}
                  onClick={() => selectTemplate(tpl)}
                  className={`template-card ${resume?.settings?.templateId === tpl.id ? 'active' : ''}`}
                >
                  <div className="template-card-name">{tpl.name}</div>
                  <div className="template-card-desc">{tpl.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PERSONAL PROFILE */}
        {activeTab === 'personal' && (
          <div className="form-section">
            <h3 className="form-section-title">Personal Details</h3>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" value={resume?.personalInfo?.name || ''} onChange={e => updatePersonalInfo('name', e.target.value)} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" value={resume?.personalInfo?.email || ''} onChange={e => updatePersonalInfo('email', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input className="form-input" value={resume?.personalInfo?.phone || ''} onChange={e => updatePersonalInfo('phone', e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">LinkedIn Profile URL</label>
                <input className="form-input" value={resume?.personalInfo?.linkedin || ''} onChange={e => updatePersonalInfo('linkedin', e.target.value)} placeholder="linkedin.com/in/username" />
              </div>
              <div className="form-group">
                <label className="form-label">GitHub URL</label>
                <input className="form-input" value={resume?.personalInfo?.github || ''} onChange={e => updatePersonalInfo('github', e.target.value)} placeholder="github.com/username" />
              </div>
            </div>
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <label className="form-label">Professional Summary</label>
                <BulletAIAssistant value={resume?.summary} onSelect={(val) => updateSummary(val)} targetJobTitle={resume?.targetJobTitle} />
              </div>
              <textarea className="form-textarea" rows={6} value={resume?.summary || ''} onChange={e => updateSummary(e.target.value)} placeholder="Tip: use [Text](url) anywhere to add inline links." />
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Format: Use markdown `[Google](https://google.com)` to render links.</span>
            </div>
          </div>
        )}

        {/* WORK EXPERIENCE */}
        {activeTab === 'experience' && (
          <div className="form-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 className="form-section-title" style={{ marginBottom: 0 }}>Work Experience</h3>
              <button className="btn btn-secondary btn-small" onClick={addExperience}><Plus size={14} /> Add Job</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <AnimatePresence initial={false}>
                {resume?.experience?.map((exp, expIdx) => (
                  <motion.div
                    key={exp.id || exp._id || `exp-${expIdx}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                    className="list-item-card"
                    style={{ border: expandedExpIndex === expIdx ? '1px solid var(--accent-color)' : '1px solid var(--border-color)' }}
                  >
                    <div 
                      className="list-item-header" 
                      onClick={() => setExpandedExpIndex(expandedExpIndex === expIdx ? -1 : expIdx)}
                      style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <span className="list-item-title" style={{ fontWeight: 800 }}>{exp.company || 'New Position'}</span>
                      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }} onClick={e => e.stopPropagation()}>
                        {/* Up / Down reordering buttons */}
                        <button 
                          className="btn btn-secondary btn-small" 
                          style={{ padding: '0.2rem' }} 
                          disabled={expIdx === 0} 
                          onClick={() => moveExperience(expIdx, -1)}
                          title="Move Up"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button 
                          className="btn btn-secondary btn-small" 
                          style={{ padding: '0.2rem' }} 
                          disabled={expIdx === (resume?.experience?.length || 0) - 1} 
                          onClick={() => moveExperience(expIdx, 1)}
                          title="Move Down"
                        >
                          <ArrowDown size={12} />
                        </button>

                        {/* Collapse indicator */}
                        <span style={{ color: 'var(--text-muted)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }} onClick={() => setExpandedExpIndex(expandedExpIndex === expIdx ? -1 : expIdx)}>
                          {expandedExpIndex === expIdx ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </span>

                        {/* Delete button */}
                        <button className="btn btn-danger btn-small" style={{ padding: '0.2rem 0.5rem' }} onClick={() => deleteExperience(expIdx)}><Trash2 size={12} /></button>
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {expandedExpIndex === expIdx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
                          animate={{ height: 'auto', opacity: 1, overflow: 'visible' }}
                          exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="list-item-body"
                        >
                          <div className="form-row">
                            <div className="form-group">
                              <label className="form-label">Company</label>
                              <input className="form-input" value={exp.company} onChange={e => editExperience(expIdx, 'company', e.target.value)} />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Role</label>
                              <input className="form-input" value={exp.role} onChange={e => editExperience(expIdx, 'role', e.target.value)} />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Date Duration</label>
                            <input className="form-input" value={exp.date} onChange={e => editExperience(expIdx, 'date', e.target.value)} />
                          </div>

                          {/* Bullet Highlight List */}
                          <div style={{ marginTop: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                              <span className="form-label">Bullet Highlights</span>
                              <button type="button" className="btn btn-secondary btn-small" style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem' }} onClick={() => addExpBullet(expIdx)}>Add Bullet</button>
                            </div>
                            {exp.bullets.map((bullet, bIdx) => (
                              <div key={bIdx} className="bullet-list-row" style={{ alignItems: 'center' }}>
                                <input className="form-input bullet-input" value={bullet} onChange={e => editExpBullet(expIdx, bIdx, e.target.value)} placeholder="Use [Link](url) to add link" />
                                <BulletAIAssistant value={bullet} onSelect={(val) => editExpBullet(expIdx, bIdx, val)} targetJobTitle={resume?.targetJobTitle} />
                                <button type="button" className="btn btn-danger btn-small" style={{ padding: '0.2rem' }} onClick={() => deleteExpBullet(expIdx, bIdx)}><Trash2 size={12} /></button>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {activeTab === 'projects' && (
          <div className="form-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 className="form-section-title" style={{ marginBottom: 0 }}>Projects</h3>
              <button className="btn btn-secondary btn-small" onClick={addProject}><Plus size={14} /> Add Project</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <AnimatePresence initial={false}>
                {resume?.projects?.map((proj, projIdx) => (
                  <motion.div
                    key={proj.id || proj._id || `proj-${projIdx}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                    className="list-item-card"
                    style={{ border: expandedProjIndex === projIdx ? '1px solid var(--accent-color)' : '1px solid var(--border-color)' }}
                  >
                    <div 
                      className="list-item-header" 
                      onClick={() => setExpandedProjIndex(expandedProjIndex === projIdx ? -1 : projIdx)}
                      style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <span className="list-item-title" style={{ fontWeight: 800 }}>{proj.name || 'New Project'}</span>
                      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }} onClick={e => e.stopPropagation()}>
                        {/* Up / Down reordering buttons */}
                        <button 
                          className="btn btn-secondary btn-small" 
                          style={{ padding: '0.2rem' }} 
                          disabled={projIdx === 0} 
                          onClick={() => moveProject(projIdx, -1)}
                          title="Move Up"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button 
                          className="btn btn-secondary btn-small" 
                          style={{ padding: '0.2rem' }} 
                          disabled={projIdx === (resume?.projects?.length || 0) - 1} 
                          onClick={() => moveProject(projIdx, 1)}
                          title="Move Down"
                        >
                          <ArrowDown size={12} />
                        </button>

                        {/* Collapse indicator */}
                        <span style={{ color: 'var(--text-muted)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }} onClick={() => setExpandedProjIndex(expandedProjIndex === projIdx ? -1 : projIdx)}>
                          {expandedProjIndex === projIdx ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </span>

                        {/* Delete button */}
                        <button className="btn btn-danger btn-small" style={{ padding: '0.2rem 0.5rem' }} onClick={() => deleteProject(projIdx)}><Trash2 size={12} /></button>
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {expandedProjIndex === projIdx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
                          animate={{ height: 'auto', opacity: 1, overflow: 'visible' }}
                          exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="list-item-body"
                        >
                          <div className="form-row">
                            <div className="form-group">
                              <label className="form-label">Project Name</label>
                              <input className="form-input" value={proj.name} onChange={e => editProject(projIdx, 'name', e.target.value)} />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Project Link (URL)</label>
                              <input className="form-input" value={proj.link || ''} onChange={e => editProject(projIdx, 'link', e.target.value)} placeholder="e.g. github.com/username/project" />
                            </div>
                          </div>

                          <div style={{ marginTop: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                              <span className="form-label">Highlights</span>
                              <button type="button" className="btn btn-secondary btn-small" style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem' }} onClick={() => addProjBullet(projIdx)}>Add Highlight</button>
                            </div>
                            {proj.bullets.map((bullet, bIdx) => (
                              <div key={bIdx} className="bullet-list-row" style={{ alignItems: 'center' }}>
                                <input className="form-input bullet-input" value={bullet} onChange={e => editProjBullet(projIdx, bIdx, e.target.value)} placeholder="Use [Link](url) to add link" />
                                <BulletAIAssistant value={bullet} onSelect={(val) => editProjBullet(projIdx, bIdx, val)} targetJobTitle={resume?.targetJobTitle} />
                                <button type="button" className="btn btn-danger btn-small" style={{ padding: '0.2rem' }} onClick={() => deleteProjBullet(projIdx, bIdx)}><Trash2 size={12} /></button>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* TECHNICAL SKILLS */}
        {activeTab === 'skills' && (
          <div className="form-section">
            <h3 className="form-section-title">Technical Skills</h3>
            <div className="form-group">
              <label className="form-label">Core Competencies</label>
              <InteractiveSkillsManager category="core" skills={resume?.skills?.core} onChange={updateSkillsString} />
            </div>
            <div className="form-group">
              <label className="form-label">Programming Languages</label>
              <InteractiveSkillsManager category="languages" skills={resume?.skills?.languages} onChange={updateSkillsString} />
            </div>
            <div className="form-group">
              <label className="form-label">Backend & Databases</label>
              <InteractiveSkillsManager category="backend" skills={resume?.skills?.backend} onChange={updateSkillsString} />
            </div>
            <div className="form-group">
              <label className="form-label">Frontend & Libraries</label>
              <InteractiveSkillsManager category="frontend" skills={resume?.skills?.frontend} onChange={updateSkillsString} />
            </div>
            <div className="form-group">
              <label className="form-label">Tools & Frameworks</label>
              <InteractiveSkillsManager category="tools" skills={resume?.skills?.tools} onChange={updateSkillsString} />
            </div>

            {/* Skill Gap Analyzer Widget */}
            <div className="customizer-group" style={{ marginTop: '1.5rem', animation: 'fadeIn 0.3s ease' }}>
              <span className="customizer-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>✨ Skill Gap Analysis</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'none', fontWeight: 500 }}>
                  comparing with Market requirements for <strong>{resume?.targetJobTitle || 'Software Engineer'}</strong>
                </span>
              </span>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: '0 0 0.75rem 0', lineHeight: 1.4 }}>
                We scanned your target role's market requirements. Click <strong style={{ color: 'var(--accent-color)' }}>+ Add</strong> to fill missing skills.
              </p>
              
              {(() => {
                const marketRecs = getMarketSkillsForRole(resume?.targetJobTitle);
                const missingRecs = marketRecs.filter(rec => {
                  const currentSkillsInCategory = resume?.skills?.[rec.category] || [];
                  const normalizedCurrent = currentSkillsInCategory.map(s => s.split(':')[0].trim().toLowerCase());
                  return !normalizedCurrent.includes(rec.name.toLowerCase());
                });

                if (missingRecs.length === 0) {
                  return (
                    <div style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.35rem', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
                      <span>✓</span> <strong>Perfect Alignment!</strong> Your CV contains all high-demand skills for this role.
                    </div>
                  );
                }

                return (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {missingRecs.map(rec => (
                      <button
                        key={rec.name}
                        type="button"
                        className="btn btn-secondary btn-small"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem', padding: '0.25rem 0.5rem', borderRadius: '0.35rem' }}
                        onClick={() => {
                          const currentSkills = resume?.skills?.[rec.category] || [];
                          const updated = [...currentSkills, rec.name];
                          updateSkillsString(rec.category, updated);
                          showToast(`Added skill "${rec.name}"!`);
                        }}
                      >
                        <span>{rec.name}</span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'capitalize', borderRight: '1px solid var(--border-color)', paddingRight: '0.25rem', marginRight: '0.15rem' }}>({rec.category})</span>
                        <span style={{ color: 'var(--accent-color)', fontWeight: 800 }}>+ Add</span>
                      </button>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* EDUCATION */}
        {activeTab === 'education' && (
          <div className="form-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 className="form-section-title" style={{ marginBottom: 0 }}>Education</h3>
              <button className="btn btn-secondary btn-small" onClick={addEducation}><Plus size={14} /> Add School</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <AnimatePresence initial={false}>
                {resume?.education?.map((edu, eduIdx) => (
                  <motion.div
                    key={edu.id || edu._id || `edu-${eduIdx}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                    className="list-item-card"
                    style={{ border: expandedEduIndex === eduIdx ? '1px solid var(--accent-color)' : '1px solid var(--border-color)' }}
                  >
                    <div 
                      className="list-item-header" 
                      onClick={() => setExpandedEduIndex(expandedEduIndex === eduIdx ? -1 : eduIdx)}
                      style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <span className="list-item-title" style={{ fontWeight: 800 }}>{edu.institution || 'New School'}</span>
                      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }} onClick={e => e.stopPropagation()}>
                        {/* Up / Down reordering buttons */}
                        <button 
                          className="btn btn-secondary btn-small" 
                          style={{ padding: '0.2rem' }} 
                          disabled={eduIdx === 0} 
                          onClick={() => moveEducation(eduIdx, -1)}
                          title="Move Up"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button 
                          className="btn btn-secondary btn-small" 
                          style={{ padding: '0.2rem' }} 
                          disabled={eduIdx === (resume?.education?.length || 0) - 1} 
                          onClick={() => moveEducation(eduIdx, 1)}
                          title="Move Down"
                        >
                          <ArrowDown size={12} />
                        </button>

                        {/* Collapse indicator */}
                        <span style={{ color: 'var(--text-muted)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }} onClick={() => setExpandedEduIndex(expandedEduIndex === eduIdx ? -1 : eduIdx)}>
                          {expandedEduIndex === eduIdx ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </span>

                        {/* Delete button */}
                        <button className="btn btn-danger btn-small" style={{ padding: '0.2rem 0.5rem' }} onClick={() => deleteEducation(eduIdx)}><Trash2 size={12} /></button>
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {expandedEduIndex === eduIdx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
                          animate={{ height: 'auto', opacity: 1, overflow: 'visible' }}
                          exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="list-item-body"
                        >
                          <div className="form-row">
                            <div className="form-group">
                              <label className="form-label">Institution</label>
                              <input className="form-input" value={edu.institution} onChange={e => editEducation(eduIdx, 'institution', e.target.value)} />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Degree</label>
                              <input className="form-input" value={edu.degree} onChange={e => editEducation(eduIdx, 'degree', e.target.value)} />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group">
                              <label className="form-label">Score / GPA</label>
                              <input className="form-input" value={edu.score} onChange={e => editEducation(eduIdx, 'score', e.target.value)} />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Date Range</label>
                              <input className="form-input" value={edu.date} onChange={e => editEducation(eduIdx, 'date', e.target.value)} />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1.5rem 0 0.75rem 0' }}>
              <span className="form-label" style={{ fontWeight: 800 }}>Certifications</span>
              <button className="btn btn-secondary btn-small" onClick={addCertification}><Plus size={14} /> Add Cert</button>
            </div>
            <AnimatePresence>
              {resume?.certifications?.map((cert, certIdx) => (
                <motion.div
                  key={`cert-${certIdx}`}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="bullet-list-row"
                  style={{ marginBottom: '0.5rem' }}
                >
                  <input className="form-input bullet-input" value={cert} onChange={e => editCertification(certIdx, e.target.value)} />
                  <button type="button" className="btn btn-danger btn-small" style={{ padding: '0.2rem' }} onClick={() => deleteCertification(certIdx)}><Trash2 size={12} /></button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* DESIGN SYSTEM PANEL */}
        {activeTab === 'customizer' && (
          <div className="form-section">
            <h3 className="form-section-title">Design Settings</h3>
            
            {/* Color Customizer */}
            <div className="customizer-group">
              <span className="customizer-title">Accent Theme Colors</span>
              <div className="color-swatch-grid">
                {SWATCH_HUES.map(sw => {
                  const inlineHueStyle = { backgroundColor: `hsl(${sw.hue}, ${sw.sat}, ${sw.lit})` };
                  return (
                    <button
                      key={sw.name}
                      className={`color-swatch ${resume?.settings?.accentColor === `${sw.hue} ${sw.sat} ${sw.lit}` ? 'active' : ''}`}
                      style={inlineHueStyle}
                      onClick={() => updateSetting('accentColor', `${sw.hue} ${sw.sat} ${sw.lit}`)}
                      title={sw.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* Font Color Option */}
            <div className="customizer-group">
              <span className="customizer-title">A4 Font Color</span>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                {[
                  { name: 'Dark Ink', color: '#111111' },
                  { name: 'Slate Gray', color: '#2d3748' },
                  { name: 'Navy Blue', color: '#1a365d' },
                  { name: 'Dark Charcoal', color: '#262626' }
                ].map(f => (
                  <button 
                    key={f.color}
                    className={`btn btn-secondary btn-small ${resume?.settings?.fontColor === f.color ? 'active' : ''}`}
                    onClick={() => updateSetting('fontColor', f.color)}
                    style={{ border: `1px solid ${f.color}`, fontSize: '0.75rem', fontWeight: resume?.settings?.fontColor === f.color ? 800 : 500 }}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Subheading Color Option */}
            <div className="customizer-group">
              <span className="customizer-title">Subheadings Color</span>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                {[
                  { name: 'Match Accent', color: '' },
                  { name: 'Dark Ink', color: '#111111' },
                  { name: 'Slate Gray', color: '#4a5568' },
                  { name: 'Navy Blue', color: '#1a365d' },
                  { name: 'Teal Green', color: '#319795' },
                  { name: 'Crimson Red', color: '#e53e3e' }
                ].map(sc => (
                  <button 
                    key={sc.name}
                    className={`btn btn-secondary btn-small ${(resume?.settings?.subheadingColor || '') === sc.color ? 'active' : ''}`}
                    onClick={() => updateSetting('subheadingColor', sc.color)}
                    style={{ 
                      border: sc.color ? `1px solid ${sc.color}` : '1px dashed var(--border-color)', 
                      fontSize: '0.75rem', 
                      fontWeight: (resume?.settings?.subheadingColor || '') === sc.color ? 800 : 500 
                    }}
                  >
                    {sc.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography Font Picker */}
            <div className="customizer-group">
              <span className="customizer-title">Font Pairings</span>
              <div className="font-picker-grid">
                {[
                  { id: 'sans', label: 'Inter Sans', family: 'var(--font-sans)' },
                  { id: 'serif', label: 'Playfair Serif', family: 'var(--font-serif)' },
                  { id: 'display', label: 'Outfit Display', family: 'var(--font-display)' },
                  { id: 'mono', label: 'Space Mono', family: 'var(--font-mono)' }
                ].map(f => (
                  <div
                    key={f.id}
                    onClick={() => updateSetting('fontFamily', f.id)}
                    className={`font-card ${resume?.settings?.fontFamily === f.id ? 'active' : ''}`}
                    style={{ fontFamily: f.family }}
                  >
                    {f.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Margins */}
            <div className="customizer-group">
              <span className="customizer-title">Margins</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['compact', 'standard', 'loose'].map(m => (
                  <button
                    key={m}
                    className={`btn btn-secondary btn-small ${resume?.settings?.margins === m ? 'active' : ''}`}
                    onClick={() => updateSetting('margins', m)}
                    style={{ flex: 1, textTransform: 'capitalize' }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Borders Customization */}
            <div className="customizer-group animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <span className="customizer-title">Divider Borders</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.65rem' }}>Style</label>
                  <select
                    className="form-select"
                    value={resume?.settings?.borderStyle || 'none'}
                    onChange={e => updateSetting('borderStyle', e.target.value)}
                    style={{ padding: '0.4rem', fontSize: '0.75rem' }}
                  >
                    <option value="none">None</option>
                    <option value="solid">Solid</option>
                    <option value="double">Double</option>
                    <option value="dotted">Dotted</option>
                    <option value="dashed">Dashed</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.65rem' }}>Thickness</label>
                  <select
                    className="form-select"
                    value={resume?.settings?.borderWidth || '1px'}
                    onChange={e => updateSetting('borderWidth', e.target.value)}
                    style={{ padding: '0.4rem', fontSize: '0.75rem' }}
                  >
                    <option value="1px">1px Thin</option>
                    <option value="2px">2px Medium</option>
                    <option value="3px">3px Bold</option>
                    <option value="4px">4px Double</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Custom Dynamic Fields */}
            <div className="customizer-group animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <span className="customizer-title">Add Custom Fields</span>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: '0 0 0.5rem 0' }}>Append links, portfolios, or text blocks to your profile header.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.75rem' }}>
                {resume?.customFields?.map((cf, cfIdx) => (
                  <div key={cfIdx} style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.02)', padding: '0.25rem', borderRadius: '0.35rem', border: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', minWidth: '45px' }}>{cf.type}:</span>
                    <span style={{ fontSize: '0.7rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{cf.label} ({cf.value})</span>
                    <button
                      type="button"
                      className="btn btn-danger btn-small"
                      style={{ padding: '0.1rem 0.3rem', fontSize: '0.65rem' }}
                      onClick={() => {
                        const updated = resume.customFields.filter((_, i) => i !== cfIdx);
                        setResume(prev => ({ ...prev, customFields: updated }));
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Custom Field Form */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '0.4rem' }}>
                  <input
                    type="text"
                    id="new-field-label"
                    className="form-input"
                    style={{ padding: '0.35rem', fontSize: '0.75rem' }}
                    placeholder="Label (e.g. Portfolio)"
                  />
                  <input
                    type="text"
                    id="new-field-value"
                    className="form-input"
                    style={{ padding: '0.35rem', fontSize: '0.75rem' }}
                    placeholder="Value (e.g. mysite.com)"
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <select
                    id="new-field-type"
                    className="form-select"
                    style={{ padding: '0.35rem', fontSize: '0.75rem', flex: 1 }}
                  >
                    <option value="text">Text Note</option>
                    <option value="link">Hyperlink</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-primary btn-small"
                    style={{ padding: '0.35rem 0.75rem' }}
                    onClick={() => {
                      const lblInput = document.getElementById('new-field-label');
                      const valInput = document.getElementById('new-field-value');
                      const typeInput = document.getElementById('new-field-type');
                      const label = lblInput?.value?.trim();
                      const value = valInput?.value?.trim();
                      const type = typeInput?.value || 'text';
                      if (!label || !value) {
                        showToast('Enter label & value to add a field.');
                        return;
                      }
                      const currentFields = resume?.customFields || [];
                      const updated = [...currentFields, { label, value, type }];
                      setResume(prev => ({ ...prev, customFields: updated }));
                      if (lblInput) lblInput.value = '';
                      if (valInput) valInput.value = '';
                      showToast(`Added custom field "${label}"!`);
                    }}
                  >
                    Add Field
                  </button>
                </div>
              </div>
            </div>

            {/* Section Ordering */}
            <div className="customizer-group animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <span className="customizer-title">Section Ordering</span>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: '0 0 0.5rem 0' }}>Arrange the vertical flow order of sections in your resume by moving them up or down.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {(resume?.settings?.sectionOrder || ['summary', 'skills', 'experience', 'projects', 'education', 'certifications']).map((secId, idx, arr) => {
                  const labelMap = {
                    summary: 'Summary',
                    skills: 'Technical Skills',
                    experience: 'Experience',
                    projects: 'Projects',
                    education: 'Education',
                    certifications: 'Certifications'
                  };
                  const label = labelMap[secId] || secId;
                  return (
                    <div key={secId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0.6rem', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: '0.35rem', border: '1px solid var(--border-color)', fontSize: '0.75rem' }}>
                      <span style={{ fontWeight: 700 }}>{label}</span>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => {
                            const updated = [...arr];
                            const temp = updated[idx];
                            updated[idx] = updated[idx - 1];
                            updated[idx - 1] = temp;
                            updateSetting('sectionOrder', updated);
                          }}
                          className="btn btn-secondary btn-small"
                          style={{ padding: '0.15rem 0.3rem', height: 'auto' }}
                        >
                          <ChevronUp size={11} />
                        </button>
                        <button
                          type="button"
                          disabled={idx === arr.length - 1}
                          onClick={() => {
                            const updated = [...arr];
                            const temp = updated[idx];
                            updated[idx] = updated[idx + 1];
                            updated[idx + 1] = temp;
                            updateSetting('sectionOrder', updated);
                          }}
                          className="btn btn-secondary btn-small"
                          style={{ padding: '0.15rem 0.3rem', height: 'auto' }}
                        >
                          <ChevronDown size={11} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section Toggles */}
            <div className="customizer-group">
              <span className="customizer-title">Section Toggles</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  { id: 'showSummary', label: 'Summary' },
                  { id: 'showExperience', label: 'Work Experience' },
                  { id: 'showProjects', label: 'Projects' },
                  { id: 'showEducation', label: 'Education' },
                  { id: 'showCertifications', label: 'Certifications' }
                ].map(toggle => (
                  <label key={toggle.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={resume?.settings?.[toggle.id] !== false}
                      onChange={e => updateSetting(toggle.id, e.target.checked)}
                    />
                    <span>Show {toggle.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* COVER LETTER PANEL */}
        {activeTab === 'coverletter' && (
          <div className="form-section animate-fade-in">
            <h3 className="form-section-title">Cover Letter Sync</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Draft a cover letter that matches your resume style. You can copy the text or download it styled identically.
            </p>

            <div className="form-group">
              <label className="form-label">Recipient (e.g. Hiring Manager)</label>
              <input
                type="text"
                className="form-input"
                value={resume?.coverLetter?.recipient || ''}
                onChange={e => {
                  const val = e.target.value;
                  setResume(prev => ({
                    ...prev,
                    coverLetter: { ...(prev.coverLetter || {}), recipient: val }
                  }));
                }}
                placeholder="Hiring Manager"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Target Company</label>
              <input
                type="text"
                className="form-input"
                value={resume?.coverLetter?.company || ''}
                onChange={e => {
                  const val = e.target.value;
                  setResume(prev => ({
                    ...prev,
                    coverLetter: { ...(prev.coverLetter || {}), company: val }
                  }));
                }}
                placeholder="e.g. Google"
              />
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <label className="form-label">Letter Body</label>
                <button
                  type="button"
                  className="btn btn-secondary btn-small"
                  style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem' }}
                  onClick={() => {
                    const name = resume?.personalInfo?.name || 'Your Name';
                    const role = resume?.targetJobTitle || 'Software Engineer';
                    const company = resume?.coverLetter?.company || 'your company';
                    const keySkill = resume?.skills?.core?.[0] || 'software development';
                    const text = `Dear ${resume?.coverLetter?.recipient || 'Hiring Manager'},\n\nI am writing to express my strong interest in the ${role} position at ${company}. With a solid foundation in ${keySkill} and a proven track record of delivering high-quality solutions, I am confident in my ability to make a significant contribution to your engineering team.\n\nIn my previous experience, I have successfully designed, built, and optimized scalable applications. I am particularly drawn to your organization's innovative work culture and would welcome the opportunity to discuss how my technical skills and enthusiasm align with your goals.\n\nThank you for your time and consideration. I look forward to the possibility of discussing my candidacy in more detail.\n\nSincerely,\n${name}`;
                    setResume(prev => ({
                      ...prev,
                      coverLetter: { ...(prev.coverLetter || {}), body: text }
                    }));
                    showToast('Auto-generated template letter!');
                  }}
                >
                  Auto-Generate Template
                </button>
              </div>
              <textarea
                className="form-textarea"
                rows={12}
                value={resume?.coverLetter?.body || ''}
                onChange={e => {
                  const val = e.target.value;
                  setResume(prev => ({
                    ...prev,
                    coverLetter: { ...(prev.coverLetter || {}), body: val }
                  }));
                }}
                placeholder="Write your cover letter here..."
                style={{ minHeight: '220px' }}
              />
            </div>
          </div>
        )}

        {/* INDEED & ATS MATCHING PANEL */}
        {activeTab === 'indeed' && (
          <div className="form-section">
            <h3 className="form-section-title">ATS Optimizer & Matcher</h3>
            
            {/* ATS Score Diagnostic section */}
            {(() => {
              const { score, issues } = getATSAnalysis();
              let scoreColor = '#ef4444'; // Red
              let scoreText = 'Critical';
              if (score >= 85) {
                scoreColor = '#10b981'; // Green
                scoreText = 'Excellent';
              } else if (score >= 70) {
                scoreColor = '#10b981'; // Greenish
                scoreText = 'Good';
              } else if (score >= 50) {
                scoreColor = '#f59e0b'; // Amber
                scoreText = 'Needs Work';
              }

              // SVG circle math
              const radius = 35;
              const stroke = 6;
              const normalizedRadius = radius - stroke * 2;
              const circumference = normalizedRadius * 2 * Math.PI;
              const strokeDashoffset = circumference - (score / 100) * circumference;

              return (
                <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <svg height={radius * 2} width={radius * 2} className="progress-ring">
                      <circle
                        stroke="var(--border-color)"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                      />
                      <circle
                        stroke={scoreColor}
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset }}
                        strokeLinecap="round"
                        className="progress-ring-circle"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                      />
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dy=".3em"
                        fill="var(--text-main)"
                        fontSize="12px"
                        fontWeight="bold"
                        transform={`rotate(90 ${radius} ${radius})`}
                      >
                        {score}%
                      </text>
                    </svg>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>ATS Compatibility Score</div>
                      <div style={{ fontSize: '0.75rem', color: scoreColor, fontWeight: 700 }}>Rating: {scoreText}</div>
                    </div>
                  </div>

                  {/* ATS Issues list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.25rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Parser Improvements ({issues.length})</div>
                    {issues.length === 0 ? (
                      <div style={{ fontSize: '0.7rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span>✓</span> Your resume matches all core ATS formatting & structural standards!
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxHeight: '150px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                        {issues.map((iss) => {
                          let badgeColor = 'rgba(239, 68, 68, 0.1)';
                          let textColor = '#f87171';
                          let badgeText = 'Crit';
                          if (iss.severity === 'warning') {
                            badgeColor = 'rgba(245, 158, 11, 0.1)';
                            textColor = '#fbbf24';
                            badgeText = 'Warn';
                          } else if (iss.severity === 'info') {
                            badgeColor = 'rgba(59, 130, 246, 0.1)';
                            textColor = '#60a5fa';
                            badgeText = 'Tip';
                          }
                          return (
                            <div key={iss.id} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.7rem', alignItems: 'flex-start', lineHeight: 1.3 }}>
                              <span style={{ backgroundColor: badgeColor, color: textColor, padding: '0.1rem 0.3rem', borderRadius: '0.25rem', fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', flexShrink: 0 }}>
                                {badgeText}
                              </span>
                              <span style={{ color: 'var(--text-muted)' }}>{iss.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Indeed matching section */}
            <div className="form-group">
              <label className="form-label">Target Job Title</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Software Engineer, React Developer..." 
                value={resume?.targetJobTitle || ''} 
                onChange={e => {
                  setResume(prev => ({ ...prev, targetJobTitle: e.target.value }));
                }} 
              />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
              {['Frontend Developer', 'Backend Engineer', 'Data Analyst', 'Full Stack Developer'].map(title => (
                <button 
                  key={title} 
                  type="button" 
                  className="btn btn-secondary btn-small" 
                  style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                  onClick={() => {
                    setResume(prev => ({ ...prev, targetJobTitle: title }));
                  }}
                >
                  {title}
                </button>
              ))}
            </div>

            {(() => {
              const targetTitle = resume?.targetJobTitle || 'Software Developer';
              const cvSkills = getCVSkills();
              const jobs = getMockJobs(targetTitle);
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                    Comparing CV skills against real-time Indeed job requirements for <strong>{targetTitle}</strong>:
                  </p>
                  
                  {jobs.map(job => {
                    const { score, matched, missing } = calculateMatch(job.required, cvSkills);
                    const scoreClass = score >= 75 ? 'score-high' : 'score-med';
                    return (
                      <div key={job.id} className="job-match-card">
                        <div className="job-match-header">
                          <div>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>{job.title}</h4>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{job.company} • {job.location}</div>
                          </div>
                          <span className={`job-match-score ${scoreClass}`}>
                            {score}% Match
                          </span>
                        </div>
                        
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                          {job.description}
                        </p>
                        
                        {/* Matching progress bar */}
                        <div style={{ width: '100%', height: '5px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${score}%`, height: '100%', backgroundColor: score >= 75 ? '#10b981' : '#f59e0b' }} />
                        </div>

                        {/* Skills details */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          {matched.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#34d399', marginRight: '0.25rem' }}>Matches:</span>
                              {matched.map(s => <span key={s} className="skill-tag skill-match">{s}</span>)}
                            </div>
                          )}
                          {missing.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#fca5a5', marginRight: '0.25rem' }}>Missing:</span>
                              {missing.map(s => (
                                <button 
                                  key={s} 
                                  type="button" 
                                  className="skill-tag skill-missing" 
                                  style={{ border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.15rem' }}
                                  title="Click to add to CV"
                                  onClick={() => addSkillToCV(s)}
                                >
                                  {s} <span style={{ fontWeight: 900 }}>+</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <button 
                          type="button" 
                          className="btn btn-primary btn-small" 
                          style={{ width: '100%', marginTop: '0.25rem' }}
                          onClick={() => showToast(`Successfully applied to ${job.company}!`)}
                        >
                          Indeed Quick Apply
                        </button>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

          {/* Improve Text Panel */}
          {activeTab === 'improve_text' && (
            <div className="form-section animate-fade-in">
              <h3 className="form-section-title">Improve Text</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Let our AI writing assistant scan your CV to check grammar, improve vocabulary, and tailor bullet points.
              </p>

              {/* Option Toggles */}
              <div style={{ marginBottom: '1.5rem' }}>
                {/* Tailored Suggestions */}
                <div className="premium-option-row">
                  <div className="premium-option-info">
                    <Sparkles size={15} style={{ color: 'var(--accent-color)' }} />
                    <div className="premium-option-title">Tailored Suggestions</div>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      className="toggle-switch-input"
                      checked={resume?.settings?.showSummarySuggestions !== false}
                      onChange={e => updateSetting('showSummarySuggestions', e.target.checked)}
                    />
                    <span className="toggle-switch-slider"></span>
                  </label>
                </div>

                {/* Spellcheck & Grammar (Locked) */}
                <div className={`premium-option-row ${!isPro ? 'locked' : ''}`}>
                  <div className="premium-option-info">
                    <CheckCircle size={15} style={{ color: isPro ? '#10b981' : 'var(--text-muted)' }} />
                    <div className="premium-option-title">
                      <span>Spellcheck & Grammar</span>
                      {!isPro && <Lock size={10} style={{ color: 'var(--text-muted)' }} />}
                    </div>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      className="toggle-switch-input"
                      disabled={!isPro}
                      checked={isPro}
                      onChange={() => {}}
                    />
                    <span className="toggle-switch-slider"></span>
                  </label>
                </div>

                {/* Wording & Readability (Locked + Badge) */}
                <div className={`premium-option-row ${!isPro ? 'locked' : ''}`}>
                  <div className="premium-option-info">
                    <FileText size={15} style={{ color: isPro ? '#10b981' : 'var(--text-muted)' }} />
                    <div className="premium-option-title">
                      <span>Wording & Readability</span>
                      <span className="badge-orange">1</span>
                      {!isPro && <Lock size={10} style={{ color: 'var(--text-muted)' }} />}
                    </div>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      className="toggle-switch-input"
                      disabled={!isPro}
                      checked={isPro}
                      onChange={() => {}}
                    />
                    <span className="toggle-switch-slider"></span>
                  </label>
                </div>

                {/* Recommendations (Locked) */}
                <div className={`premium-option-row ${!isPro ? 'locked' : ''}`}>
                  <div className="premium-option-info">
                    <Layout size={15} style={{ color: isPro ? '#10b981' : 'var(--text-muted)' }} />
                    <div className="premium-option-title">
                      <span>Recommendations</span>
                      {!isPro && <Lock size={10} style={{ color: 'var(--text-muted)' }} />}
                    </div>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      className="toggle-switch-input"
                      disabled={!isPro}
                      checked={isPro}
                      onChange={() => {}}
                    />
                    <span className="toggle-switch-slider"></span>
                  </label>
                </div>
              </div>

              {/* Upgrade call-out or Unlocked suggestion details */}
              {!isPro ? (
                <div style={{
                  padding: '1.25rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.05)',
                  border: '1px dashed rgba(16, 185, 129, 0.2)',
                  borderRadius: '0.75rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                    <Sparkles size={14} style={{ color: '#10b981' }} />
                    <span>Unlock AI suggestions</span>
                  </div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.35 }}>
                    We found 1 wording and readability issue in your work experience bullet points. Upgrade to see recommendations.
                  </p>
                  <button
                    className="btn"
                    onClick={() => setShowUpgradeModal(true)}
                    style={{
                      backgroundColor: '#10b981',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      width: '100%',
                      padding: '0.6rem',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    Upgrade to See Mistakes
                  </button>
                </div>
              ) : (
                <div style={{
                  padding: '1.25rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.05)',
                  border: '1px solid rgba(16, 185, 129, 0.15)',
                  borderRadius: '0.75rem'
                }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <CheckCircle size={14} />
                    <span>PRO Writing Suggestions Unlocked</span>
                  </div>
                  <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                      Wording & Readability suggestion
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                      "Produced a biweekly newsletter sent to 1.5 million people"
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                      👉 "Produced a biweekly newsletter sent to 1.5M subscribers, driving 25% user engagement"
                    </div>
                    <button
                      className="btn btn-primary btn-small"
                      onClick={() => {
                        const updated = [...resume.experience];
                        if (updated[0] && updated[0].bullets[0]) {
                          updated[0].bullets[0] = "Produced a biweekly newsletter sent to 1.5M subscribers, driving 25% user engagement";
                          setResume(prev => ({ ...prev, experience: updated }));
                          showToast('Applied wording improvement!');
                        }
                      }}
                      style={{ width: '100%', padding: '0.4rem', fontSize: '0.75rem' }}
                    >
                      Apply Wording Improvement
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Add Section Panel */}
          {activeTab === 'add_section' && (
            <div className="form-section">
              <h3 className="form-section-title">Add / Edit Sections</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Toggle which sections are visible on your resume or navigate directly to edit them.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { id: 'showSummary', label: 'Summary', tabId: 'personal' },
                  { id: 'showExperience', label: 'Work Experience', tabId: 'experience' },
                  { id: 'showProjects', label: 'Projects', tabId: 'projects' },
                  { id: 'showEducation', label: 'Education', tabId: 'education' },
                  { id: 'showCertifications', label: 'Certifications', tabId: 'customizer' }
                ].map(sec => {
                  const isShown = resume?.settings?.[sec.id] !== false;
                  return (
                    <div key={sec.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{sec.label}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {isShown ? 'Visible on CV' : 'Hidden from CV'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="checkbox"
                          checked={isShown}
                          onChange={e => updateSetting(sec.id, e.target.checked)}
                          style={{ cursor: 'pointer' }}
                        />
                        <button
                          className="btn btn-secondary btn-small"
                          onClick={() => {
                            updateSetting(sec.id, true);
                            setActiveTab(sec.tabId);
                          }}
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Rearrange Layout Panel */}
          {activeTab === 'rearrange' && (
            <div className="form-section">
              <h3 className="form-section-title">Rearrange Sections</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Arrange the vertical flow order of sections in your resume by moving them up or down.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(resume?.settings?.sectionOrder || ['summary', 'skills', 'experience', 'projects', 'education', 'certifications']).map((secId, idx, arr) => {
                  const labelMap = {
                    summary: 'Summary',
                    skills: 'Technical Skills',
                    experience: 'Experience',
                    projects: 'Projects',
                    education: 'Education',
                    certifications: 'Certifications',
                    keyAchievements: 'Key Achievements'
                  };
                  const label = labelMap[secId] || secId;
                  return (
                    <div key={secId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', backgroundColor: 'var(--bg-card)', borderRadius: '0.5rem', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}>
                      <span style={{ fontWeight: 700 }}>{label}</span>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => {
                            const updated = [...arr];
                            const temp = updated[idx];
                            updated[idx] = updated[idx - 1];
                            updated[idx - 1] = temp;
                            updateSetting('sectionOrder', updated);
                          }}
                          className="btn btn-secondary btn-small"
                          style={{ padding: '0.2rem 0.4rem', height: 'auto' }}
                        >
                          <ChevronUp size={12} />
                        </button>
                        <button
                          type="button"
                          disabled={idx === arr.length - 1}
                          onClick={() => {
                            const updated = [...arr];
                            const temp = updated[idx];
                            updated[idx] = updated[idx + 1];
                            updated[idx + 1] = temp;
                            updateSetting('sectionOrder', updated);
                          }}
                          className="btn btn-secondary btn-small"
                          style={{ padding: '0.2rem 0.4rem', height: 'auto' }}
                        >
                          <ChevronDown size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
                </motion.div>
              )}
            </AnimatePresence>

        </div>

        {/* Floating CV Strength Bar */}
        {(() => {
          const { score } = getATSAnalysis();
          return (
            <div style={{
              padding: '0.85rem 1.25rem',
              borderTop: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'sticky',
              bottom: 0,
              zIndex: 10
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', flex: 1, marginRight: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700 }}>
                  <span style={{ color: 'var(--text-muted)' }}>CV Strength Score</span>
                  <span style={{ color: score >= 80 ? '#10b981' : (score >= 60 ? '#f59e0b' : '#ef4444') }}>
                    <CountUp value={score} />%
                  </span>
                </div>
                <div style={{ height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden', marginTop: '0.25rem' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                    style={{
                      height: '100%',
                      backgroundColor: score >= 80 ? '#10b981' : (score >= 60 ? '#f59e0b' : '#ef4444'),
                      borderRadius: '3px'
                    }}
                  />
                </div>
              </div>
              <div style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                backgroundColor: score >= 80 ? 'rgba(16, 185, 129, 0.1)' : (score >= 60 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)'),
                color: score >= 80 ? '#10b981' : (score >= 60 ? '#f59e0b' : '#ef4444'),
                border: `1px solid ${score >= 80 ? 'rgba(16, 185, 129, 0.2)' : (score >= 60 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)')}`,
              }}>
                {score >= 80 ? 'Strong' : (score >= 60 ? 'Average' : 'Weak')}
              </div>
            </div>
          );
        })()}

      </div>
      )}

      {/* Premium Upgrade Modal Dialog */}
      {showUpgradeModal && (
        <div className="premium-upgrade-overlay" onClick={() => setShowUpgradeModal(false)}>
          <div className="premium-upgrade-modal" onClick={e => e.stopPropagation()}>
            <Sparkles size={40} style={{ color: '#10b981', marginBottom: '1rem', marginLeft: 'auto', marginRight: 'auto' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Upgrade to CV Builder PRO</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.4 }}>
              Unlock advanced grammar checks, dynamic readability enhancements, ATS resume audit recommendations, and premium styling parameters.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                className="btn"
                onClick={() => {
                  handleUpgradeToPro();
                  setShowUpgradeModal(false);
                }}
                style={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                Upgrade to PRO ($9/month)
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowUpgradeModal(false)}
                style={{ padding: '0.75rem' }}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
