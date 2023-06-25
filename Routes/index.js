const express = require("express");
const router = express.Router();
const postController = require("../Controllers/postController");

router.post("/send-post", postController.sendPost);
router.put("/posts/:id", postController.postUpdate);
router.delete("/posts-delete/:id", postController.postDelete);
router.get("/post", postController.getPost);
router.post("/signup", postController.registerUser);
router.post("/loginUser", postController.loginUser);

module.exports = router;
