import express from "express";
import {
  authenticateToken,
  authorizeRole,
} from "../middleware/authMiddleware.js";
import {
  getProducts,
  getCategories,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.use(authenticateToken, authorizeRole("Buyer"));

//fetch all products
router.get("/getProducts", getProducts);

//fetch list of unique categories
router.get("/getCategories", getCategories);

//fetch product by id
router.get("/getProductById/:id", getProductById);

export default router;
