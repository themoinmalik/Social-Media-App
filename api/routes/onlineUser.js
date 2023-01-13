const express = require('express');
const router = express.Router();

//database connection
require("../db/connection");

const onlineModel = require('../models/onlineModel');
const { route } = require('./authUser');

router.post('/',async(req,res)=>{
    let data = await onlineModel.findOne({"email":req.body.email});
    if(!data){
        let value = await onlineModel(req.body);
    
        let result = await value.save();
        res.status(200).send(result);
    }
    else{
        res.status(200).send(data);
    }
})

router.delete('/:email',async(req,res)=>{
    let data = await onlineModel.findOne({"email":req.params.email});
    if(data){
        data.remove();
    
    }
    res.status(200).send(data);
})



module.exports = router;