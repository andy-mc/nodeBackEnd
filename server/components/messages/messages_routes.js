"use strict";

const express = require("express");
const messages_routes = express.Router();
const controller = require("./messages_controller");
const response = require("../../network/response");
const sub_route = "/messages";

// fix eslint
messages_routes.all(sub_route, async (req, res) => {
  const body = req.body;

  try {
    const message = await controller.addMessage(body.user, body.message);
    response.success(req, res, message, 201)
  } catch (error) {
    response.error(req, res, error.message, 400, error.stack);
  }
});

module.exports = messages_routes;
