"use strict";

const store = require("./messages_store");

function addMessage(user, message) {
  return new Promise((resolve, reject) => {
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

    const new_message = store.add(_message);
    resolve(new_message);
  });
}

function listMessages() {
  return new Promise((resolve, reject) => {
    const messages = store.list();
    resolve(messages);
  });
}

module.exports = {
  addMessage,
  listMessages
};
