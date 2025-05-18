# Notification Service

A robust notification service built with Node.js, Express, and MongoDB that supports multiple notification channels including email, SMS, and in-app notifications.

## Features

- Multiple notification channels:
  - Email notifications using Gmail SMTP
  - SMS notifications using Twilio
  - In-app notifications stored in MongoDB
- RESTful API endpoints
- MongoDB integration for notification storage
- Error handling and logging
- Environment-based configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Gmail account (for email notifications)
- Twilio account (for SMS notifications)

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd notification-service
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
# Server Configuration
PORT=3000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/notification-service

# Email Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password

# Twilio Configuration
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number
```

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Create Notification
```
POST /api/notifications
```
Request body:
```json
{
    "userId": "user@example.com",  // Email for email notifications, phone number for SMS
    "type": "email|sms|in-app",
    "title": "Notification Title",
    "message": "Notification Message"
}
```

### Get User Notifications
```
GET /api/notifications/:userId
```

## Environment Variables

- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `EMAIL_USER`: Gmail address
- `EMAIL_PASS`: Gmail app password
- `TWILIO_ACCOUNT_SID`: Twilio account SID
- `TWILIO_AUTH_TOKEN`: Twilio auth token
- `TWILIO_PHONE_NUMBER`: Twilio phone number

## Project Structure

```
notification-service/
├── config/
│   ├── db.js
│   └── notificationConfig.js
├── controllers/
│   └── notificationController.js
├── models/
│   └── Notification.js
├── routes/
│   └── notificationRoutes.js
├── services/
│   └── notificationService.js
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 