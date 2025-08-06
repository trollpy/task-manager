import nodemailer from 'nodemailer';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendTaskAssignment(user, task, organization) {
    const html = `
      <h2>New Task Assignment</h2>
      <p>Hello ${user.firstName},</p>
      <p>You have been assigned a new task:</p>
      <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0;">
        <h3>${task.title}</h3>
        <p><strong>Description:</strong> ${task.description}</p>
        <p><strong>Priority:</strong> ${task.priority}</p>
        <p><strong>Due Date:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>
      </div>
      <p>Please log in to your dashboard to accept or view more details.</p>
      <p>Best regards,<br>${organization.name}</p>
    `;

    return this.sendEmail(user.email, 'New Task Assignment', html);
  }

  async sendTaskStatusUpdate(user, task, status, organization) {
    const html = `
      <h2>Task Status Update</h2>
      <p>Hello ${user.firstName},</p>
      <p>Task "<strong>${task.title}</strong>" has been updated to: <strong>${status}</strong></p>
      <p>Best regards,<br>${organization.name}</p>
    `;

    return this.sendEmail(user.email, 'Task Status Update', html);
  }

  async sendTaskReminder(user, task, organization) {
    const html = `
      <h2>Task Reminder</h2>
      <p>Hello ${user.firstName},</p>
      <p>This is a reminder that your task "<strong>${task.title}</strong>" is due on ${new Date(task.dueDate).toLocaleDateString()}.</p>
      <p>Please log in to update the status if needed.</p>
      <p>Best regards,<br>${organization.name}</p>
    `;

    return this.sendEmail(user.email, 'Task Reminder', html);
  }

  async sendEmail(to, subject, html) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
      });
      console.log('Email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Email error:', error);
      throw error;
    }
  }
}

export default new EmailService();