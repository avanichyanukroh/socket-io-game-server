// var createError = require('http-errors');
const express = require('express');
const http = require("http");
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
const { Server } = require('socket.io');
const cors = require('cors');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
      origin: "*"
  }
});

io.on('connection', (socket) => {
    console.log(`user connected: ${socket.id}`);

    socket.on('join_room', (data) => {
      socket.join(data);
      console.log(`user joined room: ${data}`);
    })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data)
    });
});

server.listen(3001, () => {
  console.log('Server running on localhost: 3001');
});

module.exports = app;
