const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided",
      });
    }
console.log("AUTH HEADER:", req.headers.authorization);
console.log("JWT SECRET:", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  }catch (error) {
  console.log("JWT ERROR:", error);

  return res.status(401).json({
    success: false,
    message: "Invalid Token",
  });
}
};

module.exports = authMiddleware;