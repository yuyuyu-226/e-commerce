import Product from "../models/Product.js";
import mongoose from "mongoose";

// GET /products - fetch all products
export const getProducts = async (req, res) => {
  try {
    const { category, sort, query } = req.query;
    const filter = {};

    // Validate category
    if (category && typeof category === "string") {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
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
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ error: "Server error" });
  }
};
