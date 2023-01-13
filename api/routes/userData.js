const express = require('express');
const router = express.Router();


//database connection
require("../db/connection");

//userDataModel
const UserDataModel = require('../models/userDataModel');


router.post('/:id',async(req,res)=>{
 
      const userPresent = await UserDataModel.findOne({ 
          FirstName:req.body.FirstName,LastName:req.body.LastName});
      if (!userPresent) {
        const usersInfo = new UserDataModel(req.body);
        const  insertUserInfo= await usersInfo.save();
        res.send(insertUserInfo);
      }
      else{
          userPresent.FirstName=req.body.FirstName;
          userPresent.LastName=req.body.LastName;
          userPresent.Designation=req.body.Designation;
          userPresent.MyWebsite=req.body.MyWebsite;
          userPresent.Gender=req.body.Gender;
          userPresent.Birthday=req.body.Birthday;
          userPresent.City=req.body.City;
          userPresent.State=req.body.State;
          userPresent.Zip=req.body.Zip;

          userPresent.save();
          res.send(userPresent);
           
      }
})

module.exports = router;