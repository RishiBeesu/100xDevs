const jwt = require("jsonwebtoken");
const { jwtPassword } = require("../secret");
// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
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

module.exports = adminMiddleware;
