const faker = require("faker");
const { Article } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const articles = [];

  for (let i = 0; i < 10; i++) {
    articles.push({
      title: faker.lorem.sentence(5),
      content: faker.lorem.paragraphs(),
      author: faker.lorem.sentence(3),
      imagen: faker.image.image(),
      userId: 1,
      });
  }

  await Article.bulkCreate(articles);
  console.log("[Database] Se corrió el seeder de Articles.");
};
