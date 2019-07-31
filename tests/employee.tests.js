const supertest = require("supertest");
const expect = require("chai").expect;
const { cleanup } = require("./utils.js");

const app = require("../app.js");
const { db } = require("../db.js");

var apitoken;

describe("Employee API", () => {
  before((done) => {
    supertest(app)
      .post("/api/login")
      .set("Accept", "application/json")
      .auth(process.env.ADMIN_USER, process.env.ADMIN_PASS)
      .expect(200)
      .end((err, res) => {
        if(err){
          done(err);
        } else {
          apitoken = res.body.apitoken;
          done();
        }
      });
  });

  after((done) => {
    done();
  });

  describe("POST /api/employee", () => {
    it("should response 201 code when everything ok", (done) => {
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
        .set("x-apitoken", apitoken)
        .set("Accept", "application/json")
        .send(employee)
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          cleanup(["0x1"], err, res, done);
        });
    });

    it("should response 400 code when try to post same id", (done) => {
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
          .set("x-apitoken", apitoken)
          .set("Accept", "application/json")
          .send(employee)
          .expect("Content-Type", /json/)
          .expect(409)
          .end((err, res) => {
            cleanup(["0x1"], err, res, done);
          });
      });
    });

    it("should response 201 code when try to post another id", (done) => {
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
          .set("x-apitoken", apitoken)
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
          .set("x-apitoken", apitoken)
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

    it("should return an empty list when there is no employees", (done) => {
      // act & assert
      supertest(app)
        .get("/api/employee")
        .set("x-apitoken", apitoken)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .expect((res) => {
          expect(res.body.length).to.equal(0);
        })
        .end(done);
    });
  });

  describe("GET /api/employee/:id", () => {
    it("should return the right employee using its ID", (done) => {
      // setup
      let employee = {
        id : "0x5",
        name : "Suzana Herculano-Houzel",
        email: "suzana@server.com",
        department: "Neurociência"
      };

      db.put({
        _id : employee.id,
        name : employee.name,
        email: employee.email,
        department: employee.department
      })
      .then(() => {
        // act & assert
        supertest(app)
          .get("/api/employee/0x5")
          .set("x-apitoken", apitoken)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .expect((res) => {
            expect(res.body).to.deep.equal(employee);
          })
          .end((err, res) => {
            cleanup(["0x5"], err, res, done);
          });
      })
      .catch(done);
    });

    it("should response 404 code when using a non-existent id", (done) => {
      // act & assert
      supertest(app)
        .get("/api/employee/0x100")
        .set("x-apitoken", apitoken)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404)
        .end(done);
    });
  });

  describe("DELETE /api/employee/:id", () => {
    it("should response 204 code when delete succeeded", (done) => {
      // setup
      db.put({
        _id : "0x6",
        name : "foo",
        email: "foo@server.com",
        department: "bar"
      })
      .then(() => {
        // act & assert
        supertest(app)
          .delete("/api/employee/0x6")
          .set("x-apitoken", apitoken)
          .set("Accept", "application/json")
          .expect(204)
          .end(done);
      })
      .catch(done);
    });

    it("should response 404 code when using a non-existent id", (done) => {
      // act & assert
      supertest(app)
        .delete("/api/employee/0x100")
        .set("x-apitoken", apitoken)
        .set("Accept", "application/json")
        .expect(404)
        .end(done);
    });
  });
});
