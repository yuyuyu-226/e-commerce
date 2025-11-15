import Product from "../models/Product.js";

// GET /products - fetch all products
export const getProducts = async (req, res) => {
  try {
    //For fitlering by category
    const { category, sort, query } = req.query;
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

    //for searching by name or description
    if (query && query.trim() !== "") {
      filter.$or = [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
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

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    //fetch product by ID
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

// Admin CRUD operations
// POST /products/add - add a new product
export const addProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Server error" });
  }
};
// PUT /products/edit/:id - edit an existing product
export const editProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ error: "Product not found" });

    res.json(updated);
  } catch (error) {
    console.error("Error editing product:", error);
    res.status(500).json({ error: "Server error" });
  }
};
// DELETE /products/delete/:id - delete a product
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Server error" });
  }
};
