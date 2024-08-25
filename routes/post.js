const mongoose = require("mongoose");

// Post Schema
const postSchema = new mongoose.Schema(
  {
    postText: {
      type: String, // Text description or caption for the post
      require: true,
    },
    users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the post date to the current date/time
    },
    likes: {
      type: Array,
      default: 0, // Default to 0 likes when the post is created
    },
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  }
);

// Create the Post model
module.exports = mongoose.model("Post", postSchema);
