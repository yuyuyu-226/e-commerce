import Product from "../models/Product.js";

// Admin CRUD operations
// POST add a new product
export const addProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    console.log("[Admin CRUD] Added product:", newProduct); // <-- log
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Server error" });
  }
};
// PUT edit a product
export const editProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      console.log(
        "[Admin CRUD] Edit failed, product not found:",
        req.params.id
      ); // <-- log
      return res.status(404).json({ error: "Product not found" });
    }

    console.log("[Admin CRUD] Updated product:", updated); // <-- log
    res.json(updated);
  } catch (error) {
    console.error("Error editing product:", error);
    res.status(500).json({ error: "Server error" });
  }
};
// DELETE a product
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      console.log(
        "[Admin CRUD] Delete failed, product not found:",
        req.params.id
      ); // <-- log
      return res.status(404).json({ error: "Product not found" });
    }

    console.log("[Admin CRUD] Deleted product:", deleted); // <-- log
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
    console.log("[Admin CRUD] Fetched all products, count:", products.length); // <-- log
    res.json(products);
  } catch (error) {
    console.error("Error fetching admin products:", error);
    res.status(500).json({ error: "Server error" });
  }
};
