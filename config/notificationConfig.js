require('dotenv').config();

// Debug logging
console.log('Email configuration:', {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS ? 'Password is set' : 'Password is missing'
});

console.log('Twilio configuration:', {
  accountSid: process.env.TWILIO_ACCOUNT_SID ? 'Account SID is set' : 'Account SID is missing',
  authToken: process.env.TWILIO_AUTH_TOKEN ? 'Auth Token is set' : 'Auth Token is missing',
  phoneNumber: process.env.TWILIO_PHONE_NUMBER ? 'Phone Number is set' : 'Phone Number is missing'
});

const emailConfig = {
  service: 'gmail',  // Using Gmail service instead of direct SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};

const smsConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  phoneNumber: process.env.TWILIO_PHONE_NUMBER
};

module.exports = {
  emailConfig,
  smsConfig
}; 