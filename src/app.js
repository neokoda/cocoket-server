const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const authController = require("./api/auth/auth.controller");
const productController = require("./api/product/product.controller")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.disable("x-powered-by");
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});
app.use(cors());

dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(`/api/auth`, authController);
app.use(`/api/product`, productController);
app.use(express.static("."));

module.exports = app;