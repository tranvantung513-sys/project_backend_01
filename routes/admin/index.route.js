const dashboardRoute = require("./dashboard.route");

const authMiddleware = require("../../middlewares/admin/auth.middleware");

const productRoute = require("./product.route");
const productCategoryRoutes = require("./product_category.route");
const roleRoutes = require("./role.route");
const accountsRoutes = require("./accounts.route");
const authRoutes = require("./auth.route");

const systemConfig = require("../../config/system");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(
    PATH_ADMIN + "/dashboard",
    authMiddleware.requireAuth,
    dashboardRoute
  );

  app.use(
    PATH_ADMIN + "/dashboard",
    authMiddleware.requireAuth,
    dashboardRoute
  );
  app.use(PATH_ADMIN + "/products", authMiddleware.requireAuth, productRoute);
  app.use(
    PATH_ADMIN + "/product_category",
    authMiddleware.requireAuth,
    productCategoryRoutes
  );
  app.use(PATH_ADMIN + "/roles", authMiddleware.requireAuth, roleRoutes);
  app.use(PATH_ADMIN + "/accounts", authMiddleware.requireAuth, accountsRoutes);
  app.use(PATH_ADMIN + "/auth", authRoutes);
};
