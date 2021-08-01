const User  = require("../models/user");
const Token = require("../models/token");
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const express = require("express");
const router = express.Router();

router.post("/api/password-reset", async (req, res) => {
    try {

       const user = await User.findOne({ email: req.body.email });
       if (!user)
       return res.status(400).send("user with given email doesn't exist");

       let token = await Token.findOne({ userId: user._id });
       if (!token) {
       token = await new Token({
              userId: user._id,
              token: crypto.randomBytes(32).toString("hex"),
       }).save();
       }

       const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
       await sendEmail(user.email, "Password reset", link);

       res.send("password reset link sent to your email account");
    } catch (error) {
       res.send("An error occurred");
       console.log(error);
    }
});

router.post("/api/password-reset/:userId/:token", async (req, res) => {
    try {

       const user = await User.findById(req.params.userId);
       if (!user) return res.status(400).send("invalid link or expired");

       const token = await Token.findOne({
       userId: user._id,
       token: req.params.token,
       });
       if (!token) return res.status(400).send("Invalid link or expired");

       user.password = req.body.password;
       await user.save();
       await token.delete();

       res.send("password reset successfully.");
    } catch (error) {
        res.send("An error occurred");
        console.log(error);
    }
});

module.exports = router;