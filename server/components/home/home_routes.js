"use strict";

const express = require("express");
const home_routes = express.Router();
const response = require("../../network/response");
const sub_route = "/home";

const home_middleware = ((req, res, next) => {
  console.log("Home route middleware");
  next();
});

home_routes.get(sub_route, home_middleware, (req, res) => {
  response.success(req, res, "GET Home", 200);
});

home_routes.post(sub_route, (req, res) => {
  response.success(req, res, "POST Home", 200);
});

// I have fear that exporting directly and
// not as an object make testing difficult or impossible
// module.exports = {home_routes};
module.exports = home_routes;
