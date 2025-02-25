// user.routes.js (routes)
const express = require("express");
const {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController"); // Adjust path

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", getAllUsers); //get all users. (admin only)

module.exports = router;