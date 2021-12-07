const jwt = require("jsonwebtoken");
const { secret } = require("../../config.json")

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
}

const verifyToken = (req, res, next) => {

  const bearerHeader = req.headers['authorization'];
  var token = "";

  if (!bearerHeader) {
    return res.status(403).send({ message: "No token provided!" });
  } else {
    const bearer = bearerHeader.split(' ');
    token = bearer[1];
  }

  if (token == "") {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.user = decoded;
    console.log(decoded)
    next();
  });
};

module.exports = verifyToken;