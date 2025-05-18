// Load environment variables first
require('dotenv').config();

// Debug environment variables
console.log('Current working directory:', process.cwd());
console.log('Environment variables loaded:', {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI ? 'URI is set' : 'URI is undefined'
});

// Validate environment variables
if (!process.env.MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in environment variables');
  console.error('Please make sure .env file exists in the project root directory');
  process.exit(1);
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const notificationRoutes = require('./routes/notificationRoutes');

// Initialize express app
const app = express();

// Security headers middleware
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self' data: https:;");
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  next();
});

// Connect to MongoDB
connectDB();

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Notification Service API',
    version: '1.0.0',
    endpoints: {
      createNotification: 'POST /api/notifications',
      getUserNotifications: 'GET /api/notifications/:userId',
      health: 'GET /health'
    }
  });
});

// Routes
app.use('/api/notifications', notificationRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('Health check requested');
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('💥 Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
    timestamp: new Date().toISOString()
  });

  res.status(err.status || 500).json({ 
    error: 'Something went wrong!',
    message: err.message,
    path: req.path,
    timestamp: new Date().toISOString()
  });
});

// Start server only if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('MongoDB Status:', mongoose.connection.readyState === 1 ? 'connected' : 'disconnected');
  });
}

// Export the Express API
module.exports = app; 