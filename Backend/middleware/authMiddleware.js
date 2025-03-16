const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "❌ Access Denied: No Token Provided" });
  }

  // Ensure token follows the "Bearer <token>" format
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1]; // Extract token
  } else {
    return res.status(401).json({ message: "❌ Invalid Token Format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user info to request
    next(); // Continue to next middleware
  } catch (error) {
    res.status(401).json({ message: "❌ Invalid or Expired Token" });
  }
};

module.exports = protect;
