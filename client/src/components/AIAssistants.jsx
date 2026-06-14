import React, { useState } from 'react';

// Local Heuristic AI Datasets
export const ACTION_VERBS = {
  leadership: ['Spearheaded', 'Orchestrated', 'Guided', 'Directed', 'Championed', 'Led', 'Mobilized', 'Delegated'],
  technical: ['Engineered', 'Architected', 'Developed', 'Formulated', 'Built', 'Coded', 'Programmed', 'Integrated'],
  impact: ['Optimized', 'Streamlined', 'Enhanced', 'Maximized', 'Boosted', 'Accelerated', 'Reduced', 'Leveraged'],
  execution: ['Executed', 'Implemented', 'Maintained', 'Collaborated', 'Delivered', 'Resolved', 'Secured', 'Facilitated']
};

export const getShowDontTellSuggestions = (val, title) => {
  const t = (val || '').toLowerCase().trim();
  const job = (title || '').toLowerCase();
  
  if (t.includes('team') || t.includes('managed') || t.includes('led') || t.includes('people')) {
    return [
      `Spearheaded a cross-functional team of 6 engineers to deliver critical milestones 2 weeks ahead of schedule.`,
      `Orchestrated daily standups, sprint planning, and code reviews for a team of 8, boosting delivery velocity by 25%.`,
      `Guided and mentored 4 junior developers on best practices, resulting in a 40% reduction in onboarding time.`
    ];
  }
  if (t.includes('developed') || t.includes('built') || t.includes('created') || t.includes('made') || t.includes('wrote')) {
    return [
      `Engineered and deployed a high-availability modular system architecture, boosting overall performance by 30%.`,
      `Architected 15+ scalable frontend components using React and HSL variables, increasing development velocity by 35%.`,
      `Formulated clean-code paradigms and refactored core codebase structures, reducing technical debt by 20%.`
    ];
  }
  if (t.includes('api') || t.includes('backend') || t.includes('database') || t.includes('sql') || t.includes('query')) {
    return [
      `Designed and integrated 10+ secure RESTful APIs, handling 15,000+ daily queries with 99.98% uptime.`,
      `Optimized database indexes and query plans, achieving a 50% reduction in database CPU and response latency.`,
      `Migrated legacy backend workflows to Node.js/Express, accelerating query throughput by 45%.`
    ];
  }
  if (t.includes('bug') || t.includes('fixed') || t.includes('debug') || t.includes('solved') || t.includes('test')) {
    return [
      `Resolved 120+ critical production issues, improving customer platform stability and user retention by 18%.`,
      `Established robust Jest/Supertest automated suites, increasing codebase test coverage from 45% to 92%.`,
      `Root-caused and resolved bottleneck issues in the render pipeline, reducing customer bounce rate by 12%.`
    ];
  }
  if (t.includes('frontend') || t.includes('css') || t.includes('design') || t.includes('ui') || t.includes('web')) {
    return [
      `Refactored CSS/HTML responsive viewports to support cross-browser accessibility, elevating compliance score to 98%.`,
      `Collaborated with design teams to implement sleek visual micro-animations, boosting user session time by 22%.`,
      `Designed interactive analytics dashboards using Vite and Tailwind, scaling user engagement by 30%.`
    ];
  }
  
  if (job.includes('front') || job.includes('react') || job.includes('ui')) {
    return [
      `Optimized React state management workflows, reducing render cycles and raising interaction responsiveness by 35%.`,
      `Streamlined client-side API integrations, resolving latency bottlenecks to achieve sub-second content loads.`,
      `Championed modern responsive design guidelines, maximizing web application traffic by 25% across mobile platforms.`
    ];
  }
  if (job.includes('back') || job.includes('node') || job.includes('api')) {
    return [
      `Optimized server response latency by 40% through redis caching and parallel asynchronous workflow execution.`,
      `Engineered microservices to decouple complex business logic, cutting deployment downtime down to zero.`,
      `Implemented comprehensive security headers and token authorization, mitigating data exposure risks.`
    ];
  }
  
  return [
    `Orchestrated performance optimization pipelines, resulting in a 20% reduction in operational server run costs.`,
    `Delivered 12+ feature modules on-time using Agile methodologies, achieving 100% customer satisfaction score.`,
    `Collaborated with stakeholders to define software requirements, implementing features with zero regression issues.`
  ];
};

export const getMarketSkillsForRole = (jobTitle) => {
  const t = (jobTitle || '').toLowerCase();
  if (t.includes('front') || t.includes('react') || t.includes('web') || t.includes('ui')) {
    return [
      { name: 'TypeScript', category: 'languages' },
      { name: 'React.js', category: 'frontend' },
      { name: 'Redux Toolkit', category: 'frontend' },
      { name: 'Next.js', category: 'frontend' },
      { name: 'Tailwind CSS', category: 'frontend' },
      { name: 'Vite', category: 'tools' },
      { name: 'Jest / React Testing Library', category: 'tools' },
      { name: 'RESTful APIs', category: 'core' },
      { name: 'Performance Optimization', category: 'core' }
    ];
  } else if (t.includes('back') || t.includes('node') || t.includes('express') || t.includes('api') || t.includes('server')) {
    return [
      { name: 'Node.js', category: 'backend' },
      { name: 'Express.js', category: 'backend' },
      { name: 'NestJS', category: 'backend' },
      { name: 'PostgreSQL', category: 'backend' },
      { name: 'MongoDB', category: 'backend' },
      { name: 'Redis Caching', category: 'backend' },
      { name: 'Docker', category: 'tools' },
      { name: 'Microservices', category: 'core' },
      { name: 'GraphQL', category: 'backend' },
      { name: 'AWS (S3/EC2)', category: 'tools' }
    ];
  } else if (t.includes('data') || t.includes('python') || t.includes('analyst') || t.includes('ml') || t.includes('ai')) {
    return [
      { name: 'Python', category: 'languages' },
      { name: 'SQL', category: 'backend' },
      { name: 'Pandas & NumPy', category: 'core' },
      { name: 'Tableau / PowerBI', category: 'tools' },
      { name: 'Data Visualization', category: 'core' },
      { name: 'Scikit-Learn', category: 'core' },
      { name: 'Jupyter Notebooks', category: 'tools' },
      { name: 'MongoDB', category: 'backend' },
      { name: 'Statistical Modeling', category: 'core' }
    ];
  } else {
    return [
      { name: 'JavaScript (ES6+)', category: 'languages' },
      { name: 'React.js', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'SQL / NoSQL', category: 'backend' },
      { name: 'Git & GitHub', category: 'tools' },
      { name: 'REST APIs', category: 'core' },
      { name: 'Data Structures & Algorithms', category: 'core' },
      { name: 'Unit Testing', category: 'core' }
    ];
  }
};

export const getMockJobs = (title) => {
  const t = (title || '').toLowerCase();
  if (t.includes('front') || t.includes('react') || t.includes('web') || t.includes('ui') || t.includes('client')) {
    return [
      {
        id: 1,
        title: 'Frontend Developer (React)',
        company: 'Indeed Tech Corp',
        location: 'Hyderabad, India (Hybrid)',
        required: ['React.js', 'JavaScript', 'HTML', 'Vanilla CSS', 'Git & GitHub'],
        description: 'Join our team to build high-performance user interfaces using React and modern CSS architectures.'
      },
      {
        id: 2,
        title: 'Junior Web Engineer',
        company: 'CareerFlow Labs',
        location: 'Bangalore, India (Remote)',
        required: ['JavaScript', 'HTML', 'Vanilla CSS', 'Vite', 'React.js'],
        description: 'Looking for a passionate junior developer to maintain and build responsive web applications.'
      },
      {
        id: 3,
        title: 'UI/UX Developer',
        company: 'Creative Studio',
        location: 'Pune, India (On-site)',
        required: ['HTML', 'Vanilla CSS', 'JavaScript', 'Figma', 'React.js'],
        description: 'Bridge the gap between design and technology. Create beautiful and engaging layouts.'
      }
    ];
  } else if (t.includes('back') || t.includes('node') || t.includes('express') || t.includes('api') || t.includes('server')) {
    return [
      {
        id: 1,
        title: 'Backend Engineer (Node.js)',
        company: 'DataScale Systems',
        location: 'Mumbai, India (On-site)',
        required: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Git & GitHub'],
        description: 'Build robust backend services, design scalable MongoDB schemas, and optimize API endpoints.'
      },
      {
        id: 2,
        title: 'Full Stack Node.js Developer',
        company: 'WebSphere Solutions',
        location: 'Noida, India (Remote)',
        required: ['React.js', 'Node.js', 'MongoDB', 'Express', 'REST APIs'],
        description: 'Develop full stack web applications with React on the frontend and Express/Node on the backend.'
      },
      {
        id: 3,
        title: 'API Platform Specialist',
        company: 'CloudGate Inc',
        location: 'Hyderabad, India (Hybrid)',
        required: ['Node.js', 'REST APIs', 'MongoDB', 'Express', 'Git & GitHub'],
        description: 'Focus on designing, documenting, and securing enterprise APIs using Node.js and REST architectures.'
      }
    ];
  } else if (t.includes('data') || t.includes('python') || t.includes('analyst') || t.includes('ml') || t.includes('ai')) {
    return [
      {
        id: 1,
        title: 'Data Analyst',
        company: 'Insight Analytics',
        location: 'Bangalore, India (Hybrid)',
        required: ['Python', 'SQL', 'MongoDB', 'REST APIs', 'Git & GitHub'],
        description: 'Analyze large-scale datasets, generate reports, and build automated pipeline scripts.'
      },
      {
        id: 2,
        title: 'Machine Learning Engineer',
        company: 'Cognitive Minds',
        location: 'Delhi NCR (On-site)',
        required: ['Python', 'MongoDB', 'Git & GitHub', 'REST APIs', 'JavaScript'],
        description: 'Implement and train predictive models and integrate them into backend API architectures.'
      }
    ];
  } else {
    // Default general jobs
    return [
      {
        id: 1,
        title: 'Software Developer',
        company: 'Global Tech Solutions',
        location: 'Kolkata, India (Hybrid)',
        required: ['React.js', 'Node.js', 'MongoDB', 'JavaScript', 'Git & GitHub'],
        description: 'General software engineer role focusing on web development, API implementation, and database queries.'
      },
      {
        id: 2,
        title: 'Associate IT Engineer',
        company: 'Haldia Systems',
        location: 'West Bengal, India (On-site)',
        required: ['React.js', 'JavaScript', 'Git & GitHub', 'REST APIs'],
        description: 'Entry-level developer role assisting with frontend features and version control workflows.'
      },
      {
        id: 3,
        title: 'Full Stack Web Developer',
        company: 'Innovate Digital',
        location: 'Chennai, India (Remote)',
        required: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Vanilla CSS'],
        description: 'Participate in the full product development lifecycle of our customer-facing career apps.'
      }
    ];
  }
};

export function BulletAIAssistant({ value, onSelect, targetJobTitle }) {
  const [open, setOpen] = useState(false);
  const [verbCategory, setVerbCategory] = useState('technical');
  const [isTyping, setIsTyping] = useState(false);

  const verbs = ACTION_VERBS[verbCategory] || [];

  const handleVerbClick = (verb) => {
    let newVal = value || '';
    const cleanVal = newVal.replace(/^\w+\s+/, '');
    const updated = `${verb} ${cleanVal}`;
    onSelect(updated);
  };

  const handleRewriteClick = (suggestion) => {
    if (isTyping) return;
    setIsTyping(true);
    let idx = 0;
    const interval = setInterval(() => {
      onSelect(suggestion.substring(0, idx + 1));
      idx++;
      if (idx >= suggestion.length) {
        clearInterval(interval);
        setIsTyping(false);
        setOpen(false);
      }
    }, 12);
  };

  const rewrites = getShowDontTellSuggestions(value, targetJobTitle);

  return (
    <div className="ai-popover-container no-print" style={{ position: 'relative', display: 'inline-block' }}>
      <button 
        type="button" 
        className="ai-sparkle-btn" 
        onClick={() => setOpen(!open)} 
        title="✨ AI Bullet Helper"
        disabled={isTyping}
        style={{ padding: '0.35rem', border: '1px solid var(--border-color)', borderRadius: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <span style={{ fontSize: '0.9rem', color: '#f59e0b' }}>✨</span>
      </button>
      {open && (
        <div className="ai-popover" style={{ position: 'absolute', top: '100%', right: 0, zIndex: 100, width: '320px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)', marginTop: '0.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            <span>✨ AI Bullet Assistant</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Local Heuristics</span>
          </div>

          <div style={{ marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Action Verbs</div>
            <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
              {Object.keys(ACTION_VERBS).map(cat => (
                <button
                  key={cat}
                  type="button"
                  className="btn btn-secondary btn-small"
                  onClick={() => setVerbCategory(cat)}
                  style={{ padding: '0.15rem 0.35rem', fontSize: '0.65rem', textTransform: 'capitalize', backgroundColor: verbCategory === cat ? 'var(--accent-subtle)' : 'transparent', borderColor: verbCategory === cat ? 'var(--accent-color)' : 'var(--border-color)' }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
              {verbs.map(v => (
                <button
                  key={v}
                  type="button"
                  className="btn btn-secondary btn-small"
                  onClick={() => handleVerbClick(v)}
                  style={{ padding: '0.15rem 0.35rem', fontSize: '0.65rem', fontWeight: 500 }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>"Show, Don't Tell" Metric Rewrites</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {rewrites.map((s, idx) => (
                <button 
                  key={idx} 
                  type="button" 
                  onClick={() => handleRewriteClick(s)}
                  style={{ textAlign: 'left', padding: '0.4rem', borderRadius: '0.35rem', border: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.01)', fontSize: '0.725rem', color: 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.2s', width: '100%', display: 'block' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
