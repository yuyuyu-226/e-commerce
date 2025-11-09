import Product from "../models/Product.js";

// GET /products - fetch all products
export const getProducts = async (req, res) => {
  try {
    //For filtering by category
    const { category } = req.query;
    const filter = {};

    if (category) {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getCategories = async (req, res) => {
  try {
    // Fetch distinct categories from active products
    const categories = await Product.distinct("category", { status: "active" });

    // Filter out any null or empty strings, then sort alphabetically
    const cleanCategories = categories
      .filter(c => c && c.trim() !== '')
      .sort();

    res.json(cleanCategories);
  } catch (error) {
    console.error("Error fetching unique categories:", error);
    res.status(500).json({ error: "Server error" });
  }
};