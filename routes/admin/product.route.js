const express = require("express");
const route = express.Router();
const controller = require("../../controllers/admin/product.controller");

route.get("/", controller.index);
route.patch("/change-status/:status/:id", controller.changStatus);
route.patch("/change-multi", controller.changMulti);
route.delete("/delete/:id", controller.deleteItem);
module.exports = route;
