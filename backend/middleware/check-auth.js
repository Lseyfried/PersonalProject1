const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; //authorisation : "Bearer token"

    if (!token) {
      throw new Error("Authentification failed !");
    }
    const decodedToken = jwt.verify(token, process.env.token);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication Failed", 403);
    return next(error);
  }
};
