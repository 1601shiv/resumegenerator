import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const isFirstUser = (await User.countDocuments()) === 0;
    const isAdmin = isFirstUser || email === '1601shiv@gmail.com' || email.startsWith('admin@');
    const newUser = await User.create({ name, email, password, isPro: false, isAdmin });
    res.json({ _id: newUser._id, name: newUser.name, email: newUser.email, isPro: newUser.isPro, isAdmin: newUser.isAdmin });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json({ _id: user._id, name: user.name, email: user.email, isPro: user.isPro, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Upgrade user to PRO
router.post('/users/upgrade', async (req, res) => {
  try {
    const { userId } = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, { isPro: true }, { new: true });
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.json({ _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, isPro: updatedUser.isPro });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upgrade user' });
  }
});

export default router;
