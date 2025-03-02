const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const { body } = require("express-validator");

// Validation rules for product creation & update
const productValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("category").isIn(["Men", "Women", "Unisex"]).withMessage("Invalid category"),
  body("productType").isIn(["T-Shirt", "Hoodie", "Shirt", "Polo", "Jeans", "Sweater", "Shorts", "Accessories"]).withMessage("Invalid product type"),
  body("size").isArray().withMessage("Size must be an array"),
  body("size.*.size").isIn(["XS", "S", "M", "L", "XL", "XXL", "XXXL"]).withMessage("Invalid size"),
  body("size.*.stock").isNumeric().withMessage("Stock must be a number"),
  body("size.*.available").isBoolean().withMessage("Available must be a boolean"),
  body("fitType").isIn(["Regular", "Relaxed", "Boxy", "Slim", "Oversized"]).withMessage("Invalid fit type"),
  body("color").isIn(["Black", "White", "Red", "Blue", "Gray"]).withMessage("Invalid color"),
  body("slug").notEmpty().withMessage("Slug is required"),
];

const updateProductValidationRules = [
  body("name").optional().notEmpty().withMessage("Name is required"),
  body("price").optional().isNumeric().withMessage("Price must be a number"),
  body("category").optional().isIn(["Men", "Women", "Unisex"]).withMessage("Invalid category"),
  body("productType").optional().isIn(["T-Shirt", "Hoodie", "Shirt", "Polo", "Jeans", "Sweater", "Shorts", "Accessories"]).withMessage("Invalid product type"),
  body("size").optional().isArray().withMessage("Size must be an array"),
  body("size.*.size").optional().isIn(["XS", "S", "M", "L", "XL", "XXL", "XXXL"]).withMessage("Invalid size"),
  body("size.*.stock").optional().isNumeric().withMessage("Stock must be a number"),
  body("size.*.available").optional().isBoolean().withMessage("Available must be a boolean"),
  body("fitType").optional().isIn(["Regular", "Relaxed", "Boxy", "Slim", "Oversized"]).withMessage("Invalid fit type"),
  body("color").optional().isIn(["Black", "White", "Red", "Blue", "Gray"]).withMessage("Invalid color"),
  body("slug").optional().notEmpty().withMessage("Slug is required"),
];

// ============================
// 🔎 Public Search & Filter Routes
// ============================
router.get("/search", productController.searchProducts);
router.get("/", productController.getAllProducts);
router.get("/category/:category", productController.getProductsByCategory);
router.get("/type/:productType", productController.getProductsByType);
router.get("/slug/:slug", productController.getProductBySlug);
router.get("/new-arrivals", productController.getNewArrivals); //Integrated
router.get("/best-selling", productController.getBestSelling); //Integrated
router.get("/featured", productController.getFeatured); //Integrated
router.get("/collaboration", productController.getCollaboration); //Yet to plan

// ============================
// 📦 Public Product Details
// ============================
router.get("/:id", productController.getProductById);

// ============================
// 🔐 Admin-Only Product Management
// ============================
router.post(
  "/",
  authMiddleware.verifyToken,
  authMiddleware.verifyAdmin,
  productValidationRules,
  productController.createProduct
);

router.put(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.verifyAdmin,
  updateProductValidationRules,
  productController.updateProduct
);

router.delete(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.verifyAdmin,
  productController.deleteProduct
);

module.exports = router;
