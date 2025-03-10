const express = require("express");
const {
  getCart,
  createCart,
  updateCart,
  deleteCart,
} = require("../controllers/cartController");
const { verifyToken } = require("../middleware/authMiddleware"); // Use protect

const router = express.Router();

router.get("/:userId", verifyToken, getCart); // Get cart by user ID (protected)
router.post("/", verifyToken, createCart); // Create cart (protected)
router.put("/:userId", verifyToken, updateCart); // Update cart (protected)
router.delete("/:userId", verifyToken, deleteCart); // Delete cart (protected)

module.exports = router;
