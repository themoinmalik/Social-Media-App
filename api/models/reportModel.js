const mongoose = require('mongoose');


const reportsSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    user:[{email:String}]
})
const reportSchema = new mongoose.Schema({

    postIds:[reportsSchema]
})

const reportModel = new mongoose.model('reportModel',reportSchema);

module.exports = reportModel;