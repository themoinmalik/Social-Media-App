const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  desc: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  userImg: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const PostModel = new mongoose.model("PostModel", postSchema);
module.exports = PostModel;
