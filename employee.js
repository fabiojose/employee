var express = require("express");

var router = express.Router();

// Create Employee
router.post("/employee", (req, res) => {

});

// Read Employee
router.get("/employee", (req, res) => {
console.log(req);
});

// Delete Employee
router.delete("/employee/:id", (req, res) => {

});

module.exports = router;
