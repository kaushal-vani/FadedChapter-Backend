// wishlist.controller.js
const Wishlist = require("../models/Wishlist"); // Adjust path

// Get wishlist by user ID
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId }).populate("items.productId"); // Populate product details
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error: error.message });
  }
};

// Add to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.params.userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.params.userId, items: [] });
    }

    const { productId } = req.body;

    // Check if the product is already in the wishlist
    const productExists = wishlist.items.some(
      (item) => item.productId.toString() === productId
    );

    if (productExists) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    wishlist.items.push({ productId });
    const savedWishlist = await wishlist.save();
    res.status(201).json(savedWishlist);
  } catch (error) {
    res.status(400).json({ message: "Error adding to wishlist", error: error.message });
  }
};

// Remove from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId: req.params.userId },
      { $pull: { items: { productId: req.params.productId } } },
      { new: true }
    ).populate("items.productId"); // Populate product details

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error removing from wishlist", error: error.message });
  }
};