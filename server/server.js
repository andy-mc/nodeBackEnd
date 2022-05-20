"use strict";

const express = require("express");
const db = require("./db");
const app_router = require("./network/app_router");
const compression = require("compression");
const path = require("path");
require("dotenv").config({ path: ".env" });

console.log(process.env)

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
app_router(app);

const PORT = process.env.PORT || 3000;
const db_url = process.env.DB_URL;

db.connectDataBase(db_url)
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀🚀 😎 !!`);
  });
});

// Error handling
process.on("uncaughtException", (errors) => {
  console.error("[uncaughtException]");
  console.error(errors);
  process.exit(1);
});

process.on("unhandledRejection", (errors) => {
  console.error("[unhandledRejection]");
  console.error(errors);
  process.exit(1);
});
