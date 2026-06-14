import express from 'express';
import User from '../models/User.js';
import Resume from '../models/Resume.js';
import Template from '../models/Template.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Admin stats
router.get('/admin/stats', verifyAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalResumes = await Resume.countDocuments();
    const totalTemplates = await Template.countDocuments();
    
    const popularTemplates = await Resume.aggregate([
      { $group: { _id: '$settings.templateId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      totalUsers,
      totalResumes,
      totalTemplates,
      popularTemplates
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
});

// Admin users directory
router.get('/admin/users', verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Admin toggle user flags
router.put('/admin/users/:id', verifyAdmin, async (req, res) => {
  try {
    const { isPro, isAdmin } = req.body;
    const updated = await User.findByIdAndUpdate(req.params.id, { isPro, isAdmin }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Admin delete user
router.delete('/admin/users/:id', verifyAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Resume.deleteMany({ userId: req.params.id });
    res.json({ message: 'User and their resumes deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
