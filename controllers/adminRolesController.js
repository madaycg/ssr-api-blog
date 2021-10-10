const { User, Article, Comment, Roles } = require("../models");
const bcrypt = require("bcryptjs");

async function showUserAdmin(req, res) {
  try {
    const users = await User.findAll({
      order: [["createdAt", "DESC"]],
      include: [Roles],
    });
    res.render("adminUser", { users, userid: req.user.id });
  } catch (e) {
    res.render("error", { error: e });
  }
}

async function showUserEdit(req, res) {
  // muestra a través de un get el contenido del articulo en el formulario a editar
  try {
    const user = await User.findByPk(+req.params.id, {
      include: [Roles],
    });
    if (!user) throw new Error("No existe el Usuario");
    const roles = await Roles.findAll();

    res.render("edit-user", { user, roles });
  } catch (e) {
    res.render("error", { error: e });
  }
}

async function editUser(req, res) {
  /// hace un post realiza la actualizacion del contenido
  //  y lo guarda en la base de datos
  try {
    const { email, nombre, apellido, rol } = req.body;

    await User.update(
      {
        email: email,
        firstname: nombre,
        lastname: apellido,
        roleId: rol,
      },
      { where: { id: +req.params.id } }
    );
    res.redirect("/admin/user");
  } catch (e) {
    res.render("error", { error: e });
  }
}

async function showCreateUser(req, res) {
  const roles = await Roles.findAll();
  res.render("create_user", { roles });
}

async function createUser(req, res) {
  try {
    const { email, nombre, apellido, rol, password } = req.body;
    await User.create({
      email,
      firstname: nombre,
      lastname: apellido,
      roleId: rol,
      password: bcrypt.hashSync(password, 10)
    });
    res.redirect("/admin/user");
  } catch (error) {
    res.render("error", { error });
  }
}

async function destroyUser(req, res) {
  try {
    await User.destroy({
      where: {
        id: +req.params.id,
      },
    });
    res.redirect("/admin/user");
  } catch (e) {
    res.render("error", { error: e });
  }
}
module.exports = {
  showUserAdmin,
  showUserEdit,
  editUser,
  showCreateUser,
  createUser,
  destroyUser,
};
