const socketio = require('socket.io');
let ioInstance = null;  // Used to reference the io instance outside of the startWebSocket function


const socketBidNotify = (bid) => {
  ioInstance.emit('bid', bid);
};

function startWebSocket(server) {
  const io = socketio(server, {
    cors: {
      origin: ['https://starfish-app-bhxro.ondigitalocean.app', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002']
      //Allow this client url to access server.
    }
  });
  ioInstance = io;

  // SOCKET LISTENER
  io.on('connection', (socket) => {
    console.log('A new socket has been created.');

    socket.on('login', (userId) => {
      socket.userId = userId;
      console.log(`User # ${socket.userId} has logged in.`);
    });

    socket.on('disconnect', () => {
      discMessage = socket.userId ? `${socket.userId} has left the building` : `Unreg user has left`;
      console.log(discMessage);
    });
  });

  return { socketBidNotify };
};

module.exports = { startWebSocket, socketBidNotify };
