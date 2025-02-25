// order.controller.js
const Order = require("../models/Order"); // Adjust path

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: "Error creating order", error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("userId items.productId"); // Populate user and product details
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
};

// Get orders by user ID
exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate("items.productId"); // Populate product details
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

// Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error: error.message });
  }
};

// Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId items.productId"); // Populate user and product details
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};