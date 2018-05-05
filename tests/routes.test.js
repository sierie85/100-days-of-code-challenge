const request = require("supertest");
const app = require("../app");

// list routes in array and iterate over..?

// public routes
// user routes
// admin routes

describe("Test the routes of the Application", () => {
  test("index route", function(done) {
    request(app)
      .get("/")
      .set("Accept", "text/html")
      .expect(200, done);
  });
  test("movie route", function(done) {
    request(app)
      .get("/movies")
      .set("Accept", "text/html")
      .expect(200, done);
  });
  test("single movie route", function(done) {
    request(app)
      .get("/movies/The%20Shawshank%20Redemption")
      .set("Accept", "text/html")
      .expect(200, done);
  });
});
