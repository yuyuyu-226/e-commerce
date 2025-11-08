import express from "express";
import { getProducts } from "../controllers/productController.js";

const router = express.Router();

//fetch all products
router.get("/getProducts", getProducts);

export default router;
