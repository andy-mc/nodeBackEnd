"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  name: {type: String, required: true},
});

const model = mongoose.model("Users", UsersSchema);

module.exports = model;
