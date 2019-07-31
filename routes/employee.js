var PouchDB = require("pouchdb");
var express = require("express");
var {
  db,
  del
} = require("../db.js");

var router = express.Router();

/*
var dbAdapter = process.env.DB_ADAPTER || "leveldb";
console.log("> db adapter:", dbAdapter);

if(dbAdapter === "memory") {
  PouchDB.plugin(require("pouchdb-adapter-memory"));
}

// Opens or creates the database
const db = new PouchDB("employeedb", {
  adapter: dbAdapter
});
*/

// Create Employee
router.post("/employee", (req, res) => {

  let employee = req.body;
  db.put({
    _id : employee.id,
    name : employee.name,
    email : employee.email,
    department : employee.department
  })
  .then((result) => {
    res.status(201).json({
      code: 201,
      message: "New record created"
    });
  })
  .catch((err) => {
    res.status(err.status).json({
      code: err.status,
      message: err.message
    });
  });
});

// Read Employees
router.get("/employee", (req, res) => {
  return db.allDocs({
    include_docs: true
  })
  .then((docs) => {
    res.status(200).json(
      docs.rows
        .map((row) => row.doc)
        .map((doc) => {
        return {
          id : doc._id,
          name : doc.name,
          email : doc.email,
          department : doc.department
        }
      })
    );
  })
  .catch((err) => {
    console.log(err);
    res.status(err.status).json({
      code: err.status,
      message: err.message
    });
  });
});

// Read Employee by id
router.get("/employee/:id", (req, res) => {

});

// Delete Employee
router.delete("/employee/:id", (req, res) => {

});

module.exports = router;
