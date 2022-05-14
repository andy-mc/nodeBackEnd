"use strict";

const express = require("express");
const home_routes = express.Router(); // miniMain isolated route
const sub_route = "";

home_routes.use((req, res, next) => {
  console.log("Home route middleware");
  next();
});

home_routes.get(sub_route, (req, res) => {
  res.status(200)
  .send("GET Home");
});

home_routes.post(sub_route, (req, res) => {
  res.status(200)
  .send("POST Home");
});

module.exports = {home_routes};
