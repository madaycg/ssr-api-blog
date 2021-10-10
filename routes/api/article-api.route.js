const express = require("express");
const ResponseModel = require("../../models/response.model");
const adminController = require("../controllers/adminController");
const router = express.Router();


router.get("/create", adminController.showCreate);
router.post("/create", adminController.create);
router.get("/delete/:id", adminController.destroy);
router.get("/:id", adminController.editAdmin);
router.post("/:id", adminController.update);
router.get("/", adminController.showAdmin);



module.exports = router;
