import io from 'socket.io-client';

const socket = io('http://localhost:3001', {
  withCredentials: true,
  autoConnect: false
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export const onNotification = (callback) => {
  socket.on('notification', callback);
};

export const offNotification = (callback) => {
  socket.off('notification', callback);
};

export const emitTaskUpdate = (taskId, updates) => {
  socket.emit('task-update', { taskId, updates });
};

export default socket;