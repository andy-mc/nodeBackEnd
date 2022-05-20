"use strict";

const store = require("./messages_store");
const modelProps = store.getModelProps();
const modelStringProps = store.getModelProps("string");

async function addMessage(user, message) {  
  if (!user || !message) { 
    throw new Error("[addMessage]: user or message is undefined");
  }

  const _message = {
    user: user,
    message: message,
    date: new Date()
  };

  const new_message = await store.add(_message);
  return new_message;
}

async function listMessages(query) {  
  const search_query = getSearchQuery(query);
  if (!search_query) return [];
  const messages = await store.list(search_query);
  return messages;
}

async function updateMessageById(message_id, message) {
    if (!message_id || Object.keys(message).length === 0) { 
      throw new Error("[updateMessage]: message id or message properties are undefined");
    }

    const query = {_id: message_id};      
    delete message.date;
    const update = {$set: message};

    // why idukay has an abstract model is that a good idea ?
    // in this case I use update = {$set: message} to update 
    // the the req fields only without $set the rest of the fields
    // are remove from the document, I dont use {$set: message} on the 
    // store because I think is going to take away flexibility
    // but also the store now is open to an accidental field remove
    const new_message = await store.update(query, update);
    return new_message;
}

async function updateMessageText(message_id, message) {
    if (!message_id || !message) { 
      throw new Error("[updateMessageText]: message id or message text are undefined");
    }
    // es buena idea tener un store por modulo
    // o un solo global esta bien
    // individuales que puedan heredar del global
    const new_message = await store.updateText(message_id, message);
    return new_message;
}

async function removeMessage(message_id) {    
  if (!message_id) {
    throw new Error("Message _id is undefined");
  }
  const removed_message = await store.remove(message_id);
  return removed_message;
}

module.exports = {
  addMessage,
  listMessages,
  updateMessageById,
  updateMessageText,
  removeMessage
};

function getSearchQuery(query) {
  for (let [property, value] of Object.entries(query)) {
    if (!modelProps.includes(property)) {
      return false;
    }

    if (modelStringProps.includes(property)) {
      if (typeof value === "string") value = [value];
      query[property] = new RegExp(value.join("|"), "i");
    }
  }
  return query;
}
