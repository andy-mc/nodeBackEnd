"use strict";

const express = require("express");
const favicon = require("serve-favicon");
const response = require("./network/response");
const path = require("path");

const {home_routes} = require("./modules/home/home_routes.js");
const {recipes_routes} = require("./modules/recipes/recipes_routes.js");
const {messages_routes} = require("./modules/messages/messages_routes.js");
const {route_404} = require("./modules/route_404");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(favicon(path.join(__dirname, "public", "pikachu.ico")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  response.success(req, res, "Root", 200);
});

app.use("/home", home_routes);
app.use("/recipes", recipes_routes);
app.use("/messages", messages_routes);
app.use("*", route_404);

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
