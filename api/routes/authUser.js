require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const uploadImage = multer({ dest: "uploadImages/" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

//database connection
require("../db/connection");

//userAuthModel
const UserAuthModel = require("../models/userAuthModel");
const PostModel = require('../models/postUploadModel');

router.post("/", async (req, res) => {
  const response = {
    message: "user already exist",
  };
  const userPresent = await UserAuthModel.findOne({ email: req.body.email });
  if (!userPresent) {
    // const id = mongoose.Types.ObjectId();
    const usersInfo = new UserAuthModel(req.body);
    const insertUserInfo = await usersInfo.save();
    localStorage.setItem("userData", req.body);
    
  }
  res.send(response);
  
});

router.get("/", async (req, res) => {
  const { email } = req.query;
  let filterquery = {};
  if (email) {
    filterquery.email = email
  }
  const users = await UserAuthModel.find(filterquery);
  res.send(users);
  
});

router.get('/:name',async(req,res)=>{
 
  const users = await UserAuthModel.find({name:req.params.name})
  res.status(200).send(users);
  
})

router.get('/:email/Email',async(req,res)=>{

  const users = await UserAuthModel.find({email:req.params.email})
  console.log('i am email',req.params.email);
  res.status(200).send(users);
})

router.post('/:name',async(req,res)=>{
 
  const userPresent = await UserAuthModel.findOne({ 
      'name':req.params.name});
  if (!userPresent) {
    const usersInfo = new UserAuthModel(req.body);
    const  insertUserInfo= await usersInfo.save();
    res.status(200).send(insertUserInfo);
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

router.put('/:name',uploadImage.single("photo"),async(req,res)=>{
  const file = req.file;
  console.log(file);

  cloudinary.uploader.upload(file.path,async(err,result)=>{
    console.log(result);
    let url = result.url;
    const user = await UserAuthModel.findOne({name:req.params.name});
    const data = await PostModel.updateMany({userName:req.params.name},{
      
        $set:{
          'userImg':url       
        }
      
    });
     if(user){
      user.imageUrl= url;
      let resul= await user.save();
      res.send(resul);
     }
  })   
})


module.exports = router;
