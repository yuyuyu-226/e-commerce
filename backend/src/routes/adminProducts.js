import express from "express";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middleware/authMiddleware.js";
import {
  addProduct,
  editProduct,
  deleteProduct,
  adminGetAllProducts,
} from "../controllers/adminProductsController.js";

const router = express.Router();

// Apply authentication & admin checking to all routes in this file
router.use(authenticateToken);

//For strict admin-only access
router.use(authorizeAdmin);

// Admin CRUD routes
router.get("/getAllProducts", adminGetAllProducts);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
