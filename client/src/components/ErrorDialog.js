import React from 'react';
import { AlertCircle, CheckCircle, X, Info } from 'lucide-react';
import '../index.css';

const ErrorDialog = ({ isOpen, onClose, title, message, type = 'error' }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={24} />;
      case 'info':
        return <Info size={24} />;
      case 'error':
      default:
        return <AlertCircle size={24} />;
    }
  };

  const getIconClass = () => {
    switch (type) {
      case 'success':
        return 'error-dialog-icon success';
      case 'info':
        return 'error-dialog-icon info';
      case 'error':
      default:
        return 'error-dialog-icon error';
    }
  };

  const getDialogTitle = () => {
    switch (type) {
      case 'success':
        return 'Success';
      case 'info':
        return 'Information';
      case 'error':
      default:
        return 'Error';
    }
  };

  return (
    <div className="error-dialog-overlay" onClick={onClose}>
      <div className="error-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="error-dialog-close" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className={`error-dialog-icon ${getIconClass()}`}>
          {getIcon()}
        </div>
        
        <div className="error-dialog-content">
          <h3 className="error-dialog-title">
            {title || getDialogTitle()}
          </h3>
          <p className="error-dialog-message">
            {message}
          </p>
        </div>
        
        <div className="error-dialog-actions">
          <button 
            className={`error-dialog-btn ${type}`}
            onClick={onClose}
          >
            {type === 'success' ? 'Great!' : 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDialog;
