const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const productCategoryRoutes = require("./product_category.route");
const roleRoutes = require("./role.route");
const accountsRoutes = require("./accounts.route");
const authRoutes = require("./auth.route");

const systemConfig = require("../../config/system");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + "/dashboard", dashboardRoute);
  app.use(PATH_ADMIN + "/products", productRoute);
  app.use(PATH_ADMIN + "/product_category", productCategoryRoutes);
  app.use(PATH_ADMIN + "/roles", roleRoutes);
  app.use(PATH_ADMIN + "/accounts", accountsRoutes);
  app.use(PATH_ADMIN + "/auth", authRoutes);
};
