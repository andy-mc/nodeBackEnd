"use strict";

function app_router(app) {
  app.use("/home", require("../components/home/home_routes"));
  app.use("/recipes", require("../components/recipes/recipes_routes"));
  app.use("/messages", require("../components/messages/messages_routes"));
  // All not found routes use not_found_handler
  app.use(require("./not_found_handler"));
}

module.exports = app_router;