const mongoose = require('mongoose');

const onlineSchema = new mongoose.Schema({
    email:{
        type:String
    }
})

const onlineModel = new mongoose.model('onlineModel',onlineSchema);

module.exports = onlineModel;