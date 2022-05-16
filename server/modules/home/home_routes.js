"use strict";

const express = require("express");
const home_routes = express.Router(); // miniMain isolated route
const response = require("../../network/response");
const sub_route = "";

home_routes.use((req, res, next) => {
  console.log("Home route middleware");
  next();
});

home_routes.get(sub_route, (req, res) => {
  response.success(req, res, "GET Home", 200);
});

home_routes.post(sub_route, (req, res) => {
  response.success(req, res, "POST Home", 200);
});

module.exports = {home_routes};
