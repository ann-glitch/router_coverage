const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();

//enable cors
app.use(cors());

//passport config
require("./config/passport")(passport);

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//load env vars
dotenv.config({ path: "./config/config.env" });

//mongodb connection
connectDB();

//load route files
const coverage = require("./routes/coverage");
const auth = require("./controllers/auth");

//session
const sess = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  sess.cookie = {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 48,
    sameSite: "none",
  };
}
app.use(session(sess));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//mount routers
app.use("/api/coverage", coverage);
app.use("/auth", auth);

//error handling
app.use(errorHandler);

const PORT = 5100;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.cyan.bold);
});

// handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`MongoServerError: ${err.message}`.red.bold);

  //close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
