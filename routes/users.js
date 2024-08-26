const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sujal01:DRJcZeTVb5vYHM5D@pintrest-clone.vltwf.mongodb.net/?retryWrites=true&w=majority&appName=Pintrest-clone");

const plm = require("passport-local-mongoose");


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
userSchema.plugin(plm);
module.exports = mongoose.model("user",userSchema);