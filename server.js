const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let players = [];

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  players.push(socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    players = players.filter(player => player !== socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});