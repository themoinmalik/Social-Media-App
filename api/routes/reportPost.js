const express = require('express');
const router = express.Router();

require('../db/connection');

const reportModel = require('../models/reportModel');

router.get('/:postId/:email',async(req,res)=>{
    let value = await reportModel.find({$and:[{'postIds.id':req.params.postId},{'postIds.user.email':req.params.email}]});
       console.log(value); 
       res.status(200).send(value);
})

router.post('/:postId/:email',async(req,res)=>{
    let data = await reportModel.findOne({'postIds.id':req.params.postId});
    console.log(data);
    if(data){
       let value = await reportModel.findOne({$and:[{'postIds.id':req.params.postId},{'postIds.user.email':req.params.email}]});
       console.log(value); 
       if(value==null){
        await reportModel.updateOne({'postIds.id':req.params.postId},
        {$push:{'postIds.$.user':{'email':req.params.email}}});
 
        res.status(200).send(data);
       }
       else res.status(500).send('already reported');
       

    }
    else{
        let data = await new reportModel(req.body);
        let result = await data.save();
        res.status(200).send(result);
    }
})

module.exports = router;

