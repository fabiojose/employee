const supertest = require("supertest");
const expect = require("chai").expect;
const app = require("../app.js");

describe("Employee API", () => {
  describe("POST /api/employee", () => {
    it("should response 201 when everything ok", (done) => {
      // setup
      let employee = {
        id : '0x1',
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
        .end(done);
    });

    it("should response 400 when try to post same id", (done) => {
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
        .expect(409)
        .end(done);
    });

    it("should response 201 when try to post another id", (done) => {
      // setup
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
        .end(done);
    });
  });

  describe("GET /api/employee", () => {
    it("should return all documents", (done) => {
      // act & assert
      supertest(app)
        .get("/api/employee")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .expect((res) => {
          expect(res.body.length).to.equal(2);
        })
        .end(done);
    });
  });
});
