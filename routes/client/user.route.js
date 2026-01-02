const express = require("express");
const route = express.Router();
const controller = require("../../controllers/client/user.controller");
const validate = require("../../validates/client/user.validates");
route.get("/register", controller.register);
route.post("/register", validate.registerPost, controller.registerPost);
module.exports = route;
