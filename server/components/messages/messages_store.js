"use strict";

const list = []; //mock dataBase

function addMessage(message) {
  list.push(message);
  return message;
}

function getMessages() {
  return list;
}

module.exports = {
  add: addMessage,
  list: getMessages,
  // get get an specific message
  // update an especific message
  // delete an especific message
};
