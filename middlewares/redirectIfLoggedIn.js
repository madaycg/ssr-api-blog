function redirectIfLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/admin");
  } else {
    return next();
  }
}

module.exports = redirectIfLoggedIn;
