import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, default: '' },
  role: { type: String, default: '' },
  date: { type: String, default: '' },
  bullets: [{ type: String }]
});

const ProjectSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  link: { type: String, default: '' },
  bullets: [{ type: String }]
});

const EducationSchema = new mongoose.Schema({
  institution: { type: String, default: '' },
  degree: { type: String, default: '' },
  score: { type: String, default: '' },
  date: { type: String, default: '' }
});

const ResumeSchema = new mongoose.Schema({
  userId: { type: String, default: null },
  title: { type: String, default: 'My Resume' },
  targetJobTitle: { type: String, default: 'Software Engineer' },
  personalInfo: {
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' }
  },
  summary: { type: String, default: '' },
  skills: {
    core: [{ type: String }],
    languages: [{ type: String }],
    backend: [{ type: String }],
    frontend: [{ type: String }],
    tools: [{ type: String }]
  },
  experience: [ExperienceSchema],
  projects: [ProjectSchema],
  education: [EducationSchema],
  customFields: [{
    label: { type: String, default: '' },
    value: { type: String, default: '' },
    type: { type: String, default: 'text' }
  }],
  certifications: [{ type: String }],
  forkedFrom: { type: String, default: null },
  isMaster: { type: Boolean, default: false },
  coverLetter: {
    recipient: { type: String, default: 'Hiring Team' },
    company: { type: String, default: 'Target Company' },
    body: { type: String, default: '' }
  },
  settings: {
    templateId: { type: String, default: 'ats-classic' },
    accentColor: { type: String, default: '24 90% 50%' }, // orange-600 in HSL
    fontColor: { type: String, default: '#111111' },
    fontFamily: { type: String, default: 'sans' },
    margins: { type: String, default: 'standard' },
    borderStyle: { type: String, default: 'none' },
    borderWidth: { type: String, default: '1px' },
    borderColor: { type: String, default: '' },
    showSummary: { type: Boolean, default: true },
    showExperience: { type: Boolean, default: true },
    showProjects: { type: Boolean, default: true },
    showEducation: { type: Boolean, default: true },
    showCertifications: { type: Boolean, default: true },
    subheadingColor: { type: String, default: '' },
    sectionOrder: { type: [String], default: ['summary', 'skills', 'experience', 'projects', 'education', 'certifications'] }
  }
}, { timestamps: true });

export default mongoose.model('Resume', ResumeSchema);
