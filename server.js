"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const path = require("path");

const {home_routes} = require("./modules/home/home_routes.js");
const {recipes_routes} = require("./modules/recipes/recipes_routes.js");

const PORT = process.env.PORT || 3000;
const app = express(); // Main app routes

app.use(favicon(path.join(__dirname, "public", "pikachu.ico")));

// parse 'content-type': 'application/json'
app.use(bodyParser.json());
// parse 'content-type': 'application/x-www-form-urlencoded'
app.use(bodyParser.urlencoded());

app.get("/", (req, res) => {
  res.status(200)
  .send("Root");
});

app.all("/message", (req, res) => {
  const body = req.body;

  res.status(200)
  .send(`
  <h1>All methods message route</h1>
  <h3>Request query string: ${JSON.stringify(req.query)}</h3>
  <h3>Request body: ${body && body.text}</h3>
  `);
});

app.use("/home", home_routes); // /home
app.use("/recipes", recipes_routes); // /recipes
app.all("*", (req, res) => {
  res.status(404)
  .send("<h1>404 page not found on Server !!</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("uncaughtException", (errors) => {
  console.error("uncaughtException");
  console.error(errors);
  process.exit(1);
});

process.on("unhandledRejection", (errors) => {
  console.error("unhandledRejection");
  console.error(errors);
  process.exit(1);
});
