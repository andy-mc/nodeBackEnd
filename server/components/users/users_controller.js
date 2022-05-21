"use strict";

const store = require("./users_store");

async function add_users(user) {
  if (!Object.keys(user).length || !user.name) {
    throw new Error("[add_users]: user incomplete data 🙄");
  }
  const user_to_add = {
    name: user.name
  };
  const new_user = await store.add(user_to_add);
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
