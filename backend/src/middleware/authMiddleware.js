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
