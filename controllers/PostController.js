const Post = require("../models/postModel");

module.exports = {
  newPost: async (userObj) => {
    try {
      const newPost = new Post({
        displayName: userObj.displayName,
        message: userObj.message,
        chat: userObj.chat,
        userId: userObj.userId,
      });

      const successSave = await newPost.save();
      console.log(successSave);
      return true;
    } catch (err) {
      console.log("error saving: ", err);
      return false;
    }
  },

  getUserPosts: async (req, res) => {
    console.log("got users");

    try {
      const allPosts = await Post.find();
      res.json(allPosts);
    } catch (err) {
      console.log("ERROR WAS CREATED", err);
      res.send("cannot grab posts", err);
    }
  },
};
