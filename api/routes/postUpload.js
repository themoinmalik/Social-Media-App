require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const upload = multer({ dest: "uploads/" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

//database connection
require("../db/connection");

//userAuthModel
const PostModel = require("../models/postUploadModel");

router.post("/", upload.single("photo"), function (req, res, next) {
  //   console.log(req.file);
  //   res.send("hello");
  const file = req.file;

  cloudinary.uploader.upload(file.path, async (err, result) => {
    // console.log(result);
    const postStore = new PostModel({
      desc: req.body.desc,
      imgUrl: result.url,
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userImg: req.body.userImg,
    });

    const postInsert = await postStore.save();
    res.send(postInsert);
  });
});

router.get("/", async (req, res) => {
  const PAGE_SIZE = req.params.page || 10;
  const page = parseInt(req.query.page || "0");
  const total = await PostModel.countDocuments({});
  const postData = await PostModel.find({})
    .sort({ date: -1 })
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page);
  res.send({ totalPages: Math.ceil(total / PAGE_SIZE), postData });
  // console.log(postData);
});

module.exports = router;
