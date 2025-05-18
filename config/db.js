const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Starting MongoDB connection...');
    console.log('MongoDB URI:', process.env.MONGODB_URI);
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'notification-service' // Explicitly set database name
    });
    
    console.log('MongoDB Connection Details:');
    console.log(`- Host: ${conn.connection.host}`);
    console.log(`- Port: ${conn.connection.port}`);
    console.log(`- Database: ${conn.connection.name}`);
    console.log('MongoDB Connected Successfully!');

    // Create a test notification to ensure database is created
    const Notification = require('../models/Notification.js');
    try {
      await Notification.create({
        userId: 'test-user',
        type: 'in-app',
        title: 'Test Notification',
        message: 'This is a test notification to create the database',
        status: 'sent'
      });
      console.log('Test notification created successfully');
    } catch (error) {
      console.error('Error creating test notification:', error);
    }

  } catch (error) {
    console.error('MongoDB Connection Error Details:');
    console.error('- Error Message:', error.message);
    console.error('- Error Name:', error.name);
    console.error('- Full Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB; 