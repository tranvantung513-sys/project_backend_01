const express = require("express");
const multer = require("multer");
const route = express.Router();
const upload = multer();

const controller = require("../../controllers/admin/product_category.controller");
const validate = require("../../validates/admin/product_category.validates");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

route.get("/", controller.index);
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
  controller.editPatch
);

module.exports = route;
