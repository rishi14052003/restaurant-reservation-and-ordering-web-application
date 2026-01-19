const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const authRoutes = require('./routes/authRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Restaurant Reservation API',
    version: '1.0.0',
    endpoints: {
      auth: {
        'POST /api/auth/register': 'Register new user',
        'POST /api/auth/login': 'Login user',
        'GET /api/auth/profile': 'Get user profile (protected)',
        'GET /api/auth/users': 'Get all users (admin only)'
      },
      reservations: {
        'POST /api/reservations': 'Create reservation (protected)',
        'GET /api/reservations/user': 'Get user reservations (protected)',
        'GET /api/reservations/all': 'Get all reservations (admin only)',
        'GET /api/reservations/:id': 'Get reservation by ID (protected)',
        'PUT /api/reservations/:id': 'Update reservation (protected)',
        'DELETE /api/reservations/:id': 'Delete reservation (protected)'
      },
      orders: {
        'POST /api/orders': 'Create order (protected)',
        'GET /api/orders/user': 'Get user orders (protected)',
        'GET /api/orders/all': 'Get all orders (admin only)',
        'GET /api/orders/stats': 'Get order statistics (admin only)',
        'GET /api/orders/:id': 'Get order by ID (protected)',
        'PUT /api/orders/:id/status': 'Update order status (protected)',
        'DELETE /api/orders/:id': 'Delete order (protected)'
      }
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 API Documentation: http://localhost:${PORT}/api`);
  console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
});
