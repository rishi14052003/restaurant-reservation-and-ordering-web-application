const Order = require('../models/Order');

// Create a new order
const createOrder = (req, res) => {
  try {
    const { items, totalAmount, paymentMethod } = req.body;
    const userId = req.user.id;

    // Validation
    if (!items || !totalAmount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: items, totalAmount, paymentMethod'
      });
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Items must be a non-empty array'
      });
    }

    // Validate totalAmount
    if (typeof totalAmount !== 'number' || totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Total amount must be a positive number'
      });
    }

    // Validate payment method
    const validPaymentMethods = ['credit-card', 'debit-card', 'cash', 'upi', 'wallet'];
    if (!validPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment method',
        validMethods: validPaymentMethods
      });
    }

    // Create order
    const order = Order.create({
      userId,
      items,
      totalAmount,
      paymentMethod
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get user's orders
const getUserOrders = (req, res) => {
  try {
    const userId = req.user.id;
    const orders = Order.findByUserId(userId);

    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
      data: orders,
      count: orders.length
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving orders',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all orders (admin only)
const getAllOrders = (req, res) => {
  try {
    const orders = Order.findAll();
    res.status(200).json({
      success: true,
      message: 'All orders retrieved successfully',
      data: orders,
      count: orders.length
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving orders',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get order by ID
const getOrderById = (req, res) => {
  try {
    const { id } = req.params;
    const order = Order.findById(parseInt(id));

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order or is admin
    if (order.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You can only view your own orders'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order retrieved successfully',
      data: order
    });
  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update order status
const updateOrderStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    const existingOrder = Order.findById(parseInt(id));
    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (existingOrder.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You can only update your own orders'
      });
    }

    // Validate status
    const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order status',
        validStatuses
      });
    }

    const updatedOrder = Order.updateStatus(parseInt(id), status);

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: updatedOrder
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating order status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete order
const deleteOrder = (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingOrder = Order.findById(parseInt(id));
    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (existingOrder.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You can only delete your own orders'
      });
    }

    const deletedOrder = Order.delete(parseInt(id));

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
      data: deletedOrder
    });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get order statistics
const getOrderStats = (req, res) => {
  try {
    const totalRevenue = Order.getTotalRevenue();
    const totalOrders = Order.getCount();
    const completedOrders = Order.findByStatus('completed').length;
    const pendingOrders = Order.findByStatus('pending').length;

    res.status(200).json({
      success: true,
      message: 'Order statistics retrieved successfully',
      data: {
        totalRevenue,
        totalOrders,
        completedOrders,
        pendingOrders,
        completionRate: totalOrders > 0 ? (completedOrders / totalOrders * 100).toFixed(2) : 0
      }
    });
  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving order statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getOrderStats
};
