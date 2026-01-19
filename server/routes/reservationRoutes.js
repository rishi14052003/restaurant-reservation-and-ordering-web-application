const express = require('express');
const { 
  createReservation, 
  getUserReservations, 
  getAllReservations, 
  getReservationById, 
  updateReservation, 
  deleteReservation 
} = require('../controllers/reservationController');
const { authenticateToken, requireAdmin } = require('../utils/auth');

const router = express.Router();

// Protected routes
router.post('/', authenticateToken, createReservation);
router.get('/user', authenticateToken, getUserReservations);

// Admin routes
router.get('/all', authenticateToken, requireAdmin, getAllReservations);
router.get('/:id', authenticateToken, getReservationById);
router.put('/:id', authenticateToken, updateReservation);
router.delete('/:id', authenticateToken, deleteReservation);

module.exports = router;
