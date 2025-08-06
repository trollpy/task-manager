import emailService from './emailService.js';
import User from '../models/User.js';
import Task from '../models/Task.js';

class NotificationService {
  constructor() {
    this.notifications = new Map(); // In-memory storage for real-time notifications
  }

  async sendNotification(notificationData) {
    try {
      const { userId, title, message, type } = notificationData;
      
      // Store in-app notification
      this.addNotification(userId, {
        type,
        title,
        message,
        createdAt: new Date(),
        read: false
      });

      return true;
    } catch (error) {
      console.error('Send notification error:', error);
      return false;
    }
  }

  async sendTaskAssignedNotification(taskId) {
    try {
      const task = await Task.findById(taskId).populate(['assignee', 'organization']);
      if (!task) return;

      // Send email
      await emailService.sendTaskAssignment(task.assignee, task, task.organization);

      // Store in-app notification
      this.addNotification(task.assignee._id, {
        type: 'task_assigned',
        title: 'New Task Assigned',
        message: `You have been assigned: ${task.title}`,
        taskId: task._id,
        createdAt: new Date(),
        read: false
      });

      return true;
    } catch (error) {
      console.error('Task assigned notification error:', error);
      return false;
    }
  }

  async sendTaskStatusNotification(taskId, oldStatus, newStatus) {
    try {
      const task = await Task.findById(taskId).populate(['assignee', 'createdBy', 'organization']);
      if (!task) return;

      // Notify task creator if status changed
      if (task.createdBy && task.createdBy._id.toString() !== task.assignee._id.toString()) {
        await emailService.sendTaskStatusUpdate(task.createdBy, task, newStatus, task.organization);
        
        this.addNotification(task.createdBy._id, {
          type: 'task_status_update',
          title: 'Task Status Updated',
          message: `${task.assignee.firstName} ${task.assignee.lastName} changed "${task.title}" to ${newStatus}`,
          taskId: task._id,
          createdAt: new Date(),
          read: false
        });
      }

      return true;
    } catch (error) {
      console.error('Task status notification error:', error);
      return false;
    }
  }

  async sendTaskReminderNotifications() {
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(23, 59, 59, 999);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Find tasks due tomorrow or overdue
      const tasksDue = await Task.find({
        dueDate: { $gte: today, $lte: tomorrow },
        status: { $in: ['Awaiting Acceptance', 'In Progress'] }
      }).populate(['assignee', 'organization']);

      for (const task of tasksDue) {
        if (task.assignee) {
          await emailService.sendTaskReminder(task.assignee, task, task.organization);
          
          this.addNotification(task.assignee._id, {
            type: 'task_reminder',
            title: 'Task Due Soon',
            message: `"${task.title}" is due on ${new Date(task.dueDate).toLocaleDateString()}`,
            taskId: task._id,
            createdAt: new Date(),
            read: false
          });
        }
      }

      return tasksDue.length;
    } catch (error) {
      console.error('Task reminder notifications error:', error);
      return 0;
    }
  }

  addNotification(userId, notification) {
    const userNotifications = this.notifications.get(userId.toString()) || [];
    userNotifications.unshift(notification);
    
    // Keep only last 50 notifications per user
    if (userNotifications.length > 50) {
      userNotifications.splice(50);
    }
    
    this.notifications.set(userId.toString(), userNotifications);
  }

  getUserNotifications(userId) {
    return this.notifications.get(userId.toString()) || [];
  }

  markNotificationAsRead(userId, notificationIndex) {
    const userNotifications = this.notifications.get(userId.toString());
    if (userNotifications && userNotifications[notificationIndex]) {
      userNotifications[notificationIndex].read = true;
      this.notifications.set(userId.toString(), userNotifications);
      return true;
    }
    return false;
  }

  getUnreadCount(userId) {
    const userNotifications = this.notifications.get(userId.toString()) || [];
    return userNotifications.filter(n => !n.read).length;
  }

  clearAllNotifications(userId) {
    this.notifications.delete(userId.toString());
  }
}

const notificationService = new NotificationService();

// Export both the instance and the sendNotification function
export default notificationService;
export const sendNotification = notificationService.sendNotification.bind(notificationService);