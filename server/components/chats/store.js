"use strict";

const Model = require("./model");

function add_chat(chat) {
  return Model.create(chat);
}

function list_chat() {
  return Model.find().populate("users");
}

module.exports = {
  add: add_chat,
  list: list_chat,
};