import Product from "../models/Product.js";

// GET /products - fetch all products
export const getProducts = async (req, res) => {
  try {
    //For fitlering by category
    const { category, sort } = req.query;
    const filter = {};

    if (category) {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    //For sorting by price
    let sortOption = {};
    if (sort === "price_asc") {
      sortOption.price = 1; // Ascending
    } else if (sort === "price_desc") {
      sortOption.price = -1; // Descending
    }

    //fetch products from DB based on filter and sort options
    const products = await Product.find(filter).sort(sortOption);

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

    //Filter out any null or empty strings, then sort alphabetically
    const cleanCategories = categories
      .filter((c) => c && c.trim() !== "")
      .sort();

    res.json(categories);
  } catch (error) {
    console.error("Error fetching unique categories:", error);
    res.status(500).json({ error: "Server error" });
  }
};
