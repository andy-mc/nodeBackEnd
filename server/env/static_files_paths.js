"use strict";

const path = require("path");

function get_static_files_paths(environment) {
  const files_paths = {
    "development": {
      public_dir: path.join(__dirname, "../public/")
    },
    "staging": {
      public_dir: "cloud_bucket/public_directory/"
    }
  };

  return files_paths[environment];
}

module.exports = get_static_files_paths;
