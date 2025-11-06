import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Mock user data store (temporary for Sprint 2)
const users = [
  {
    id: "1234567890",
    username: "demoUser",
    email: "demo@example.com",
    password: "password123",
    role: "buyer",
  },
];

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
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password,
    role: "buyer",
  };
  users.push(newUser);

  // Generate mock JWT (valid for 1 hour)
  const token = jwt.sign(
    { id: newUser.id, username: newUser.username },
    process.env.JWT_SECRET || "mocksecret",
    { expiresIn: "1h" }
  );

  // Return success response
  res.status(201).json({
    message: "Signup successful",
    user: newUser,
    token,
  });
});

// POST /auth/login (mock)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Check against mock credentials
  if (email !== users.email || password !== users.password) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Create a mock JWT token (valid for 1 hour)
  const token = jwt.sign(
    { id: users.id, username: users.username, role: users.role },
    process.env.JWT_SECRET || "mocksecret",
    { expiresIn: "1h" }
  );

  // Send mock response
  res.status(200).json({
    message: "Login successful",
    user: {
      id: users.id,
      username: users.username,
      email: users.email,
      role: users.role,
    },
    token,
  });
});

export default router;
