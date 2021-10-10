const { Article } = require("../models");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const articleService = require("../services/article.service");

async function showAdmin(req, res) {
  // muestro el listado de articulos
  try {
    const articles = await articleService.findAll();
    res.render("admin", { articles, userid: req.user.id });
  } catch (e) {
    res.render("error", { error: e });
  }
}

//// editar

async function editAdmin(req, res) {
  // muestra a través de un get el contenido del articulo en el formulario a editar
  try {
    const article = await articleService.findByPk(parseInt(req.params.id), req.user.role.name, req.user.id);
    res.render("edit-create", { article, isCreate: false });
  } catch (e) {
    res.render("error", { error: e });
  }
}

async function update(req, res) {
  /// hace un post realiza la actualizacion del contenido
  //  y lo guarda en la base de datos
  try {
    await articleService.update(parseInt(req.params.id), req.user.role.name, req.user.id, req.body);
    res.redirect("/admin");
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
    await articleService.create(req.body, req.user.id);
    res.redirect("/admin");
  } catch (error) {
    res.render("error", { error });
  }
}

///// eliminar
async function destroy(req, res) {
  try {
    await articleService.destroy(parseInt(req.params.id), req.user.role, req.user.id);
    res.redirect("/admin");
  } catch (e) {
    res.render("error", { error: e });
  }
}

/*
leyenda

req.params.id: primaryKey
req.user.role: objeto role
req.user.id: userId
req.body: article
 */
module.exports = {
  showAdmin,
  editAdmin,
  update,
  create,
  destroy,
  showCreate,
};
