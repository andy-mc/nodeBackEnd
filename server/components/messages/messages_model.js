"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, {timestamps: true});

const messagesModel = mongoose.model("Messages", messagesSchema);

module.exports = messagesModel;

// en idukay hay muchas mas cosas programadas en esta capa 
// y esta super interesante ver como funciona sobre todo validadores
// y lo que se conocia como el modelo abstracto
