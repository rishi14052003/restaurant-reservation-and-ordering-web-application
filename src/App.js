
import React, { useState } from 'react';
import ReservationSystem from './ReservationSystem';
import OrderSystem from './Menu';
import Payment from './Payment';
import TableHistory from './TableHistory';
import './App.css';

function App() {
  const [reservedTable, setReservedTable] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [order, setOrder] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleReservation = (reservation) => {
    setReservedTable(reservation);
    setReservations((prev) => [...prev, reservation]);
  };

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
  };

  const handlePayment = (payment) => {
    setPaymentMethod(payment);
    setOrder([]);
  };

  return (
    <div className="App">
      <h1>Restaurant Reservation & Ordering Application</h1>
      <ReservationSystem onReserve={handleReservation} />
      {reservedTable && (
        <>
          <OrderSystem
            table={reservedTable}
            order={order}
            onOrderChange={handleOrderChange}
          />
          <Payment order={order} onPayment={handlePayment} />
        </>
      )}
      {paymentMethod && (
        <p>
          Payment completed using: {paymentMethod.method} ($
          {paymentMethod.paymentAmount})
        </p>
      )}
      <TableHistory reservations={reservations} />
    </div>
  );
}

export default App;



