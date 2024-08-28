var express = require("express");
var router = express.Router();
const userModel = require("./users");
const passport = require("passport");

passport.use(new localStrategy(userModel.authenticate()));

// Home route
router.get("/", function (req, res, next) {
  res.render("index");
});

// Register route (GET)
router.get("/register", function (req, res, next) {
  res.render("register");
});

router.get("/profile",isLoggedIn, function (req, res, next) {
  res.render("profile");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/profile",
  }),
  function (req, res, next) {}
);

app.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req ,res ,next){
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect("/");
  }

}

// Register route (POST)
router.post("/register", function (req, res, next) {
  const data = new userModel({
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact,
  });

  userModel
    .register(data, req.body.password)
    .then(function (user) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    })
    .catch(function (err) {
      console.error(err);
      res.render("register", { error: err.message });
    });
});

// Export the router
module.exports = router;
