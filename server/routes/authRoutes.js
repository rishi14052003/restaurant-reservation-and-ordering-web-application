const express = require('express');
const { register, login, getProfile, getAllUsers } = require('../controllers/authController');
const { authenticateToken, requireAdmin } = require('../utils/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.get('/users', authenticateToken, requireAdmin, getAllUsers);

module.exports = router;
