const jwt = require("jsonwebtoken");
const ResponseModel = require("../models/response.model");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.token;
    req.user = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    next();
  } catch (error) {
    res.status(400).json(new ResponseModel(null, error));
  }
};
