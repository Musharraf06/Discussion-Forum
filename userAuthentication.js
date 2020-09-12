const session = require("express-session");

function loginAuth(req, res, next) {
  if (!req.session.userId) {
    return res.redirect("/login");
  } else {
    next();
  }
}

function loggedinAuth(req, res, next) {
  if (req.session.userId) {
    return res.redirect("/");
  } else {
    next();
  }
}

function log(message) {
  return console.log(message);
}

function LowerCase(string) {
  return string.toLowerCase();
}

function diff(userdate) {
  var currdate = Date.now();
  var difftime = Math.abs(currdate - userdate);
  diffdate = Math.ceil(difftime / 1000);
  if (diffdate <= 60) {
    if (diffdate <= 1) return diffdate + " second";
    return diffdate + " seconds";
  } else {
    diffdate = Math.ceil(difftime / (1000 * 60));
    if (diffdate <= 60) {
      if (diffdate <= 1) return diffdate + " minute";
      return diffdate + " minutes";
    } else {
      diffdate = Math.ceil(difftime / (1000 * 60 * 60));
      if (diffdate <= 24) {
        if (diffdate <= 1) return diffdate + " hour";
        return diffdate + " hours";
      } else {
        diffdate = Math.ceil(difftime / (1000 * 60 * 60 * 24));
        if (diffdate <= 30) {
          if (diffdate <= 1) return diffdate + " day";
          return diffdate + " days";
        } else {
          diffdate = Math.ceil(difftime / (1000 * 60 * 60 * 24 * 30));
          if (diffdate < 12) {
            if (diffdate <= 1) return diffdate + " month";
            return diffdate + " months";
          } else {
            diffdate = Math.ceil(difftime / (1000 * 60 * 60 * 24 * 30 * 12));
            if (diffdate <= 1) return diffdate + " year";
            return diffdate + " years";
          }
        }
      }
    }
  }
}

// const getid = (id) => {
//   return document.getElementById(id);
// };

module.exports = {
  loginAuth: loginAuth,
  loggedinAuth: loggedinAuth,
  log: log,
  LowerCase: LowerCase,
  diff: diff,
  // getid: getid,
};
