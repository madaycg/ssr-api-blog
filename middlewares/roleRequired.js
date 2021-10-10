const can = require("../helpers/canDo");

function roleRequired(operations) {
  return (req, res, next) => {
    if (req.user && can(req.user.role, operations)) {
      next();
    } else {
      res.render("error", { error: "No puede acceder a esta ruta" });
    }
  };
}


module.exports = roleRequired;