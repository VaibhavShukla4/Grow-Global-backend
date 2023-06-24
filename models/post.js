const mongoose = require("mongoose");

// Define the message schema
const postSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
});

// Create the Message model using the message schema
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
