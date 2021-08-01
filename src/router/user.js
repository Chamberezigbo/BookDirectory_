const express = require("express");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = new express.Router();

require("dotenv").config();

router.post("/users", async (request, response) => {
  try {
    let { firstName, lastName, email, password, gender } = request.body;

    let existUser = await User.findOne({ email: request.body.email });
    if (existUser)
      return response.status(401).json({
        success: false,
        responseMessage: `User already exist with this email ${existUser.email}`,
      });

    let newUser = new User({
      firstName,
      lastName,
      email,
      password,
      gender,
    });
    let userData = await newUser.save();
    userData = userData.toJSON();
    const payLoad = {
      userId: userData._id,
    };

    userData.token = jwt.sign(payLoad, process.env.JWT_SECRET);
    return response
      .status(201)
      .json({ success: true, responseMessage: userData });
  } catch (error) {
    return response
      .status(422)
      .json({
        success: false,
        responseMessage: `Failed to register user due to ${error}`,
      });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const payLoad = {
      userId: user._id,
    };

    token = jwt.sign(payLoad, process.env.JWT_SECRET);
    return res.status(200).json({
      success:true , responseMessage: user ,token
    })
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "gender"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) res.status(400).send({ error: "invalide operation" });

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
