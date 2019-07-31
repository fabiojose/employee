var PouchDB = require("pouchdb");
var express = require("express");

var router = express.Router();

var dbAdapter = process.env.DB_ADAPTER || "leveldb";
console.log("> db adapter:", dbAdapter);

// Opens or creates the database
/*
const db = new PouchDB("employeedb", {
  adapter: "leveldb"
});
*/
// Create Employee
router.post("/employee", (req, res) => {
/*
  var put = db.put({
   _id: "d004",
   name: "David",
   email: "david@gmail.com",
   department : "Mobile"
 });
*/
  return res.status(201).json("blah");
});

// Read Employee
router.get("/employee", (req, res) => {
console.log(req);
});

// Delete Employee
router.delete("/employee/:id", (req, res) => {

});

module.exports = router;
