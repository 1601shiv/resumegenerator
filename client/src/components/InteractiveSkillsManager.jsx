import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const InteractiveSkillsManager = ({ category, skills, onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [activeTagIdx, setActiveTagIdx] = useState(-1);

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    
    const normalizedNew = trimmed.split(':')[0].trim().toLowerCase();
    const exists = skills?.some(s => s.split(':')[0].trim().toLowerCase() === normalizedNew);
    if (exists) {
      setInputValue('');
      return;
    }

    const updated = [...(skills || []), trimmed];
    onChange(category, updated);
    setInputValue('');
  };

  const handleDelete = (indexToDelete, e) => {
    e.stopPropagation();
    const updated = skills.filter((_, idx) => idx !== indexToDelete);
    onChange(category, updated);
    if (activeTagIdx === indexToDelete) {
      setActiveTagIdx(-1);
    } else if (activeTagIdx > indexToDelete) {
      setActiveTagIdx(activeTagIdx - 1);
    }
  };

  const handleLevelChange = (idx, newLevel) => {
    const parts = skills[idx].split(':');
    const name = parts[0].trim();
    const updated = [...skills];
    if (newLevel === 0) {
      updated[idx] = name;
    } else {
      updated[idx] = `${name}:${newLevel}`;
    }
    onChange(category, updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          className="form-input"
          placeholder="Type skill & press Enter..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
          style={{ flex: 1 }}
        />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleAdd}
          style={{ padding: '0 0.75rem' }}
        >
          Add
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <AnimatePresence>
          {skills?.map((skillStr, idx) => {
            const parts = skillStr.split(':');
            const name = parts[0]?.trim();
            const hasLevel = parts.length > 1;
            const level = hasLevel ? parseInt(parts[1]?.trim() || '80', 10) : 80;
            const isActive = activeTagIdx === idx;

            return (
              <motion.div
                key={`${name}-${idx}`}
                layout
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.1, 1], opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: isActive ? 'var(--accent-subtle)' : 'var(--bg-card)',
                  border: isActive ? '1px solid var(--accent-color)' : '1px solid var(--border-color)',
                  borderRadius: '0.375rem',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  maxWidth: '100%',
                }}
                onClick={() => setActiveTagIdx(isActive ? -1 : idx)}
              >
                <div style={{ display: 'flex', alignItems: 'center', padding: '0.35rem 0.6rem', gap: '0.4rem', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{name}</span>
                  {hasLevel && (
                    <span style={{
                      fontSize: '0.7rem',
                      backgroundColor: 'var(--accent-color)',
                      color: 'white',
                      padding: '0.1rem 0.3rem',
                      borderRadius: '0.25rem',
                      fontWeight: 700
                    }}>
                      {level}%
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={(e) => handleDelete(idx, e)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      padding: 0,
                      lineHeight: 1,
                      marginLeft: '0.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    &times;
                  </button>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        borderTop: '1px solid var(--border-color)',
                        padding: '0.5rem 0.6rem',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.3rem',
                        width: '180px'
                      }}
                      onClick={e => e.stopPropagation()}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', color: 'var(--text-muted)' }}>
                          <input
                            type="checkbox"
                            checked={hasLevel}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleLevelChange(idx, 80);
                              } else {
                                const updated = [...skills];
                                updated[idx] = name;
                                onChange(category, updated);
                              }
                            }}
                          />
                          Show Level Bar
                        </label>
                      </div>
                      {hasLevel && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            step="5"
                            value={level}
                            onChange={(e) => handleLevelChange(idx, parseInt(e.target.value, 10))}
                            style={{ flex: 1, height: '4px', accentColor: 'var(--accent-color)', cursor: 'pointer' }}
                          />
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, minWidth: '28px', textAlign: 'right' }}>
                            {level}%
                          </span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Helper to render skill items on the A4 canvas
export const renderSkillItems = (category, skillsArray, updateCategorySkills) => {
  if (!skillsArray || skillsArray.length === 0) return null;
  
  const hasLevels = skillsArray.some(s => s.includes(':'));
  
  if (!hasLevels) {
    return (
      <span
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="editable-field"
        onBlur={e => updateCategorySkills(category, e.target.innerText)}
      >
        {skillsArray.join(', ')}
      </span>
    );
  }

  return (
    <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px 20px', marginTop: '6px', width: '100%' }}>
      {skillsArray.map((skillStr, idx) => {
        const parts = skillStr.split(':');
        const name = parts[0]?.trim();
        const hasLevel = parts.length > 1;
        const level = hasLevel ? parseInt(parts[1]?.trim() || '80', 10) : null;
        
        return (
          <div key={idx} className="skill-progress-item" style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '8.5pt' }}>
              <span
                contentEditable={true}
                suppressContentEditableWarning={true}
                className="editable-field"
                style={{ fontWeight: 600 }}
                onBlur={e => {
                  const newName = e.target.innerText.trim();
                  if (!newName) return;
                  const updated = [...skillsArray];
                  if (hasLevel) {
                    updated[idx] = `${newName}:${level}`;
                  } else {
                    updated[idx] = newName;
                  }
                  updateCategorySkills(category, updated.join(', '));
                }}
              >
                {name}
              </span>
              {hasLevel && <span style={{ opacity: 0.8, fontSize: '8pt' }}>{level}%</span>}
            </div>
            {hasLevel && (
              <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', width: '100%' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${level}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="resume-accent-bg"
                  style={{ height: '100%', borderRadius: '3px' }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
