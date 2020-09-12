const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes/index");
const questionRouter = require("./routes/question");
const userRouter = require("./routes/users");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("flash-express");
const methodOverride = require("method-override");

// Session constants
const SESS_SECRET = "f#kl&sdjh#sdkjf!%&$@ADd";
const SESS_AGE = 1000 * 60 * 60 * 2; // 2hours

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

//Middleware setup
app.use("/public", express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(flash());
app.use(methodOverride("_method"));
app.use(
  session({
    name: "sid",
    secret: SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: SESS_AGE,
      sameSite: true,
    },
  })
);

//Routes setup
app.use("/", router);
app.use("/question", questionRouter);
app.use("/user", userRouter);

//PORT
const port = process.env.PORT || 8080;
app.listen(port, (req, res) => {
  console.log(`Listening at port ${port}`);
});
