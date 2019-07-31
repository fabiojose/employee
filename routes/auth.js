var express = require("express");
var passport = require("passport");
var Strategy = require("passport-http").BasicStrategy;
var randtoken = require("rand-token");

var router = express.Router();

const APITOKEN_HEADER = "x-apitoken";

const PUBLIC_ACCESS_APIS = [/\/login/i];

// Login
router.post("/login",
  passport.authenticate("basic", {
    session: false,
    failureRedirect: "/"
  }), (req, res) => {
    res.json(req.user);
  });

// Logout
router.delete("/login", (req, res) => {
  delete global.tokens[req.headers["x-apitoken"]];
  res.status(204).end();
});

global.tokenByUser = {};
global.tokens = {};
const user = process.env.ADMIN_USER || "admin";
const pass = process.env.ADMIN_PASS || "adm1n";

passport.use(new Strategy(
  function(username, password, cb) {
    if(user === username
        && pass === password){

        let token = randtoken.generate(32);
        global.tokenByUser[username] = token;
        global.tokens[token] = true;
        return cb(null, {
          id: 1,
          username: username,
          apitoken: token
        });
    } else {
      return cb(null, false);
    }
}));

router.use(passport.initialize());

// To control the access
const accessControl = (req, res, next) => {
  let isPublic = PUBLIC_ACCESS_APIS
    .map((regx) => req.url.match(regx))
    .filter((m) => m)
    .map((m) => m.shift())
    .shift();

  if(!isPublic){
    let apitoken = req.headers[APITOKEN_HEADER];
    if(!apitoken || !global.tokens[apitoken]) {
      res.status(403).end();
    }
  }

  next();
};

module.exports = {
  login : router,
  accessControl
};
