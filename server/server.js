"use strict";

const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

// Serve client static files
app.use("/", express.static(path.join(__dirname, "../client/build")));

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/home", require("./modules/home/home_routes"));
app.use("/recipes", require("./modules/recipes/recipes_routes"));
app.use("/messages", require("./modules/messages/messages_routes"));
// All not found routes use not_found_route
app.use("*", require("./network/not_found_route"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Error handling
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
