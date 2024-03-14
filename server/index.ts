
import { app } from './run_express';
import { initializeDatabase } from './db';
import { handleUpdateScore, handleGetHighScore } from './api';

// Initialize the database
initializeDatabase()
  .then(() => {
    console.log('Database initialized');
  })
  .catch((error) => {
    console.error('Error initializing database:', error);
  });

// API routes
app.post('/api/updateScore', handleUpdateScore);
app.get('/api/highScore', handleGetHighScore);

