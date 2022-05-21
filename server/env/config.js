"use strict";

const path = require("path");
const environment = process.env.NODE_ENV || "development";
const env_file = path.resolve(__dirname, `.${environment}.env`);
require("dotenv").config({ path: env_file });

const env_config = {
  NODE_ENV : process.env.NODE_ENV,
  PORT : process.env.PORT,
  DB_URL : process.env.DB_URL,
};

check_healthy_env_config(env_config);

module.exports = env_config;

function check_healthy_env_config(env_config) {
  const all_envs_filled = Object.values(env_config)
  .every((config) => config);

  if (!all_envs_filled) {
    throw_envs_error(env_config);
  }
}

function throw_envs_error(env_config) { 
  let missing_envs = "";
  for (let [key, value] of Object.entries(env_config)) {
    if (!value) {
      missing_envs += `${key} `;
    }
  }
  throw new Error(`Missing environment variables: ${missing_envs}`);
}
