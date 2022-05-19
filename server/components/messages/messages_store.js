"use strict";

const db = require("mongoose");
// TODO: try to make this store a general store for all components modules
const Model = require("./messages_model");

// TODO: try to connect to mongodb on cloud
// mover a server
// try to create local an stagging environment
// connect on server.js and with dinamic enviroments
db.Promise = global.Promise;
db.connect("mongodb://localhost:27017/telegrom", {
  useNewUrlParser: true,
});
console.log("[db]: La base de datos conectada exitosamente");

// fix eslint
async function add(document) {
  const new_document = await Model.create(document);
  return new_document;
}

async function list() {
  const all_documents = await Model.find();
  return all_documents;
}

async function update(query, udpate) {
  const updated_document = await Model.findOneAndUpdate(query, udpate, {new: true});
  if (!updated_document) throw new Error(`Next query: ${JSON.stringify(query)} not found any document`);
  return updated_document;
}

module.exports = {
  add,
  list,
  update,
  // get get an specific message
  // update an especific message
  // delete an especific message
};
