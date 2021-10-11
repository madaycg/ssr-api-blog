const { User, Roles } = require("../models");
const bcrypt = require("bcryptjs");

async function authenticate(email, password) {
  const user = await User.findOne({
    where: { email },
    include: [Roles],
  });
  if (!user) {
    return false;
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return false;
  }
  return user;
}


module.exports = {
  authenticate,
};
