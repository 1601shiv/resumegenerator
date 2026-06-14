import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Star, GitBranch, Edit2, Copy, Trash2 } from 'lucide-react';

export default function DashboardView({
  resumes,
  createNewResume,
  startEditing,
  renameResume,
  duplicateResume,
  deleteResume,
  toggleMasterStatus,
  forkResume
}) {
  return (
    <div className="dashboard-view">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)', margin: 0 }}>CV & Portfolio Dashboard</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>Manage all your resumes in one cloud workspace</p>
          </div>
          <div>
            <button className="btn btn-primary" onClick={createNewResume}>
              <Plus size={16} />
              <span>Create New CV</span>
            </button>
          </div>
        </header>

        <main style={{ marginTop: '1rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem' }}>My Resumes ({resumes.length})</h2>
          <div className="dashboard-grid">
            
            {/* Create Card */}
            <div className="resume-db-card new-card" onClick={createNewResume}>
              <Plus size={32} style={{ color: 'var(--accent-color)' }} />
              <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>Create New CV</span>
            </div>

            {/* Saved Resume Cards */}
            {resumes.filter(r => !r.forkedFrom || !resumes.some(parent => parent._id === r.forkedFrom)).map(res => {
              const children = resumes.filter(r => r.forkedFrom === res._id);
              return (
                <div key={res._id} className="resume-db-card" onClick={() => startEditing(res._id)}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <h3 className="resume-db-title" style={{ margin: 0 }}>{res.title}</h3>
                      {res.isMaster && (
                        <span className="badge-master">
                          <Star size={10} fill="currentColor" /> Master
                        </span>
                      )}
                    </div>
                    <div className="resume-db-date">Last Edited: {new Date(res.updatedAt).toLocaleDateString()}</div>
                  </div>
                  
                  {/* Children variations */}
                  {children.length > 0 && (
                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }} onClick={e => e.stopPropagation()}>
                      <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Tailored Variations ({children.length})
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {children.map(child => (
                          <div 
                            key={child._id} 
                            className="child-badge-card" 
                            onClick={(e) => { e.stopPropagation(); startEditing(child._id); }}
                            title={`Edit Tailored CV: ${child.title}`}
                          >
                            <span className="badge-tailored" style={{ padding: '0.05rem 0.2rem', fontSize: '0.55rem', borderRadius: '2px' }}>
                              Tailored
                            </span>
                            <span className="child-title">
                              {child.title.startsWith('[Tailored: ') ? child.title.substring(child.title.indexOf(']') + 2) : child.title}
                            </span>
                            <span className="child-meta">{new Date(child.updatedAt).toLocaleDateString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="card-action-bar no-print" style={{ marginTop: '1rem' }} onClick={e => e.stopPropagation()}>
                    <button 
                      className={`btn ${res.isMaster ? 'btn-primary' : 'btn-secondary'} btn-small`} 
                      onClick={(e) => toggleMasterStatus(res, e)} 
                      title={res.isMaster ? "Remove Master Designation" : "Designate as Master"}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      <Star size={12} fill={res.isMaster ? "currentColor" : "none"} />
                      <span style={{ fontSize: '0.7rem' }}>{res.isMaster ? 'Master' : 'Make Master'}</span>
                    </button>
                    
                    {res.isMaster && (
                      <button 
                        className="btn btn-secondary btn-small" 
                        onClick={(e) => forkResume(res._id, e)} 
                        title="Fork Tailored CV"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                      >
                        <GitBranch size={12} />
                        <span style={{ fontSize: '0.7rem' }}>Fork</span>
                      </button>
                    )}

                    <button className="btn btn-secondary btn-small" onClick={(e) => renameResume(res._id, res.title, e)} title="Rename CV">
                      <Edit2 size={13} />
                    </button>
                    <button className="btn btn-secondary btn-small" onClick={(e) => duplicateResume(res._id, e)} title="Duplicate CV">
                      <Copy size={13} />
                    </button>
                    <button className="btn btn-danger btn-small" style={{ marginLeft: 'auto' }} onClick={(e) => deleteResume(res._id, e)} title="Delete CV">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}

          </div>
        </main>
      </div>
    </div>
  );
}
