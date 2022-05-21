"use strict";

const db = require("mongoose");
db.Promise = global.Promise;

const db_options = {
  useNewUrlParser: true,
};

async function connectDataBase(db_url) {
  await db.connect(db_url, db_options);
  console.log("DataBase successfully connected 🗄️ 🗄️");
}

module.exports = {
  db,
  connectDataBase,
};
// TODO: try to connect to mongodb on cloud