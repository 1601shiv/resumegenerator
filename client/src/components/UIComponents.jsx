import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 1. Typewriter Fade-In text sync wrapper
export const AnimatedText = ({ text, style, className }) => {
  return (
    <motion.span
      key={text}
      initial={{ opacity: 0.6, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.15 }}
      style={{ display: 'inline-block', ...style }}
      className={className}
    >
      {text || ''}
    </motion.span>
  );
};

// 2. Resume Bloom staggered hero canvas preview
export const ResumeBloom = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        background: '#ffffff',
        color: '#1e293b',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'left',
        width: '100%',
        maxWidth: '380px',
        margin: '0 auto',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative accent bar */}
      <motion.div 
        variants={itemVariants} 
        style={{ height: '4px', width: '100%', borderRadius: '2px', marginBottom: '1.5rem', backgroundColor: '#3b82f6' }} 
      />

      {/* Header section bloom */}
      <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
        <div style={{ height: '18px', width: '65%', backgroundColor: '#e2e8f0', borderRadius: '4px', marginBottom: '0.5rem' }} />
        <div style={{ height: '10px', width: '40%', backgroundColor: '#cbd5e1', borderRadius: '3px' }} />
      </motion.div>

      {/* Experience section bloom */}
      <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
        <div style={{ height: '12px', width: '30%', backgroundColor: '#3b82f6', opacity: 0.8, borderRadius: '3px', marginBottom: '0.75rem' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ height: '10px', width: '45%', backgroundColor: '#e2e8f0', borderRadius: '3px' }} />
            <div style={{ height: '8px', width: '20%', backgroundColor: '#f1f5f9', borderRadius: '2px' }} />
          </div>
          <div style={{ height: '8px', width: '90%', backgroundColor: '#cbd5e1', borderRadius: '2px' }} />
          <div style={{ height: '8px', width: '80%', backgroundColor: '#cbd5e1', borderRadius: '2px' }} />
        </div>
      </motion.div>

      {/* Skills section bloom */}
      <motion.div variants={itemVariants}>
        <div style={{ height: '12px', width: '25%', backgroundColor: '#3b82f6', opacity: 0.8, borderRadius: '3px', marginBottom: '0.75rem' }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          <div style={{ height: '20px', width: '60px', backgroundColor: '#e2e8f0', borderRadius: '10px' }} />
          <div style={{ height: '20px', width: '80px', backgroundColor: '#e2e8f0', borderRadius: '10px' }} />
          <div style={{ height: '20px', width: '70px', backgroundColor: '#e2e8f0', borderRadius: '10px' }} />
          <div style={{ height: '20px', width: '50px', backgroundColor: '#e2e8f0', borderRadius: '10px' }} />
        </div>
      </motion.div>
    </motion.div>
  );
};

// 3. Section completed animated checkmark
export const SectionStatusIndicator = ({ isComplete }) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '14px', height: '14px', marginLeft: 'auto', flexShrink: 0 }}>
      <AnimatePresence mode="wait">
        {isComplete ? (
          <motion.svg 
            key="complete"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <motion.polyline
              points="20 6 9 17 4 12"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut', delay: 0.1 }}
            />
          </motion.svg>
        ) : (
          <motion.div 
            key="incomplete"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4b5563' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// 4. Strength score CountUp
export const CountUp = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;

    const duration = 800;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = progress * (2 - progress);
      const current = Math.round(start + (end - start) * easedProgress);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span>{displayValue}</span>;
};

// 5. Confetti Overlay
export const ConfettiOverlay = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1200, pointerEvents: 'none', overflow: 'hidden' }}>
      {Array.from({ length: 35 }).map((_, i) => {
        const delay = Math.random() * 1.5;
        const left = Math.random() * 100;
        const size = Math.random() * 6 + 6;
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <div 
            key={i} 
            className="confetti-particle"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              animationDelay: `${delay}s`,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px'
            }}
          />
        );
      })}
    </div>
  );
};
