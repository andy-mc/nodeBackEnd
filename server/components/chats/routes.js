"use strict";

const router = require("express").Router();
const controller = require("./controller");
const response = require("../../network/response");
const sub_route = "/";

router.get(sub_route, async (req, res) => {
  try {
    const chats = await controller.listChats();
    response.success(req, res, chats, 200);
  } catch (error) {
    response.error(req, res, "Error at retriving Chat", 500, error);
  }
});

router.get(sub_route + ":userId", async (req, res) => {
  const query = {
    users: req.params.userId,
  };
  try {
    const chats = await controller.listChats(query);
    response.success(req, res, chats, 200);
  } catch (error) {
    response.error(req, res, "Error at retriving Chat", 500, error);
  }
});

router.post(sub_route, async (req, res) => {
  try {
    const chat = {
      users: req.body.users,
    };
    const new_chat = await controller.addChat(chat);
    response.success(req, res, new_chat, 201);
  } catch (error) {
    response.error(req, res, "Error chat not created", 500, error);
  }
});

module.exports = router;
