const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      addedAt: { type: Date, default: Date.now } // Optional: Track when the item was added
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Wishlist", WishlistSchema);
