"use strict";

const {
  get_search_query,
  plugins: {Only_Model_Props}
} = require("../../store/utils");

const Model = require("./model");
const only_model_props = Only_Model_Props(Model);

function add_chat(chat) {
  return Model.create(chat);
}

function list_chat(query) {
  const plugins = [only_model_props];
  const search_query = get_search_query(query, plugins);
  if (!search_query) return [];

  const model_query = {};
  if (search_query.users) {
    model_query.users = search_query.users;
  }

  return Model.find(model_query).populate("users");
}

module.exports = {
  add: add_chat,
  list: list_chat,
};