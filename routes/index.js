const publicRoutes = require("./publicRoutes");
const adminRoutes = require("./adminRoutes");
const adminUserRouter = require("./adminUserRouter");
const loginRequired = require("../middlewares/loginRequired");
const addIsAuthenticated = require("../middlewares/addIsAuthenticated");
const roleRequired = require("../middlewares/roleRequired");
const addCanToViews = require("../middlewares/addCanToViews");
const apiRouter = require("./api.route");
const loginController = require("../controllers/api/login-api.controller");
const loginApiRequired = require('../middlewares/login-api-required');

module.exports = (app) => {
  app.use(addIsAuthenticated, addCanToViews);
  app.use("/admin/user", loginRequired, roleRequired(['admin']), adminUserRouter)
  app.use("/admin", loginRequired, roleRequired(['write', 'edit', 'admin']), adminRoutes);

  app.post("/api/login", loginController.login);
  app.use('/api', loginApiRequired, apiRouter);

  app.use(publicRoutes);
};
