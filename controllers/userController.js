const { User, Article, Comment } = require("../models");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Display a listing of the resource.
async function indexHome(req, res) {
  try {
    const articles = await Article.findAll({
      order: [["createdAt", "DESC"]],
    }); // para ordenarlos articulos de manera descendente
    res.render("home", { articles });
  } catch (e) {
    res.render("error", { error: e });
  }
}
// Display the specified resource.

async function show(req, res) {
  const id = req.params.id;
  const article = await Article.findByPk(id);
  const ArticleComments = await Comment.findAll({
    where: { articleId: req.params.id },
  });
  res.render("article", { article, ArticleComments, id, user: req.user });
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {
  if (req.user.id) {
    if (
      req.body.comment.length >= 2 &&
      req.body.comment.length <= 300 &&
      req.body.name.length >= 2 &&
      req.body.name.length <= 50
    ) {
      const newComment = await Comment.create({
        content: req.body.comment,
        articleId: req.body.id,
        name: req.body.name,
      });
      res.redirect("/article/" + req.body.id);
    } else {
      res.redirect("/error");
    }
  } else {
    res.redirect("/home");
  }
}

async function showError(req, res) {
  res.render("error");
}

async function showLogin(req, res) {
  res.render("login");
}
async function showRegister(req, res) {
  res.render("register");
}

const logIn = passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login",
});

async function registerUser(req, res) {
  let { email, firstName, lastName, password } = req.body;
  password = await bcrypt.hashSync(password, 10);
  console.log(email, firstName, lastName, password);
  try {
    await User.create({
      email: email,
      firstname: firstName,
      lastname: lastName,
      password: password,
    });
    logIn(req, res);
  } catch (error) {
    res.render("error", { error });
  }
}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

function logout(req, res) {
  req.logout();
  res.redirect("/");
}

module.exports = {
  indexHome,
  show,
  create,
  store,
  showError,
  update,
  destroy,
  showLogin,
  showRegister,
  registerUser,
  logIn,
  logout,
};
