"use strict";

const express = require("express");
const {socket} = require("../../socket");
const messages_routes = express.Router();
const multer = require("multer");
const multer_configs = require("../../utils/multer_configs");
const public_files = multer({storage: multer_configs.public_files});
const controller = require("./messages_controller");
const response = require("../../network/response");
const sub_route = "/";

messages_routes.get(sub_route, async (req, res) => {
  try {
    const messages = await controller.listMessages(req.query);
    response.success(req, res, messages, 200);
  } catch (error) {
    response.error(req, res, "messages not retrieved", 500, error.stack);
  }
});

messages_routes.post(sub_route, public_files.single("file"), async (req, res) => {
  const body = req.body;
  const file = req.file || {};
  
  const _new_message = {
    chat: body.chat,
    user: body.user,
    message: body.message,
    file: file.filename
  };

  try {
    const new_message = await controller.addMessage(_new_message);
    socket.io.emit("messages", new_message);
    response.success(req, res, new_message, 201);
  } catch (error) {
    response.error(req, res, "message not created", 400, error.stack);
  }
});

messages_routes.put(sub_route + ":_id", async (req, res) => {
  const message_id = req.params._id;
  const message = req.body;
  try {
    const updated_message = await controller.updateMessageById(message_id, message);
    response.success(req, res, updated_message, 200);
  } catch (error) {
    response.error(req, res, "message not updated", 400, error.stack);
  }
});

messages_routes.patch(sub_route + ":_id", async (req, res) => {
  const message_id = req.params._id;
  const message = req.body.message;
  try {
    const updated_message = await controller.updateMessageText(message_id, message);
    response.success(req, res, updated_message, 200);
  } catch (error) {
    // este response.error es genial porque tiene el efecto de generar un
    // mensaje standard de error el mismo formato de error siempre
    response.error(req, res, "text message not updated", 500, error.stack);
  }
});

messages_routes.delete(sub_route + ":_id", async (req, res) => {
  const message_id = req.params._id;
  try {
    const removed_message = await controller.removeMessage(message_id);
    response.success(req, res, removed_message, 200);
  } catch (error) {
    response.error(req, res, "failure to remove message", 500, error.stack);
  }
});

module.exports = messages_routes;
