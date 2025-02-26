// product.routes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const { body, validationResult } = require("express-validator");

// Validation rules for creating a product
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

// Validation rules for updating a product
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

// Create a new product (Admin Only)
router.post("/", authMiddleware.verifyToken, authMiddleware.verifyAdmin, productValidationRules, productController.createProduct);

// Get all products
router.get("/", productController.getAllProducts);

// Get a single product by ID
router.get("/:id", productController.getProductById);

// Update a product by ID (Admin Only)
router.put("/:id", authMiddleware.verifyToken, authMiddleware.verifyAdmin, updateProductValidationRules, productController.updateProduct);

// Delete a product by ID (Admin Only)
router.delete("/:id", authMiddleware.verifyToken, authMiddleware.verifyAdmin, productController.deleteProduct);

// Get products by category
router.get("/category/:category", productController.getProductsByCategory);

// Get products by productType
router.get("/type/:productType", productController.getProductsByType);

// Get product by slug
router.get("/slug/:slug", productController.getProductBySlug);

// Get new arrivals
router.get("/new-arrivals", productController.getNewArrivals);

// Get best selling products
router.get("/best-selling", productController.getBestSelling);

// Get featured products
router.get("/featured", productController.getFeatured);

// Get collaboration products
router.get("/collaboration", productController.getCollaboration);

module.exports = router;