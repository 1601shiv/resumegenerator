import express from 'express';
import Resume from '../models/Resume.js';
import { SEED_RESUME } from '../config/db.js';

const router = express.Router();

// GET resumes: lists all resumes belonging to user, or returns default resume in array
router.get('/resumes', async (req, res) => {
  try {
    const { userId } = req.query;
    if (userId) {
      const resumes = await Resume.find({ userId });
      res.json(resumes);
    } else {
      const defaultResume = await Resume.findOne({ userId: null });
      res.json(defaultResume ? [defaultResume] : []);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resumes list' });
  }
});

// GET a specific resume
router.get('/resumes/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resume details' });
  }
});

// POST a new resume
router.post('/resumes', async (req, res) => {
  try {
    const { userId, title } = req.body;
    const defaultResume = await Resume.findOne({ userId: null });
    const newResumeData = defaultResume ? defaultResume.toObject() : SEED_RESUME;
    delete newResumeData._id;
    newResumeData.userId = userId || null;
    newResumeData.title = title || 'Untitled Resume';
    const created = await Resume.create(newResumeData);
    res.json(created);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create resume' });
  }
});

// PUT (update) a resume
router.put('/resumes/:id', async (req, res) => {
  try {
    const updated = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update resume' });
  }
});

// DELETE a resume
router.delete('/resumes/:id', async (req, res) => {
  try {
    const updated = await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resume deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete resume' });
  }
});

// Duplicate a resume
router.post('/resumes/:id/duplicate', async (req, res) => {
  try {
    const original = await Resume.findById(req.params.id);
    if (!original) return res.status(404).json({ error: 'Resume not found' });
    const duplicatedData = original.toObject();
    delete duplicatedData._id;
    duplicatedData.title = `${duplicatedData.title} (Copy)`;
    const copy = await Resume.create(duplicatedData);
    res.json(copy);
  } catch (err) {
    res.status(500).json({ error: 'Failed to duplicate resume' });
  }
});

// Fork a resume to tailor it for a specific company
router.post('/resumes/:id/fork', async (req, res) => {
  try {
    const { company } = req.body;
    const original = await Resume.findById(req.params.id);
    if (!original) return res.status(404).json({ error: 'Resume not found' });
    const duplicatedData = original.toObject();
    delete duplicatedData._id;
    duplicatedData.title = `[Tailored: ${company || 'Company'}] ${original.title}`;
    duplicatedData.isMaster = false;
    duplicatedData.forkedFrom = original._id.toString();
    const copy = await Resume.create(duplicatedData);
    res.json(copy);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fork resume' });
  }
});

export default router;
