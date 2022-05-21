"use strict";

function app_router(app) {
  app.use("/users", require("../components/users/users_routes"));
  app.use("/messages", require("../components/messages/messages_routes"));
  // All not found routes use not_found_handler
  app.use(require("./not_found_handler"));
}

module.exports = app_router;