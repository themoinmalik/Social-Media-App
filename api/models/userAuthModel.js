const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userAuthSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    email: {
      type: String,
    },
    googleId: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    name: {
      type: String,
    },
    followers: [{ type: ObjectId, ref: "userAuthModel" }],
    followings: [{ type: ObjectId, ref: "userAuthModel" }],
    FirstName: {
      type: String,
      default: "",
    },
    LastName: {
      type: String,
      default: "",
    },
    Designation: {
      type: String,
      default: "",
    },
    MyWebsite: {
      type: String,
      default: "",
    },
    Gender: {
      type: String,
      default: "",
    },
    Birthday: {
      type: String,
      default: "",
    },
    City: {
      type: String,
      default: "",
    },
    State: {
      type: String,
      default: "",
    },
    Zip: {
      type: Number,
    },
  },
  { timestamps: true }
);

const UserAuthModel = new mongoose.model("userAuthModel", userAuthSchema);
module.exports = UserAuthModel;
