import mongoose from "mongoose";
import Product from "../models/Product.js";

//Validate product data
const validateProduct = (body, isUpdate = false) => {
  const { name, description, price, stock, status } = body;

  // Required fields only when creating
  if (!isUpdate) {
    if (!name || !description || price === undefined) {
      return "Fields 'name', 'description', and 'price' are required.";
    }
  }

  // Price must be positive
  if (price !== undefined) {
    if (typeof price !== "number" || price <= 0) {
      return "Price must be a positive number.";
    }
  }

  // Stock must be non-negative
  if (stock !== undefined) {
    if (typeof stock !== "number" || stock < 0) {
      return "Stock must be a non-negative number.";
    }
  }

  // Status validation
  if (status !== undefined) {
    if (!["active", "inactive"].includes(status)) {
      return "Status must be 'active' or 'inactive'.";
    }
  }

  return null;
};
// Admin CRUD operations
// POST add a new product
export const addProduct = async (req, res) => {
  try {
    // Validation added
    const validationError = validateProduct(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const newProduct = await Product.create(req.body);
    console.log("[Admin CRUD] Added product:", newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Server error" });
  }
};
// PUT edit a product
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    // Validation added for updates
    const validationError = validateProduct(req.body, true);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      console.log("[Admin CRUD] Edit failed, product not found:", id);
      return res.status(404).json({ error: "Product not found" });
    }

    console.log("[Admin CRUD] Updated product:", updated);
    res.json(updated);
  } catch (error) {
    console.error("Error editing product:", error);
    res.status(500).json({ error: "Server error" });
  }
};
// DELETE a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      console.log("[Admin CRUD] Delete failed, product not found:", id);
      return res.status(404).json({ error: "Product not found" });
    }

    console.log("[Admin CRUD] Deleted product:", deleted);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Server error" });
  }
};
// GET all products for admin
export const adminGetAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    console.log("[Admin CRUD] Fetched all products, count:", products.length);
    res.json(products);
  } catch (error) {
    console.error("Error fetching admin products:", error);
    res.status(500).json({ error: "Server error" });
  }
};
