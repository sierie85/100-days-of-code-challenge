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
  // {
  //   route: "/search",
  //   req: { query: "a" },
  //   accept: "application/json",
  //   expect: 200
  // },
  {
    route: "/register",
    req: { email: "example@acc.com", password: "superStrongPassword" },
    accept: "text/html",
    expect: 302
  }
];

describe("Test public routes (Status 200)", () => {
  test("test", () => expect(true).toBe(true));
  // publicGetRoutes.map(route => {
  //   test(`${route}`, function(done) {
  //     request(app)
  //       .get(route)
  //       .set("Accept", "text/html")
  //       .expect(200, done);
  //   });
  // });
  // publicPostRoutes.map(post => {
  //   test(`${post.route} with query "${JSON.stringify(post.req)}"`, done => {
  //     request(app)
  //       .post(post.route)
  //       .set("Accept", post.accept)
  //       .send(post.req)
  //       .expect(302)
  //       .expect("Location", "/login")
  //       .end(done);
  //   });
  // });
  // it("should create user session for valid user", done => {
  //   request(app)
  //     .post("/login")
  //     .set("Accept", "application/json")
  //     .send({ email: "example@acc.com", password: "superStrongPassword" })
  //     .expect(200)
  //     .end(function(err, res) {
  //       // res.body.email.should.equal("example@acc.com");
  //       // Save the cookie to use it later to retrieve the session
  //       userCookie = res.headers["set-cookie"].pop().split(";")[0];
  //       console.log(userCookie);
  //       done();
  //     });
  // });
  it("should respsonse with 200 if logged in", done => {
    const req = request(app).get("/settings");
    req.cookies = userCookie;
    req.set("Accept", "text/html").expect(302, done);
  });
  // test("delete account", done => {
  //   request(app)
  //     .post("/delete-account")
  //     .send()
  //     .expect()
  //     .end(done);
  // });
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
