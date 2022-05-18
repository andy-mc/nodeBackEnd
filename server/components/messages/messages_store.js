"use strict";

const db = require("mongoose");
const Model = require("./messages_model");

db.Promise = global.Promise;
// TODO: try to connect to mongodb on cloud
// mover a server
// try to create local an stagging environment
// connect on server.js and with dinamic enviroments
db.connect("mongodb://localhost:27017/telegrom", {
  useNewUrlParser: true,
});
console.log("[db]: La base de datos conectada exitosamente");

const list = [];
// fix eslint
async function addMessage(message) {
  // const db_potential_message = await Model.create(message);
  const db_potential_message = Model.insert(message);
  const save_message = await db_potential_message.save();

  return save_message;
}

async function getMessages() {
  const messages = await Model.find();
  return messages
}

module.exports = {
  add: addMessage,
  list: getMessages,
  // get get an specific message
  // update an especific message
  // delete an especific message
};
