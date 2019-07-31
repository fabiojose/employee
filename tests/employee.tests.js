const supertest = require("supertest");
const app = require("../app.js");

describe("Employee API", () => {
  describe("POST", () => {
    it("should response 201 when everything ok", (done) => {
      // setup
      let employee = {
        name : "Suzana Herculano-Houzel",
        email: "suzana@server.com",
        department: "Neurociência"
      };

      // act & assert
      supertest(app)
        .post("/api/employee")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .end(done);
    });
  });
});
