const mongoose = require('mongoose');

const LikeDislikeSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    like:[{email:String}],
    heart:[{email:String}]
})

const likeDsilikeModel = new mongoose.model('LikeDislikeModel',LikeDislikeSchema);

module.exports = likeDsilikeModel;