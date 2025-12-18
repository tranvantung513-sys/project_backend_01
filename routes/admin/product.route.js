const express = require("express");
const multer = require("multer");

const route = express.Router();

const upload = multer();

const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validates");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

route.get("/", controller.index);
route.patch("/change-status/:status/:id", controller.changStatus);
route.patch("/change-multi", controller.changMulti);
route.delete("/delete/:id", controller.deleteItem);
route.get("/create", controller.create);

route.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

route.get("/edit/:id", controller.edit);

route.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

route.get("/detail/:id", controller.detail);

module.exports = route;
