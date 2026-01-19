const express = require('express');
const { 
  createOrder, 
  getUserOrders, 
  getAllOrders, 
  getOrderById, 
  updateOrderStatus, 
  deleteOrder,
  getOrderStats
} = require('../controllers/orderController');
const { authenticateToken, requireAdmin } = require('../utils/auth');

const router = express.Router();

// Protected routes
router.post('/', authenticateToken, createOrder);
router.get('/user', authenticateToken, getUserOrders);

// Admin routes
router.get('/all', authenticateToken, requireAdmin, getAllOrders);
router.get('/stats', authenticateToken, requireAdmin, getOrderStats);
router.get('/:id', authenticateToken, getOrderById);
router.put('/:id/status', authenticateToken, updateOrderStatus);
router.delete('/:id', authenticateToken, deleteOrder);

module.exports = router;
