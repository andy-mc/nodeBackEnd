"use strict";

const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

// Dato curioso si el server se desconecta, o se cae, o lo que sea
// el websocket programado en cliente intenta reconectarse varias veces
io.on('connection', (socket) => {
  // socket returned by callback is the last client connected tunnel
  console.log('SERVER: Nuevo cliente conectado');
  socket.on('disconnect', (socket) => {
    console.log('SERVER: cliente desconectado');
  })
  socket.emit('messages', "Hola desde el servidor 😁😁 !!");
})

let counter = 0;
setInterval(() => {
  // socket returned by callback is the last client connected
  // emiting to that socket only would send a message to the last client connected
  // io.emit would emit a message to all the clients connected
  io.emit('messages',`Emitiendo mensaje desde server ${counter}`);
  counter++
}, 1000)

server.listen(8000, () => {
  console.log("Server listening on port 8000");
})