"use strict";

const store = require("./store");

async function addChat(chat) {
  if (!valid_chat_users(chat.users)) {
    throw new Error("Chat must be an array and have at least one user");
  }
  return store.add(chat);
}

function listChats(query={}) {
  if (!Object.keys(query).length === 0 && !query.users) {
    throw new Error(`Chat query: ${query} incorrect`);
  }
  return store.list(query);
}

module.exports = {
  addChat,
  listChats,
};

function valid_chat_users(users) {
  return Array.isArray(users) && users.length;
}
