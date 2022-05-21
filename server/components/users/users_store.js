"use strict";

const users_model = require("./users_model");

async function add_users(user) {
  user.name += " 🦁";
  const new_user = await users_model.create(user);
  return new_user;
}

async function list_users() {
  const users = await users_model.find();
  return users;
}

module.exports = {
  add: add_users,
  list: list_users,
};
