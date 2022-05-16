"use strict";

const express = require("express");
const route_404 = express.Router();
const response = require("../../network/response");
const sub_route = "/";

route_404.get(sub_route, (req, res) => {
  response.error(req, res, "<h3>404 page not found on Server :D !!</h3>", 404);
});

module.exports = {route_404};
