const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const authRoutes = require('./auth');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from client folder
app.use(express.static(path.join(__dirname, '../client')));

// In-memory storage (in production, use a proper database)
let reservations = [];
let orders = [];
let orderIdCounter = 1;

// Helper functions
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Routes
app.use('/api/auth', authRoutes);

// Protected routes
app.post('/api/reservations', authenticateToken, (req, res) => {
  try {
    const { tableId, date, startTime, endTime, seats } = req.body;
    const userId = req.user.id;

    // Validation
    if (!tableId || !date || !startTime || !endTime || !seats) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for conflicts
    const conflict = reservations.find(r => 
      r.tableId === tableId && 
      r.date === date && 
      ((startTime >= r.startTime && startTime < r.endTime) || 
       (endTime > r.startTime && endTime <= r.endTime))
    );

    if (conflict) {
      return res.status(409).json({ message: 'Table already reserved for this time slot' });
    }

    const reservation = {
      id: reservations.length + 1,
      userId,
      tableId,
      date,
      startTime,
      endTime,
      seats,
      createdAt: new Date()
    };

    reservations.push(reservation);
    res.status(201).json({ message: 'Reservation created successfully', reservation });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/reservations', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const userReservations = reservations.filter(r => r.userId === userId);
    res.json(userReservations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/orders', authenticateToken, (req, res) => {
  try {
    const { items, totalAmount, paymentMethod } = req.body;
    const userId = req.user.id;

    // Validation
    if (!items || !totalAmount || !paymentMethod) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const order = {
      id: orderIdCounter++,
      userId,
      items,
      totalAmount,
      paymentMethod,
      status: 'completed',
      createdAt: new Date()
    };

    orders.push(order);
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/orders', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const userOrders = orders.filter(o => o.userId === userId);
    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Serve React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Client app served from: ${path.join(__dirname, '../client')}`);
});
