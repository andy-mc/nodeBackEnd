"use strict";

const path = require("path");

function get_static_files_paths(environment) {
  const files_paths = {
    "development": {
      public_files: path.join(__dirname, "../public/files")
    },
    "staging": {
      public_files: "files/"
    }
  };

  return files_paths[environment];
}

module.exports = get_static_files_paths;
