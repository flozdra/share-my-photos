import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  socket.on('create', function ({ room, user }) {
    socket.join(room)
    socket.in(room).emit('connectToRoom', user.fullName + ' has joined the room')
    socket.on('imageChangeServer', function (photo) {
      socket.in(room).emit('imageChangeClient', photo)
    })
    socket.on('refresh', function () {
      socket.in(room).emit('refresh')
    })
  })
})
