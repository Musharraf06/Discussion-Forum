const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mongoose = require("mongoose");
const db = require("../database.js");
const userModel = require("../models/index");
const Question = require("../models/questionModel");
const Answer = require("../models/answersModel");
const session = require("express-session");
const flash = require("flash-express");
const authentication = require("../userAuthentication");
const loginAuth = authentication.loginAuth;
const loggedinAuth = authentication.loggedinAuth;
const cl = authentication.log;

// Account routes
router.get("/MyAccount", loginAuth, async (req, res) => {
  try {
    user = await userModel.findOne({ _id: req.session.userId });
    res.render("userAccount", { user: user });
  } catch {
    res.send("error");
  }
});

// Update account route
router.put("/update/:id", async (req, res) => {
  let user;
  try {
    user = await userModel.findById(req.params.id);
    Question.update(
      { user_id: user.id },
      { $set: { user_name: req.body.name } },
      { multi: true },
      (err, result) => {
        if (err) {
          cl("error");
        }
        cl(" username sucessfully updated");
      }
    );
    Answer.update(
      { user_name: user.name },
      { $set: { logo: req.body.src } },
      { multi: true },
      (err, result) => {
        if (err) {
          cl("error");
        }
        cl("logo sucessfully updated");
      }
    );

    user.name = req.body.name;
    user.email = req.body.email;
    user.city = req.body.city;
    user.userQuestion = req.body.question;
    user.answer = req.body.answer;
    user.logo = req.body.src;

    await user.save();
    res.redirect("/user/MyAccount");
  } catch {
    if (!user) {
      res.redirect("/user/MyAccount");
      cl("error finding user");
    } else {
      res.render("userAccount", { user: user });
    }
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    if (req.body.wish == "true") {
      user = await userModel.findById(req.params.id);
      await user.remove();
      req.session.destroy((err) => {
        if (err) {
          return res.redirect("user/MyAccount");
        }
        res.clearCookie("sid");
        res.redirect("/signup");
      });
    } else {
      res.redirect("/user/MyAccount");
    }
  } catch {
    cl("Error while deleting the user");
    res.redirect("/user/MyAccount");
  }
});

module.exports = router;
