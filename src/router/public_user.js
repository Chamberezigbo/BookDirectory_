const express = require("express");
const { models } = require("mongoose");

const User = require("../models/user");
const router = new express.Router();

router.get("/all_user", async (req, res) => {
  try {
    let user = await User.find({});
    return res
      .status(200)
      .json({
        success: true, 
        responseMassage: user
      })
  } catch (e) {
    return res
    .status(400)
    .json({
      success: false,
      res: `failed to get users`
    })
  }
});

module.exports = router