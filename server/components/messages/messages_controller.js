"use strict";

function addMessage(user, message) {
  return new Promise((resolve, reject) => {
    if (!user || !message) { 
      console.error("[messages_controller.js - addMessage]: user or message is undefined");
      // reject("Los datos son incorrectos"); // revisar diff
      reject(new Error("Los datos son incorrectos"));
      return false;
    }

    const _message = {
      user: user,
      message: message,
      date: new Date()
    };
    
    resolve(_message );
  });
}

module.exports = {
  addMessage
};
