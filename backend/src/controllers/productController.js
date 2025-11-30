import Product from "../models/Product.js";
import mongoose from "mongoose";

// GET /products - fetch all products
export const getProducts = async (req, res) => {
  try {
    const { category, sort, query } = req.query;
    const filter = {};

    // Validate category (Ensured /products endpoint works with category filter)
    if (category && typeof category === "string") {
      const cleanCategory = category.trim(); // NEW: trim whitespace
      if (cleanCategory !== "") {
        filter.category = { $regex: new RegExp(`^${cleanCategory}$`, "i") };
      }
    }

    // Sorting validation
    const validSortOptions = ["price_asc", "price_desc"];
    let sortOption = {};

    if (validSortOptions.includes(sort)) {
      sortOption.price = sort === "price_asc" ? 1 : -1;
    } else {
      // Important for NO FLICKER
      sortOption = { name: 1 };
    }

    // Validate search query
    if (query && typeof query === "string" && query.trim() !== "") {
      filter.$or = [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }

    const products = await Product.find(filter).sort(sortOption);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /categories - fetch all active categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category", { status: "active" });
    const cleanCategories = categories
      .filter((c) => c && c.trim() !== "")
      .sort();
    res.json(cleanCategories);
  } catch (error) {
    console.error("Error fetching unique categories:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /products/:id - fetch product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid product ID",
        detail: "Product ID must be a valid MongoDB ObjectId",
      }); //400 Bad Request if product ID is invalid
    }

    //Added lean() for better performance as we are not modifying the product(VERIFIED: /getProductById/:id endpoint returns correct product info)
    const product = await Product.findById(id).lean();

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /products/search - search products by query, category, optional sort
export const searchProducts = async (req, res) => {
  try {
    const { query, category, sort } = req.query;
    const filter = {};

    // Category filter
    if (category && typeof category === "string" && category.trim() !== "") {
      filter.category = { $regex: new RegExp(`^${category.trim()}$`, "i") };
    }

    // Search query filter
    if (query && typeof query === "string" && query.trim() !== "") {
      filter.$or = [
        { name: { $regex: query.trim(), $options: "i" } },
        { description: { $regex: query.trim(), $options: "i" } },
      ];
    }

    // Sorting
    const validSortOptions = ["price_asc", "price_desc"];
    let sortOption = { name: 1 }; // default sort by name ascending
    if (validSortOptions.includes(sort)) {
      sortOption.price = sort === "price_asc" ? 1 : -1;
    }

    // Fetch products
    const products = await Product.find(filter).sort(sortOption);
    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Server error" });
  }
};
