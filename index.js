const express = require("express");
require("dotenv").config();
const app = express();
const mainRouter = require("./src/routes/index");
const port = 8080;
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const createError = require("http-errors");
const xss = require("xss-clean");

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(xss());
app.use("/", mainRouter);
app.use("/img", express.static("src/upload"));
app.all("*", (req, res, next) => {
  next(new createError.NotFound());
});
app.use((err, req, res, next) => {
  const messageError = err.message || "internal server error";
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    message: messageError,
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  //   console.log(process.env.PGUSER);
  // console.log(process.env.PGHOST);
  // console.log(process.env.PGDATABASE);
  // console.log(process.env.PGPASSWORD);
  // console.log(process.env.PGPORT);
});
