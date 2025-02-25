const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true }, // Matches `image` in the Angular interface
    productGallery: { type: [String] }, // Array of image URLs for additional views
    description: { type: String },
    composition: { type: String }, // Material composition
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true }, // Boolean to check availability
    category: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
      required: true,
    },
    productType: {
      type: String,
      enum: [
        "T-Shirt",
        "Hoodie",
        "Shirt",
        "Polo",
        "Jeans",
        "Sweater",
        "Shorts",
        "Accessories",
      ],
      required: true,
    },
    size: [
      {
        size: {
          type: String,
          enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
          required: true,
        },
        stock: { type: Number, required: true },
        available: { type: Boolean, required: true },
      },
    ],
    fitType: {
      type: String,
      enum: ["Regular", "Relaxed", "Boxy", "Slim", "Oversized"],
      required: true,
    },
    color: {
      type: String,
      enum: ["Black", "White", "Red", "Blue", "Gray"],
      required: true,
    },
    isNewArrival: { type: Boolean, default: false },
    isBestSelling: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isCollaboration: { type: Boolean, default: false },
    discountPercentage: { type: Number, default: 0 }, // Discount on the product
    rating: { type: Number, min: 0, max: 5, default: 0 }, // Product rating (0-5)
    slug: { type: String, required: true, unique: true }, // SEO-friendly URL identifier
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
