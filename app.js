// Database init and connection
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: ".env" });
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on("error", err => {
  console.error("Error connecting to database", err);
});

// require packages
const express = require("express");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const helmet = require("helmet");
const flash = require("connect-flash");
const morgan = require("morgan");
// Express init
const app = express();
const server = require("http").createServer(app);
// chat
const io = require("socket.io")(server);

io.on("connection", function(socket) {
  socket.on("error", error => {
    console.log(error);
  });
  socket.on("chat message", msgObj => {
    io.emit("chat message", msgObj);
  });
  socket.on("disconnect", reason => {
    io.emit("user left");
  });
});

// View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Express Middlware
app.use(helmet());
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(flash());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000,
      secure: false
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// passport init
app.use(passport.initialize());
app.use(passport.session());
const User = require("./models/User");
passport.use(new LocalStrategy(User.authenticate({ usernameField: "email" })));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  next();
});

// Own routes
const index = require("./routes/index");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movie");
const blogRoutes = require("./routes/blog");
const statsRoutes = require("./routes/stats");
const searchRoutes = require("./routes/search");
const chatRoutes = require("./routes/chat");
const backendRoutes = require("./routes/backend");

app.use("/", index);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", movieRoutes);
app.use("/", blogRoutes);
app.use("/", statsRoutes);
app.use("/", searchRoutes);
app.use("/", chatRoutes);
app.use("/", backendRoutes);

module.exports = server;
