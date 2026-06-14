import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectAndSeedDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import templateRoutes from './routes/templateRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect and seed database globally at startup
connectAndSeedDB(process.env.MONGODB_URI)
  .then(() => console.log('Database connection and seeding completed.'))
  .catch(err => console.error('Database connection/seeding failed at startup:', err));

// API Routes Mounting
app.use('/api', authRoutes);
app.use('/api', resumeRoutes);
app.use('/api', templateRoutes);
app.use('/api', adminRoutes);

// Port listener for local environments
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
