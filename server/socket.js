"use strict";

const socketIO = require("socket.io");
const socket = {}; // objeto global actualizado por referencia

function connect_socket(server) {
  socket.io = socketIO(server); // guarda el socket en un objecto global
}

module.exports = {
  connect_socket, // funcion de coneccion instanciación de socket io
  socket // objecto socket exportable para uso en otro lugar
};
