const request = require("supertest");
const app = require("../app");

// public routes
const publicGetRoutes = [
  "/",
  "/movies",
  "/movies/page/1",
  "/movies/The%20Shawshank%20Redemption",
  "/login",
  "/register",
  "/blog",
  "/chat",
  "/stats"
];

let userCookie;

const publicPostRoutes = [
  {
    route: "/search",
    req: { query: "a" },
    accept: "application/json"
  },
  {
    route: "/register",
    req: { email: "example@acc.com", password: "superStrongPassword" },
    accept: "text/html"
  }
];

describe("Test public routes (Status 200)", () => {
  test("test", () => expect(true).toBe(true));
  publicGetRoutes.map(route => {
    test(`${route}`, function(done) {
      request(app)
        .get(route)
        .set("Accept", "text/html")
        .expect(200, done);
    });
  });
  publicPostRoutes.map(post => {
    test(`${post.route} with query "${JSON.stringify(post.req)}"`, done => {
      request(app)
        .post(post.route)
        .set("Accept", post.accept)
        .send(post.req)
        .expect(200, done);
    });
  });
});

// user routes - fn for login
const userGetRoutes = [
  "/dashboard",
  "/settings",
  "/logout",
  "/password-reset",
  "/delete-account"
];
// admin routes
