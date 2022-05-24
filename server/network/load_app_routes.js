"use strict";

function load_app_routes(app) {
  app.use("/users", require("../components/users/users_routes"));
  app.use("/messages", require("../components/messages/messages_routes"));
  app.use("/chats", require("../components/chats/routes"));
  // All not found routes use not_found_handler
  app.use(require("./not_found_handler"));
}

module.exports = load_app_routes;