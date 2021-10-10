const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/adminController");

adminRouter.get("/create", adminController.showCreate);
adminRouter.post("/create", adminController.create);
adminRouter.get("/delete/:id", adminController.destroy);
adminRouter.get("/:id", adminController.editAdmin);
adminRouter.post("/:id", adminController.update);
adminRouter.get("/", adminController.showAdmin);

module.exports = adminRouter;
