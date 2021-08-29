const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});
  
server.listen(3000, "192.168.0.7", () => {
    console.log('listening on *:3000');
});

io.on("connection", (socket) => {
    socket.on("clickEvent", (arg) => {
      console.log(arg);
      io.emit("moveEvent", arg);
    })
    socket.on("arrivedEvent", (arg) => {
        console.log(arg);
      })
});