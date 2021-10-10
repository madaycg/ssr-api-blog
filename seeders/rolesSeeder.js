const faker = require("faker");
const { Roles } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const roles = [
    { id: 1, reed: 1, write: 0, edit: 0, admin: 0, name: 'Reader' },
    { id: 2, reed: 1, write: 1, edit: 0, admin: 0, name: 'Writer' },
    { id: 3, reed: 1, write: 1, edit: 1, admin: 0, name: 'Editor' },
    { id: 4, reed: 1, write: 1, edit: 1, admin: 1, name: 'Admin' },
  ];

  await Roles.bulkCreate(roles);
  console.log("[Database] Se corrió el seeder de Roles.");
};
