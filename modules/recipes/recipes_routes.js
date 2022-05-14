const express = require('express');
const recipes_routes = express.Router(); // miniMain isolated route
const route = "/recipes";

recipes_routes.get(route, (req, res) => {
  res.status(200)
  .send("GET recipes");
});

recipes_routes.delete(route, (req, res) => {
  res.status(200)
  .send("DELETE recipes");
});

module.exports = {recipes_routes};
