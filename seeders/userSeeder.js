const faker = require("faker");
const { User } = require("../models");
const bcrypt = require("bcryptjs"); 

faker.locale = "es";

module.exports = async () => {
  const user = [
    {
      email: 'hola@gmail.com',
      firstname: faker.name.findName(),
      lastname: faker.name.lastName(),
      password: await bcrypt.hashSync('1234', 10),
      roleId: 4,
    }
  ];


  await User.bulkCreate(user);
  console.log(
    `[Database] Se corrió el seeder de User`
  );
};
