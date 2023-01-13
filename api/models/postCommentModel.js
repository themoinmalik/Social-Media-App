const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author:{
      type:String,
      required:true
    },
    name:{
      type:String,
      required:true
    },
    comment:{
      type:String,
      required:true
    }
})
const postCommentSchema = new mongoose.Schema({
  id:{
    type:String,
    required:true
  },
  comments:[commentSchema]
})

const postCommentModel = new mongoose.model('postCommentModel',postCommentSchema);

module.exports = postCommentModel;