const jwt = require('jsonwebtoken');
const User = require('../models/User');
const notificationService = require('../services/notificationService');

class SocketHandlers {
  constructor(io) {
    this.io = io;
    this.connectedUsers = new Map();
  }

  // Authentication middleware for socket connections
  async authenticateSocket(socket, next) {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('No token provided'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).populate('organization');
      
      if (!user) {
        return next(new Error('Invalid token'));
      }

      socket.userId = user._id.toString();
      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication failed'));
    }
  }

  // Handle new connection
  handleConnection(socket) {
    console.log(`User connected: ${socket.user.firstName} ${socket.user.lastName}`);
    
    // Store connected user
    this.connectedUsers.set(socket.userId, {
      socketId: socket.id,
      user: socket.user,
      connectedAt: new Date()
    });

    // Join organization room
    socket.join(`org_${socket.user.organization._id}`);

    // Send initial notifications
    this.sendInitialNotifications(socket);

    // Handle disconnect
    socket.on('disconnect', () => {
      this.handleDisconnection(socket);
    });

    // Handle notification acknowledgment
    socket.on('notification_read', (data) => {
      this.handleNotificationRead(socket, data);
    });

    // Handle typing indicators for comments
    socket.on('typing_start', (data) => {
      this.handleTypingStart(socket, data);
    });

    socket.on('typing_stop', (data) => {
      this.handleTypingStop(socket, data);
    });

    // Handle task updates
    socket.on('task_update', (data) => {
      this.handleTaskUpdate(socket, data);
    });
  }

  // Send initial notifications to connected user
  async sendInitialNotifications(socket) {
    try {
      const notifications = notificationService.getUserNotifications(socket.userId);
      const unreadCount = notificationService.getUnreadCount(socket.userId);
      
      socket.emit('initial_notifications', {
        notifications: notifications.slice(0, 10), // Send last 10
        unreadCount
      });
    } catch (error) {
      console.error('Error sending initial notifications:', error);
    }
  }

  // Handle disconnection
  handleDisconnection(socket) {
    console.log(`User disconnected: ${socket.user.firstName} ${socket.user.lastName}`);
    this.connectedUsers.delete(socket.userId);
  }

  // Handle notification read
  handleNotificationRead(socket, data) {
    try {
      const { notificationIndex } = data;
      notificationService.markNotificationAsRead(socket.userId, notificationIndex);
      
      const unreadCount = notificationService.getUnreadCount(socket.userId);
      socket.emit('notification_updated', { unreadCount });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }

  // Handle typing indicators
  handleTypingStart(socket, data) {
    const { taskId } = data;
    socket.to(`task_${taskId}`).emit('user_typing', {
      userId: socket.userId,
      userName: `${socket.user.firstName} ${socket.user.lastName}`,
      taskId
    });
  }

  handleTypingStop(socket, data) {
    const { taskId } = data;
    socket.to(`task_${taskId}`).emit('user_stop_typing', {
      userId: socket.userId,
      taskId
    });
  }

  // Handle task updates
  handleTaskUpdate(socket, data) {
    try {
      const { taskId, update } = data;
      
      // Broadcast to organization members
      socket.to(`org_${socket.user.organization._id}`).emit('task_updated', {
        taskId,
        update,
        updatedBy: {
          id: socket.userId,
          name: `${socket.user.firstName} ${socket.user.lastName}`
        }
      });
    } catch (error) {
      console.error('Error handling task update:', error);
    }
  }

  // Broadcast notification to specific user
  broadcastToUser(userId, event, data) {
    const connectedUser = this.connectedUsers.get(userId.toString());
    if (connectedUser) {
      this.io.to(connectedUser.socketId).emit(event, data);
    }
  }

  // Broadcast to organization
  broadcastToOrganization(organizationId, event, data) {
    this.io.to(`org_${organizationId}`).emit(event, data);
  }

  // Broadcast task assignment notification
  broadcastTaskAssignment(assigneeId, task) {
    this.broadcastToUser(assigneeId, 'task_assigned', {
      task,
      message: `You have been assigned a new task: ${task.title}`
    });
  }

  // Broadcast task status change
  broadcastTaskStatusChange(organizationId, task, oldStatus, newStatus, updatedBy) {
    this.broadcastToOrganization(organizationId, 'task_status_changed', {
      taskId: task._id,
      title: task.title,
      oldStatus,
      newStatus,
      updatedBy,
      updatedAt: new Date()
    });
  }

  // Get connected users count
  getConnectedUsersCount() {
    return this.connectedUsers.size;
  }

  // Get connected users for organization
  getOrganizationConnectedUsers(organizationId) {
    const orgUsers = [];
    this.connectedUsers.forEach((connectedUser) => {
      if (connectedUser.user.organization._id.toString() === organizationId.toString()) {
        orgUsers.push({
          id: connectedUser.user._id,
          name: `${connectedUser.user.firstName} ${connectedUser.user.lastName}`,
          role: connectedUser.user.role,
          connectedAt: connectedUser.connectedAt
        });
      }
    });
    return orgUsers;
  }
}

module.exports = SocketHandlers;