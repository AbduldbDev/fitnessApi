const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.createAccessToken = (user) => {
  const data = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  return jwt.sign(data, process.env.JWT_SECRET_KEY);
};

module.exports.verify = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({
      auth: "Failed. No Token",
    });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(403).send({
        auth: "Failed",
        message: err.message,
      });
    }

    req.user = decodedToken;
    next();
  });
};

module.exports.errorHandler = (err, req, res, next) => {
  console.log(err);

  const errorMessage = err.message || "Internal Server Error";
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    error: {
      message: errorMessage,
      errorCode: err.code || "SERVER_ERROR",
      details: err.details || null,
    },
  });
};

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
};
