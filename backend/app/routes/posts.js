const express = require("express");

const postController = require("../controllers/posts");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/post-file");

const router = express.Router();

router.post("", checkAuth, extractFile, postController.createPost);

router.put("/:id", checkAuth, extractFile, postController.updatePost);

router.get("", checkAuth, postController.getPosts);

router.get("/:id", checkAuth, postController.getPost);

router.delete("/:id", checkAuth, postController.deletePost);

module.exports = router;
