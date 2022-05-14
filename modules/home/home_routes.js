const express = require('express');
const home_routes = express.Router(); // miniMain isolated route
const route = "/home";

home_routes.get(route, (req, res) => {
  res.status(200)
  .send("GET Home");
});

home_routes.post(route, (req, res) => {
  res.status(200)
  .send("POST Home");
});

module.exports = {home_routes}
