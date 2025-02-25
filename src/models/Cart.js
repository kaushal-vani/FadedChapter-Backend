const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      size: { type: String, required: true }, // Added size to match frontend
      quantity: { type: Number, required: true, min: 1 }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);
