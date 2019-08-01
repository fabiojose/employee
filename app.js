var express = require("express");
var passport = require("passport");
var BasicStrategy = require("passport-http").BasicStrategy;

var employee = require("./routes/employee.js");

const app = express();

// Enable basic security
const user = process.env.ADMIN_USER || "admin";
const pass = process.env.ADMIN_PASS || "adm1n";

passport.use(new BasicStrategy(
  (username, password, cb) => {
    if(user === username && pass === password){
      cb(null, {
        username : username,
        email : username + "@mailserver.com"
      });
    } else {
      cb(null, false);
    }
  }
));

app.get("/",
  passport.authenticate("basic", {
    session: false,
    successRedirect : "/app"
  }),
  (req, res) => {
    res.json({
      username: req.user.username,
      email: req.user.value
    });
  });

// Serving statics
app.use("/app", express.static("ui"));

// Parsing the request body as JSON
app.use(express.json());

// Attaching the API routers
app.use("/app/api", employee);

module.exports = app;
