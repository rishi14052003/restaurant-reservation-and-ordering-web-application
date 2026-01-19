import React from 'react';
import { AlertTriangle, X, CheckCircle, Info } from 'lucide-react';

const ErrorModal = ({ isOpen, onClose, title, message, type = 'error' }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={24} />;
      case 'info':
        return <Info size={24} />;
      default:
        return <AlertTriangle size={24} />;
    }
  };

  const getIconClass = () => {
    switch (type) {
      case 'success':
        return 'modal-icon success';
      case 'info':
        return 'modal-icon info';
      default:
        return 'modal-icon error';
    }
  };

  const getButtonClass = () => {
    switch (type) {
      case 'success':
        return 'modal-button success';
      case 'info':
        return 'modal-button info';
      default:
        return 'modal-button error';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="modal-close"
        >
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className={getIconClass()}>
            {getIcon()}
          </div>
          <h3 className="modal-title">{title}</h3>
        </div>

        <p className="modal-message">{message}</p>

        <button
          onClick={onClose}
          className={getButtonClass()}
        >
          {type === 'success' ? 'Great!' : 'Got it'}
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
