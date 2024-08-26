const mongoose = require("mongoose");
mongoose.connect("mongodb://121.0.0.1:27017/pintrest-clone");

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  password: String,
  email: String,
  dp: String,
  contact: Number,
  board : {
    type : Array,
    default: []
  }
})

module.exports = mongoose.model("user",userSchema);