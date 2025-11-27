import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// --- MOCK FALLBACK STORES ---
let MOCK_ORDERS = [];
let MOCK_PRODUCTS = []; // Only used if DB product lookup fails

// POST /orders - create new order
export const createOrder = async (req, res) => {
  try {
    const { userId, productId, quantity, address } = req.body;

    // Validate required fields
    if (!userId || !productId || !quantity || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    // Validate quantity
    if (typeof quantity !== "number" || quantity <= 0) {
      return res
        .status(400)
        .json({ error: "Quantity must be a positive number" });
    }

    // Validate user exists
    let user;
    try {
      user = await User.findById(userId);
    } catch {
      user = null;
    }
    if (!user) return res.status(404).json({ error: "User not found" });

    // Validate product exists
    let product;
    try {
      product = await Product.findById(productId);
    } catch {
      product = null;
    }

    // If DB fails → load fallback product
    if (!product) {
      product = MOCK_PRODUCTS.find((p) => p._id === productId);

      if (!product) {
        return res.status(404).json({
          error: "Product not found",
          idRequested: productId,
        });
      }
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        error: "Insufficient stock",
        availableStock: product.stock,
      });
    }

    // Calculate total
    const totalAmount = product.price * quantity;

    // Try DB order creation first
    let order;
    try {
      order = await Order.create({
        userId,
        productId,
        quantity,
        address,
        totalAmount,
      });
    } catch (dbError) {
      console.warn("DB down — using mock orders.");

      order = {
        _id: "mock-" + Date.now(),
        userId,
        productId,
        quantity,
        address,
        totalAmount,
        createdAt: new Date(),
      };

      MOCK_ORDERS.push(order);
    }

    // Deduct stock
    product.stock -= quantity;

    // SAVE STOCK UPDATE (DB) OR FALLBACK
    try {
      if (product.save) {
        await product.save();
      } else {
        // fallback mock update
        const index = MOCK_PRODUCTS.findIndex((p) => p._id === productId);
        if (index !== -1) MOCK_PRODUCTS[index] = product;
      }
    } catch (saveError) {
      console.error("Error updating product stock:", saveError);
      return res
        .status(500)
        .json({ error: "Server error while updating stock" });
    }

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /orders/:userId - fetch all orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    let orders;
    try {
      orders = await Order.find({ userId })
        .populate("productId", "name description price category image_url")
        .populate("userId", "username email first_name last_name");
    } catch {
      console.warn("DB down — using mock orders.");
      orders = MOCK_ORDERS.filter((o) => o.userId === userId);
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Server error" });
  }
};
