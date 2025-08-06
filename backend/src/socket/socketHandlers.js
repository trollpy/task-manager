export const initializeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    // Join user-specific room
    socket.on('join-user', (userId) => {
      socket.join(userId)
      console.log(`User ${userId} joined their room`)
    })

    // Join organization room
    socket.on('join-organization', (orgId) => {
      socket.join(orgId)
      console.log(`Socket joined organization ${orgId}`)
    })

    // Task notification handlers
    socket.on('task-update', (task) => {
      io.to(task.organization.toString()).emit('task-updated', task)
    })

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`)
    })
  })
}