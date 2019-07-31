const supertest = require("supertest");
const expect = require("chai").expect;

const app = require("../app.js");

var apitoken;

describe("Authentication API", () => {
  describe("POST /api/login", () => {
    it("should response 200 code when credentials are ok", (done) => {
      // act & assert
      supertest(app)
        .post("/api/login")
        .set("Accept", "application/json")
        .auth(process.env.ADMIN_USER, process.env.ADMIN_PASS)
        .expect(200)
        .end(done);
    });

    it("should return the apitoken", (done) => {
      // act & assert
      supertest(app)
        .post("/api/login")
        .set("Accept", "application/json")
        .auth(process.env.ADMIN_USER, process.env.ADMIN_PASS)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.have.property("apitoken");
          apitoken = res.body.apitoken;
        })
        .end(done);
    });
  });

  describe("DELETE /api/login", () => {
    it("should response 200 code when credentials are ok", (done) => {
      // act & assert
      supertest(app)
        .delete("/api/login")
        .set("x-apitoken", apitoken)
        .set("Accept", "application/json")
        .expect(204)
        .end(done);
    });
  });
});
