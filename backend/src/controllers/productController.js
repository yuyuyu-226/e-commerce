import Product from "../models/Product.js";

// GET /products - fetch all products
export const getProducts = async (req, res) => {
  try {
    //For fitlering by category
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
