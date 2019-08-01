var PouchDB = require("pouchdb");
var express = require("express");

var {
  db,
  del
} = require("../db.js");

var router = express.Router();

// Create Employee
router.post("/employee", (req, res) => {
  console.log("> > > POST ");
  console.log(req.body);

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

// Update Employee
// TODO testing
router.put("/employee", (req, res) => {
  console.log("> > > PUT");
  console.log(req.body);

  let employee = req.body;

  return db.get(employee.id)
    .then((doc) => {
      return db.put({
        _id : employee.id,
        _rev : doc._rev,
        name : employee.name,
        email : employee.email,
        department : employee.department
      })
      .then((result) => {
        res.status(201).json({
          code: 201,
          message: "Record updated"
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(err.status).json({
        code: err.status,
        message: err.message
      });
    });
});

// Read Employees
router.get("/employee", (req, res) => {
  console.log("> > > GET all");
  console.log(req.headers);

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
  console.log("> > > GET", req.params.id);

  return db.get(req.params.id)
    .then((doc) => {
      res.status(200).json({
        id : doc._id,
        name : doc.name,
        email : doc.email,
        department : doc.department
      });
    })
    .catch((err) => {
      res.status(err.status).json({
        code: err.status,
        message: err.message
      });
    });
});

// Delete Employee
router.delete("/employee/:id", (req, res) => {
  console.log("> > > DELETE", req.params.id);

  return del([req.params.id])
    .then((result) => {
      if(!result || result.length == 0){
        res.status(404).json({
          code: 404,
          message: "id not found"
        });
      } else {
        res.status(204).end();
      }
    })
    .catch((err) => {
      res.status(err.status).json({
        code: err.status,
        message: err.message
      });
    });
});

module.exports = router;
