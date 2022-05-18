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
      reject(error)
    }
  });
}

module.exports = {
  addMessage,
  listMessages
};
