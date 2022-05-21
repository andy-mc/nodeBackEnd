"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  name: {type: String, required: true},
});

const model = mongoose.model("users", UsersSchema);

module.exports = model;
