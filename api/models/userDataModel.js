const mongoose = require('mongoose');

const userDataModel = new mongoose.Schema({
    FirstName: {
        type:String,
        required:true
    },
    LastName: {
        type:String,
        required:true
    },
    Designation: {
        type:String
    },
    MyWebsite:{
        type:String
    },
    Gender:{
        type:String
    },
    Birthday:{
        type:String
    },
    City:{
        type:String
    },
    State:{
        type:String
    },
    Zip:{
        type:Number,
        required:true

    }

})

const UserDataModel = mongoose.model('userDataModel',userDataModel);
module.exports=UserDataModel