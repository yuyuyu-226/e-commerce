import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// POST /orders - create new order
export const createOrder = async (req, res) => {
  try {
    const { userId, productId, quantity, address } = req.body;

    // Validate user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Validate product
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        error: "Insufficient stock",
        availableStock: product.stock,
      });
    }

    // Calculate total
    const totalAmount = product.price * quantity;

    // Create order
    const order = await Order.create({
      userId,
      productId,
      quantity,
      address,
      totalAmount,
    });

    // Reduce stock
    product.stock -= quantity;
    await product.save();

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
    const orders = await Order.find({ userId })
      .populate("productId", "name description price  category image_url")
      .populate("userId", "username email first_name last_name");

    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Server error" });
  }
};
