"use strict";

const router = require("express").Router();
const controller = require("./users_controller");
const response = require("../../network/response");
const sub_route = "/";

router.get(sub_route, async (req, res) => {
  try {
    const users = await controller.list_users();
    response.success(req, res, users, 200);
  } catch (error) { 
    response.error(req, res, "Unexpected Error", 500, error.stack);
  }
});

router.post(sub_route, async (req, res) => {
  try {
    const user = req.body;
    const new_user = await controller.add_users(user);
    response.success(req, res, new_user, 201);
  } catch (error) {
    response.error(req, res, "Internal error", 500, error.stack);
  }
});

module.exports = router;
