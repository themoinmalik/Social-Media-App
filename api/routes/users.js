const User = require("../models/userAuthModel");
const router = require("express").Router();
const mongoose = require("mongoose");
const { friendId } = mongoose.Schema.Types;

// follow a user

router.put("/:id/follow", async (req, res) => {
  // console.log("api executed")
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      console.log(user);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        console.log('i am in');
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      console.log("error catch", err);
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

// unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  // console.log("api executed ")
  if (req.body.userId !== req.params.id) {
    // console.log("enter in conditon if ")
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      console.log("in catch block error =", err);
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

// get followers ...

router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    // const sir = await User.findOne({email:"shivam.tyagi@tothenew.com"})
    // const sir = await User.findOne({_id:"6255b7b7d5679b547df7b756"})

    // console.log("sir data = ", sir)
    // console.log(user);
    // console.log("user followings =",user.followings);
    // console.log("user id fetching",)

    const friends = await Promise.all(
      user.followings.map(async (friendId) => {
        console.log({ _id: friendId });

        return await User.findById({ _id: friendId });
      })
    );
    console.log(friends);
    res.status(200).json({ friends });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    console.log(user);
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json(err);
  }
});

// search user by name

router.get("/authusers/:name", async (req, res) => {
  const regex = new RegExp(req.params.name, "i");
  User.find({ name: regex }).then((result) => {
    res.status(200).json(result);
  });
});

module.exports = router;
