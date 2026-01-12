import React, { useState } from 'react';

const Payment = ({ order, onPayment }) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handlePayment = () => {
    if (paymentMethod) {
      alert(`Payment of $${calculateTotal()} made successfully using ${paymentMethod}`);
      onPayment({
        method: paymentMethod,
        paymentAmount: calculateTotal(),
      });
      setPaymentMethod('');
    } else {
      alert('Please select a payment method.');
    }
  };

  return (
    <div>
      <h2>Payment</h2>
      <p><strong>Total Amount: ${calculateTotal()}</strong></p>
      <label>Select Payment Method:</label>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="">Choose a method</option>
        <option value="Credit Card">Credit Card</option>
        <option value="Cash">Cash</option>
        <option value="UPI">UPI</option>
      </select>
      <br />
      <button onClick={handlePayment} disabled={!paymentMethod}>
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
