const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mongoose = require("mongoose");
const db = require("../database.js");
const User = require("../models/index");
const Question = require("../models/questionModel");
const Answers = require("../models/answersModel");
const authentication = require("../userAuthentication");
const loginAuth = authentication.loginAuth;
const cl = authentication.log;
const diff = authentication.diff;
// const getid = authentication.getid;

//post new question
router.get("/newquestion", loginAuth, (req, res) => {
  res.render("postQuestion");
});

router.post("/newquestion", loginAuth, (req, res) => {
  var size = req.body.count - 1;
  var tags_arr = [];
  switch (size) {
    case 1:
      var tag = req.body.input1;
      tags_arr.push(tag);
      break;
    case 2:
      var tag = req.body.input1;
      var tag2 = req.body.input2;
      tags_arr.push(tag, tag2);
      break;
    case 3:
      var tag = req.body.input1;
      var tag2 = req.body.input2;
      var tag3 = req.body.input3;
      tags_arr.push(tag, tag2, tag3);
      break;
    case 4:
      var tag = req.body.input1;
      var tag2 = req.body.input2;
      var tag3 = req.body.input3;
      var tag4 = req.body.input4;
      tags_arr.push(tag, tag2, tag3, tag4);
      break;
    default:
      var tag = req.body.input1;
      var tag2 = req.body.input2;
      var tag3 = req.body.input3;
      var tag4 = req.body.input4;
      var tag5 = req.body.input5;
      tags_arr.push(tag, tag2, tag3, tag4, tag5);
      break;
  }
  Question.create(
    {
      title: req.body.title,
      description: req.body.description,
      user_id: req.session.userId,
      user_name: req.session.username,
      tags: tags_arr,
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
        cl("Question successfully posted");
      }
    }
  );
});

// question routes
router.get("/:id", loginAuth, async (req, res) => {
  try {
    answers_data = await Answers.find({ question_id: req.params.id });
    question_data = await Question.findOne({ _id: req.params.id });
    res.render("Question", {
      question: question_data,
      answers: answers_data,
      diff: diff,
    });
    getQuestionId(req.params.id);
  } catch {
    res.status("error loading question from upvote");
  }
});

var ID;
function getQuestionId(id) {
  ID = id;
}

// post answer route
router.post("/answers", async (req, res) => {
  try {
    let questionId = ID;
    var userquestion = await Question.findOne({ _id: questionId });
    if (userquestion.user_name != req.session.username) {
      Answers.create(
        {
          answer: req.body.answer,
          question_id: questionId,
          user_name: req.session.username,
          logo: req.session.logo,
          postedOn: Date.now(),
        },
        (err, result) => {
          if (err) {
            res.send("Unable to post the answer");
          } else {
            res.redirect("/question/" + questionId);
            req.body.answer = "";
          }
        }
      );
    } else {
      cl("you can not answer your own question");
      res.redirect("/question/" + questionId);
    }
  } catch {
    res.json("error occured while posting answer");
  }
});

// upvote and downvote routes
// router.post("/upvote", async (req, res) => {
//   try {
//     question = await Question.find({ _id: req.param.id });
//     question.votes += 1;
//     await question.save();
//     history.back();
//   } catch {
//     res.send("error upvoting");
//   }
// });

// router.post("/downvote", async (req, res) => {
//   try {
//     question = await Question.find({ _id: req.param.id });
//     question.votes -= 1;
//     await question.save();
//     history.back();
//   } catch {
//     res.send("error downvoting");
//   }
// });

module.exports = router;
