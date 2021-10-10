const express = require("express");
const publicRouter = express.Router();
const userController = require("../controllers/userController");
const redirectIfLoggedIn = require("../middlewares/redirectIfLoggedIn");

// Rutas del Públicas:

publicRouter.get("/home", userController.indexHome);
publicRouter.get("/", function (req, res) {
  res.redirect("home");
});
publicRouter.get("/article/:id", userController.show);

publicRouter.get("/error", userController.showError);

publicRouter.post("/article", userController.store);

publicRouter.get("/login", redirectIfLoggedIn, userController.showLogin);
publicRouter.post("/login", userController.logIn);
publicRouter.get("/register", userController.showRegister);
publicRouter.post("/register", userController.registerUser);
publicRouter.get("/logout", userController.logout);
// ...

module.exports = publicRouter;
