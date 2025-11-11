import express from "express";
import {
  getProducts,
  getCategories,
} from "../controllers/productController.js";

const router = express.Router();

//fetch all products
router.get("/getProducts", getProducts);

//fetch list of unique categories
router.get("/getCategories", getCategories);

export default router;
