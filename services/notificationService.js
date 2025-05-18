const nodemailer = require('nodemailer');
const twilio = require('twilio');
const Notification = require('../models/Notification.js');
const { emailConfig, smsConfig } = require('../config/notificationConfig.js');

// Create email transporter
const transporter = nodemailer.createTransport(emailConfig);

// Create Twilio client
const twilioClient = twilio(smsConfig.accountSid, smsConfig.authToken);

class NotificationService {
  static async sendEmail(userId, title, message) {
    try {
      // Send real email
      const mailOptions = {
        from: emailConfig.auth.user,
        to: userId,
        subject: title,
        text: message,
        html: `<h1>${title}</h1><p>${message}</p>`
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);

      // Create notification record
      const notification = await Notification.create({
        userId,
        type: 'email',
        title,
        message,
        status: 'sent',
        metadata: {
          messageId: info.messageId,
          response: info.response
        }
      });

      return notification;
    } catch (error) {
      console.error('Email sending failed:', error);
      
      // Create failed notification record
      const notification = await Notification.create({
        userId,
        type: 'email',
        title,
        message,
        status: 'failed',
        metadata: {
          error: error.message
        }
      });

      throw error;
    }
  }

  static async sendSMS(userId, title, message) {
    try {
      // Send real SMS
      const smsResponse = await twilioClient.messages.create({
        body: `${title}\n${message}`,
        from: smsConfig.phoneNumber,
        to: userId
      });

      console.log('SMS sent:', smsResponse.sid);

      // Create notification record
      const notification = await Notification.create({
        userId,
        type: 'sms',
        title,
        message,
        status: 'sent',
        metadata: {
          messageSid: smsResponse.sid,
          status: smsResponse.status
        }
      });

      return notification;
    } catch (error) {
      console.error('SMS sending failed:', error);
      
      // Create failed notification record
      const notification = await Notification.create({
        userId,
        type: 'sms',
        title,
        message,
        status: 'failed',
        metadata: {
          error: error.message
        }
      });

      throw error;
    }
  }

  static async createInAppNotification(userId, title, message) {
    try {
      const notification = await Notification.create({
        userId,
        type: 'in-app',
        title,
        message,
        status: 'sent'
      });

      return notification;
    } catch (error) {
      console.error('In-app notification creation failed:', error);
      throw error;
    }
  }

  static async getUserNotifications(userId) {
    try {
      const notifications = await Notification.find({ userId })
        .sort({ sentAt: -1 })
        .exec();
      return notifications;
    } catch (error) {
      console.error('Failed to fetch user notifications:', error);
      throw error;
    }
  }
}

module.exports = NotificationService; 