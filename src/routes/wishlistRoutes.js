// wishlist.routes.js
const express = require("express");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController"); // Adjust path
const { verifyToken } = require("../middleware/authMiddleware"); // Example auth middleware

const router = express.Router();

router.get("/:userId", verifyToken, getWishlist); // Get wishlist by user ID (protected)
router.post("/:userId", verifyToken, addToWishlist); // Add to wishlist (protected)
router.delete("/:userId/product/:productId", verifyToken, removeFromWishlist); // Remove from wishlist (protected)

module.exports = router;