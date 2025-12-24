const categoryMiddleware = require("../../middlewares/client/category.middleware");
const productsRoute = require("./product.route");
const homeRoute = require("./home.route");
module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use("/", homeRoute);
  app.use("/products", productsRoute);
};
