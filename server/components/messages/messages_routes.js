"use strict";

const express = require("express");
const messages_routes = express.Router();
const controller = require("./messages_controller");
const response = require("../../network/response");
const route = "/messages";

// fix eslint
messages_routes.get(route, async (req, res) => {
  const body = req.body;

  try {
    const messages = await controller.listMessages();
    response.success(req, res, messages, 200)
  } catch (error) {
    response.error(req, res, "messages not retrieved", 500, error.stack);
  }
});

messages_routes.post(route, async (req, res) => {
  const body = req.body;

  try {
    const message = await controller.addMessage(body.user, body.message);
    response.success(req, res, message, 201)
  } catch (error) {
    response.error(req, res, "message not created", 400, error.stack);
  }
});

module.exports = messages_routes;
