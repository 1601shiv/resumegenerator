import React, { Fragment, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, RefreshCw } from 'lucide-react';
import { AnimatedText } from './UIComponents';
import { renderSkillItems } from './InteractiveSkillsManager';

export default function ResumePreview({
  resume,
  activeTemplate,
  focusedField,
  setFocusedField,
  updatePersonalInfo,
  editExperience,
  editProject,
  editEducation,
  editCertification,
  updateSummary,
  updateSkillsString,
  previewMode,
  isDownloading,
  handlePrint,
  saving,
  setResume,
  isPro,
  setActiveTab
}) {

  // Intercept Enter key, sanitize DOM text, and safely blur to commit changes
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Stop browser from creating unhandled <br> or <div> tags
      const sanitizedText = e.target.innerText.replace(/\n/g, '').trim();
      e.target.innerText = sanitizedText; // Normalize the DOM node immediately
      e.target.blur(); // Triggers the corresponding onBlur handler cleanly
    }
  };

  const getDividerStyle = () => ({
    borderBottomStyle: resume?.settings?.borderStyle || 'none',
    borderBottomWidth: resume?.settings?.borderWidth || '1px',
    borderBottomColor: 'var(--subheading-color, var(--accent-color))',
    marginBottom: '6pt',
    marginTop: '2pt',
    opacity: (resume?.settings?.borderStyle || 'none') === 'none' ? 0 : 0.6
  });

  const renderMarkdownLinks = (text) => {
    if (!text) return '';
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const linkText = match[1];
      const linkUrl = match[2];
      parts.push(
        <a
          key={match.index}
          href={linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--accent-color)', textDecoration: 'underline' }}
          onClick={e => {
            if (!e.ctrlKey && !e.metaKey) {
              e.preventDefault();
            }
          }}
          title="Ctrl+Click to open link"
        >
          {linkText}
        </a>
      );
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    return parts.length > 0 ? parts : text;
  };

  const renderSection = (sectionId, layoutType = 'single') => {
    const isSidebar = layoutType === 'sidebar';
    const isCompact = resume?.settings?.margins === 'compact';
    
    const hStyle = isSidebar 
      ? { fontSize: '10pt', fontWeight: 800, margin: '0 0 4pt 0', textTransform: 'uppercase' }
      : { fontSize: '11pt', fontWeight: 800, margin: '0 0 4pt 0', textTransform: 'uppercase', letterSpacing: '0.05em' };

    switch (sectionId) {
      case 'summary':
        return (
          resume?.settings?.showSummary !== false && resume?.summary && (
            <section key="summary" style={{ marginBottom: isCompact ? '4pt' : '8pt' }}>
              <h3 className="resume-accent-text" style={hStyle}>Summary</h3>
              <div className="section-divider" style={getDividerStyle()} />
              <div
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="editable-field"
                onFocus={() => setFocusedField('summary')}
                onKeyDown={handleKeyDown}
                onBlur={(e) => {
                  setFocusedField(null);
                  const text = e.target.innerText.replace(/^AI suggestion 1:\s*/i, '');
                  updateSummary(text);
                }}
                style={{ fontSize: '9pt', lineHeight: 1.4, margin: 0, textAlign: 'justify', outline: 'none' }}
              >
                {focusedField === 'summary' ? resume.summary : renderMarkdownLinks(resume.summary)}
              </div>
            </section>
          )
        );
      case 'skills':
        return (
          <section key="skills" style={{ marginBottom: isCompact ? '4pt' : '8pt' }}>
            <h4 className="resume-accent-text" style={hStyle}>Skills</h4>
            <div className="section-divider" style={getDividerStyle()} />
            {isSidebar ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6pt', fontSize: '8.5pt' }}>
                {resume?.skills?.core?.length > 0 && (
                  <div>
                    <strong style={{ display: 'block', marginBottom: '1pt' }}>Core</strong>
                    {renderSkillItems('core', resume.skills.core, updateSkillsString)}
                  </div>
                )}
                {resume?.skills?.languages?.length > 0 && (
                  <div>
                    <strong style={{ display: 'block', marginBottom: '1pt' }}>Languages</strong>
                    {renderSkillItems('languages', resume.skills.languages, updateSkillsString)}
                  </div>
                )}
                {resume?.skills?.backend?.length > 0 && (
                  <div>
                    <strong style={{ display: 'block', marginBottom: '1pt' }}>Backend</strong>
                    {renderSkillItems('backend', resume.skills.backend, updateSkillsString)}
                  </div>
                )}
                {resume?.skills?.frontend?.length > 0 && (
                  <div>
                    <strong style={{ display: 'block', marginBottom: '1pt' }}>Frontend</strong>
                    {renderSkillItems('frontend', resume.skills.frontend, updateSkillsString)}
                  </div>
                )}
                {resume?.skills?.tools?.length > 0 && (
                  <div>
                    <strong style={{ display: 'block', marginBottom: '1pt' }}>Tools</strong>
                    {renderSkillItems('tools', resume.skills.tools, updateSkillsString)}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3pt', fontSize: '9pt' }}>
                {resume?.skills?.core?.length > 0 && (
                  <div>
                    <strong>Core Competencies:</strong>{' '}
                    {renderSkillItems('core', resume.skills.core, updateSkillsString)}
                  </div>
                )}
                {resume?.skills?.languages?.length > 0 && (
                  <div>
                    <strong>Programming Languages:</strong>{' '}
                    {renderSkillItems('languages', resume.skills.languages, updateSkillsString)}
                  </div>
                )}
                {resume?.skills?.backend?.length > 0 && (
                  <div>
                    <strong>Backend & Databases:</strong>{' '}
                    {renderSkillItems('backend', resume.skills.backend, updateSkillsString)}
                  </div>
                )}
                {resume?.skills?.frontend?.length > 0 && (
                  <div>
                    <strong>Frontend & Tools:</strong>{' '}
                    {renderSkillItems('frontend', resume.skills.frontend, updateSkillsString)}
                  </div>
                )}
                {resume?.skills?.tools?.length > 0 && (
                  <div>
                    <strong>Other Tools:</strong>{' '}
                    {renderSkillItems('tools', resume.skills.tools, updateSkillsString)}
                  </div>
                )}
              </div>
            )}
          </section>
        );
      case 'experience':
        return (
          resume?.settings?.showExperience !== false && resume?.experience?.length > 0 && (
            <section key="experience" style={{ marginBottom: isCompact ? '4pt' : '8pt' }}>
              <h3 className="resume-accent-text" style={hStyle}>Experience</h3>
              <div className="section-divider" style={getDividerStyle()} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: isCompact ? '4pt' : '8pt' }}>
                {resume.experience.map((exp, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 750, fontSize: isSidebar ? '9pt' : '9.5pt', marginBottom: '2pt' }}>
                      <span>
                        <span contentEditable={true} suppressContentEditableWarning={true} className="editable-field" onKeyDown={handleKeyDown} onBlur={e => editExperience(idx, 'company', e.target.innerText)}>{exp.company}</span>
                        {' '}|{' '}
                        <span contentEditable={true} suppressContentEditableWarning={true} className="editable-field" onKeyDown={handleKeyDown} onBlur={e => editExperience(idx, 'role', e.target.innerText)} style={{ fontWeight: 400, fontStyle: 'italic' }}>{exp.role}</span>
                      </span>
                      <span contentEditable={true} suppressContentEditableWarning={true} className="editable-field" onKeyDown={handleKeyDown} onBlur={e => editExperience(idx, 'date', e.target.innerText)} style={{ fontSize: '8pt', color: 'var(--font-color)', opacity: 0.65 }}>{exp.date}</span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '12pt', fontSize: isSidebar ? '8.5pt' : '9pt', lineHeight: 1.35 }}>
                      {exp.bullets.map((b, bIdx) => {
                        const fieldKey = `exp-${idx}-${bIdx}`;
                        const isHighlighted = exp.company === 'EnhanceCV' && bIdx === 0;
                        return (
                          <li
                            key={bIdx}
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                            className={`editable-field ${isHighlighted ? 'mistake-highlight-orange' : ''}`}
                            onFocus={() => setFocusedField(fieldKey)}
                            onKeyDown={handleKeyDown}
                            onBlur={(e) => {
                              setFocusedField(null);
                              const updated = [...exp.bullets];
                              updated[bIdx] = e.target.innerText;
                              editExperience(idx, 'bullets', updated);
                            }}
                            onClick={() => {
                              if (isHighlighted) setActiveTab('improve_text');
                            }}
                            style={{ 
                              marginBottom: '2pt',
                              position: 'relative'
                            }}
                            title={isHighlighted ? "Click to view wording suggestion in sidebar" : ""}
                          >
                            {focusedField === fieldKey ? b : renderMarkdownLinks(b)}

                            {isHighlighted && isPro && (
                              <span 
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '2px',
                                  marginLeft: '8px',
                                  fontSize: '7.5px',
                                  backgroundColor: '#f59e0b',
                                  color: 'white',
                                  padding: '1px 5px',
                                  borderRadius: '3px',
                                  cursor: 'pointer',
                                  fontWeight: 800,
                                  border: 'none',
                                  verticalAlign: 'middle',
                                  userSelect: 'none'
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updated = [...exp.bullets];
                                  updated[bIdx] = "Produced a biweekly newsletter sent to 1.5M subscribers, driving 25% user engagement";
                                  editExperience(idx, 'bullets', updated);
                                }}
                                title="Click to automatically apply the PRO suggestion!"
                              >
                                ✨ Improve Wording
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )
        );
      case 'projects':
        return (
          resume?.settings?.showProjects !== false && resume?.projects?.length > 0 && (
            <section key="projects" style={{ marginBottom: isCompact ? '4pt' : '8pt' }}>
              <h3 className="resume-accent-text" style={hStyle}>Projects</h3>
              <div className="section-divider" style={getDividerStyle()} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: isCompact ? '4pt' : '8pt' }}>
                {resume.projects.map((proj, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2pt' }}>
                      <span
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        className="editable-field"
                        onKeyDown={handleKeyDown}
                        onBlur={e => editProject(idx, 'name', e.target.innerText)}
                        style={{ fontWeight: 750, fontSize: isSidebar ? '9pt' : '9.5pt', outline: 'none' }}
                      >
                        {proj.name}
                      </span>
                      {proj.link ? (
                        <a
                          href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          contentEditable={true}
                          suppressContentEditableWarning={true}
                          className="editable-field"
                          onClick={e => { if (!e.ctrlKey && !e.metaKey) e.preventDefault(); }}
                          onKeyDown={handleKeyDown}
                          onBlur={e => {
                            editProject(idx, 'link', e.target.innerText);
                          }}
                          style={{ fontSize: '8pt', color: 'var(--accent-color)', textDecoration: 'underline', fontStyle: 'italic', outline: 'none' }}
                          title="Ctrl+Click to open link"
                        >
                          {proj.link}
                        </a>
                      ) : (
                        <span
                          contentEditable={true}
                          suppressContentEditableWarning={true}
                          className="editable-field no-print"
                          onKeyDown={handleKeyDown}
                          onBlur={e => {
                            const val = e.target.innerText === 'Add link...' ? '' : e.target.innerText;
                            editProject(idx, 'link', val);
                          }}
                          style={{ fontSize: '7.5pt', color: 'var(--font-color)', opacity: 0.5, fontStyle: 'italic', outline: 'none' }}
                        >
                          Add link...
                        </span>
                      )}
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '12pt', fontSize: isSidebar ? '8pt' : '9pt', lineHeight: 1.35 }}>
                      {proj.bullets.map((b, bIdx) => {
                        const fieldKey = `proj-${idx}-${bIdx}`;
                        return (
                          <li
                            key={bIdx}
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                            className="editable-field"
                            onFocus={() => setFocusedField(fieldKey)}
                            onKeyDown={handleKeyDown}
                            onBlur={(e) => {
                              setFocusedField(null);
                              const updated = [...proj.bullets];
                              updated[bIdx] = e.target.innerText;
                              editProject(idx, 'bullets', updated);
                            }}
                            style={{ marginBottom: '2pt' }}
                          >
                            {focusedField === fieldKey ? b : renderMarkdownLinks(b)}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )
        );
      case 'education':
        return (
          resume?.settings?.showEducation !== false && resume?.education?.length > 0 && (
            <section key="education" style={{ marginBottom: isCompact ? '4pt' : '8pt' }}>
              <h3 className="resume-accent-text" style={hStyle}>Education</h3>
              <div className="section-divider" style={getDividerStyle()} />
              {isSidebar ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8pt', fontSize: '8.5pt' }}>
                  {resume.education.map((edu, idx) => (
                    <div key={idx} style={{ lineHeight: 1.3 }}>
                      <strong contentEditable={true} suppressContentEditableWarning={true} className="editable-field" onKeyDown={handleKeyDown} onBlur={e => editEducation(idx, 'degree', e.target.innerText)}>{edu.degree}</strong>
                      <div contentEditable={true} suppressContentEditableWarning={true} className="editable-field" onKeyDown={handleKeyDown} onBlur={e => editEducation(idx, 'institution', e.target.innerText)} style={{ color: 'var(--font-color)', opacity: 0.7, fontSize: '8pt' }}>{edu.institution}</div>
                      <div style={{ fontStyle: 'italic', fontSize: '8pt' }}>
                        <span contentEditable={true} suppressContentEditableWarning={true} className="editable-field" onKeyDown={handleKeyDown} onBlur={e => editEducation(idx, 'score', e.target.innerText)}>{edu.score}</span>
                        {' '}(
                        <span contentEditable={true} suppressContentEditableWarning={true} className="editable-field" onKeyDown={handleKeyDown} onBlur={e => editEducation(idx, 'date', e.target.innerText)}>{edu.date}</span>
                        )
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4pt' }}>
                  {resume.education.map((edu, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9pt', lineHeight: 1.3 }}>
                      <span>
                        <strong contentEditable={true} suppressContentEditableWarning={true} className="editable-field" onKeyDown={handleKeyDown} onBlur={e => editEducation(idx, 'institution', e.target.innerText)}>{edu.institution}</strong>
                        {' '}|{' '}
                        <span contentEditable={true} suppressContentEditableWarning={true} className="editable-field" onKeyDown={handleKeyDown} onBlur={e => editEducation(idx, 'degree', e.target.innerText)}>{edu.degree}</span>
                      </span>
                      <span>
                        <span contentEditable={true} suppressContentEditableWarning={true} className="editable-field" onKeyDown={handleKeyDown} onBlur={e => editEducation(idx, 'score', e.target.innerText)}>{edu.score}</span>
                        {' '}(
                        <span contentEditable={true} suppressContentEditableWarning={true} className="editable-field" onKeyDown={handleKeyDown} onBlur={e => editEducation(idx, 'date', e.target.innerText)}>{edu.date}</span>
                        )
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )
        );
      case 'certifications':
        return (
          resume?.settings?.showCertifications !== false && resume?.certifications?.length > 0 && (
            <section key="certifications" style={{ marginBottom: isCompact ? '4pt' : '8pt' }}>
              <h3 className="resume-accent-text" style={hStyle}>Certifications</h3>
              <div className="section-divider" style={getDividerStyle()} />
              <ul style={{ margin: 0, paddingLeft: '12pt', fontSize: isSidebar ? '8.5pt' : '9pt', lineHeight: 1.3 }}>
                {resume.certifications.map((cert, idx) => (
                  <li
                    key={idx}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    className="editable-field"
                    onKeyDown={handleKeyDown}
                    onBlur={(e) => editCertification(idx, e.target.innerText)}
                    style={{ marginBottom: '2pt' }}
                  >
                    {cert}
                  </li>
                ))}
              </ul>
            </section>
          )
        );
      case 'keyAchievements':
        return (
          resume?.keyAchievements && resume?.keyAchievements.length > 0 && (
            <section key="keyAchievements" style={{ marginBottom: isCompact ? '4pt' : '8pt' }}>
              <h3 className="resume-accent-text" style={hStyle}>Key Achievements</h3>
              <div className="section-divider" style={getDividerStyle()} />
              <div className="achievements-grid">
                {resume.keyAchievements.map((ach, aIdx) => (
                  <div key={aIdx} className="achievement-card">
                    <div 
                      className="achievement-card-title resume-accent-text"
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                      onKeyDown={handleKeyDown}
                      onBlur={(e) => {
                        const updated = [...resume.keyAchievements];
                        updated[aIdx] = { ...updated[aIdx], title: e.target.innerText };
                        setResume(prev => ({ ...prev, keyAchievements: updated }));
                      }}
                      style={{ outline: 'none' }}
                      title="Click to edit title"
                    >
                      {ach.title}
                    </div>
                    <div 
                      className="achievement-card-desc"
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                      onKeyDown={handleKeyDown}
                      onBlur={(e) => {
                        const updated = [...resume.keyAchievements];
                        updated[aIdx] = { ...updated[aIdx], description: e.target.innerText };
                        setResume(prev => ({ ...prev, keyAchievements: updated }));
                      }}
                      style={{ outline: 'none' }}
                      title="Click to edit description"
                    >
                      {ach.description}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        );
      default:
        return null;
    }
  };

  const getHeaderField = (fieldName) => {
    return focusedField === fieldName ? resume?.personalInfo?.[fieldName] : <AnimatedText text={resume?.personalInfo?.[fieldName]} />;
  };

  const previewRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (isDownloading) {
      setScale(1);
      return;
    }
    const handleResize = () => {
      if (!previewRef.current) return;
      const containerWidth = previewRef.current.clientWidth;
      const targetWidth = 21 * 37.7952755906;
      const padding = 32;
      if (containerWidth > 100 && containerWidth < targetWidth + padding) {
        const newScale = (containerWidth - padding) / targetWidth;
        setScale(Math.max(0.2, newScale));
      } else {
        setScale(1);
      }
    };

    handleResize();

    const observer = new ResizeObserver(handleResize);
    if (previewRef.current) observer.observe(previewRef.current);

    window.addEventListener('resize', handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [isDownloading]);

  return (
    <main className="preview-panel" ref={previewRef}>
      {/* Editor Top Bar Toolbar */}
      <div className="preview-toolbar no-print">
        <div className="toolbar-status">
          <AnimatePresence mode="wait">
            {saving ? (
              <motion.div
                key="saving"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}
              >
                <span className="status-dot saving" />
                <span>Auto-saving updates...</span>
              </motion.div>
            ) : (
              <motion.div
                key="saved"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 600 }}
              >
                <span className="status-dot animate-pulse" style={{ backgroundColor: '#10b981' }} />
                <span>Saved to database</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="toolbar-actions">
          <button 
            className={`btn btn-primary ${isDownloading ? 'btn-downloading' : ''}`} 
            onClick={handlePrint}
            disabled={isDownloading}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', minWidth: '135px', justifyContent: 'center' }}
          >
            {isDownloading ? (
              <>
                <RefreshCw size={15} className="animate-spin" />
                <span>Preparing...</span>
              </>
            ) : (
              <>
                <Printer size={15} />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scaled canvas container for mobile viewports */}
      <div 
        style={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center', 
          height: isDownloading ? 'auto' : `calc(29.7cm * ${scale})`,
          overflow: 'hidden',
          marginBottom: '2rem'
        }}
        className="a4-container-wrapper"
      >
        <article 
          className={`a4-sheet print-area resume-font-${resume?.settings?.fontFamily || 'sans'} margin-${resume?.settings?.margins || 'standard'} ${isDownloading ? 'canvas-glide-down' : ''}`}
          style={{ 
            color: resume?.settings?.fontColor || '#111111', 
            '--font-color': resume?.settings?.fontColor || '#111111', 
            overflow: 'hidden',
            transform: isDownloading ? 'none' : `scale(${scale})`,
            transformOrigin: 'top center',
            margin: '0'
          }}
        >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeTemplate.id}
            initial={isDownloading ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={isDownloading ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -10, scale: 0.995 }}
            transition={isDownloading ? { duration: 0 } : { type: 'spring', stiffness: 220, damping: 22 }}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}
          >
            {/* Header layouts */}
        {activeTemplate.headerStyle === 'centered' && (
          <header style={{ textAlign: 'center', marginBottom: '0.6cm' }}>
            <h2
              contentEditable={true}
              suppressContentEditableWarning={true}
              className="editable-field"
              onFocus={() => setFocusedField('name')}
              onKeyDown={handleKeyDown}
              onBlur={(e) => { setFocusedField(null); updatePersonalInfo('name', e.target.innerText); }}
              style={{ fontSize: '24pt', fontWeight: 950, letterSpacing: '-0.03em', margin: '0 0 4pt 0', textTransform: 'uppercase', outline: 'none' }}
              title="Click to edit name"
            >
              {getHeaderField('name')}
            </h2>
            {resume?.targetJobTitle && (
              <div
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="editable-field"
                onKeyDown={handleKeyDown}
                onBlur={(e) => { setFocusedField(null); setResume(prev => ({ ...prev, targetJobTitle: e.target.innerText })); }}
                style={{ fontSize: '11pt', fontWeight: 700, color: 'var(--subheading-color, var(--accent-color))', marginBottom: '8pt', textTransform: 'uppercase', outline: 'none', letterSpacing: '0.05em' }}
                title="Click to edit job title"
              >
                {resume.targetJobTitle}
              </div>
            )}
            <div style={{ fontSize: '9pt', color: 'var(--font-color)', opacity: 0.7, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6pt' }}>
              {resume?.personalInfo?.email && (
                <a
                  href={`mailto:${resume?.personalInfo?.email}`}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  className="editable-field"
                  onClick={e => { if (!e.ctrlKey && !e.metaKey) e.preventDefault(); }}
                  onFocus={() => setFocusedField('email')}
                  onKeyDown={handleKeyDown}
                  onBlur={(e) => { setFocusedField(null); updatePersonalInfo('email', e.target.innerText); }}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                  title="Ctrl+Click to send email"
                >
                  {getHeaderField('email')}
                </a>
              )}
              <span>•</span>
              <span contentEditable={true} suppressContentEditableWarning={true} className="editable-field" onFocus={() => setFocusedField('phone')} onKeyDown={handleKeyDown} onBlur={(e) => { setFocusedField(null); updatePersonalInfo('phone', e.target.innerText); }}>{getHeaderField('phone')}</span>
              {resume?.personalInfo?.linkedin && (
                <>
                  <span>•</span>
                  <a
                    href={resume?.personalInfo?.linkedin.startsWith('http') ? resume?.personalInfo?.linkedin : `https://${resume?.personalInfo?.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    className="editable-field"
                    onClick={e => { if (!e.ctrlKey && !e.metaKey) e.preventDefault(); }}
                    onFocus={() => setFocusedField('linkedin')}
                    onKeyDown={handleKeyDown}
                    onBlur={(e) => { setFocusedField(null); updatePersonalInfo('linkedin', e.target.innerText); }}
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                    title="Ctrl+Click to open link"
                  >
                    {getHeaderField('linkedin')}
                  </a>
                </>
              )}
              {resume?.personalInfo?.github && (
                <>
                  <span>•</span>
                  <a
                    href={resume?.personalInfo?.github.startsWith('http') ? resume?.personalInfo?.github : `https://${resume?.personalInfo?.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    className="editable-field"
                    onClick={e => { if (!e.ctrlKey && !e.metaKey) e.preventDefault(); }}
                    onFocus={() => setFocusedField('github')}
                    onKeyDown={handleKeyDown}
                    onBlur={(e) => { setFocusedField(null); updatePersonalInfo('github', e.target.innerText); }}
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                    title="Ctrl+Click to open link"
                  >
                    {getHeaderField('github')}
                  </a>
                </>
              )}
              {resume?.personalInfo?.location && (
                <>
                  <span>•</span>
                  <span
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    className="editable-field"
                    onFocus={() => setFocusedField('location')}
                    onKeyDown={handleKeyDown}
                    onBlur={(e) => { setFocusedField(null); updatePersonalInfo('location', e.target.innerText); }}
                  >
                    {getHeaderField('location')}
                  </span>
                </>
              )}
              {resume?.customFields?.map((cf, cfIdx) => {
                const isLink = cf.type === 'link';
                return (
                  <Fragment key={cfIdx}>
                    <span>|</span>
                    {isLink ? (
                      <a
                        href={cf.value.startsWith('http') ? cf.value : `https://${cf.value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        className="editable-field"
                        onClick={e => e.preventDefault()}
                        onKeyDown={handleKeyDown}
                        onBlur={(e) => {
                          const updated = [...resume.customFields];
                          updated[cfIdx] = { ...updated[cfIdx], value: e.target.innerText };
                          setResume(prev => ({ ...prev, customFields: updated }));
                        }}
                        style={{ color: 'inherit', textDecoration: 'underline' }}
                      >
                        <strong>{cf.label}:</strong> {cf.value}
                      </a>
                    ) : (
                      <span
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        className="editable-field"
                        onKeyDown={handleKeyDown}
                        onBlur={(e) => {
                          const updated = [...resume.customFields];
                          updated[cfIdx] = { ...updated[cfIdx], value: e.target.innerText };
                          setResume(prev => ({ ...prev, customFields: updated }));
                        }}
                      >
                        <strong>{cf.label}:</strong> {cf.value}
                      </span>
                    )}
                  </Fragment>
                );
              })}
            </div>
          </header>
        )}

        {activeTemplate.headerStyle === 'split' && (
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6cm', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.4cm' }}>
            <div>
              <h2
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="editable-field"
                onFocus={() => setFocusedField('name')}
                onKeyDown={handleKeyDown}
                onBlur={(e) => { setFocusedField(null); updatePersonalInfo('name', e.target.innerText); }}
                style={{ fontSize: '22pt', fontWeight: 900, letterSpacing: '-0.02em', margin: 0, textTransform: 'uppercase', outline: 'none' }}
              >
                {getHeaderField('name')}
              </h2>
              <span className="resume-accent-text" style={{ fontSize: '9pt', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Professional CV</span>
            </div>
            <div style={{ fontSize: '9pt', color: 'var(--font-color)', opacity: 0.7, textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '2pt' }}>
              <span contentEditable={true} suppressContentEditableWarning={true} className="editable-field" onFocus={() => setFocusedField('email')} onKeyDown={handleKeyDown} onBlur={(e) => { setFocusedField(null); updatePersonalInfo('email', e.target.innerText); }}>{getHeaderField('email')}</span>
              <span contentEditable={true} suppressContentEditableWarning={true} className="editable-field" onFocus={() => setFocusedField('phone')} onKeyDown={handleKeyDown} onBlur={(e) => { setFocusedField(null); updatePersonalInfo('phone', e.target.innerText); }}>{getHeaderField('phone')}</span>
              {resume?.personalInfo?.linkedin && (
                <a
                  href={resume?.personalInfo?.linkedin.startsWith('http') ? resume?.personalInfo?.linkedin : `https://${resume?.personalInfo?.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  className="editable-field"
                  onClick={e => e.preventDefault()}
                  onFocus={() => setFocusedField('linkedin')}
                  onKeyDown={handleKeyDown}
                  onBlur={(e) => { setFocusedField(null); updatePersonalInfo('linkedin', e.target.innerText); }}
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                  {getHeaderField('linkedin')}
                </a>
              )}
              {resume?.personalInfo?.github && (
                <a
                  href={resume?.personalInfo?.github.startsWith('http') ? resume?.personalInfo?.github : `https://${resume?.personalInfo?.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  className="editable-field"
                  onClick={e => e.preventDefault()}
                  onFocus={() => setFocusedField('github')}
                  onKeyDown={handleKeyDown}
                  onBlur={(e) => { setFocusedField(null); updatePersonalInfo('github', e.target.innerText); }}
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                  {getHeaderField('github')}
                </a>
              )}
              {resume?.customFields?.map((cf, cfIdx) => {
                const isLink = cf.type === 'link';
                return isLink ? (
                  <a
                    key={cfIdx}
                    href={cf.value.startsWith('http') ? cf.value : `https://${cf.value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    className="editable-field"
                    onClick={e => e.preventDefault()}
                    onKeyDown={handleKeyDown}
                    onBlur={(e) => {
                      const updated = [...resume.customFields];
                      updated[cfIdx] = { ...updated[cfIdx], value: e.target.innerText };
                      setResume(prev => ({ ...prev, customFields: updated }));
                    }}
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                  >
                    <strong>{cf.label}:</strong> {cf.value}
                  </a>
                ) : (
                  <span
                    key={cfIdx}
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    className="editable-field"
                    onKeyDown={handleKeyDown}
                    onBlur={(e) => {
                      const updated = [...resume.customFields];
                      updated[cfIdx] = { ...updated[cfIdx], value: e.target.innerText };
                      setResume(prev => ({ ...prev, customFields: updated }));
                    }}
                  >
                    <strong>{cf.label}:</strong> {cf.value}
                  </span>
                );
              })}
            </div>
          </header>
        )}

        {activeTemplate.headerStyle === 'block' && (
          <header className="resume-accent-bg" style={{ margin: '-1.5cm -1.5cm 0.6cm -1.5cm', padding: '0.8cm 1.5cm', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="editable-field"
                onFocus={() => setFocusedField('name')}
                onKeyDown={handleKeyDown}
                onBlur={(e) => { setFocusedField(null); updatePersonalInfo('name', e.target.innerText); }}
                style={{ fontSize: '22pt', fontWeight: 900, letterSpacing: '-0.02em', margin: 0, textTransform: 'uppercase', color: 'white', outline: 'none' }}
              >
                {getHeaderField('name')}
              </h2>
              <span style={{ fontSize: '9pt', opacity: 0.8, letterSpacing: '0.05em' }}>Portfolio Record</span>
            </div>
            <div style={{ fontSize: '8.5pt', textAlign: 'right', color: 'white', display: 'flex', flexDirection: 'column', gap: '2pt', opacity: 0.9 }}>
              <span contentEditable={true} suppressContentEditableWarning={true} className="editable-field" onFocus={() => setFocusedField('email')} onKeyDown={handleKeyDown} onBlur={(e) => { setFocusedField(null); updatePersonalInfo('email', e.target.innerText); }}>{getHeaderField('email')}</span>
              <span contentEditable={true} suppressContentEditableWarning={true} className="editable-field" onFocus={() => setFocusedField('phone')} onKeyDown={handleKeyDown} onBlur={(e) => { setFocusedField(null); updatePersonalInfo('phone', e.target.innerText); }}>{getHeaderField('phone')}</span>
              {resume?.personalInfo?.linkedin && (
                <a
                  href={resume?.personalInfo?.linkedin.startsWith('http') ? resume?.personalInfo?.linkedin : `https://${resume?.personalInfo?.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  className="editable-field"
                  onClick={e => e.preventDefault()}
                  onFocus={() => setFocusedField('linkedin')}
                  onKeyDown={handleKeyDown}
                  onBlur={(e) => { setFocusedField(null); updatePersonalInfo('linkedin', e.target.innerText); }}
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                  {getHeaderField('linkedin')}
                </a>
              )}
              {resume?.personalInfo?.github && (
                <a
                  href={resume?.personalInfo?.github.startsWith('http') ? resume?.personalInfo?.github : `https://${resume?.personalInfo?.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  className="editable-field"
                  onClick={e => e.preventDefault()}
                  onFocus={() => setFocusedField('github')}
                  onKeyDown={handleKeyDown}
                  onBlur={(e) => { setFocusedField(null); updatePersonalInfo('github', e.target.innerText); }}
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                  {getHeaderField('github')}
                </a>
              )}
            </div>
          </header>
        )}

        {activeTemplate.headerStyle === 'banner' && (
          <header style={{ marginBottom: '0.6cm' }}>
            <div className="resume-accent-bg" style={{ height: '5px', margin: '-1.5cm -1.5cm 0.5cm -1.5cm' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <h2
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="editable-field"
                onFocus={() => setFocusedField('name')}
                onKeyDown={handleKeyDown}
                onBlur={(e) => { setFocusedField(null); updatePersonalInfo('name', e.target.innerText); }}
                style={{ fontSize: '24pt', fontWeight: 900, letterSpacing: '-0.03em', margin: 0, textTransform: 'uppercase', outline: 'none' }}
              >
                {getHeaderField('name')}
              </h2>
              <div style={{ fontSize: '8.5pt', color: 'var(--font-color)', opacity: 0.7, display: 'flex', gap: '8pt' }}>
                <span contentEditable={true} suppressContentEditableWarning={true} className="editable-field" onFocus={() => setFocusedField('email')} onKeyDown={handleKeyDown} onBlur={(e) => { setFocusedField(null); updatePersonalInfo('email', e.target.innerText); }}>{getHeaderField('email')}</span>
                <span>|</span>
                <span contentEditable={true} suppressContentEditableWarning={true} className="editable-field" onFocus={() => setFocusedField('phone')} onKeyDown={handleKeyDown} onBlur={(e) => { setFocusedField(null); updatePersonalInfo('phone', e.target.innerText); }}>{getHeaderField('phone')}</span>
              </div>
            </div>
          </header>
        )}

        {activeTemplate.headerStyle === 'sidebar' && (
          <header style={{ marginBottom: '0.8cm', display: 'flex', gap: '0.6cm', alignItems: 'stretch' }}>
            <div style={{ flex: '1.2', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="editable-field"
                onFocus={() => setFocusedField('name')}
                onKeyDown={handleKeyDown}
                onBlur={(e) => { setFocusedField(null); updatePersonalInfo('name', e.target.innerText); }}
                style={{ fontSize: '24pt', fontWeight: 900, letterSpacing: '-0.03em', margin: 0, textTransform: 'uppercase', outline: 'none', lineHeight: 1.1 }}
              >
                {getHeaderField('name')}
              </h2>
            </div>
            <div className="resume-accent-bg" style={{ width: '3px', minHeight: '100%', alignSelf: 'stretch', opacity: 0.8 }} />
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '3pt', fontSize: '8.5pt', justifyContent: 'center', color: 'var(--font-color)', opacity: 0.8 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2pt' }}>
                {resume?.personalInfo?.email && (
                  <div>
                    <strong>Email:</strong>{' '}
                    <a
                      href={`mailto:${resume?.personalInfo?.email}`}
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                      className="editable-field"
                      onClick={e => { if (!e.ctrlKey && !e.metaKey) e.preventDefault(); }}
                      onFocus={() => setFocusedField('email')}
                      onKeyDown={handleKeyDown}
                      onBlur={(e) => { setFocusedField(null); updatePersonalInfo('email', e.target.innerText); }}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                      {getHeaderField('email')}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </header>
        )}

        {/* Layout Templates */}
        {previewMode === 'coverletter' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6cm', minHeight: '22cm', fontSize: '10pt', lineHeight: 1.5 }}>
            <div style={{ color: 'var(--font-color)', opacity: 0.8, fontSize: '9.5pt' }}>
              {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2pt' }}>
              <strong>To:</strong>
              <span>{resume?.coverLetter?.recipient || 'Hiring Team'}</span>
              {resume?.coverLetter?.company && <span>{resume?.coverLetter?.company}</span>}
            </div>
            <div className="section-divider" style={getDividerStyle()} />
            <div style={{ fontWeight: 800 }}>
              RE: Application for {resume?.targetJobTitle || 'Software Engineer'} Role
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4cm', textAlign: 'justify', whiteSpace: 'pre-line' }}>
              {resume?.coverLetter?.body || 'Dear Hiring Manager,\n\n(Please write or generate your cover letter in the edit panel)'}
            </div>
          </div>
        ) : (
          <>
            {activeTemplate.layoutType === 'single' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5cm' }}>
                {(resume?.settings?.sectionOrder || ['summary', 'skills', 'experience', 'projects', 'education', 'certifications']).map(secId => 
                  renderSection(secId, 'single')
                )}
              </div>
            )}

            {(activeTemplate.layoutType === 'double-left' || activeTemplate.layoutType === 'double-right') && (
              <div className={`resume-grid-${activeTemplate.layoutType}`}>
                <div className="resume-sidebar-col">
                  {(resume?.settings?.sectionOrder || ['summary', 'skills', 'experience', 'projects', 'education', 'certifications'])
                    .filter(id => ['skills', 'education', 'certifications'].includes(id))
                    .map(secId => renderSection(secId, 'sidebar'))}
                </div>
                <div className="resume-main-col">
                  {(resume?.settings?.sectionOrder || ['summary', 'skills', 'experience', 'projects', 'education', 'certifications'])
                    .filter(id => ['summary', 'experience', 'projects'].includes(id))
                    .map(secId => renderSection(secId, 'single'))}
                </div>
              </div>
            )}

            {activeTemplate.layoutType === 'grid' && (
              <div className="resume-grid-grid">
                {resume?.settings?.showSummary !== false && resume?.summary && (
                  <section style={{ gridColumn: 'span 2', marginBottom: '0.2cm' }}>
                    <h3 className="resume-accent-text" style={{ fontSize: '11pt', fontWeight: 800, margin: '0 0 4pt 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Summary</h3>
                    <div className="section-divider" style={getDividerStyle()} />
                    <p
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                      className="editable-field"
                      onFocus={() => setFocusedField('summary-grid')}
                      onKeyDown={handleKeyDown}
                      onBlur={(e) => {
                        setFocusedField(null);
                        updateSummary(e.target.innerText);
                      }}
                      style={{ fontSize: '9pt', lineHeight: 1.4, margin: 0, textAlign: 'justify', outline: 'none' }}
                    >
                      {focusedField === 'summary-grid' ? resume.summary : renderMarkdownLinks(resume.summary)}
                    </p>
                  </section>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5cm' }}>
                  {(resume?.settings?.sectionOrder || ['summary', 'skills', 'experience', 'projects', 'education', 'certifications']).filter(id => ['experience'].includes(id)).map(secId => renderSection(secId, 'single'))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5cm' }}>
                  {(resume?.settings?.sectionOrder || ['summary', 'skills', 'experience', 'projects', 'education', 'certifications']).filter(id => ['skills', 'projects', 'education', 'certifications'].includes(id)).map(secId => renderSection(secId, 'single'))}
                </div>
              </div>
            )}
          </>
        )}

        {resume?.settings?.showBranding !== false && (
          <div style={{
            position: 'absolute',
            bottom: '0.4cm',
            left: '1.5cm',
            right: '1.5cm',
            borderTop: '1px solid rgba(0,0,0,0.06)',
            paddingTop: '4pt',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '7.5pt',
            color: 'var(--font-color)',
            opacity: 0.4,
            boxSizing: 'border-box'
          }}>
            <span>Created with <strong>CV Builder PRO</strong></span>
            <span>enhancv.com clone</span>
          </div>
        )}

          </motion.div>
        </AnimatePresence>
      </article>
      </div>
    </main>
  );
}