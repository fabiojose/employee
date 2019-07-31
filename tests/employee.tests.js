const supertest = require("supertest");
const expect = require("chai").expect;
const { cleanup } = require("./utils.js");

const app = require("../app.js");
const { db } = require("../db.js");

describe("Employee API", () => {
  describe("POST /api/employee", () => {
    it("should response 201 when everything ok", (done) => {
      // setup
      let employee = {
        id : "0x1",
        name : "Suzana Herculano-Houzel",
        email: "suzana@server.com",
        department: "Neurociência"
      };

      // act & assert
      supertest(app)
        .post("/api/employee")
        .set("Accept", "application/json")
        .send(employee)
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          cleanup(["0x1"], err, res, done);
        });
    });

    it("should response 400 when try to post same id", (done) => {
      // setup
      db.put({
        _id : "0x1",
        name : "foo",
        email: "foo@server.com",
        department: "bar"
      })
      .then(() => {
        let employee = {
          id : "0x1",
          name : "Suzana Herculano-Houzel",
          email: "suzana@server.com",
          department: "Neurociência"
        };

        // act & assert
        supertest(app)
          .post("/api/employee")
          .set("Accept", "application/json")
          .send(employee)
          .expect("Content-Type", /json/)
          .expect(409)
          .end((err, res) => {
            cleanup(["0x1"], err, res, done);
          });
      });
    });

    it("should response 201 when try to post another id", (done) => {
      // setup
      db.put({
        _id : "0x1",
        name : "foo",
        email: "foo@server.com",
        department: "bar"
      })
      .then(() => {
        let employee = {
          id : "0x2",
          name : "Milton Santos",
          email: "milton@server.com",
          department: "Geografia"
        };

        // act & assert
        supertest(app)
          .post("/api/employee")
          .set("Accept", "application/json")
          .send(employee)
          .expect("Content-Type", /json/)
          .expect(201)
          .end((err, res) => {
            cleanup(["0x1", "0x2"], err, res, done);
          });
      })
      .catch(done);
    });
  });

  describe("GET /api/employee", () => {
    it("should return all documents", (done) => {
      // setup
      db.put({
        _id : "0x3",
        name : "foo",
        email: "foo@server.com",
        department: "bar"
      })
      .then(() => {
        return db.put({
            _id : "0x4",
            name : "bar",
            email: "bar@server.com",
            department: "foo"
          });
      })
      .then(() => {
        // act & assert
        supertest(app)
          .get("/api/employee")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .expect((res) => {
            expect(res.body.length).to.equal(2);
          })
          .end((err, res) => {
            cleanup(["0x3", "0x4"], err, res, done);
          });
      })
      .catch(done);
    });
  });
});
