const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
    id:{
        type:String
    },
    sentRequest:[{
        Email:String
    }],
    request:[{
        Email:String
    }],
    
    
})

const friendModel = new mongoose.model('friendModel',friendsSchema);

module.exports = friendModel;
