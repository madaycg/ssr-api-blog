const express = require("express");
const ResponseModel = require("../models/response.model");
const router = express.Router();
const articleRoute = require("./api/article-api.route");
const commentRoute = require("./api/comment-api.route");


router.use("/articles", articleRoute);
router.use("/comments", commentRoute);


module.exports = router;
