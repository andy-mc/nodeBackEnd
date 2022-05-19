"use strict";

const store = require("./messages_store");

function addMessage(user, message) {
  return new Promise(async (resolve, reject) => {
    if (!user || !message) { 
      console.error("[messages_controller.js - addMessage]: user or message is undefined");
      reject(new Error("Los datos son incorrectos"));
      return;
    }

    const _message = {
      user: user,
      message: message,
      date: new Date()
    };

    // si esto no estuviera dentro de un try catch y llega a sucederun error
    // ese error crashea la app en rojo de forma no elegante
    try {
      const new_message = await store.add(_message);
      resolve(new_message);
    } catch (error) {
      console.error("[Error addMessage]:", error.stack);
      reject(error);
    }
  });
}

function listMessages() {
  return new Promise(async (resolve, reject) => {
    try {
      const messages = await store.list();
      resolve(messages);
    } catch (error) {
      console.error("[Error listMessages]:", error.stack);
      reject(error);
    }
  });
}

function updateMessageById(message_id, message) {
  return new Promise(async (resolve, reject) => {
    if (!message_id || Object.keys(message).length === 0) { 
      console.error("[updateMessage]: message id or message properties are undefined");
      reject(new Error("Message not updated"));
      return;
    }

    try {
      const query = {_id: message_id};      
      delete message.date;
      const update = {$set: message};
      
      // it is possible a dev would want a store.updateText a granular
      // update just for message store
      // if so it would be a bad idea to have a global store
      // why idukay has an abstract model is that a good idea ?
      const new_message = await store.update(query, update);
      resolve(new_message);
    } catch (error) {
      console.error("[Error updateMessage]:", error.stack);
      reject(error);
    }
  });
}

async function updateMessageText(message_id, message) {
    if (!message_id || !message) { 
      console.error("[updateMessageText]: message id or message text are undefined");
      throw new Error("Message id or message text are undefined");
    }

    try {
      // es buena idea tener un store por modulo
      // o un solo global esta bien
      // individules que puedan heredar del global
      const new_message = await store.updateText(message_id, message);
      return new_message;
    } catch (error) {
      console.error("[Error updateMessageText]:", error.stack);
      throw error;
    }
}

module.exports = {
  addMessage,
  listMessages,
  updateMessageById,
  updateMessageText
};
