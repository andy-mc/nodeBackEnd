"use strict";

const express = require("express");
const not_found_route = express.Router();
const response = require("./response");
const sub_route = "/";

not_found_route.get(sub_route, (req, res) => {
  // this makes express respnose an html page
  // I'm wondering if this is the best way to do this
  // how I can make this using react to handle missing routes
  // maybe here I just have to response an error status 4XX
  // and when the client recieves the error it can handle it
  // and show the user a 404 screen
  response.html(req, res, "<h3>404 page not found on Server :D !!</h3>");
});

module.exports = not_found_route;
