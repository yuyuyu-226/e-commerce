import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();

// Connect DB
connectDB();

//Allow frontend connection
app.use(cors());
//Middleware to parse JSON
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
import authRoutes from "./routes/auth.js";
app.use("/auth", authRoutes);

//Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
