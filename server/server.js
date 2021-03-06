"use strict";

const ENV = require("./env/config");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const db = require("./db");

const socket = require("./socket");
const load_app_routes = require("./network/load_app_routes");
const compression = require("compression");
const path = require("path");

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
// Use express.static to serve the public folder
app.use(express.static(ENV.PUBLIC_DIR));

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.connectDataBase(ENV.DB_URL)
.then(() => {
  return socket.connect(server);
})
.then(() => {
  return load_app_routes(app);
})
.then(() => {
  server.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT} ๐๐`);
    console.log("Happy coding ๐ ๐ !!");
  });
});

// Error handling
process.on("uncaughtException", (errors) => {
  console.error("[uncaughtException] ๐คฏ ๐คฏ");
  console.error(errors);
  process.exit(1);
});

process.on("unhandledRejection", (errors) => {
  console.error("[unhandledRejection] ๐คจ ๐คจ");
  console.error(errors);
  process.exit(1);
});
