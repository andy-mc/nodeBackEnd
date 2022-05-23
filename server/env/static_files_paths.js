"use strict";

const path = require("path");

function get_static_files_paths(environment) {
  const files_paths = {
    "development": {
      public_uploads: path.join(__dirname, "../public/uploads")
    },
    "staging": {
      public_uploads: "uploads/"
    }
  };

  return files_paths[environment];
}

module.exports = get_static_files_paths;
