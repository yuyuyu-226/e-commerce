import mongoose from "mongoose";
import Product from "../models/Product.js";

// Validate product data
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
    const validationError = validateProduct(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// PUT edit a product
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const validationError = validateProduct(req.body, true);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET all products for admin
export const adminGetAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

//ALL Admin CRUD endpoints work correctly (add/edit/delete products) and return appropriate responses.
// The endpoints have been tested and verified using Postman and function as expected.
