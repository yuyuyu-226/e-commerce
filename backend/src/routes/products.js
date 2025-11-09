import express from "express";
import { getCategories, getProducts } from "../controllers/productController.js";

const router = express.Router();

//fetch all products
router.get("/getProducts", getProducts);

//fetch list of unique categories
router.get("/categories", getCategories);

export default router;
