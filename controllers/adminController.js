const { Article } = require("../models");
const bcrypt = require("bcryptjs");
const passport = require("passport");

async function showAdmin(req, res) {
  // muestro el listado de articulos
  try {
    const articles = await Article.findAll({
      order: [["createdAt", "DESC"]],
    }); // para ordenar los articulos de manera descendente
    res.render("admin", { articles, userid: req.user.id });
  } catch (e) {
    res.render("error", { error: e });
  }
}
//// editar

async function editAdmin(req, res) {
  // muestra a través de un get el contenido del articulo en el formulario a editar
  try {
    const article = await Article.findByPk(+req.params.id); // convierte el string a numero
    if (!article) throw new Error("No existe el articulo");
    if (req.user.role.name === "Writer" && article.userId !== req.user.id) {
      res.render('error', {error: 'No puede acceder a este artículo'})
    }
    res.render("edit-create", { article, isCreate: false });
  } catch (e) {
    res.render("error", { error: e });
  }
}

async function update(req, res) {
  /// hace un post realiza la actualizacion del contenido
  //  y lo guarda en la base de datos
  try {
    const article = await Article.findByPk(+req.params.id);
    if (req.user.role.name === "Writer" && article.userId !== req.user.id) {
      return res.render("error", { error: "No tienes permiso para editar este artículo" });
    }

    const { titulo, contenido } = req.body;
    if (contenido.length >= 300) {
      await Article.update(
        {
          title: titulo,
          content: contenido,
        },
        { where: { id: +req.params.id } }
      );
      res.redirect("/admin");
    } else {
      res.render("error", {
        error: "El contenido debe contener al menos 300 caracteres",
      });
    }
  } catch (e) {
    res.render("error", { error: e });
  }
}

//// crear
// muestra el formulario
function showCreate(req, res) {
  res.render("edit-create", { article: {}, isCreate: true });
  // trae en objeto vacio para que en el formulario no se muestren los datos
}

// guarda los datos que llegan a traves del formulario en la base de datos
async function create(req, res) {
  try {
    if (req.body.contenido.length >= 300) {
      const { titulo, contenido, autor } = req.body;
      await Article.create({
        title: titulo,
        content: contenido,
        author: autor,
        userId: req.user.id,
      });
      res.redirect("/admin");
    } else {
      res.render("error", {
        error: "El contenido debe contener al menos 300 caracteres", ///
      });
    }
  } catch (error) {
    res.render("error", { error });
  }
}
///// eliminar
async function destroy(req, res) {
  try {
    const article = await Article.findByPk(+req.params.id); // convierte el string a numero
    if (article == undefined) throw new Error("No existe el articulo");
    if (req.user.role.name === "Writer" && article.userId !== req.user.id) {
      res.render('error', {error: 'No puede acceder a este artículo'})
    }
    if (article.userId != req.user.id) {
      res.redirect("/admin");
    } else {
      await Article.destroy({
        where: {
          id: +req.params.id,
        },
      });
      res.redirect("/admin");
    }
  } catch (e) {
    res.render("error", { error: e });
  }
}

module.exports = {
  showAdmin,
  editAdmin,
  update,
  create,
  destroy,
  showCreate,
};
