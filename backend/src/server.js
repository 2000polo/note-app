import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { connectDB } from './config/db.js';
import rateLimitter from './middleware/rateLimitter.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();

if(process.env.prod !== "production"){
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }))
}

// middleware
app.use(express.json());
app.use(cookieParser());
// rate limiter middleware
app.use(rateLimitter);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/notes', notesRoutes);

if(process.env.NODE_ENV == "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("*", (re, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })
}

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