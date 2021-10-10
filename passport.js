const bcrypt = require("bcryptjs");
const { User, Roles } = require("./models");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

module.exports = (app) => {
  app.use(
    session({
      secret: "AlgúnTextoSuperSecreto",
      resave: false, // Docs: "The default value is true, but using the default has been deprecated".
      saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async function (username, password, done) {
        const user = await User.findOne({
          where: { email: username },
          include: [Roles],
        });
        if (!user) {
          return done(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
    done(null, user); // ponemos al user en el req.user
  });
};
