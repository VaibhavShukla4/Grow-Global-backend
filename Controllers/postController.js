const PostModel = require("../models/post");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//send post
exports.sendPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new PostModel({
      title,
      content,
    });
    await post.save();
    res.status(200).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating post" });
  }
};

//post update
exports.postUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    console.log(req.body);
    // const response = new PostModel({
    //   title,
    //   content,
    // });
    await PostModel.findByIdAndUpdate(id, { title, content });
    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

// Get all post
exports.getPost = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json({ posts });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the post" });
  }
};

// Get delete post
exports.postDelete = async (req, res) => {
  try {
    const { id } = req.params;

    await PostModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the post" });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "email already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const user = new User({
      email,
      password: hashedPassword,
    });
    // Save the user to the database
    await user.save();
    // console.log(result);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create and sign the JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key");

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
