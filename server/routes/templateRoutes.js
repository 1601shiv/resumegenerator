import express from 'express';
import Template from '../models/Template.js';

const router = express.Router();

// Get all templates
router.get('/templates', async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

// Create a new template
router.post('/templates', async (req, res) => {
  try {
    const newTemplate = new Template(req.body);
    await newTemplate.save();
    res.json(newTemplate);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create template' });
  }
});

// Delete a template
router.delete('/templates/:id', async (req, res) => {
  try {
    await Template.findByIdAndDelete(req.params.id);
    res.json({ message: 'Template deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete template' });
  }
});

export default router;
