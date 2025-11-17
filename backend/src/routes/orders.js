import express from "express";
import { createOrder, getUserOrders } from "../controllers/orderController.js";
import {
  authenticateToken,
  authorizeRole,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes in this file require authentication and Buyer role
router.use(authenticateToken, authorizeRole("Buyer"));

router.post("/", createOrder); // create new order
router.get("/:userId", getUserOrders); // get all orders for a specific user

export default router;
