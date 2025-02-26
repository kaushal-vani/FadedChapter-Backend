const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    try {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Unauthorized" }); // Changed to 401
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

exports.verifyAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};