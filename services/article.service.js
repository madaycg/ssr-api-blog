const { Article } = require("../models");
const can = require('../helpers/canDo');

function findAll() {
  return Article.findAll({
    order: [["createdAt", "DESC"]], // para ordenar los articulos de manera descendente
  });
}

async function findByPk(primaryKey, roleName, userId) {
  const article = await Article.findByPk(primaryKey); // convierte el string a numero
  if (!article) throw new Error("No existe el articulo");
  if (roleName === "Writer" && article.userId !== userId) {
    throw new Error("No puede acceder a este artículo");
  }
  return article;
}

async function update(primaryKey, roleName, userId, article) {
  await findByPk(primaryKey, roleName, userId);

  const { titulo, contenido } = article;
  if (contenido.length >= 300) {
    await Article.update(
      {
        title: titulo,
        content: contenido,
      },
      { where: { id: primaryKey } },
    );
    return true;
  } else {
    throw new Error("El contenido debe contener al menos 300 caracteres");
  }
}

async function create(article, userId) {
  const { titulo, contenido, autor } = article;
  if (contenido.length >= 300) {
    await Article.create({
      title: titulo,
      content: contenido,
      author: autor,
      userId,
    });
    return true;
  } else {
    throw new Error("El contenido debe contener al menos 300 caracteres");
  }
}

async function destroy(primaryKey, role, userId) {
  const article = await findByPk(primaryKey, role.name, userId);
  if (article.userId === userId || can(role, ["admin"])) {
    await Article.destroy({
      where: {
        id: primaryKey,
      },
    });
    return true;
  } else {
    throw new Error("Solo puede eliminar artículos de su autoría");
  }
}


module.exports = {
  findAll,
  findByPk,
  update,
  create,
  destroy
};
