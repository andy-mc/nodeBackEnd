"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const messagesSchema = new Schema({
  chat: {type: ObjectId, ref: "chats", required: true},
  user: {type: ObjectId, ref: "users", required: true},
  message: { type: String, required: true },
  file: { type: String},
  date: { type: Date, default: Date.now } // Date.now returns z or tz 0 timezone
}, {timestamps: true});

const messagesModel = mongoose.model("messages", messagesSchema);

module.exports = messagesModel;

// en idukay hay muchas mas cosas programadas en esta capa 
// y esta super interesante ver como funciona sobre todo validadores
// y lo que se conocia como el modelo abstracto
