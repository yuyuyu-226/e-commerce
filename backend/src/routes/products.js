import express from "express";
import {
  getProducts,
  getCategories,
  getProductById,
  searchProducts,
} from "../controllers/productController.js";

const router = express.Router();

//fetch all products
router.get("/getProducts", getProducts);

//fetch list of unique categories
router.get("/getCategories", getCategories);

//fetch product by id
router.get("/getProductById/:id", getProductById);

//search products
router.get("/search", searchProducts);

export default router;
