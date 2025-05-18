const { validationResult } = require('express-validator');
const NotificationService = require('../services/notificationService.js');
const Notification = require('../models/Notification');

class NotificationController {
  static async createNotification(req, res) {
    try {
      console.log('Creating notification:', {
        userId: req.body.userId,
        type: req.body.type,
        title: req.body.title
      });

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
      }

      const { userId, type, title, message } = req.body;
      console.log('Processing notification:', { userId, type, title, message });

      let notification;
      switch (type) {
        case 'email':
          console.log('Attempting to send email notification');
          notification = await NotificationService.sendEmail(userId, title, message);
          break;
        case 'sms':
          console.log('Attempting to send SMS notification');
          notification = await NotificationService.sendSMS(userId, title, message);
          break;
        case 'in-app':
          console.log('Creating in-app notification');
          notification = await NotificationService.createInAppNotification(userId, title, message);
          break;
        default:
          console.log('Invalid notification type:', type);
          return res.status(400).json({ error: 'Invalid notification type' });
      }

      console.log('Notification created successfully:', {
        id: notification._id,
        type: notification.type
      });
      res.status(201).json(notification);
    } catch (error) {
      console.error('Error creating notification:', {
        error: error.message,
        stack: error.stack,
        body: req.body
      });
      res.status(500).json({ 
        error: 'Failed to create notification',
        details: error.message 
      });
    }
  }

  static async getUserNotifications(req, res) {
    try {
      console.log('Fetching notifications for user:', req.params.userId);

      const notifications = await NotificationService.getUserNotifications(req.params.userId);
      
      console.log('Found notifications:', {
        userId: req.params.userId,
        count: notifications.length
      });

      res.json(notifications);
    } catch (error) {
      console.error('Error fetching user notifications:', {
        error: error.message,
        stack: error.stack,
        userId: req.params.userId
      });
      res.status(500).json({ 
        error: 'Failed to fetch notifications',
        details: error.message 
      });
    }
  }
}

module.exports = NotificationController; 