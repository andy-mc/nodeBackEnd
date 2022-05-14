const express = require('express');
const home_routes = express.Router(); // miniMain isolated route
const route = "/home";

home_routes.use((req, res, next) => {
  // this middleware will affect home_routes and recipes_routes
  // beacuse is the next route is affecting all routes
  // I wonder if its is possible to isolate home_routes and recipes_routes
  // in a way this middleware will affect only home_routes
  console.log("Home route middleware");
  next();
})

home_routes.get(route, (req, res) => {
  res.status(200)
  .send("GET Home");
});

home_routes.post(route, (req, res) => {
  res.status(200)
  .send("POST Home");
});

module.exports = {home_routes}
