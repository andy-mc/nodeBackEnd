"use strict";

// TODO: try to make this store a general store for all components modules
const {
  get_search_query,
  plugins : {
    Only_Model_Props,
    String_To_Regex
  }
} = require("../../store/utils");

const Model = require("./messages_model");
const only_model_props = Only_Model_Props(Model);
const string_to_regex = String_To_Regex(Model);

async function add(document) {
  const new_document = await Model.create(document);
  return new_document;
}

async function list(query) {
  const plugins = [only_model_props, string_to_regex];
  const search_query = get_search_query(query, plugins);
  if (!search_query) return [];
  
  const all_documents = await Model.find(search_query)
  .populate("user")
  .populate("chat");
  
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

async function remove(document_id) {
  const document_exists = await existDB(document_id);
  if (!document_exists) throw new Error(
    `Document id: ${document_id} not found, cannot delete a document that does not exist 🤣`
  );

  const removed_document = await Model.findOneAndRemove({_id: document_id});
  return removed_document;
}

async function existDB(document_id) {
  const exist = await Model.exists({_id: document_id});
  return exist;
}

module.exports = {
  add,
  list,
  update,
  updateText,
  remove
};
