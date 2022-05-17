"use strict";

const express = require("express");
const load_routes = require("./network/load_routes");
const compression = require("compression");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

// optimization
app.use(compression());

// Serve client static files
const options = {
  fallthrough: true, 
  setHeaders: (res) => {
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
load_routes(app);

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
