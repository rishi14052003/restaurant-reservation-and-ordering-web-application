import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import ReservationSystem from './ReservationSystem';
import OrderSystem from './Menu';
import Payment from './Payment';
import TableHistory from './TableHistory';
import ErrorDialog from './components/ErrorDialog';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import axios from 'axios';
import './index.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function AppContent() {
  const [reservedTable, setReservedTable] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [order, setOrder] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '', type: 'error' });
  const [loading, setLoading] = useState(false);
  const { user, login, logout } = useAuth();

  const showModal = (title, message, type = 'error') => {
    setModal({ isOpen: true, title, message, type });
  };

  const closeModal = () => {
    setModal({ isOpen: false, title: '', message: '', type: 'error' });
  };

  const loadUserReservations = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token && user) {
        const response = await axios.get(`${API_BASE_URL}/reservations`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReservations(response.data);
      }
    } catch (error) {
      console.error('Error loading reservations:', error);
    }
  };

  const handleSignOut = () => {
    logout();
    setReservedTable(null);
    setOrder([]);
    setPaymentMethod(null);
    setReservations([]);
  };

  useEffect(() => {
    if (user) {
      loadUserReservations();
    }
  }, [user]);

  const handleReservation = async (reservation) => {
    if (!user) {
      showModal('Authentication Required', 'Please sign in to make a reservation', 'info');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/reservations`, reservation, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setReservedTable(response.data);
      setReservations(prev => [...prev, response.data]);
      showModal('Reservation Successful!', 'Your table has been reserved successfully.', 'success');
    } catch (error) {
      showModal('Reservation Failed', error.response?.data?.message || 'Failed to make reservation', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOrderChange = (newOrder) => {
    if (!user) {
      showModal('Authentication Required', 'Please sign in to place an order', 'info');
      return;
    }
    setOrder(newOrder);
  };

  const handlePayment = async (payment) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const orderData = {
        items: order,
        totalAmount: payment.paymentAmount,
        paymentMethod: payment.method
      };

      await axios.post(`${API_BASE_URL}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPaymentMethod(payment);
      setOrder([]);
      showModal(
        'Payment Successful!',
        `Your payment of ₹${payment.paymentAmount} has been processed successfully using ${payment.method}.`,
        'success'
      );
    } catch (error) {
      showModal('Payment Failed', error.response?.data?.message || 'Failed to process payment', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          
          <Route path="/register" element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } />

          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Header user={user} onSignOut={handleSignOut} />
              <main className="main-content">
                <div className="welcome-section">
                  <h2 className="welcome-title">
                    Welcome back, {user?.name}!
                  </h2>
                  <p className="welcome-subtitle">
                    Continue your dining experience with our premium menu and reservations
                  </p>
                </div>
                
                <ReservationSystem onReserve={handleReservation} showModal={showModal} loading={loading} />
                
                {reservedTable && user && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                    <OrderSystem
                      table={reservedTable}
                      order={order}
                      onOrderChange={handleOrderChange}
                    />
                    <Payment order={order} onPayment={handlePayment} />
                  </div>
                )}
                
                {paymentMethod && (
                  <div className="success-message">
                    <div className="success-icon">
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="success-content">
                      <h3>Payment Successful!</h3>
                      <p>{paymentMethod.method} - ₹{paymentMethod.paymentAmount}</p>
                    </div>
                  </div>
                )}
                
                <TableHistory reservations={reservations} />
              </main>
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        <ErrorDialog
          isOpen={modal.isOpen}
          onClose={closeModal}
          title={modal.title}
          message={modal.message}
          type={modal.type}
        />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
