const router = require("express").Router();
const auth = require("../middleware/auth");
const { newPost, getUserPosts } = require("../controllers/PostController");

router.post("/", auth, newPost);

router.get("/", getUserPosts);

module.exports = router;
