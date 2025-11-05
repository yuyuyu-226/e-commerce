import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Mock user data store (temporary for Sprint 2)
const users = [];

// /signup route
router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Simulate checking existing user
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Mock “save” to fake database
  const newUser = { id: users.length + 1, username, email };
  users.push(newUser);

  // Generate mock JWT (valid for 1 hour)
  const token = jwt.sign(
    { id: newUser.id, username: newUser.username },
    process.env.JWT_SECRET || "mock_secret",
    { expiresIn: "1h" }
  );

  // Return success response
  res.status(201).json({
    message: "Signup successful",
    user: newUser,
    token,
  });
});

export default router;
