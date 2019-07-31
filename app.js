var express = require("express");

var auth = require("./routes/auth.js");
var employee = require("./routes/employee.js");

var app = express();

// Serving statics
app.use(express.static("ui"));

// Parsing the request body as JSON
app.use(express.json());

// Attaching the api routers
app.use("/api", employee);
app.use("/api/auth", auth);

module.exports = app;
