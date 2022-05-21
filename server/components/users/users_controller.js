"use strict";

const store = require("./users_store");

async function add_users(user) {
  if (!Object.keys(user).length) {
    throw new Error("[add_users]: user undefined 🙄");
  }
  const new_user = await store.add(user);
  return new_user;
}

async function list_users() {
  const users = await store.list();
  return users;
}

module.exports = {
  add_users,
  list_users,
};
