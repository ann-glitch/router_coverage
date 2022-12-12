const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

const app = express();

//enable cors
app.use(cors());

// body-parser
app.use(express.json());

//load env vars
dotenv.config({ path: "./config/config.env" });

//mongodb connection
connectDB();

//route files
const coverage = require("./routes/coverage");

//mount routers
app.use("/api/coverage", coverage);

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
