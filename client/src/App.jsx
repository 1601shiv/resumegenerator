import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Layout, User, Briefcase, FolderGit2, GraduationCap, 
  Settings2, Plus, Trash2, Printer, Check, Info, RefreshCw, Eye,
  Sun, Moon, LogIn, LogOut, Copy, Edit2, ArrowLeft, ExternalLink,
  ChevronUp, ChevronDown, ArrowUp, ArrowDown, Star, GitBranch
} from 'lucide-react';

// Preset colors for the customizer (HSL hue values)
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

// Import modular components
import { BulletAIAssistant, getMarketSkillsForRole, getMockJobs } from './components/AIAssistants';
import { InteractiveSkillsManager, renderSkillItems } from './components/InteractiveSkillsManager';
import { AnimatedText, ResumeBloom, SectionStatusIndicator, CountUp, ConfettiOverlay } from './components/UIComponents';
import DashboardView from './components/DashboardView';
import AdminView from './components/AdminView';
import AboutView from './components/AboutView';
import ResumePreview from './components/ResumePreview';
import NavBar from './components/NavBar';
import LandingView from './components/LandingView';
import TemplatesCatalogView from './components/TemplatesCatalogView';
import ATSScannerView from './components/ATSScannerView';
import EditorSidebar from './components/EditorSidebar';

const PROFESSIONAL_NAMES = [
  'Auckland', 'Bogota', 'Boston', 'Brooklyn', 'Chicago', 'Classic', 'Corporate', 
  'Edinburgh', 'Executive', 'Foundation', 'Geneva', 'Glasgow', 'Harvard', 'Heritage', 
  'London', 'Madrid', 'Milan', 'Montreal', 'Oslo', 'Oxford', 'Paris', 'Philadelphia', 
  'Phoenix', 'Prague', 'Princeton', 'Professional', 'Roma', 'Santiago', 'Sydney', 
  'Toronto', 'Traditional', 'Vienna', 'Warsaw', 'Washington', 'Zurich'
];

const MODERN_NAMES = [
  'Atlanta', 'Berlin', 'Brisbane', 'Brussels', 'Cambridge', 'Cape Town', 'Cairo', 
  'Clean', 'Dallas', 'Dublin', 'Florence', 'Hamburg', 'Helsinki', 'Houston', 
  'Istanbul', 'Jakarta', 'Lisbon', 'Liverpool', 'Los Angeles', 'Lyon', 'Manchester', 
  'Melbourne', 'Modern', 'Munich', 'Orlando', 'Perth', 'Seoul', 'Singapore', 
  'Stockholm', 'Tokyo', 'Valencia', 'Vancouver', 'Venice', 'Vienna'
];

const CREATIVE_NAMES = [
  'Accent', 'Breeze', 'Bright', 'Clio', 'Creative', 'Edge', 'Era', 'Flair', 
  'Flow', 'Graphic', 'Ignite', 'Infographic', 'Lingo', 'Luxe', 'Orbit', 'Rainier', 
  'Spark', 'Splash', 'Sway', 'Vivid'
];

const MINIMALIST_NAMES = [
  'Basic', 'Clarity', 'Compact', 'Focus', 'Impact', 'Leaf', 'Minimalist', 
  'Pure', 'Simple', 'Snapshot', 'Standard'
];

const generateTemplates = () => {
  const list = [
    {
      id: 'tpl-modern-minimalist',
      name: 'The Modern Minimalist',
      layoutType: 'single',
      headerStyle: 'left',
      fontPairing: 'sans',
      defaultColor: '215 80% 30%', // Navy
      borderStyle: 'solid',
      description: 'Stripped away distracting elements; focuses on clean sans-serif typography, hierarchy, and reading efficiency. Ideal for tech and general roles.',
      isPreset: true,
      isPremium: false
    },
    {
      id: 'tpl-traditional-academic',
      name: 'The Traditional Academic / Chronological',
      layoutType: 'single',
      headerStyle: 'centered',
      fontPairing: 'serif',
      defaultColor: '0 0% 15%', // Charcoal
      borderStyle: 'none',
      description: 'Rigid chronological timeline relying on centered headers, right-aligned dates, and traditional serif typography. Best for finance, law, or academic roles.',
      isPreset: true,
      isPremium: false
    },
    {
      id: 'tpl-two-column-functional',
      name: 'The Two-Column Functional',
      layoutType: 'double-left',
      headerStyle: 'sidebar',
      fontPairing: 'sans',
      defaultColor: '180 60% 35%', // Teal
      borderStyle: 'none',
      description: 'Splits the page into a dominant projects/experience column and a narrower sidebar for technical skills, certifications, and studies. Ideal for career changers and students.',
      isPreset: true,
      isPremium: false
    }
  ];
  
  // Professional & Corporate
  PROFESSIONAL_NAMES.forEach((name, idx) => {
    const colors = ['215 80% 30%', '0 0% 15%', '224 75% 50%', '200 10% 30%'];
    list.push({
      id: `tpl-corp-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      name: name,
      layoutType: idx % 4 === 0 ? 'double-left' : 'single',
      headerStyle: idx % 3 === 0 ? 'centered' : 'left',
      fontPairing: idx % 2 === 0 ? 'serif' : 'sans',
      defaultColor: colors[idx % colors.length],
      borderStyle: idx % 2 === 0 ? 'solid' : 'none',
      description: `${name} is a professional and corporate layout tailored for finance, law, management, and traditional corporate roles. Emphasizes clean hierarchy and reading efficiency.`,
      isPreset: true,
      isPremium: idx % 3 === 0
    });
  });

  // Modern & ATS-Friendly
  MODERN_NAMES.forEach((name, idx) => {
    const colors = ['180 60% 35%', '142 70% 35%', '215 80% 30%', '224 75% 50%'];
    list.push({
      id: `tpl-modern-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      name: name,
      layoutType: 'single',
      headerStyle: 'left',
      fontPairing: 'sans',
      defaultColor: colors[idx % colors.length],
      borderStyle: 'none',
      description: `${name} is a modern, ATS-friendly layout designed for tech, engineering, sales, and general mid-level applications. Designed to pass machine screeners and highlight key technical skills.`,
      isPreset: true,
      isPremium: idx % 4 === 0
    });
  });

  // Creative & Infographic
  CREATIVE_NAMES.forEach((name, idx) => {
    const colors = ['45 80% 40%', '262 70% 50%', '325 75% 50%', '24 90% 50%', '280 80% 45%'];
    list.push({
      id: `tpl-creative-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      name: name,
      layoutType: idx % 2 === 0 ? 'double-left' : 'double-right',
      headerStyle: idx % 3 === 0 ? 'sidebar' : 'modern',
      fontPairing: 'sans',
      defaultColor: colors[idx % colors.length],
      borderStyle: 'none',
      description: `${name} is a highly expressive, creative, and infographic template optimized for marketing, design, UI/UX, media, and creative industries. Features vibrant colors and bold layouts.`,
      isPreset: true,
      isPremium: true
    });
  });

  // Minimalist & Simple
  MINIMALIST_NAMES.forEach((name, idx) => {
    const colors = ['200 10% 30%', '0 0% 15%', '215 80% 30%'];
    list.push({
      id: `tpl-minimal-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      name: name,
      layoutType: 'single',
      headerStyle: idx % 2 === 0 ? 'centered' : 'left',
      fontPairing: idx % 3 === 0 ? 'serif' : 'sans',
      defaultColor: colors[idx % colors.length],
      borderStyle: 'none',
      description: `${name} is a minimalist and simple layout best for academic, entry-level, medical, or roles where brevity and simple structure are preferred.`,
      isPreset: true,
      isPremium: false
    });
  });

  return list;
};

const DEFAULT_PRESETS = generateTemplates();

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 3000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export default function App() {
  // Navigation & UI state
  const [view, setView] = useState('home'); // 'home' | 'templates' | 'dashboard' | 'editor' | 'about' | 'admin' | 'ats'
  const [isWizardMode, setIsWizardMode] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('dashboard-theme') || 'dark');
  const [activeTab, setActiveTab] = useState('templates');
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? true : false;
    } catch (e) {
      return false;
    }
  });
  const [saving, setSaving] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

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

  const [showStrengthConfetti, setShowStrengthConfetti] = useState(false);
  const [strengthConfettiTriggered, setStrengthConfettiTriggered] = useState(false);
  const [showSuccessConfetti, setShowSuccessConfetti] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Standalone ATS Scanner States
  const [atsCVText, setAtsCVText] = useState('');
  const [atsJobDesc, setAtsJobDesc] = useState('');
  const [atsAnalysisResults, setAtsAnalysisResults] = useState(null);
  const [atsScanning, setAtsScanning] = useState(false);

  // Accordion indices for form filling sections
  const [expandedExpIndex, setExpandedExpIndex] = useState(0);
  const [expandedProjIndex, setExpandedProjIndex] = useState(0);
  const [expandedEduIndex, setExpandedEduIndex] = useState(0);

  // Swap item positions helper
  const moveExperience = (idx, dir) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= (resume?.experience?.length || 0)) return;
    const updated = [...resume.experience];
    const temp = updated[idx];
    updated[idx] = updated[newIdx];
    updated[newIdx] = temp;
    setResume(prev => ({ ...prev, experience: updated }));
    setExpandedExpIndex(newIdx);
  };

  const moveProject = (idx, dir) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= (resume?.projects?.length || 0)) return;
    const updated = [...resume.projects];
    const temp = updated[idx];
    updated[idx] = updated[newIdx];
    updated[newIdx] = temp;
    setResume(prev => ({ ...prev, projects: updated }));
    setExpandedProjIndex(newIdx);
  };

  const moveEducation = (idx, dir) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= (resume?.education?.length || 0)) return;
    const updated = [...resume.education];
    const temp = updated[idx];
    updated[idx] = updated[newIdx];
    updated[newIdx] = temp;
    setResume(prev => ({ ...prev, education: updated }));
    setExpandedEduIndex(newIdx);
  };

  const handleAutoLoadCVText = () => {
    if (!resume) {
      showToast('No active resume loaded. Please create a resume first.');
      return;
    }
    let compiledText = '';
    compiledText += `${resume.personalInfo?.name || ''}\n`;
    compiledText += `${resume.personalInfo?.email || ''} | ${resume.personalInfo?.phone || ''}\n`;
    compiledText += `${resume.personalInfo?.linkedin || ''} | ${resume.personalInfo?.github || ''}\n\n`;
    
    if (resume.summary) {
      compiledText += `SUMMARY\n${resume.summary}\n\n`;
    }
    
    if (resume.skills) {
      compiledText += `SKILLS\n`;
      if (resume.skills.languages?.length) compiledText += `Languages: ${resume.skills.languages.join(', ')}\n`;
      if (resume.skills.backend?.length) compiledText += `Backend: ${resume.skills.backend.join(', ')}\n`;
      if (resume.skills.frontend?.length) compiledText += `Frontend: ${resume.skills.frontend.join(', ')}\n`;
      if (resume.skills.tools?.length) compiledText += `Tools: ${resume.skills.tools.join(', ')}\n`;
      compiledText += `\n`;
    }
    
    if (resume.experience?.length) {
      compiledText += `EXPERIENCE\n`;
      resume.experience.forEach(exp => {
        compiledText += `${exp.company} - ${exp.role} (${exp.date})\n`;
        exp.bullets?.forEach(b => {
          compiledText += `- ${b}\n`;
        });
      });
      compiledText += `\n`;
    }
    
    if (resume.projects?.length) {
      compiledText += `PROJECTS\n`;
      resume.projects.forEach(proj => {
        compiledText += `${proj.name}${proj.link ? ` (${proj.link})` : ''}\n`;
        proj.bullets?.forEach(b => {
          compiledText += `- ${b}\n`;
        });
      });
      compiledText += `\n`;
    }
    
    if (resume.education?.length) {
      compiledText += `EDUCATION\n`;
      resume.education.forEach(edu => {
        compiledText += `${edu.degree} from ${edu.institution} (${edu.date}) - Score: ${edu.score}\n`;
      });
      compiledText += `\n`;
    }
    
    if (resume.certifications?.length) {
      compiledText += `CERTIFICATIONS\n${resume.certifications.join('\n')}\n`;
    }
    
    setAtsCVText(compiledText.trim());
    showToast('Active CV text loaded successfully!');
  };

  const handleScanATS = () => {
    if (!atsCVText.trim() || !atsJobDesc.trim()) {
      showToast('Please enter both your CV text and a target Job Description.');
      return;
    }
    
    setAtsScanning(true);
    
    setTimeout(() => {
      const cvTextLower = atsCVText.toLowerCase();
      const jobDescLower = atsJobDesc.toLowerCase();
      
      const stopWords = new Set(['and', 'the', 'for', 'with', 'a', 'to', 'in', 'of', 'on', 'at', 'an', 'is', 'are', 'that', 'from', 'by', 'as', 'this', 'our', 'your', 'we', 'you', 'or', 'be', 'it', 'has', 'have', 'with']);
      const wordPattern = /[a-zA-Z+#]{2,}/g;
      const jWords = jobDescLower.match(wordPattern) || [];
      const wordCounts = {};
      jWords.forEach(w => {
        if (!stopWords.has(w)) {
          wordCounts[w] = (wordCounts[w] || 0) + 1;
        }
      });
      
      const sortedKeywords = Object.entries(wordCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .map(entry => entry[0]);
      
      const matched = [];
      const missing = [];
      sortedKeywords.forEach(k => {
        if (cvTextLower.includes(k)) {
          matched.push(k);
        } else {
          missing.push(k);
        }
      });
      
      const warnings = [];
      if (atsCVText.length < 500) {
        warnings.push({ id: 'length', text: 'CV length is very short. Ensure you include detailed experience bullets.' });
      }
      if (!cvTextLower.includes('experience') && !cvTextLower.includes('work history')) {
        warnings.push({ id: 'exp_sec', text: 'Missing standard "Experience" or "Work History" section headers.' });
      }
      if (!cvTextLower.includes('skills')) {
        warnings.push({ id: 'skills_sec', text: 'Missing standard "Skills" section header.' });
      }
      if (!cvTextLower.includes('education') && !cvTextLower.includes('academic')) {
        warnings.push({ id: 'edu_sec', text: 'Missing standard "Education" section header.' });
      }
      
      const emailRegex = /[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/;
      const phoneRegex = /\+?[\d\s-]{8,15}/;
      if (!emailRegex.test(cvTextLower)) {
        warnings.push({ id: 'email', text: 'No valid email address detected. Make sure email is visible.' });
      }
      if (!phoneRegex.test(cvTextLower)) {
        warnings.push({ id: 'phone', text: 'No phone number detected. Recruiters need a way to reach you.' });
      }
      
      const actionVerbs = ['designed', 'developed', 'managed', 'created', 'built', 'led', 'implemented', 'optimized', 'scaled', 'debugged', 'collaborated', 'engineered', 'architected'];
      const actionVerbMatches = actionVerbs.filter(verb => cvTextLower.includes(verb));
      if (actionVerbMatches.length < 4) {
        warnings.push({ id: 'action_verbs', text: `Use more strong action verbs (e.g. designed, managed, optimized). Found only ${actionVerbMatches.length}.` });
      }
      
      let score = 50; 
      const keywordWeight = sortedKeywords.length > 0 ? (matched.length / sortedKeywords.length) * 40 : 40;
      score += keywordWeight;
      
      const warningDeduction = Math.min(warnings.length * 4, 10);
      score -= warningDeduction;
      
      score = Math.min(Math.max(Math.round(score), 10), 100);
      
      setAtsAnalysisResults({
        score,
        matchedKeywords: matched,
        missingKeywords: missing,
        warnings,
        totalCheckedKeywordsCount: sortedKeywords.length
      });
      
      setAtsScanning(false);
      showToast('ATS Scan complete! Detailed compatibility analysis ready.');
    }, 1800);
  };

  // Admin States
  const [adminStats, setAdminStats] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [adminLoading, setAdminLoading] = useState(false);

  const fetchAdminData = async () => {
    if (!user || !user.isAdmin) return;
    setAdminLoading(true);
    try {
      const headers = { 'x-admin-userid': user._id };
      const [resStats, resUsers] = await Promise.all([
        fetch(`/api/admin/stats?adminUserId=${user._id}`, { headers }),
        fetch(`/api/admin/users?adminUserId=${user._id}`, { headers })
      ]);
      if (resStats.ok && resUsers.ok) {
        setAdminStats(await resStats.json());
        setAdminUsers(await resUsers.json());
      }
    } catch (err) {
      showToast('Failed to load admin panel data');
    } finally {
      setAdminLoading(false);
    }
  };

  const handleToggleUserFlag = async (targetUser, flag) => {
    try {
      const headers = { 
        'Content-Type': 'application/json',
        'x-admin-userid': user._id 
      };
      const updatedVal = !targetUser[flag];
      const res = await fetch(`/api/admin/users/${targetUser._id}?adminUserId=${user._id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ [flag]: updatedVal })
      });
      if (res.ok) {
        showToast(`User ${flag} status updated`);
        fetchAdminData();
      }
    } catch (err) {
      showToast('Failed to update user flag');
    }
  };

  const handleDeleteUser = async (targetUserId) => {
    if (!window.confirm('Are you sure you want to delete this user? This will remove all their saved resumes!')) return;
    try {
      const headers = { 'x-admin-userid': user._id };
      const res = await fetch(`/api/admin/users/${targetUserId}?adminUserId=${user._id}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        showToast('User and resumes deleted successfully');
        fetchAdminData();
      }
    } catch (err) {
      showToast('Failed to delete user');
    }
  };

  useEffect(() => {
    if (view === 'admin') {
      fetchAdminData();
    }
  }, [view]);

  // Auth States
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'register'
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [pendingDownload, setPendingDownload] = useState(false);

  // Resume Collection states
  const [resumes, setResumes] = useState([]);
  const [resume, setResume] = useState(null);
  const [presets, setPresets] = useState(DEFAULT_PRESETS);
  const [previewMode, setPreviewMode] = useState('resume'); // 'resume' | 'coverletter'

  // Premium & History states
  const [isPro, setIsPro] = useState(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      const u = JSON.parse(saved);
      return u.isPro || false;
    }
    return localStorage.getItem('isPro_guest') === 'true';
  });
  
  const [history, setHistory] = useState({ past: [], future: [] });
  const lastSavedResume = React.useRef(null);

  // Sync isPro when user state changes
  useEffect(() => {
    if (user) {
      setIsPro(user.isPro || false);
    } else {
      setIsPro(localStorage.getItem('isPro_guest') === 'true');
    }
  }, [user]);

  // Debounced history save
  useEffect(() => {
    if (!resume) return;
    if (!lastSavedResume.current) {
      lastSavedResume.current = JSON.parse(JSON.stringify(resume));
      return;
    }

    const timer = setTimeout(() => {
      const currentStr = JSON.stringify(resume);
      const lastStr = JSON.stringify(lastSavedResume.current);
      if (currentStr !== lastStr) {
        setHistory(prev => ({
          past: [...prev.past.slice(-30), lastSavedResume.current],
          future: []
        }));
        lastSavedResume.current = JSON.parse(JSON.stringify(resume));
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [resume]);

  const handleUndo = () => {
    if (history.past.length === 0) return;
    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, history.past.length - 1);
    
    setHistory({
      past: newPast,
      future: [JSON.parse(JSON.stringify(resume)), ...history.future]
    });
    
    lastSavedResume.current = JSON.parse(JSON.stringify(previous));
    setResume(previous);
    showToast('Undone last action');
  };

  const handleRedo = () => {
    if (history.future.length === 0) return;
    const next = history.future[0];
    const newFuture = history.future.slice(1);
    
    setHistory({
      past: [...history.past, JSON.parse(JSON.stringify(resume))],
      future: newFuture
    });
    
    lastSavedResume.current = JSON.parse(JSON.stringify(next));
    setResume(next);
    showToast('Redone action');
  };

  const handleUpgradeToPro = async () => {
    if (user) {
      try {
        const res = await fetch('/api/users/upgrade', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user._id })
        });
        if (res.ok) {
          const updatedUser = await res.json();
          const newUser = { ...user, isPro: true };
          setUser(newUser);
          localStorage.setItem('user', JSON.stringify(newUser));
          setIsPro(true);
          showToast('Upgraded to PRO successfully!');
        } else {
          showToast('Upgrade failed');
        }
      } catch (err) {
        showToast('Server connection error during upgrade');
      }
    } else {
      localStorage.setItem('isPro_guest', 'true');
      setIsPro(true);
      showToast('Guest account upgraded to PRO!');
    }
  };

  useEffect(() => {
    if (activeTab === 'coverletter') {
      setPreviewMode('coverletter');
    } else {
      setPreviewMode('resume');
    }
  }, [activeTab]);

  // Search & Filter templates state
  const [filterSearch, setFilterSearch] = useState('');
  const [filterLayout, setFilterLayout] = useState('all');
  const [filterColor, setFilterColor] = useState('all');

  // Load Initial User data and Presets
  useEffect(() => {
    async function loadInitialData() {
      try {
        const resumeUrl = user ? `/api/resumes?userId=${user._id}` : '/api/resumes';
        
        // 1. Fetch Resumes
        try {
          const resResume = await fetchWithTimeout(resumeUrl, { timeout: 3000 });
          if (resResume.ok) {
            const resumesList = await resResume.json();
            if (user) {
              setResumes(resumesList);
              setView('dashboard');
            } else {
              setResume(resumesList[0] || null);
              setView('home');
            }
          } else {
            if (user) setView('dashboard');
            else setView('home');
          }
        } catch (resumeErr) {
          console.error("Resume fetch failed, using local/guest fallback:", resumeErr);
          if (user) setView('dashboard');
          else setView('home');
        }

        // 2. Fetch Templates
        try {
          const resPresets = await fetchWithTimeout('/api/templates', { timeout: 3000 });
          if (resPresets.ok) {
            const presetsData = await resPresets.json();
            if (presetsData && presetsData.length > 0) {
              setPresets(presetsData);
            }
          }
        } catch (presetErr) {
          console.error("Templates fetch failed, using client fallback:", presetErr);
        }
      } catch (err) {
        showToast('Failed to connect to database');
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, [user]);

  // Debounced auto-save handler to MongoDB
  useEffect(() => {
    if (!resume?._id) return;
    setSaving(true);
    const delayDebounce = setTimeout(async () => {
      try {
        const res = await fetch(`/api/resumes/${resume._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(resume)
        });
        if (!res.ok) throw new Error();
        
        // Refresh list if on dashboard/editor changes
        if (user) {
          const listRes = await fetch(`/api/resumes?userId=${user._id}`);
          if (listRes.ok) setResumes(await listRes.json());
        }
      } catch (err) {
        showToast('Auto-save failed');
      } finally {
        setSaving(false);
      }
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [resume]);

  useEffect(() => {
    if (view === 'editor' && !resume) {
      setResume({
        title: 'Sara Booth - Resume',
        targetJobTitle: 'Content Manager',
        personalInfo: {
          name: 'SARA BOOTH',
          email: 'sarabooth@mail.com',
          phone: '0876579976',
          linkedin: 'sara_booth',
          github: '',
          location: 'United Kingdom'
        },
        summary: 'Passionate content manager with a knack for creating compelling narratives and a strong commitment to enhancing brand stories. With extensive experience in content creation and management, eager to contribute to a mission-driven organization dedicated to impactful communication. Proven ability to engage diverse audiences and foster community through cutting-edge content strategies, aligning closely with the company\'s goals for authentic and effective storytelling.',
        experience: [
          {
            company: 'EnhanceCV',
            role: 'Content manager and writer',
            date: 'Date period',
            bullets: [
              'Produced a biweekly newsletter sent to 1.5 million people',
              'Streamlined content workflow, resulting in a 25% reduction in production costs.',
              'Managed a team of 10 content creators producing over 500 articles annually.',
              'Increased subscriber base by 30% by launching a targeted email campaign.',
              'Increased monthly website traffic by 30% through targeted content strategies and SEO optimization.'
            ]
          }
        ],
        projects: [],
        education: [
          {
            institution: 'University of Aden',
            degree: 'Geography',
            score: '',
            date: '2019 - 2025'
          }
        ],
        certifications: [],
        skills: {
          core: ['Content Strategy', 'Team Management', 'Copywriting', 'SEO Optimization', 'Newsletter Campaigning'],
          languages: ['English (Native)', 'French (Conversational)'],
          backend: [],
          frontend: [],
          tools: ['Wordpress', 'Mailchimp', 'Google Analytics', 'Ahrefs', 'Canva']
        },
        keyAchievements: [
          { title: 'Subscriber Increase', description: 'Launched targeted campaign boosting subscribers by 30%.' },
          { title: 'Cost Efficiency', description: 'Reduced production costs by 25% through workflow optimization.' },
          { title: 'Team Management', description: 'Led team producing 500+ articles annually.' },
          { title: 'Newsletter Distribution', description: 'Produced newsletter sent biweekly to 1.5 million people.' },
          { title: 'Your Achievement', description: 'Describe what you did and the impact it had.' }
        ],
        settings: {
          templateId: 'tpl-modern-minimalist',
          accentColor: '142 70% 35%', // Green/Teal accent matching Enhancv look!
          fontFamily: 'sans',
          margins: 'standard',
          showSummary: true,
          showExperience: true,
          showProjects: false,
          showEducation: true,
          showCertifications: false,
          showBranding: true,
          sectionOrder: ['summary', 'skills', 'experience', 'education', 'keyAchievements']
        }
      });
    }
  }, [view, resume]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Auth Handlers
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    const endpoint = authTab === 'login' ? '/api/login' : '/api/register';
    const payload = authTab === 'login'
      ? { email: authEmail, password: authPassword }
      : { name: authName, email: authEmail, password: authPassword };
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Authentication failed');
        return;
      }
      
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      setShowAuthModal(false);
      showToast(authTab === 'login' ? 'Signed in successfully' : 'Registered successfully');
      
      // Clear form
      setAuthName('');
      setAuthEmail('');
      setAuthPassword('');
      
      if (pendingDownload) {
        setPendingDownload(false);
        setTimeout(() => {
          window.print();
        }, 500);
      }
    } catch (err) {
      setAuthError('Server communication failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setView('home');
    showToast('Signed out');
  };

  // Multiple Resumes Management Handlers
  const startEditing = async (id) => {
    // 1. Check if the resume is already loaded in the resumes state collection (local cache)
    const cached = resumes.find(r => r._id === id);
    if (cached) {
      setResume(cached);
      setView('editor');
      return;
    }

    // 2. Fallback to network fetch if not found locally
    setLoading(true);
    try {
      const res = await fetchWithTimeout(`/api/resumes/${id}`, { timeout: 3000 });
      if (res.ok) {
        const data = await res.json();
        setResume(data);
        setView('editor');
      }
    } catch (err) {
      showToast('Failed to load CV');
    } finally {
      setLoading(false);
    }
  };

  const createNewResume = async () => {
    showToast('Creating resume...');
    try {
      const res = await fetchWithTimeout('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?._id, title: 'My New Resume' }),
        timeout: 3000
      });
      if (res.ok) {
        const newResume = await res.json();
        setResume(newResume);
        setView('editor');
        
        // Refresh list in the background
        const listRes = await fetch(`/api/resumes?userId=${user._id}`);
        if (listRes.ok) setResumes(await listRes.json());
      }
    } catch (err) {
      showToast('Failed to create resume');
    }
  };

  const duplicateResume = async (id, e) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/resumes/${id}/duplicate`, { method: 'POST' });
      if (res.ok) {
        showToast('CV duplicated successfully');
        const listRes = await fetch(`/api/resumes?userId=${user._id}`);
        if (listRes.ok) setResumes(await listRes.json());
      }
    } catch (err) {
      showToast('Failed to duplicate CV');
    }
  };

  const deleteResume = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this CV?')) return;
    try {
      const res = await fetch(`/api/resumes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('CV deleted successfully');
        const listRes = await fetch(`/api/resumes?userId=${user._id}`);
        if (listRes.ok) setResumes(await listRes.json());
      }
    } catch (err) {
      showToast('Failed to delete CV');
    }
  };

  const renameResume = async (id, currentTitle, e) => {
    e.stopPropagation();
    const newTitle = window.prompt('Rename CV title to:', currentTitle);
    if (!newTitle) return;
    try {
      const res = await fetch(`/api/resumes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle })
      });
      if (res.ok) {
        showToast('CV title updated');
        const listRes = await fetch(`/api/resumes?userId=${user._id}`);
        if (listRes.ok) setResumes(await listRes.json());
      }
    } catch (err) {
      showToast('Failed to rename CV');
    }
  };

  const toggleMasterStatus = async (resObj, e) => {
    e.stopPropagation();
    try {
      const newStatus = !resObj.isMaster;
      const res = await fetch(`/api/resumes/${resObj._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isMaster: newStatus })
      });
      if (res.ok) {
        showToast(newStatus ? 'CV designated as Master' : 'Master designation removed');
        const listRes = await fetch(`/api/resumes?userId=${user._id}`);
        if (listRes.ok) setResumes(await listRes.json());
      }
    } catch (err) {
      showToast('Failed to update Master status');
    }
  };

  const forkResume = async (id, e) => {
    e.stopPropagation();
    const company = window.prompt('Enter the name of the target company/role for this tailored CV:');
    if (!company) return;
    showToast('Tailoring resume...');
    try {
      const res = await fetchWithTimeout(`/api/resumes/${id}/fork`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company }),
        timeout: 3000
      });
      if (res.ok) {
        const forked = await res.json();
        showToast(`CV tailored for ${company} created!`);
        
        // Add to local resumes list and start editing instantly
        setResumes(prev => [...prev, forked]);
        startEditing(forked._id);
      } else {
        showToast('Failed to fork CV');
      }
    } catch (err) {
      showToast('Failed to fork CV');
    }
  };

  // State update helpers (editor pane)
  const updatePersonalInfo = (field, val) => {
    setResume(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: val }
    }));
  };

  const updateSummary = (val) => {
    setResume(prev => ({ ...prev, summary: val }));
  };

  const updateSetting = (key, val) => {
    setResume(prev => ({
      ...prev,
      settings: { ...prev.settings, [key]: val }
    }));
  };

  const selectTemplate = (tpl) => {
    setResume(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        templateId: tpl.id,
        accentColor: tpl.defaultColor.replace('hsl(', '').replace(')', ''),
        fontFamily: tpl.fontPairing,
        borderStyle: tpl.borderStyle
      }
    }));
    showToast(`Loaded Template: ${tpl.name}`);
  };

  // List item actions
  const addExperience = () => {
    const newItem = { company: 'New Company', role: 'Role Name', date: 'Date Range', bullets: ['Key accomplishment details.'] };
    setResume(prev => ({ ...prev, experience: [...prev.experience, newItem] }));
    setExpandedExpIndex(resume?.experience?.length || 0);
  };

  const editExperience = (idx, field, val) => {
    const updated = [...resume.experience];
    updated[idx] = { ...updated[idx], [field]: val };
    setResume(prev => ({ ...prev, experience: updated }));
  };

  const deleteExperience = (idx) => {
    const updated = resume.experience.filter((_, i) => i !== idx);
    setResume(prev => ({ ...prev, experience: updated }));
  };

  const addExpBullet = (expIdx) => {
    const updated = [...resume.experience];
    updated[expIdx].bullets.push('New key highlight detail.');
    setResume(prev => ({ ...prev, experience: updated }));
  };

  const editExpBullet = (expIdx, bIdx, val) => {
    const updated = [...resume.experience];
    updated[expIdx].bullets[bIdx] = val;
    setResume(prev => ({ ...prev, experience: updated }));
  };

  const deleteExpBullet = (expIdx, bIdx) => {
    const updated = [...resume.experience];
    updated[expIdx].bullets = updated[expIdx].bullets.filter((_, i) => i !== bIdx);
    setResume(prev => ({ ...prev, experience: updated }));
  };

  const addProject = () => {
    const newItem = { name: 'Project Name', link: '', bullets: ['Accomplished project detail.'] };
    setResume(prev => ({ ...prev, projects: [...prev.projects, newItem] }));
    setExpandedProjIndex(resume?.projects?.length || 0);
  };

  const editProject = (idx, field, val) => {
    const updated = [...resume.projects];
    updated[idx] = { ...updated[idx], [field]: val };
    setResume(prev => ({ ...prev, projects: updated }));
  };

  const deleteProject = (idx) => {
    const updated = resume.projects.filter((_, i) => i !== idx);
    setResume(prev => ({ ...prev, projects: updated }));
  };

  const addProjBullet = (projIdx) => {
    const updated = [...resume.projects];
    updated[projIdx].bullets.push('New highlight detail.');
    setResume(prev => ({ ...prev, projects: updated }));
  };

  const editProjBullet = (projIdx, bIdx, val) => {
    const updated = [...resume.projects];
    updated[projIdx].bullets[bIdx] = val;
    setResume(prev => ({ ...prev, projects: updated }));
  };

  const deleteProjBullet = (projIdx, bIdx) => {
    const updated = [...resume.projects];
    updated[projIdx].bullets = updated[projIdx].bullets.filter((_, i) => i !== bIdx);
    setResume(prev => ({ ...prev, projects: updated }));
  };

  const addEducation = () => {
    const newItem = { institution: 'Institution Name', degree: 'Degree', score: 'Score/CGPA', date: 'Graduation Date' };
    setResume(prev => ({ ...prev, education: [...prev.education, newItem] }));
    setExpandedEduIndex(resume?.education?.length || 0);
  };

  const editEducation = (idx, field, val) => {
    const updated = [...resume.education];
    updated[idx] = { ...updated[idx], [field]: val };
    setResume(prev => ({ ...prev, education: updated }));
  };

  const deleteEducation = (idx) => {
    const updated = resume.education.filter((_, i) => i !== idx);
    setResume(prev => ({ ...prev, education: updated }));
  };

  const editCertification = (idx, val) => {
    const updated = [...resume.certifications];
    updated[idx] = val;
    setResume(prev => ({ ...prev, certifications: updated }));
  };

  const addCertification = () => {
    setResume(prev => ({ ...prev, certifications: [...prev.certifications, 'New Certification Name'] }));
  };

  const deleteCertification = (idx) => {
    const updated = resume.certifications.filter((_, i) => i !== idx);
    setResume(prev => ({ ...prev, certifications: updated }));
  };

  const updateSkillsString = (category, commaStringOrArray) => {
    const array = Array.isArray(commaStringOrArray)
      ? commaStringOrArray
      : commaStringOrArray.split(',').map(s => s.trim()).filter(Boolean);
    
    setResume(prev => ({
      ...prev,
      skills: { ...prev.skills, [category]: array }
    }));
  };

  // Indeed skill matcher utilities
  const getCVSkills = () => {
    if (!resume || !resume.skills) return [];
    const s = resume.skills;
    return [
      ...(s.core || []),
      ...(s.languages || []),
      ...(s.backend || []),
      ...(s.frontend || []),
      ...(s.tools || [])
    ].map(x => x.toLowerCase().trim()).filter(Boolean);
  };

  const addSkillToCV = (skill) => {
    const currentSkills = resume?.skills?.core || [];
    if (!currentSkills.some(s => s.toLowerCase() === skill.toLowerCase())) {
      const updated = [...currentSkills, skill];
      setResume(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          core: updated
        }
      }));
      showToast(`Added "${skill}" to your CV Core Competencies!`);
    }
  };

  const calculateMatch = (jobSkills, cvSkills) => {
    const matched = [];
    const missing = [];
    jobSkills.forEach(js => {
      if (cvSkills.includes(js.toLowerCase().trim())) {
        matched.push(js);
      } else {
        missing.push(js);
      }
    });
    const score = jobSkills.length > 0 ? Math.round((matched.length / jobSkills.length) * 100) : 0;
    return { score, matched, missing };
  };

  const getATSAnalysis = () => {
    const issues = [];
    const checks = {
      contact: 0,
      summary: 0,
      experience: 0,
      skills: 0,
      education: 0,
      formatting: 0
    };

    // 1. Contact check
    let contactScore = 0;
    if (resume?.personalInfo?.name) contactScore += 10;
    if (resume?.personalInfo?.email) contactScore += 8;
    if (resume?.personalInfo?.phone) contactScore += 7;
    checks.contact = contactScore; // max 25
    if (!resume?.personalInfo?.email || !resume?.personalInfo?.phone) {
      issues.push({ id: 'contact', severity: 'warning', text: 'Provide both Email and Phone Number for recruiter contact.' });
    }

    // 2. Summary check
    if (resume?.summary && resume.summary.length > 20) {
      checks.summary = 15;
    } else {
      issues.push({ id: 'summary', severity: 'info', text: 'Add a professional Summary (at least 20 chars) to introduce your CV.' });
    }

    // 3. Experience check
    if (resume?.experience && resume.experience.length > 0) {
      checks.experience = Math.min(25, resume.experience.length * 10 + 5);
      const totalBullets = resume.experience.reduce((acc, exp) => acc + (exp.bullets?.length || 0), 0);
      if (totalBullets < 3) {
        issues.push({ id: 'experience-bullets', severity: 'warning', text: 'Add at least 3 descriptive bullet achievements to your experience records.' });
      }
    } else {
      issues.push({ id: 'experience', severity: 'critical', text: 'Experience section is empty! ATS systems prioritize job history.' });
    }

    // 4. Skills check
    const totalSkills = getCVSkills().length;
    if (totalSkills > 0) {
      checks.skills = Math.min(20, totalSkills * 4);
    } else {
      issues.push({ id: 'skills', severity: 'critical', text: 'No Skills declared. List key competencies for parser matching.' });
    }

    // 5. Education check
    if (resume?.education && resume.education.length > 0) {
      checks.education = 15;
    } else {
      issues.push({ id: 'education', severity: 'warning', text: 'Add an Education record to verify academic credentials.' });
    }

    // 6. Formatting / margin checks
    let formatScore = 0;
    if (resume?.settings?.margins === 'standard') {
      formatScore += 5;
    } else {
      issues.push({ id: 'margins', severity: 'info', text: 'Use "Standard" margins for optimal ATS document formatting.' });
    }
    if (resume?.settings?.fontFamily === 'sans' || resume?.settings?.fontFamily === 'display') {
      formatScore += 5;
    } else {
      issues.push({ id: 'fonts', severity: 'info', text: 'Clean sans-serif fonts are highly readable by parser engines.' });
    }
    checks.formatting = formatScore; // max 10

    const score = checks.contact + checks.summary + checks.experience + checks.skills + checks.education + checks.formatting;
    return { score, issues, checks };
  };

  // Confetti trigger hook when strength score hits 100%
  useEffect(() => {
    if (view === 'editor') {
      const { score } = getATSAnalysis();
      if (score === 100 && !strengthConfettiTriggered) {
        setStrengthConfettiTriggered(true);
        setShowStrengthConfetti(true);
        const timer = setTimeout(() => {
          setShowStrengthConfetti(false);
        }, 4000);
        return () => clearTimeout(timer);
      } else if (score < 100 && strengthConfettiTriggered) {
        setStrengthConfettiTriggered(false);
      }
    }
  }, [resume, view, strengthConfettiTriggered]);

  // Download PDF print dialog trigger (gates behind authentication wall)
  const handlePrint = () => {
    if (!user) {
      setPendingDownload(true);
      setAuthTab('login');
      setShowAuthModal(true);
      return;
    }
    setIsDownloading(true);
    // Wait 1.5 seconds for the "shredder/printer loader" morph animation
    setTimeout(() => {
      window.print();
      setIsDownloading(false);
      setShowSuccessConfetti(true);
      // Confetti burst for 3 seconds
      setTimeout(() => {
        setShowSuccessConfetti(false);
      }, 3000);
    }, 1500);
  };

  // Filter 100+ Templates Array
  const filteredPresets = presets.filter(tpl => {
    const matchesSearch = tpl.name.toLowerCase().includes(filterSearch.toLowerCase()) || 
                          tpl.description.toLowerCase().includes(filterSearch.toLowerCase());
    const matchesLayout = filterLayout === 'all' || tpl.layoutType === filterLayout;
    const matchesColor = filterColor === 'all' || tpl.name.toLowerCase().includes(filterColor.toLowerCase());
    return matchesSearch && matchesLayout && matchesColor;
  });

  if (loading) {
    return (
      <div className={`app-container ${theme === 'light' ? 'theme-light' : ''}`} style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', background: 'var(--bg-dark)' }}>
        <RefreshCw size={32} className="animate-spin" style={{ color: 'var(--accent-color)' }} />
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Initialising portfolio workspaces...</p>
      </div>
    );
  }

  // Active template configuration details
  const activeTemplate = presets.find(p => p.id === resume?.settings?.templateId) || presets[0] || { layoutType: 'single', headerStyle: 'centered', fontPairing: 'sans' };

  const getDividerStyle = () => ({
    borderBottomStyle: resume?.settings?.borderStyle || 'none',
    borderBottomWidth: resume?.settings?.borderWidth || '1px',
    borderBottomColor: 'var(--subheading-color, var(--accent-color))',
    marginBottom: '6pt',
    marginTop: '2pt',
    opacity: (resume?.settings?.borderStyle || 'none') === 'none' ? 0 : 0.6
  });

  // Accent and font styling details
  const [h, s, l] = (resume?.settings?.accentColor || '24 90% 50%').split(' ');
  const fontColor = resume?.settings?.fontColor || '#111111';
  const inlineAccentStyles = {
    '--accent-h': h,
    '--accent-s': s,
    '--accent-l': l,
    '--font-color': fontColor,
    '--subheading-color': resume?.settings?.subheadingColor || `hsl(${h}, ${s}, ${l})`
  };

  return (
    <div className={`app-container ${theme === 'light' ? 'theme-light' : ''}`} style={inlineAccentStyles}>
      
      {/* Confetti overlays for gamification strength feedback & printing success */}
      {(showStrengthConfetti || showSuccessConfetti) && <ConfettiOverlay />}
      
      {/* Glowing background orbs */}
      <div className="glow-orb-container no-print">
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
      </div>

      {toast && <div className="toast-msg"><Check size={14} /> {toast}</div>}

      <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        
        {/* Global Navigation Bar */}
        <NavBar
          view={view}
          setView={setView}
          user={user}
          theme={theme}
          setTheme={setTheme}
          handleLogout={handleLogout}
          setAuthTab={setAuthTab}
          setShowAuthModal={setShowAuthModal}
        />

        {/* Dynamic page content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <AnimatePresence mode="wait">
          {/* LANDING PAGE VIEW */}
          {view === 'home' && (
            <LandingView setView={setView} />
          )}

          {/* TEMPLATES CATALOG VIEW */}
          {view === 'templates' && (
            <TemplatesCatalogView
              setView={setView}
              filterSearch={filterSearch}
              setFilterSearch={setFilterSearch}
              filterLayout={filterLayout}
              setFilterLayout={setFilterLayout}
              filterColor={filterColor}
              setFilterColor={setFilterColor}
              SWATCH_HUES={SWATCH_HUES}
              filteredPresets={filteredPresets}
              resume={resume}
              selectTemplate={selectTemplate}
              setResume={setResume}
              showToast={showToast}
            />
          )}

          {/* DEVELOPER BIO VIEW */}
          {
          view === 'about' && (
            <AboutView />
          )}

          {/* USER DASHBOARD VIEW */}
          {view === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              style={{ height: '100%', overflowY: 'auto', paddingBottom: '4rem' }}
            >
              <DashboardView
                resumes={resumes}
                createNewResume={createNewResume}
                startEditing={startEditing}
                renameResume={renameResume}
                duplicateResume={duplicateResume}
                deleteResume={deleteResume}
                toggleMasterStatus={toggleMasterStatus}
                forkResume={forkResume}
              />
            </motion.div>
          )}

          {/* ADMIN VIEW */}
          {view === 'admin' && (
            <AdminView
              adminStats={adminStats}
              adminUsers={adminUsers}
              adminLoading={adminLoading}
              fetchAdminData={fetchAdminData}
              handleToggleUserFlag={handleToggleUserFlag}
              handleDeleteUser={handleDeleteUser}
              currentUser={user}
            />
          )}

          {/* Standalone ATS Scanner View */}
          {view === 'ats' && (
            <ATSScannerView
              atsCVText={atsCVText}
              setAtsCVText={setAtsCVText}
              atsJobDesc={atsJobDesc}
              setAtsJobDesc={setAtsJobDesc}
              atsScanning={atsScanning}
              atsAnalysisResults={atsAnalysisResults}
              setAtsAnalysisResults={setAtsAnalysisResults}
              handleAutoLoadCVText={handleAutoLoadCVText}
              handleScanATS={handleScanATS}
              theme={theme}
            />
          )}

          {/* EDITOR WORKSPACE VIEW */}
          {view === 'editor' && (
            <motion.div
              key="editor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', height: '100%', width: '100%' }}
            >
               {/* Editor Panel (Left) */}
              <EditorSidebar
                isWizardMode={isWizardMode}
                setIsWizardMode={setIsWizardMode}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                resume={resume}
                setResume={setResume}
                presets={presets}
                filterSearch={filterSearch}
                setFilterSearch={setFilterSearch}
                filterLayout={filterLayout}
                setFilterLayout={setFilterLayout}
                filterColor={filterColor}
                setFilterColor={setFilterColor}
                filteredPresets={filteredPresets}
                selectTemplate={selectTemplate}
                updatePersonalInfo={updatePersonalInfo}
                updateSummary={updateSummary}
                addExperience={addExperience}
                moveExperience={moveExperience}
                deleteExperience={deleteExperience}
                editExperience={editExperience}
                addExpBullet={addExpBullet}
                editExpBullet={editExpBullet}
                deleteExpBullet={deleteExpBullet}
                addProject={addProject}
                moveProject={moveProject}
                deleteProject={deleteProject}
                editProject={editProject}
                addProjBullet={addProjBullet}
                editProjBullet={editProjBullet}
                deleteProjBullet={deleteProjBullet}
                updateSkillsString={updateSkillsString}
                addEducation={addEducation}
                moveEducation={moveEducation}
                deleteEducation={deleteEducation}
                editEducation={editEducation}
                addCertification={addCertification}
                editCertification={editCertification}
                deleteCertification={deleteCertification}
                updateSetting={updateSetting}
                expandedExpIndex={expandedExpIndex}
                setExpandedExpIndex={setExpandedExpIndex}
                expandedProjIndex={expandedProjIndex}
                setExpandedProjIndex={setExpandedProjIndex}
                expandedEduIndex={expandedEduIndex}
                setExpandedEduIndex={setExpandedEduIndex}
                getATSAnalysis={getATSAnalysis}
                getCVSkills={getCVSkills}
                calculateMatch={calculateMatch}
                addSkillToCV={addSkillToCV}
                showToast={showToast}
                isPro={isPro}
                handleUpgradeToPro={handleUpgradeToPro}
                handleUndo={handleUndo}
                handleRedo={handleRedo}
                canUndo={history.past.length > 0}
                canRedo={history.future.length > 0}
                handlePrint={handlePrint}
              />

              {/* Preview Workspace Area (Right) */}
              <ResumePreview
                resume={resume}
                activeTemplate={activeTemplate}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                updatePersonalInfo={updatePersonalInfo}
                editExperience={editExperience}
                editProject={editProject}
                editEducation={editEducation}
                editCertification={editCertification}
                updateSummary={updateSummary}
                updateSkillsString={updateSkillsString}
                previewMode={previewMode}
                isDownloading={isDownloading}
                handlePrint={handlePrint}
                saving={saving}
                setResume={setResume}
                isPro={isPro}
                setActiveTab={setActiveTab}
              />

            </motion.div>
          )}
          </AnimatePresence>

        </div>
      </div>

      {/* Authentication Modal overlay */}
      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={() => { setShowAuthModal(false); setPendingDownload(false); }}>
          <div className="auth-modal" onClick={e => e.stopPropagation()}>
            <div className="auth-modal-header">
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                {authTab === 'login' ? 'Sign In to CV Builder' : 'Create an Account'}
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
                {authTab === 'login' ? 'Access your cloud dashboard & multi-resumes' : 'Unlock saving profiles & custom downloads'}
              </p>
            </div>
            
            <div className="auth-modal-tabs">
              <button 
                className={`auth-modal-tab-btn ${authTab === 'login' ? 'active' : ''}`}
                onClick={() => { setAuthTab('login'); setAuthError(''); }}
              >
                Login
              </button>
              <button 
                className={`auth-modal-tab-btn ${authTab === 'register' ? 'active' : ''}`}
                onClick={() => { setAuthTab('register'); setAuthError(''); }}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="auth-modal-body">
              {authError && <div className="auth-error-msg">{authError}</div>}
              
              {authTab === 'register' && (
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    className="form-input" 
                    type="text" 
                    required 
                    value={authName} 
                    onChange={e => setAuthName(e.target.value)} 
                    placeholder="Your Name" 
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  className="form-input" 
                  type="email" 
                  required 
                  value={authEmail} 
                  onChange={e => setAuthEmail(e.target.value)} 
                  placeholder="name@example.com" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input 
                  className="form-input" 
                  type="password" 
                  required 
                  value={authPassword} 
                  onChange={e => setAuthPassword(e.target.value)} 
                  placeholder="••••••••" 
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}>
                {authTab === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
