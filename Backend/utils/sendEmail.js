const nodemailer = require('nodemailer');

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_HOST_USER,
      pass: process.env.EMAIL_HOST_PASSWORD
    }
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.DEFAULT_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    const info = await transporter.sendMail(message);
    return info;
  } catch (error) {
    console.log('Error sending email:', error);
    throw new Error('Email not sent');
  };
};

module.exports = sendEmail;