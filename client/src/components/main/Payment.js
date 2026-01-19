import React, { useState } from 'react';
import { CreditCard, DollarSign, Smartphone, CheckCircle, AlertCircle } from 'lucide-react';
import '../../index.css';

const Payment = ({ order, onPayment }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit Card',
      icon: CreditCard,
      description: 'Pay securely with your credit or debit card',
      color: 'blue'
    },
    {
      id: 'cash',
      name: 'Cash',
      icon: DollarSign,
      description: 'Pay with cash when you visit',
      color: 'green'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: Smartphone,
      description: 'Instant payment via UPI apps',
      color: 'purple'
    }
  ];

  const handlePayment = async () => {
    if (!paymentMethod) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      onPayment({
        method: paymentMethods.find(m => m.id === paymentMethod)?.name || paymentMethod,
        paymentAmount: calculateTotal(),
      });
      setPaymentMethod('');
      setIsProcessing(false);
    }, 2000);
  };

  if (order.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No Items to Pay</h3>
          <p className="text-slate-600">Please add items to your order first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-title">Payment</div>
      <p className="card-subtitle">Choose your preferred payment method</p>

      <div className="payment-total">
        <div className="payment-total-info">
          <h3>Total Amount</h3>
          <p className="payment-total-amount">₹{calculateTotal()}</p>
        </div>
        <div className="payment-total-icon">
          <DollarSign size={24} />
        </div>
      </div>

      <div className="payment-methods">
        <h3 className="card-title">Select Payment Method</h3>
        <div>
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = paymentMethod === method.id;
            
            return (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`payment-method ${isSelected ? 'selected' : ''}`}
              >
                <div className="payment-method-icon">
                  <Icon size={20} />
                </div>
                <div className="payment-method-info">
                  <h4>{method.name}</h4>
                  <p className="payment-method-description">{method.description}</p>
                </div>
                {isSelected && (
                  <div className="payment-method-check">
                    <CheckCircle size={16} color="white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={!paymentMethod || isProcessing}
        className="btn btn-primary"
      >
        {isProcessing ? (
          <>
            <div className="processing-spinner"></div>
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <DollarSign size={20} />
            <span>Pay Now</span>
          </>
        )}
      </button>

      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <p className="card-subtitle">
          <span className="form-label-icon">
            <AlertCircle size={14} />
          </span>
          Your payment information is secure and encrypted
        </p>
      </div>
    </div>
  );
};

export default Payment;
