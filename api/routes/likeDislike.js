const { response } = require("express");
const express = require("express");
const router = express.Router();

//database connection
require("../db/connection");
const likeDislikeModel = require('../models/likeDislikeModel');

router.get('/:postId',async(req,res)=>{
    let data = await likeDislikeModel.findOne({id:req.params.postId});
    res.send(data);
})

router.post('/:postId/:id',async(req,res)=>{
    console.log(req.params.postId);
    console.log(req.params.id);
    let data = await likeDislikeModel.findOne({id:req.params.postId});
    
    if(data){
        if(req.params.id==0){
            
           let value = await likeDislikeModel.find({ $and:[{'id':req.params.postId},{'heart.email':req.body.email}]})
           let value1 = await likeDislikeModel.find({ $and:[{'id':req.params.postId},{'like.email':req.body.email}]})
           console.log(`value is ${value.length}`);
           console.log(`value1 is ${value1.length}`);

                if(value!=0){
                    console.log('i am in');
                    await likeDislikeModel.updateOne({ $and:[{'id':req.params.postId},{'heart.email':req.body.email}]},
                    {$pull:{'heart':{'email':req.body.email}}})
                    

                    res.status(200).send('succesfull');
                    
                }
                else if(value1!=0){
                    await likeDislikeModel.updateOne({ $and:[{'id':req.params.postId},{'like.email':req.body.email}]},
                    {$pull:{'like':{'email':req.body.email}}})

                    data.heart.push({"email":req.body.email});
                    let result = await data.save();
                    

                    res.status(200).send('successful value1');
                }
                else {
                    data.heart.push({"email":req.body.email});
                    let result = await data.save();
                    res.status(200).send(result);
                }

                
            
            
        }
        else if(req.params.id==1){//like section

            let value = await likeDislikeModel.find({ $and:[{'id':req.params.postId},{'like.email':req.body.email}]})
           let value1 = await likeDislikeModel.find({ $and:[{'id':req.params.postId},{'heart.email':req.body.email}]})
           console.log(`value is ${value.length}`);
           console.log(`value1 is ${value1.length}`);

                if(value!=0){
                    console.log('i am in like secton');
                    await likeDislikeModel.updateOne({ $and:[{'id':req.params.postId},{'like.email':req.body.email}]},
                    {$pull:{'like':{'email':req.body.email}}})
                    

                    res.status(200).send('succesfull pulling');
                    
                }
                else if(value1!=0){
                    await likeDislikeModel.updateOne({ $and:[{'id':req.params.postId},{'heart.email':req.body.email}]},
                    {$pull:{'heart':{'email':req.body.email}}})

                    data.like.push({"email":req.body.email});
                    let result = await data.save();
                    

                    res.status(200).send('successful value1');
                }
                else {
                    data.like.push({"email":req.body.email});
                    let result = await data.save();
                    res.status(200).send(result);
                }

        }
        
        
    }
    else {
        if(req.params.id==1){
            let data = await likeDislikeModel(req.body);
            data.like.push({"email":req.body.email});
            let result = await data.save();
            res.status(200).send(result);
        }
        else if(req.params.id==0){
            let data = await likeDislikeModel(req.body);
            data.heart.push({"email":req.body.email});
            let result = await data.save();
            res.status(200).send(result);

        }
        
    }
        

    
})

module.exports = router;