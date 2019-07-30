var express = require("express");
var auth = require("./auth.js");
var employee = require("./employee.js");

var app = express();

// Serving statics
app.use(express.static("ui"));

// Attaching the api routers
app.use("/api", employee);
app.use("/api/auth", auth);

app.listen(3000, () => {
  console.log("Employee Manager listening on: http://localhost:3000");
});
