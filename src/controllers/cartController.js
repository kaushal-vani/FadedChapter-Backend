// cart.controller.js
const Cart = require("../models/Cart"); // Adjust path

// Get cart by user ID
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId"); // Populate product details
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
};

// Create a new cart
exports.createCart = async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(400).json({ message: "Error creating cart", error: error.message });
  }
};

// Update cart
exports.updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: req.body },
      { new: true }
    ).populate("items.productId"); // Populate product details

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error: error.message });
  }
};

// Delete cart
exports.deleteCart = async (req, res) => {
  try {
    const deletedCart = await Cart.findOneAndDelete({ userId: req.params.userId });
    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting cart", error: error.message });
  }
};