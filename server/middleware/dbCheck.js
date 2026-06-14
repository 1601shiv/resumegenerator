import mongoose from 'mongoose';
import { connectAndSeedDB } from '../config/db.js';

export const dbCheckMiddleware = async (req, res, next) => {
  // If already connected, proceed instantly
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  try {
    await connectAndSeedDB(process.env.MONGODB_URI);
    next();
  } catch (err) {
    console.error('Database connection middleware failed:', err.message);
    res.status(500).json({
      error: 'Database connection failed. If you deployed to Vercel, please verify that you have added the MONGODB_URI environment variable in your Vercel Project Settings, and that your MongoDB Atlas cluster IP Whitelist allows access from anywhere (0.0.0.0/0) since Vercel uses dynamic IP addresses.'
    });
  }
};
