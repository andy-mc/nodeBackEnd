"use strict";

const db = require("mongoose");
// TODO: try to make this store a general store for all components modules
const Model = require("./messages_model");
Model.schemaProps = Object.keys(Model.schema.obj);

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

async function list(query) {
  const all_documents = await Model.find(query);
  return all_documents;
}

async function update(query, udpate) {
  const updated_document = await Model.findOneAndUpdate(query, udpate, {new: true});
  if (!updated_document) throw new Error(`Next query: ${JSON.stringify(query)} not found any document`);
  return updated_document;
}

async function updateText(document_id, text) {
  // tener metodos asi de personalizados esta bien
  // o todos los metodos de un store deberian sopotar y servir 
  // para N modelos
  const updated_document = await Model.findOne({_id: document_id});
  if (!updated_document) throw new Error(`Document Id: ${JSON.stringify(document_id)} not found`);
  
  updated_document.message = text;
  const new_document = updated_document.save();
  return new_document;
}

function getModelProps(filter_type) {
  return Model.schemaProps.filter((prop) => {
    if (filter_type) {
      const propType = Model.schema.paths[prop].instance.toLowerCase();
      const is_filter_type = propType === filter_type.toLowerCase();
      return is_filter_type ? prop : null;
    }
    return prop;
  });
}

module.exports = {
  add,
  list,
  update,
  updateText,
  getModelProps
  // get get an specific message
  // update an especific message
  // delete an especific message
};

