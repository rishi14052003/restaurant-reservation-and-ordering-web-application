
import React, { useState } from 'react';
import Header from './components/Header';
import ReservationSystem from './ReservationSystem';
import OrderSystem from './Menu';
import Payment from './Payment';
import TableHistory from './TableHistory';
import ErrorModal from './components/ErrorModal';
import './index.css';

function App() {
  const [reservedTable, setReservedTable] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [order, setOrder] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '', type: 'error' });

  const showModal = (title, message, type = 'error') => {
    setModal({ isOpen: true, title, message, type });
  };

  const closeModal = () => {
    setModal({ isOpen: false, title: '', message: '', type: 'error' });
  };

  const handleReservation = (reservation) => {
    setReservedTable(reservation);
    setReservations((prev) => [...prev, reservation]);
    showModal('Reservation Successful!', 'Your table has been reserved successfully.', 'success');
  };

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
  };

  const handlePayment = (payment) => {
    setPaymentMethod(payment);
    setOrder([]);
    showModal(
      'Payment Successful!',
      `Your payment of ₹${payment.paymentAmount} has been processed successfully using ${payment.method}.`,
      'success'
    );
  };  

  return (
    <div>
      <Header />
      <main className="main-content">
        <div className="welcome-section">
          <h2 className="welcome-title">Welcome to Restaurant Hub</h2>
          <p className="welcome-subtitle">Reserve your table and order from our premium menu</p>
        </div>
        
        <ReservationSystem onReserve={handleReservation} showModal={showModal} />
        
        {reservedTable && (
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
      
      <ErrorModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
}

export default App;



