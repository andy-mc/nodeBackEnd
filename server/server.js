"use strict";

const express = require("express");
const compression = require("compression");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

// optimization
app.use(compression());

// Serve client static files
var options = {
  fallthrough: true, // When this option is true, client errors such as a bad request or a request to a non-existent file will cause this middleware to simply call next() to invoke the next middleware in the stack. When false, these errors (even 404s), will invoke next(err).
  setHeaders: function (res, path, stat) {
    res.set("x-timestamp", Date.now());
  }
};
// Use express.static to serve the client folder
app.use("/", express.static(
  path.join(__dirname, "../client/build"),
  options
));

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(require("./components/home/home_routes"));
app.use(require("./components/recipes/recipes_routes"));
app.use(require("./components/messages/messages_routes"));
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
