const express = require("express");
const multer = require("multer");
const route = express.Router();
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() });

const controller = require("../../controllers/admin/product.controller");

route.get("/", controller.index);
route.patch("/change-status/:status/:id", controller.changStatus);
route.patch("/change-multi", controller.changMulti);
route.delete("/delete/:id", controller.deleteItem);
route.get("/create", controller.create);

route.post("/create", upload.single("thumbnail"), controller.createPost);

module.exports = route;
