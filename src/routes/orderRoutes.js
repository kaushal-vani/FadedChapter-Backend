// order.routes.js
const express = require("express");
const {
  createOrder,
  getOrderById,
  getOrdersByUser,
  updateOrderStatus,
  getAllOrders,
} = require("../controllers/orderController"); // Adjust path
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware"); // Example auth middleware

const router = express.Router();

router.post("/", verifyToken, createOrder); // Create order (protected)
router.get("/:id", verifyToken, getOrderById); // Get order by ID (protected)
router.get("/user/:userId", verifyToken, getOrdersByUser); // Get orders by user ID (protected)
router.put("/:id/status", verifyAdmin, updateOrderStatus); // Update order status (admin only)
router.get("/", verifyAdmin, getAllOrders); // Get all orders (admin only)

module.exports = router;