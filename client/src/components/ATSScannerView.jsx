import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Settings2, RefreshCw, Check, Info } from 'lucide-react';

export default function ATSScannerView({
  atsCVText,
  setAtsCVText,
  atsJobDesc,
  setAtsJobDesc,
  atsScanning,
  atsAnalysisResults,
  setAtsAnalysisResults,
  handleAutoLoadCVText,
  handleScanATS,
  theme
}) {
  return (
    <motion.div
      key="ats"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
      style={{ height: '100%', overflowY: 'auto', paddingBottom: '4rem' }}
    >
      <div className="dashboard-view" style={{ height: 'auto', minHeight: '100vh', width: '100%', padding: '3rem 1.5rem' }}>
        <div className="dashboard-container" style={{ width: '1100px', maxWidth: '95%' }}>
          
          <header className="dashboard-header" style={{ marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)', margin: 0 }}>ATS Compatibility Scanner</h1>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>Compare your CV against any job description to optimize for Applicant Tracking Systems.</p>
            </div>
            <div>
              <button className="btn btn-secondary" onClick={() => {
                setAtsCVText('');
                setAtsJobDesc('');
                setAtsAnalysisResults(null);
              }}>
                Clear Fields
              </button>
            </div>
          </header>

          <div className="ats-grid-layout">
            {/* Left Pane: Input fields */}
            <div className="feature-glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={18} style={{ color: 'var(--accent-color)' }} />
                <span>Input Documents</span>
              </h3>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label className="form-label" style={{ margin: 0 }}>Resume / CV Text</label>
                  <button 
                    className="btn btn-secondary btn-small" 
                    onClick={handleAutoLoadCVText}
                    style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem' }}
                  >
                    Auto-Load Current CV
                  </button>
                </div>
                <textarea 
                  className="form-textarea" 
                  placeholder="Paste your CV text here..." 
                  value={atsCVText} 
                  onChange={(e) => setAtsCVText(e.target.value)} 
                  style={{ minHeight: '180px', width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ marginBottom: '0.5rem' }}>Target Job Description</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="Paste the job requirements description here..." 
                  value={atsJobDesc} 
                  onChange={(e) => setAtsJobDesc(e.target.value)} 
                  style={{ minHeight: '180px', width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <button 
                className="btn btn-primary" 
                onClick={handleScanATS} 
                disabled={atsScanning}
                style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                {atsScanning ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    <span>Scanning CV with NLP parser...</span>
                  </>
                ) : (
                  <>
                    <Settings2 size={18} />
                    <span>Analyze Optimization Match</span>
                  </>
                )}
              </button>
            </div>

            {/* Right Pane: Results Panel */}
            <div className="feature-glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: '520px' }}>
              {!atsAnalysisResults && !atsScanning && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '450px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <Settings2 size={48} style={{ strokeWidth: 1, marginBottom: '1rem', opacity: 0.5 }} />
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>Awaiting Analysis</h4>
                  <p style={{ fontSize: '0.8rem', maxWidth: '320px', margin: 0 }}>Provide your CV details and target job description to compute real-time compatibility scores.</p>
                </div>
              )}

              {atsScanning && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '450px', gap: '1.5rem' }}>
                  <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                    <div className="animate-spin" style={{ position: 'absolute', inset: 0, border: '4px solid var(--border-color)', borderTopColor: 'var(--accent-color)', borderRadius: '50%' }} />
                    <div style={{ position: 'absolute', inset: '8px', border: '2px dashed hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.3)', borderRadius: '50%', animation: 'spin 6s linear infinite reverse' }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText size={24} style={{ color: 'var(--accent-color)', animation: 'pulse 1.5s infinite alternate' }} />
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 0.25rem 0' }}>Parsing Text & Matching Keywords</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Evaluating keyword densities, format conventions, and structural layouts...</p>
                  </div>
                </div>
              )}

              {atsAnalysisResults && !atsScanning && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                  {/* Score dashboard header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
                    
                    {/* Circular progress gauge */}
                    <div style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0 }}>
                      <svg className="progress-ring" width="100" height="100">
                        <circle 
                          className="progress-ring-circle" 
                          stroke={theme === 'dark' ? '#1e2943' : '#e2e8f0'}
                          strokeWidth="8" 
                          fill="transparent" 
                          r="40" 
                          cx="50" 
                          cy="50" 
                        />
                        <circle 
                          className="progress-ring-circle" 
                          stroke={
                            atsAnalysisResults.score >= 80 ? '#10b981' : 
                            atsAnalysisResults.score >= 60 ? '#f59e0b' : '#ef4444'
                          }
                          strokeWidth="8" 
                          fill="transparent" 
                          r="40" 
                          cx="50" 
                          cy="50" 
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - atsAnalysisResults.score / 100)}`}
                        />
                      </svg>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '1.6rem', fontWeight: 950, color: 'var(--text-main)', lineHeight: 1 }}>{atsAnalysisResults.score}%</span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Match</span>
                      </div>
                    </div>

                    {/* Assessment comments */}
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.25rem 0' }}>
                        {atsAnalysisResults.score >= 80 ? 'Excellent ATS Alignment!' : 
                         atsAnalysisResults.score >= 60 ? 'Moderate compatibility' : 'Needs critical optimization'}
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                        {atsAnalysisResults.score >= 80 ? 'Your resume is highly optimized for this job description. It contains a strong density of matched key terms and clean structural formatting.' :
                         atsAnalysisResults.score >= 60 ? 'Your resume matches several key requirements but missing key vocabulary. Inject more of the missing skills to pass threshold filters.' :
                         'Your resume score is low. You are missing crucial keyword matches and may have layout formatting warnings. Add missing target keywords.'}
                      </p>
                    </div>
                  </div>

                  {/* Keyword Match Grid */}
                  <div>
                    <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 0.75rem 0', letterSpacing: '0.05em' }}>
                      Keyword Analysis ({atsAnalysisResults.matchedKeywords.length} of {atsAnalysisResults.totalCheckedKeywordsCount} matched)
                    </h4>
                    
                    {/* Tags grid */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {atsAnalysisResults.matchedKeywords.map((kw, i) => (
                        <span key={`match-${i}`} className="skill-tag skill-match" style={{ textTransform: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Check size={10} />
                          <span>{kw}</span>
                        </span>
                      ))}
                      {atsAnalysisResults.missingKeywords.map((kw, i) => (
                        <span key={`miss-${i}`} className="skill-tag skill-missing" style={{ textTransform: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <span style={{ fontSize: '0.65rem', fontWeight: 900 }}>+</span>
                          <span>{kw}</span>
                        </span>
                      ))}
                      {atsAnalysisResults.totalCheckedKeywordsCount === 0 && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No clear keywords parsed from the job description.</span>
                      )}
                    </div>
                  </div>

                  {/* Warning Checklist */}
                  <div>
                    <h4 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 0.75rem 0', letterSpacing: '0.05em' }}>
                      Formatting & Content Check
                    </h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {/* Standard items check */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                        {atsCVText.length >= 500 ? (
                          <Check size={14} style={{ color: '#10b981' }} />
                        ) : (
                          <span style={{ color: '#ef4444', fontWeight: 900 }}>✗</span>
                        )}
                        <span style={{ color: atsCVText.length >= 500 ? 'var(--text-main)' : 'var(--text-muted)' }}>CV Length is optimal (min 500 chars)</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                        {atsCVText.toLowerCase().includes('experience') || atsCVText.toLowerCase().includes('work history') ? (
                          <Check size={14} style={{ color: '#10b981' }} />
                        ) : (
                          <span style={{ color: '#ef4444', fontWeight: 900 }}>✗</span>
                        )}
                        <span style={{ color: (atsCVText.toLowerCase().includes('experience') || atsCVText.toLowerCase().includes('work history')) ? 'var(--text-main)' : 'var(--text-muted)' }}>Standard Experience heading present</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                        {atsCVText.toLowerCase().includes('skills') ? (
                          <Check size={14} style={{ color: '#10b981' }} />
                        ) : (
                          <span style={{ color: '#ef4444', fontWeight: 900 }}>✗</span>
                        )}
                        <span style={{ color: atsCVText.toLowerCase().includes('skills') ? 'var(--text-main)' : 'var(--text-muted)' }}>Standard Skills heading present</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                        {atsCVText.toLowerCase().includes('education') || atsCVText.toLowerCase().includes('academic') ? (
                          <Check size={14} style={{ color: '#10b981' }} />
                        ) : (
                          <span style={{ color: '#ef4444', fontWeight: 900 }}>✗</span>
                        )}
                        <span style={{ color: (atsCVText.toLowerCase().includes('education') || atsCVText.toLowerCase().includes('academic')) ? 'var(--text-main)' : 'var(--text-muted)' }}>Standard Education heading present</span>
                      </div>

                      {/* Warnings list */}
                      {atsAnalysisResults.warnings.length > 0 && (
                        <div style={{ marginTop: '0.5rem', padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.15)', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Info size={12} />
                            <span>Optimization Actions ({atsAnalysisResults.warnings.length})</span>
                          </span>
                          <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.75rem', color: '#fca5a5', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {atsAnalysisResults.warnings.map(w => (
                              <li key={w.id}>{w.text}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                </motion.div>
              )}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
