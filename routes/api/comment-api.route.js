const express = require("express");
const router = express.Router();
const {
  create,
  update,
  remove,
  getOne,
  getAll,
} = require("../../controllers/api/comment-api.controller");

router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);
router.get("/:id", getOne);
router.get("/", getAll);


module.exports = router;
