var express = require("express");

var {
  login,
  accessControl
} = require("./routes/auth.js");
var employee = require("./routes/employee.js");

var app = express();

// Enable access control using apitoken
app.use(accessControl);

// Serving statics
app.use(express.static("ui"));

// Parsing the request body as JSON
app.use(express.json());

// Attaching the api routers
app.use("/api", employee);
app.use("/api", login);

module.exports = app;
