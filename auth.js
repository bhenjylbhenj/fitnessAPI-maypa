const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = "FitnessTracker" || process.env.JWT_SECRET_KEY;

module.exports.createAccessToken = (user) => {
  const data = {
    id: user._id,
    email: user.email,
  };

  return jwt.sign(data, jwtSecret, {});
};

module.exports.verify = (req, res, next) => {
  // console.log(req.headers);

  let token = req.headers.authorization;

  if (typeof token === "undefined") {
    return res.status(401).send({ auth: "Failed. No Token" });
  } else {
    token = token.slice(7, token.length);

    jwt.verify(token, jwtSecret, function (err, decodedToken) {
      if (err) {
        return res.status(403).send({
          auth: "Failed",
          message: err.message,
        });
      } else {
        // console.log("result: ", decodedToken);
        req.user = decodedToken;
        next();
      }
    });
  }
};
