const express = require('express');
const { body, param } = require('express-validator');
const NotificationController = require('../controllers/notificationController.js');

const router = express.Router();

// Validation middleware
const validateNotification = [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('type')
    .isIn(['email', 'sms', 'in-app'])
    .withMessage('Type must be email, sms, or in-app'),
  body('title').notEmpty().withMessage('Title is required'),
  body('message').notEmpty().withMessage('Message is required')
];

const validateUserId = [
  param('id').notEmpty().withMessage('User ID is required')
];

// Routes
router.post('/notifications', validateNotification, NotificationController.createNotification);
router.get('/users/:id/notifications', validateUserId, NotificationController.getUserNotifications);

module.exports = router; 