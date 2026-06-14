import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

export default function AdminView({
  adminStats,
  adminUsers,
  adminLoading,
  fetchAdminData,
  handleToggleUserFlag,
  handleDeleteUser,
  currentUser
}) {
  return (
    <motion.div
      key="admin"
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
              <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)', margin: 0 }}>System Administration</h1>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>Overview statistics and user profile controls</p>
            </div>
            <div>
              <button className="btn btn-secondary" onClick={fetchAdminData} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <RefreshCw size={14} className={adminLoading ? 'animate-spin' : ''} />
                <span>Refresh Data</span>
              </button>
            </div>
          </header>

          {adminLoading && !adminStats ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '3rem' }}>
              <RefreshCw size={32} className="animate-spin" style={{ color: 'var(--accent-color)' }} />
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Querying administrative database records...</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Stats cards */}
              <div className="admin-stats-grid">
                <div className="feature-glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Registered Users</span>
                  <span style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--accent-color)' }}>{adminStats?.totalUsers || 0}</span>
                </div>
                <div className="feature-glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Resumes Created</span>
                  <span style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--accent-color)' }}>{adminStats?.totalResumes || 0}</span>
                </div>
                <div className="feature-glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Templates Seeded</span>
                  <span style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--accent-color)' }}>{adminStats?.totalTemplates || 0}</span>
                </div>
              </div>

              {/* Split view: Users table & Popular templates */}
              <div className="admin-split-grid">
                
                {/* Users Table */}
                <div className="feature-glass-card" style={{ padding: '2rem', overflowX: 'auto' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 1.5rem 0' }}>Users Directory</h3>
                  
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                        <th style={{ padding: '0.75rem 0.5rem' }}>Name</th>
                        <th style={{ padding: '0.75rem 0.5rem' }}>Email</th>
                        <th style={{ padding: '0.75rem 0.5rem' }}>PRO Status</th>
                        <th style={{ padding: '0.75rem 0.5rem' }}>Admin</th>
                        <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminUsers.map(u => (
                        <tr key={u._id} style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-main)' }}>
                          <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>{u.name}</td>
                          <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>{u.email}</td>
                          <td style={{ padding: '0.75rem 0.5rem' }}>
                            <button 
                              className={`btn btn-small ${u.isPro ? 'btn-primary' : 'btn-secondary'}`}
                              onClick={() => handleToggleUserFlag(u, 'isPro')}
                              style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                            >
                              {u.isPro ? 'PRO User' : 'Normal'}
                            </button>
                          </td>
                          <td style={{ padding: '0.75rem 0.5rem' }}>
                            <button 
                              className={`btn btn-small ${u.isAdmin ? 'btn-primary' : 'btn-secondary'}`}
                              onClick={() => handleToggleUserFlag(u, 'isAdmin')}
                              style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem', backgroundColor: u.isAdmin ? '#f59e0b' : 'transparent', color: u.isAdmin ? 'white' : 'inherit' }}
                              disabled={u._id === currentUser?._id}
                            >
                              {u.isAdmin ? 'Admin' : 'No'}
                            </button>
                          </td>
                          <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                            <button 
                              className="btn btn-danger btn-small"
                              onClick={() => handleDeleteUser(u._id)}
                              style={{ padding: '0.2rem 0.4rem' }}
                              disabled={u._id === currentUser?._id}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Popular templates */}
                <div className="feature-glass-card" style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 1.5rem 0' }}>Popular Styles</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {adminStats?.popularTemplates?.map((tpl, idx) => (
                      <div key={tpl._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                        <div>
                          <span style={{ fontWeight: 800, color: 'var(--accent-color)', marginRight: '0.5rem' }}>#{idx + 1}</span>
                          <span style={{ color: 'var(--text-main)', wordBreak: 'break-all' }}>{tpl._id}</span>
                        </div>
                        <span style={{ padding: '0.15rem 0.4rem', backgroundColor: 'var(--border-color)', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 700 }}>
                          {tpl.count} CVs
                        </span>
                      </div>
                    ))}
                    {(!adminStats?.popularTemplates || adminStats.popularTemplates.length === 0) && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No resumes created yet to determine styles.</span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </motion.div>
  );
}
