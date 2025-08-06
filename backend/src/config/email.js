import nodemailer from 'nodemailer';

export const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};

export const createTransporter = () => {
  return nodemailer.createTransport(emailConfig);
};
