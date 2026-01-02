const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/card.middleware");

const productsRoute = require("./product.route");
const homeRoute = require("./home.route");
const searchRoute = require("./search.route");
const cartRoutes = require("./cart.route");
const checkoutRoutes = require("./checkout.route");
const userRoutes = require("./user.route");

module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use(cartMiddleware.cartId);

  app.use("/", homeRoute);
  app.use("/products", productsRoute);
  app.use("/search", searchRoute);
  app.use("/cart", cartRoutes);
  app.use("/checkout", checkoutRoutes);
  app.use("/user", userRoutes);
};
