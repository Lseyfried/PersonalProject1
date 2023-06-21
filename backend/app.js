const fs = require("fs");
const path = require("path");
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const mongoSanitize = require("express-mongo-sanitize");
const app = express();
const helmet = require("helmet");
const mongoose = require("mongoose");
app.use(bodyParser.json());
app.use(mongoSanitize());
app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH, DELETE");
  next();
});

app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});
mongoose
  .connect(
    `mongodb+srv://${process.env.URLK}:${process.env.URLP}@${process.env.URL}/${process.env.folder}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
