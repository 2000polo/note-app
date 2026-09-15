import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { connectDB } from './config/db.js';
import rateLimitter from './middleware/rateLimitter.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
// middleware
app.use(express.json());
app.use(cookieParser());
// rate limiter middleware
app.use(rateLimitter);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/notes', notesRoutes);

const startServer = async () => {
  try {
    await connectDB();

    app.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`);
      next();
    })

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();