const jwt = require("jsonwebtoken");
const { authenticate } = require("../../services/login.service");
const ResponseModel = require("../../models/response.model");


async function login(req, res) {
  try {
    const { email: userEmail, password } = req.body;

    const result = await authenticate(userEmail, password);

    if (!result) throw new Error("Invalid login");

    const { id, email, firstName, lastName, role } = result;
    const token = jwt.sign({ id, email, firstName, lastName, role }, process.env.TOKEN_SECRET_KEY);
    res.json(new ResponseModel(token));
  } catch (error) {
    res.status(400).json(new ResponseModel(null, error.message));
  }
}


module.exports = {
  login,
}
