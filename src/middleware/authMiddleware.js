const jwt = require("jsonwebtoken");

// Middleware to protect routes (User Authentication)
exports.verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    try {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user info to the request
      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

// Middleware to verify if user is an admin
exports.verifyAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // User is admin, proceed
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};
