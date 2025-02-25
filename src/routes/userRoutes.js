const express = require("express");
const {
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Get user by ID (protected)
router.get("/:id", verifyToken, getUserById);

// Update user (protected, only the user or admin)
router.put("/:id", verifyToken, updateUser);

// Delete user (protected, only the user or admin)
router.delete("/:id", verifyToken, deleteUser);

// Get all users (admin only)
router.get("/", verifyToken, getAllUsers);

module.exports = router;
