var express = require("express");
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("./users");
const postModel = require("./post");
const upload = require("./multer");
const users = require("./users");

// Passport Configuration
passport.use(new LocalStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

// Home route
router.get("/", function (req, res, next) {
  res.render("index" ,{nav :false});
});

// Register route (GET)
router.get("/register", function (req, res, next) {
  res.render("register",{nav :false});
});

router.get("/add", function (req, res, next) {
  res.render("add",{nav :true});
});

// Profile route (protected)
router.get("/profile", isLoggedIn, async function (req, res, next) {
  const user = 
  await userModel
      .findOne({username : req.session.passport.user})
      .populate("posts");
      console.log("user");
      
      
      res.render("profile" , {user ,nav :true});
});


router.post("/fileupload", isLoggedIn, upload.single("image"), async function (req, res, next) {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  } else{
  const user = await userModel.findOne({username : req.session.passport.user});
  user.dp = req.file.filename;
  await user.save();
  res.redirect("/profile");
  }
});


router.post("/createpost", isLoggedIn, upload.single("postimage"), async function (req, res, next) {
  try {
    // Check if the file is provided and its type
    if (!req.file || !['image/jpeg', 'image/png'].includes(req.file.mimetype)) {
      return res.status(400).send("Invalid file type. Only JPEG and PNG are allowed.");
    }

    // Find the user
    const user = await userModel.findOne({ username: req.session.passport.user });
    
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Create the post
    const post = await postModel.create({
      user: user._id,
      title: req.body.title,
      description: req.body.description,
      image: req.file.filename,
    });

    // Add the post to the user's list
    user.posts.push(post._id);
    await user.save();

    // Redirect to profile with a success message (optional)
    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the post.");
  }
});




// Login route (POST)
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/profile",
  })
);

// Logout route (POST)
router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
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





// var express = require("express");
// var router = express.Router();
// const userModel = require("./users");
// const passport = require("passport");

// passport.use(new localStrategy(userModel.authenticate()));

// // Home route
// router.get("/", function (req, res, next) {
//   res.render("index");
// });

// // Register route (GET)
// router.get("/register", function (req, res, next) {
//   res.render("register");
// });

// router.get("/profile",isLoggedIn, function (req, res, next) {
//   res.render("profile");
// });

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/",
//     successRedirect: "/profile",
//   }),
//   function (req, res, next) {}
// );

// app.post("/logout", function (req, res, next) {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/");
//   });
// });

// function isLoggedIn(req ,res ,next){
//   if(req.isAuthenticated()){
//     return next();
//   }else{
//     res.redirect("/");
//   }

// }

// // Register route (POST)
// router.post("/register", function (req, res, next) {
//   const data = new userModel({
//     username: req.body.username,
//     email: req.body.email,
//     contact: req.body.contact,
//   });

//   userModel
//     .register(data, req.body.password)
//     .then(function (user) {
//       passport.authenticate("local")(req, res, function () {
//         res.redirect("/profile");
//       });
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.render("register", { error: err.message });
//     });
// });

// // Export the router
// module.exports = router;
