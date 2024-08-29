const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://sujal01:DRJcZeTVb5vYHM5D@pintrest-clone.vltwf.mongodb.net/?retryWrites=true&w=majority&appName=Pintrest-clone"
);

const plm = require("passport-local-mongoose");
const { post } = require(".");

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  password: String,
  email: String,
  dp: String,
  contact: Number,
  board: {
    type: Array,
    default: [],
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});
userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);
