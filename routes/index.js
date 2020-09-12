const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mongoose = require("mongoose");
const db = require("../database.js");
const userModel = require("../models/index");
const Question = require("../models/questionModel");
const Answer = require("../models/answersModel");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const session = require("express-session");
const flash = require("flash-express");
const authentication = require("../userAuthentication");
const loginAuth = authentication.loginAuth;
const loggedinAuth = authentication.loggedinAuth;
const cl = authentication.log;

//flash options
var option = {
  position: "l",
  duration: "3000",
};

var option2 = {
  position: "r",
  duration: "3000",
};

var option3 = {
  position: "tl",
  duration: "3000",
};
// Routes

// Home routes
router.get("/", loginAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    if (userId) {
      var mySortNew = { postedOn: -1 };
      question = await Question.find({}).sort(mySortNew);
      res.render("index", { question: question, userId });
    }
  } catch {
    res.send("error");
  }
});

// Search routes
router.post("/search", loginAuth, (req, res) => {
  // db.questionmodels.find({title: {$regex : 'new'}}).pretty()
  const userId = req.session.userId;
  if (userId) {
    // question = db.questionmodels.find({ title: { $regex: req.body.searchText }})
    var regex = new RegExp(req.body.searchpattern, "i"),
      query = { title: regex };
    Question.find(query, (err, result) => {
      if (err) {
        res.send("error");
      } else {
        res.render("index", { question: result, userId });
      }
    });
  }
});

// router.get("/searchtag", loginAuth, async (req, res) => {
//   try {
//     questiondata = await Question.find({
//       tags: () => {
//         tags.filter((data) => {
//           return data;
//         });
//       },
//     });
//     console.log(questiondata);
//     req.render("index", { question: questiondata, userId: req.session.userId });
//   } catch {
//     res.send("error while searching by tag");
//   }
// });

router.get("/MyAccount/myquestions", loginAuth, async (req, res) => {
  try {
    myquestion_data = await Question.find({ user_id: req.session.userId });
    res.render("index", {
      question: myquestion_data,
      userId: req.session.userId,
    });
  } catch {
    res.send("error");
  }
});

// Login routes
router.get("/login", loggedinAuth, (req, res) => {
  res.render("login");
});

// Login authentication
router.post("/login", (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.flash("An error occured", "error", option);
    res.redirect("/login");
  }
  userModel.findOne({ name: req.body.name }, (err, result) => {
    if (err) {
      res.flash("Unknown error", "error", option);
      res.redirect("/login");
    }
    if (result) {
      const isMatch = bcrypt.compareSync(req.body.password, result.password);
      if (isMatch) {
        req.session.userId = result._id;
        req.session.username = result.name;
        req.session.logo = result.logo;
        return res.redirect("/");
      } else {
        res.flash("Wrong password or may be CAPS LOCK is on", "error", option);
        res.redirect("/login"); 
      }
    } else {
      res.flash("User does not exist", "error", option);
      res.redirect("/login");
    }
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.clearCookie("sid");
    res.redirect("/login");
  });
});

//forgot password
router.post("/forgotform", async (req, res) => {
  try {
    user = await userModel.findOne({ name: req.body.username });
    if (user && req.body.user_question == user.userQuestion) {
      if (user.answer == req.body.answer) {
        if (req.body.newpassword && req.body.confirmnewpass) {
          if (req.body.newpassword === req.body.confirmnewpass) {
            const newsalt = bcrypt.genSaltSync();
            const newhashedPassword = bcrypt.hashSync(
              req.body.newpassword,
              newsalt
            );
            user.password = newhashedPassword;
            await user.save();
            res.flash("Password successfully changed", "success", option2);
            res.redirect("/login");
          } else {
            res.flash("Passwords do not match", "error", option2);
            res.redirect("/login");
          }
        } else {
          res.flash("Invalid passwords", "error", option2);
          res.redirect("/login");
        }
      } else {
        res.flash("Incorrect answer", "error", option2);
        res.redirect("/login");
      }
    } else {
      res.flash(
        "user does not exists or question specified is incorrect",
        "error",
        option3
      );
      res.redirect("/login");
    }
  } catch {
    res.flash("error", "error", option2);
    res.redirect("/login");
  }
});

//Signup routes
router.get("/signup", async (req, res) => {
  res.render("signup");
});

// create new user
router.post("/new", (req, res) => {
  // check for existing user
  // try {
  user = userModel.findOne({ name: req.body.name });
  if (req.body.name == user.name || req.body.email == user.email) {
    cl("User already exists. Please login");
    res.redirect("/login");
  } else {
    //password validation
    if (req.body.password === req.body.confirmpass) {
      // Generating hashed password
      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      //Logo issues
      let logo = req.body.src;
      if (logo == "") {
        logo = "../public/images/avatars/3530378_5.jpg";
      } else {
        logo = req.body.src;
      }

      // saving to database
      userModel.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          city: req.body.city,
          userQuestion: req.body.user_question,
          answer: req.body.answer,
          logo: logo,
        },
        (err, result) => {
          if (!err) {
            res.redirect("/login");
            cl("User successfully saved to database");
          } else {
            res.send("Unable to save to database");
          }
        }
      );
    } else {
      res.flash("passwords do not match", "error", option);
      res.redirect("/signup");
    }
  }
  // } catch {
  //   cl("error signing up");
  //   res.redirect("/signup");
  // }
});

// Git-hub font-face
// font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;

//Fix for "Already address in use"
//sudo lsof -i :8080
//kill -9 pid
module.exports = router;
