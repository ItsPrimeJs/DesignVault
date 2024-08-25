const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/newapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Failed to connect to MongoDB", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  dp: {
    type: String, // URL or file path as a string
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId, // Assuming posts are references to another model
    ref: 'Post' // Reference to the 'Post' model
  }],
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true,
  }
}, {
  timestamps: true // Automatically creates createdAt and updatedAt fields
});

// Create the User model
module.exports = mongoose.model('User', userSchema);
