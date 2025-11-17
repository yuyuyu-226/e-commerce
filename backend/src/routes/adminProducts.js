import express from "express";
import {
  addProduct,
  editProduct,
  deleteProduct,
  adminGetAllProducts,
} from "../controllers/adminProductsController.js";

const router = express.Router();

// Admin CRUD routes
router.get("/getAllProducts", adminGetAllProducts);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
