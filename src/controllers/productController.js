// product.controller.js
const Product = require("../models/Product");
const { validationResult } = require("express-validator");
const sanitizeHtml = require("sanitize-html");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { slug, description, composition } = req.body;

    // Check for duplicate slug
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    // Sanitize description and composition
    const sanitizedDescription = description ? sanitizeHtml(description) : undefined;
    const sanitizedComposition = composition ? sanitizeHtml(composition) : undefined;

    const product = new Product({
      ...req.body,
      description: sanitizedDescription,
      composition: sanitizedComposition,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all products (with pagination and filtering)
exports.getAllProducts = async (req, res) => {
  try {
    const { all } = req.query;
    let products;

    if (all === "true") {
      products = await Product.find(); // Fetch all products
    } else {
      const { page = 1, limit = 10 } = req.query;
      products = await Product.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
    }

    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};


// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error getting product by ID:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description, composition } = req.body;

    const sanitizedDescription = description ? sanitizeHtml(description) : undefined;
    const sanitizedComposition = composition ? sanitizeHtml(composition) : undefined;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        description: sanitizedDescription,
        composition: sanitizedComposition,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    console.error("Error getting products by category:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get products by productType
exports.getProductsByType = async (req, res) => {
  try {
    const products = await Product.find({ productType: req.params.productType });
    res.json(products);
  } catch (error) {
    console.error("Error getting products by type:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get product by slug
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error getting product by slug:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get new arrivals
exports.getNewArrivals = async (req, res) => {
  try {
    const products = await Product.find({ isNewArrival: true });
    res.json(products);
  } catch (error) {
    console.error("Error getting new arrivals:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get best selling products
exports.getBestSelling = async (req, res) => {
  try {
    const products = await Product.find({ isBestSelling: true });
    res.json(products);
  } catch (error) {
    console.error("Error getting best selling products:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get featured products
exports.getFeatured = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true });
    res.json(products);
  } catch (error) {
    console.error("Error getting featured products:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get collaboration products
exports.getCollaboration = async (req, res) => {
  try {
    const products = await Product.find({ isCollaboration: true });
    res.json(products);
  } catch (error) {
    console.error("Error getting collaboration products:", error);
    res.status(500).json({ message: error.message });
  }
};

// Search products by query (name, category, color, etc.)
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const searchRegex = new RegExp(query, "i");

    const products = await Product.find({
      $or: [
        { name: searchRegex },
        { category: searchRegex },
        { color: searchRegex },
        { productType: searchRegex },
        { fitType: searchRegex }
      ]
    });

    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


