const faker = require("faker");
const { Comment } = require("../models");

faker.locale = "es";

const articleId = 1;

module.exports = async () => {
  const comments = [];

  for (let i = 0; i < 3; i++) {
    comments.push({
      name: faker.lorem.sentence(3),
      content: faker.lorem.paragraphs(2),
      articleId: articleId,
    });
  }

  await Comment.bulkCreate(comments);
  console.log(`[Database] Se corrió el seeder de Comments con articleId: ${articleId}`);
};
