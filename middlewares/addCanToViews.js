const can = require("../helpers/canDo");

module.exports = (req, res, next) => {
  res.locals.can = (operations) => can(req.user.role, operations);
  next();
};
