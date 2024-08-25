var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* Create a new user */
router.get("/createuser", async function (req, res, next) {
  let createdUser = await userModel.create({
    username: "Sujal",
    password: "Sujal123",
    posts: [],
    email: "Sujal@gmail.com", // Corrected email format
    fullname: "Sujal Shailesh Shelar",
  });

  res.send(createdUser);
});

router.get("/createpost", async function (req, res, next) {
  let createdPost =  await  postModel.create({
    postText: "HEllo everyone"
  });
  res.send(createdPost);
});
module.exports = router;
