const express = require('express');
const router = express.Router();

require('../db/connection');

const friendModel = require('../models/friendRequestModel');

router.get('/:id',async(req,res)=>{
    const data = await friendModel.findOne({'id':req.params.id});
    // console.log('data is',data);
    res.send(data);
})

router.get('/:id/:email/isrequested',async(req,res)=>{
 
    const data = await friendModel.find({ $and:[{'id':req.params.id},{'sentRequest.Email':req.params.email}]})
    if(data.length>0){
        console.log('friendrequest data is',data);
        res.send(true);
    }
    else res.send(false);
})


router.post('/:id/sent',async(req,res)=>{
    const data = await friendModel.findOne({id:req.params.id})
    if(data){
        const result = await friendModel.updateOne({id:req.params.id },
        {$push:{'sentRequest':{'Email':req.body.Email}}})

        res.send('Request sent Sucessfully');
        
    }
    else{
        let newData = {
            id:req.params.id,
        }
        let data = await friendModel(newData);
        data.sentRequest.push({'Email':req.body.Email})
        await data.save();
        res.send('Sucessful');
    }
    
})

router.post('/:id/recieve',async(req,res)=>{
    const data = await friendModel.findOne({id:req.params.id});
    if(data){
        const result = await friendModel.updateOne({id:req.params.id },
            {$push:{'request':{'Email':req.body.Email}}})
    
            res.send('Request sent Sucessfully');

    }else{
        let newData = {
            id:req.params.id,
        }
        let data = await friendModel(newData);
        data.request.push({'Email':req.body.Email});
        await data.save();
        res.send('Sucessful');
    }
})

router.delete('/:id/request/:email',async(req,res)=>{
    const data = await friendModel.updateOne({ $and:[{'id':req.params.id},{'request.Email':req.params.email}]},{
        $pull:{ 
            'request':{'Email':req.params.email}
        }
    });
    res.status(200).send('Popped from Request');
})

router.delete('/:id/sentRequest/:email',async(req,res)=>{
    console.log('i am in delete');
    const data = await friendModel.updateOne({$and:[{'id':req.params.id},{'sentRequest.Email':req.params.email}]},{
        $pull:{
            'sentRequest':{'Email':req.params.email}
        }
    })
    res.status(200).send('Popped from sentRequest');
})




module.exports = router;
