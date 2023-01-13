const express = require("express");
const router = express.Router();

//database connection
require("../db/connection");

const postCommentModel = require('../models/postCommentModel');

router.get('/:postId',async(req,res)=>{
    const data = await postCommentModel.findOne({id:req.params.postId});
    res.status(200).send(data);
})
router.post('/:postId',async(req,res)=>{
    let result;

    const data = await postCommentModel.findOne({id:req.params.postId});
    if(data){
        data.comments.push(req.body.comments[0]);
        result = await data.save();
    }
    else{
        const data =  new postCommentModel(req.body);
        result = await data.save();
    }
    
    res.status(200).send(result);

})
/*
router.put('/:postId/:commentId',async(req,res)=>{
    let result;
    let data = await postCommentModel.findOne({id:req.params.postId});
    if(data){
        data.comments.id(req.params.commentId).comment=req.body.comment;
        result = await data.save();
    }
    res.send(result);
})
*/

router.delete('/:postId/:commentId',async(req,res)=>{
    let result;
   
    let data = await postCommentModel.findOne({id:req.params.postId});
    if(data){
        data.comments.id(req.params.commentId).remove();
        result = await data.save();
    }
    res.status(200).send(result);
    
})

module.exports = router;