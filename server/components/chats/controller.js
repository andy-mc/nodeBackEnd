"use strict";

const store = require("./store");

async function addChat(chat) {
  if (!Array.isArray(chat.users) || !chat.users.length) {
    throw new Error("Chat must be an array and have at least one user");
  }
  const new_chat = {
    users: chat.users,
  };
  return store.add(new_chat);
}

function listChats(query={}) {
  return store.list(query);
}

module.exports = {
  addChat,
  listChats,
};
