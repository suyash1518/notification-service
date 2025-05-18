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
- MongoDB (local or remote instance)
- Gmail account (for email notifications)
- Twilio account (for SMS notifications)

## Detailed Setup Instructions

### 1. MongoDB Setup
- Install MongoDB Community Edition from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
- Start MongoDB service:
  ```bash
  # Windows
  net start MongoDB

  # macOS/Linux
  sudo service mongod start
  ```
- Verify MongoDB is running:
  ```bash
  mongosh
  ```

### 2. Gmail Setup for Email Notifications
1. Enable 2-Step Verification:
   - Go to your Google Account settings
   - Navigate to Security
   - Enable 2-Step Verification

2. Generate App Password:
   - Go to Security → App passwords
   - Select "Mail" as the app
   - Select "Other" as the device
   - Copy the generated 16-character password

### 3. Twilio Setup for SMS Notifications
1. Create a Twilio account at [Twilio.com](https://www.twilio.com/try-twilio)
2. Get your credentials from the Twilio Console:
   - Account SID
   - Auth Token
   - Twilio Phone Number

### 4. Project Setup
1. Clone the repository:
```bash
git clone https://github.com/suyash1518/notification-service.git
cd notification-service
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
# Server Configuration
PORT=3000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/notification-service

# Email Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password

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

## Assumptions and Limitations

1. Email Notifications:
   - Gmail SMTP is used for sending emails
   - App Password is required (2-Step Verification must be enabled)
   - Daily sending limits apply based on Gmail's policies

2. SMS Notifications:
   - Twilio account is required
   - Phone numbers must be in E.164 format (e.g., +1234567890)
   - Trial accounts can only send to verified numbers
   - Costs apply based on Twilio's pricing

3. In-app Notifications:
   - Stored in MongoDB
   - No real-time delivery mechanism
   - Requires separate frontend implementation for display

4. General:
   - MongoDB must be running locally or accessible via connection string
   - No authentication/authorization implemented
   - No rate limiting implemented
   - No notification templates
   - No scheduling mechanism

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
│   ├── db.js              # MongoDB connection configuration
│   └── notificationConfig.js  # Email and SMS configuration
├── controllers/
│   └── notificationController.js  # Request handlers
├── models/
│   └── Notification.js    # Mongoose schema
├── routes/
│   └── notificationRoutes.js  # Express routes
├── services/
│   └── notificationService.js  # Business logic
├── .env                   # Environment variables
├── .gitignore            # Git ignore file
├── app.js                # Express application
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

## Testing the Service

1. Using Postman:
   - Import the following collection:
   ```json
   {
     "info": {
       "name": "Notification Service",
       "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
     },
     "item": [
       {
         "name": "Create Email Notification",
         "request": {
           "method": "POST",
           "url": "http://localhost:3000/api/notifications",
           "body": {
             "mode": "raw",
             "raw": "{\"userId\": \"your-email@gmail.com\", \"type\": \"email\", \"title\": \"Test Email\", \"message\": \"This is a test email\"}",
             "options": {
               "raw": {
                 "language": "json"
               }
             }
           }
         }
       },
       {
         "name": "Create SMS Notification",
         "request": {
           "method": "POST",
           "url": "http://localhost:3000/api/notifications",
           "body": {
             "mode": "raw",
             "raw": "{\"userId\": \"+1234567890\", \"type\": \"sms\", \"title\": \"Test SMS\", \"message\": \"This is a test SMS\"}",
             "options": {
               "raw": {
                 "language": "json"
               }
             }
           }
         }
       }
     ]
   }
   ```

2. Using curl:
   ```bash
   # Create email notification
   curl -X POST http://localhost:3000/api/notifications \
     -H "Content-Type: application/json" \
     -d '{"userId": "your-email@gmail.com", "type": "email", "title": "Test", "message": "Test message"}'

   # Get notifications
   curl http://localhost:3000/api/notifications/your-email@gmail.com
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Deployment

### Deploying to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

4. Set up environment variables in Vercel:
   - Go to your project settings in Vercel dashboard
   - Navigate to the "Environment Variables" section
   - Add the following variables:
     ```
     MONGODB_URI=your_mongodb_connection_string
     EMAIL_USER=your_gmail_address
     EMAIL_PASS=your_gmail_app_password
     TWILIO_ACCOUNT_SID=your_twilio_account_sid
     TWILIO_AUTH_TOKEN=your_twilio_auth_token
     TWILIO_PHONE_NUMBER=your_twilio_phone_number
     ```

5. For production deployment:
   ```bash
   vercel --prod
   ```

Note: Make sure your MongoDB instance is accessible from Vercel's servers. If you're using MongoDB Atlas, ensure your IP whitelist includes Vercel's IP ranges. 