import express from "express";
import { createOrder, getUserOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder); // create new order
router.get("/:userId", getUserOrders); // get all orders for a specific user

export default router;
