"use strict";

const express = require("express");
const recipes_routes = express.Router(); // miniMain isolated route
const sub_route = "/";

recipes_routes.get(sub_route, (req, res) => {
  res.status(200)
  .send("GET recipes");
});

recipes_routes.delete(sub_route, (req, res) => {
  res.status(200)
  .send("DELETE recipes");
});

module.exports = {recipes_routes};
