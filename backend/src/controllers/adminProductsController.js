import Product from "../models/Product.js";

export const adminGetAllProducts = (req, res) => {
  res.json({ message: "adminGetAllProducts route ready" });
};

export const addProduct = (req, res) => {
  res.json({ message: "addProduct route ready" });
};

export const editProduct = (req, res) => {
  res.json({ message: "editProduct route ready" });
};

export const deleteProduct = (req, res) => {
  res.json({ message: "deleteProduct route ready" });
};
