var express = require("express");
var app = express();

app.use(express.static("ui"));

app.listen(3000, function () {
  console.log("Employee Manager listening on: http://localhost:3000");
});
