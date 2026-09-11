import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimitter from './middleware/rateLimitter.js';

dotenv.config();

const app = express();

// middleware
app.use(express.json());
// rate limiter middleware
app.use(rateLimitter);

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