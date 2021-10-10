const express = require("express");
const ResponseModel = require("../../models/response.model");
const router = express.Router();


router.get('/', (req, res) => {
  res.json(new ResponseModel('comments'))
})



module.exports = router;
