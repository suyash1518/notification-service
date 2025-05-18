const { validationResult } = require('express-validator');
const NotificationService = require('../services/notificationService.js');

class NotificationController {
  static async createNotification(req, res) {
    try {
      console.log('Received notification request:', req.body);
      
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

      console.log('Notification created successfully:', notification);
      res.status(201).json(notification);
    } catch (error) {
      console.error('Error creating notification:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      res.status(500).json({ 
        error: 'Failed to create notification',
        details: error.message 
      });
    }
  }

  static async getUserNotifications(req, res) {
    try {
      const { id: userId } = req.params;
      const notifications = await NotificationService.getUserNotifications(userId);
      res.json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'Failed to fetch notifications' });
    }
  }
}

module.exports = NotificationController; 