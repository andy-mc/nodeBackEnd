"use strict";

const ENV = require("./env/config");
const express = require("express");
const db = require("./db");
const app_router = require("./network/app_router");
const compression = require("compression");
const path = require("path");
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
// Use express.static to serve the public folder
app.use(express.static(ENV.PUBLIC_DIR));

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app_router(app);

db.connectDataBase(ENV.DB_URL)
.then(() => {
  app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT} 🚀🚀`);
    console.log("Happy coding 😎 😎 !!");
  });
});

// Error handling
process.on("uncaughtException", (errors) => {
  console.error("[uncaughtException] 🤯 🤯");
  console.error(errors);
  process.exit(1);
});

process.on("unhandledRejection", (errors) => {
  console.error("[unhandledRejection] 🤨 🤨");
  console.error(errors);
  process.exit(1);
});
