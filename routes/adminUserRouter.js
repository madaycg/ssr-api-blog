const express = require("express");
const adminUserRouter = express.Router();
const {
  showUserAdmin,
  showUserEdit,
  editUser,
  showCreateUser,
  createUser,
  destroyUser,

} = require("../controllers/adminRolesController");

adminUserRouter.get("/delete/:id", destroyUser);
adminUserRouter.get("/edit/:id", showUserEdit);
adminUserRouter.post("/edit/:id", editUser);
adminUserRouter.get("/create", showCreateUser);
adminUserRouter.post("/create", createUser);

adminUserRouter.use("/", showUserAdmin);

module.exports = adminUserRouter;
