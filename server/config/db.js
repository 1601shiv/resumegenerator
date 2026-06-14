import mongoose from 'mongoose';
import Resume from '../models/Resume.js';
import Template from '../models/Template.js';

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

export const PRESET_TEMPLATES = generateTemplates();

export const SEED_RESUME = {
  title: 'My Default CV',
  personalInfo: {
    name: 'SHIV PRATAP SINGH',
    email: '1601shiv@gmail.com',
    phone: '7667590158',
    linkedin: 'linkedin.com/in/shiv-pratap-singh-2b4735271',
    github: 'github.com/1601shiv'
  },
  summary: 'MCA student with a strong foundation in Software Engineering, Data Structures, Algorithms, and DBMS. Experienced in Python backend development, designing RESTful APIs, and managing SQL/NoSQL databases to create scalable applications. Proven ability to debug complex issues, write unit tests, and collaborate seamlessly with frontend teams. Feel free to search and try [My Portfolio](https://github.com/1601shiv) links.',
  skills: {
    core: ['Software Engineering', 'Backend Development', 'RESTful APIs', 'Debugging', 'Unit Testing'],
    languages: ['Python', 'Java', 'JavaScript (ES6+)'],
    backend: ['SQL', 'PostgreSQL', 'MongoDB', 'Node.js', 'Express.js'],
    frontend: ['HTML5', 'CSS3', 'React.js', 'Responsive Design'],
    tools: ['Git', 'GitHub', 'VS Code', 'Data Structures', 'Algorithms', 'Operating Systems']
  },
  experience: [
    {
      company: 'Skyscanner Virtual Experience',
      role: 'React UI Developer',
      date: 'Nov 2025',
      bullets: [
        'Built a travel date picker component using React and Backpack UI to streamline user booking flows.',
        'Customized 15+ reusable UI components and implemented automated rendering tests to ensure visual consistency.'
      ]
    },
    {
      company: 'Deloitte Cyber Security Simulation',
      role: 'Security Analyst',
      date: 'Nov 2025',
      bullets: [
        'Analyzed 500+ lines of system logs to detect anomalous behavior and identify potential security vulnerabilities.',
        'Assisted in preparing 3 incident response summaries and mitgation steps.'
      ]
    }
  ],
  projects: [
    {
      name: 'MotoGear E-Commerce Platform',
      bullets: [
        'Designed, developed, tested, and maintained a robust backend architecture for a full-stack showroom application, managing a database schema of 500+ inventory items.',
        'Built and integrated 10+ RESTful APIs, utilizing SQL/NoSQL databases to efficiently handle product queries and simulate secure payment gateways.'
      ]
    },
    {
      name: 'Resume & Portfolio Generator',
      bullets: [
        'Developed a dynamic resume builder utilizing React.js, component-based architecture, and responsive design principles to serve 120+ customizable layout templates.',
        'Wrote unit tests and debugged core application features, achieving 90% reliable functionality across drag-and-drop modules, live previews, and theme switching.'
      ]
    }
  ],
  education: [
    {
      institution: 'Haldia Institute of Technology',
      degree: 'MCA',
      score: 'CGPA: 8.19',
      date: '2024--2026'
    },
    {
      institution: 'Guru Nanak College, Dhanbad',
      degree: 'BCA',
      score: 'CGPA: 7.31',
      date: '2021--2024'
    }
  ],
  certifications: [
    'Introduction to Generative AI, Google Cloud (2025)'
  ],
  coverLetter: {
    recipient: 'Hiring Manager',
    company: 'Indeed Tech Corp',
    body: 'Dear Hiring Manager,\n\nI am writing to express my strong interest in the Software Engineer position at Indeed Tech Corp. With my background in MCA from Haldia Institute of Technology and experience in React UI development, I am eager to contribute to your building of next-generation search features.\n\nI have a strong foundation in backend development (Python/Node.js) and frontend libraries (React.js), which matches your stack. I look forward to discussing how my experience can help Indeed Tech Corp grow.\n\nSincerely,\nSHIV PRATAP SINGH'
  },
  settings: {
    templateId: 'tpl-modern-minimalist',
    accentColor: '215 80% 30%',
    fontFamily: 'sans',
    margins: 'standard',
    showSummary: true,
    showExperience: true,
    showProjects: true,
    showEducation: true,
    showCertifications: true,
    sectionOrder: ['summary', 'skills', 'experience', 'projects', 'education', 'certifications']
  }
};

let cachedConnection = null;
let isSeeded = false;

export const connectAndSeedDB = async (mongodbUri) => {
  if (!mongodbUri) {
    throw new Error('Database connection configuration missing');
  }

  if (mongoose.connection.readyState !== 1) {
    try {
      cachedConnection = await mongoose.connect(mongodbUri, { serverSelectionTimeoutMS: 5000 });
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error(`Failed to connect to primary MongoDB URI (${mongodbUri}):`, err.message);
      const fallbackUri = 'mongodb://127.0.0.1:27017/resumegenrator';
      console.log(`Attempting fallback to local MongoDB URI (${fallbackUri})...`);
      cachedConnection = await mongoose.connect(fallbackUri, { serverSelectionTimeoutMS: 5000 });
      console.log('Connected to fallback local MongoDB');
    }
  }

  if (!isSeeded) {
    try {
      const templateCount = await Template.countDocuments();
      if (templateCount !== 103 || !(await Template.findOne({ id: 'tpl-modern-minimalist' }))) {
        await Template.deleteMany({});
        await Template.insertMany(PRESET_TEMPLATES);
        console.log('Seeded 103 premium templates');
      }

      const resumeCount = await Resume.countDocuments();
      if (resumeCount === 0) {
        await Resume.create(SEED_RESUME);
        console.log('Seeded default user profile');
      }
      isSeeded = true;
    } catch (err) {
      console.error('Database seeding failed:', err);
    }
  }
  return cachedConnection;
};
