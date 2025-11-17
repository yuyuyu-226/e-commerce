import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  //authHeader = "Bearer <tokenvalue>"

  if (!token) {
    return res.status(401).json({ error: "Access Token Required" });
  }

  // node -e "console.log(require('node:crypto').randomBytes(8).toString('hex'))"
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token." });
    }
    req.user = user; // decoded token payload
    next(); // continue to next route
  });
};

// Middleware to check for Admin role
export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ error: "Admin access only." });
  }
  next();
};

// Middleware to check for specific roles
export const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};
