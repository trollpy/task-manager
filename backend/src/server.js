const http = require('http');
const socketIo = require('socket.io');
const app = require('./app'); // relative path to your app.js in src/
const database = require('./utils/database');
const SocketHandlers = require('./socket/socketHandlers');
const logger = require('./utils/logger');

class Server {
  constructor() {
    this.app = app;
    this.port = process.env.PORT || 5000;
    this.server = http.createServer(this.app);
    this.setupSocket();
  }

  setupSocket() {
    this.io = socketIo(this.server, {
      cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
      },
      pingTimeout: 60000,
      pingInterval: 25000,
    });

    this.socketHandlers = new SocketHandlers(this.io);

    this.io.use((socket, next) => {
      this.socketHandlers.authenticateSocket(socket, next);
    });

    this.io.on('connection', (socket) => {
      this.socketHandlers.handleConnection(socket);
    });

    global.io = this.io;
    global.socketHandlers = this.socketHandlers;
  }

  async start() {
    try {
      await database.connect();

      this.server.listen(this.port, () => {
        logger.info(`Server running on port ${this.port}`);
        logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🚀 SmartTasker API Server running on http://localhost:${this.port}`);
      });

      this.setupGracefulShutdown();
    } catch (error) {
      logger.error('Failed to start server:', error);
      process.exit(1);
    }
  }

  setupGracefulShutdown() {
    const shutdown = async (signal) => {
      logger.info(`${signal} received. Starting graceful shutdown...`);

      this.server.close(async () => {
        logger.info('HTTP server closed');

        this.io.close(() => {
          logger.info('Socket.IO server closed');
        });

        await database.disconnect();

        logger.info('Graceful shutdown completed');
        process.exit(0);
      });

      setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 30000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGUSR2', () => shutdown('SIGUSR2'));
  }
}

module.exports = Server;
