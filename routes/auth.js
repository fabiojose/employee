var express = require("express");

var router = express.Router();

// Login
router.post("/", (req, res) => {
  console.log(req);
});

router.get("/", (req, res) => {
  console.log(req);
});

// Logout
router.delete("/:session", (req, res) => {

});

module.exports = router;
