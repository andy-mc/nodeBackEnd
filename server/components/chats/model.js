"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const chatSchema = new Schema({
  users: [{type: ObjectId, ref: "users"}],
});

const chatModel = mongoose.model("chats", chatSchema);

module.exports = chatModel;
