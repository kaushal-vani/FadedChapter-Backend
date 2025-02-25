const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      size: { type: String, required: true }, 
      quantity: { type: Number, required: true, min: 1 }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
  address: { type: String, required: true },
  paymentMethod: { type: String, enum: ["Credit Card", "PayPal", "Cash on Delivery"], required: true }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
