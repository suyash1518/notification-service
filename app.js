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
const cors = require('cors');
const connectDB = require('./config/db.js');
const notificationRoutes = require('./routes/notificationRoutes.js');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', notificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
}); 