const jwt = require("jsonwebtoken");
const { jwtPassword } = require("../secret");
function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const authorization = req.headers.authorization;
  const authorizationArray = authorization.split(" ");
  const [method, token] = authorizationArray;
  try {
    const decodedValue = jwt.verify(token, jwtPassword);
    if (decodedValue.username) {
      req.username = decodedValue.username;
      next();
    } else {
      res.status(403).json({
        msg: "You are not authorized",
      });
    }
  } catch (e) {
    res.json({
      msg: "Invalid Token",
    });
  }
}

module.exports = userMiddleware;
