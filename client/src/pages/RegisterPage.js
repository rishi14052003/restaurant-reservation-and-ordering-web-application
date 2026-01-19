import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, User, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import '../index.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear messages when user starts typing
    setError('');
    setSuccess('');

    // Check email validity in real-time
    if (e.target.name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailValid(emailRegex.test(e.target.value));
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }

    if (formData.name.length < 2) {
      setError('Name must be at least 2 characters long');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Password validation requirements
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (!/(?=.*[A-Z])/.test(formData.password)) {
      setError('Password must contain at least 1 uppercase letter');
      return false;
    }

    if (!/(?=.*[a-z])/.test(formData.password)) {
      setError('Password must contain at least 1 lowercase letter');
      return false;
    }

    if (!(/\d/.test(formData.password))) {
      setError('Password must contain at least 1 number');
      return false;
    }

    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(formData.password)) {
      setError('Password must contain at least 1 special character (!@#$%^&*()_+-=[]{}|:;<>,./?)');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      // Handle different response structures
      if (response.data.data && response.data.data.token && response.data.data.user) {
        // New response format with data wrapper
        setSuccess('Registration successful! Redirecting...');
        login(response.data.data.user, response.data.data.token);
        
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else if (response.data.token && response.data.user) {
        // Direct response format
        setSuccess('Registration successful! Redirecting...');
        login(response.data.user, response.data.token);
        
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setError('Email already exists. Please use a different email or sign in.');
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data?.data?.message) {
        setError(error.response.data.data.message);
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <UserPlus size={32} />
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join Restaurant Hub for premium dining experience</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {success && (
            <div className="success-message">
              <CheckCircle size={16} className="message-icon" />
              {success}
            </div>
          )}

          {error && (
            <div className="error-message">
              <AlertCircle size={16} className="message-icon" />
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">
              <User size={16} className="form-label-icon" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${error && error.includes('name') ? 'error' : ''}`}
              placeholder="Enter your full name"
              required
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Mail size={16} className="form-label-icon" />
              Email Address
              {emailValid === true && (
                <CheckCircle size={16} className="validation-icon success" />
              )}
              {emailValid === false && formData.email && (
                <AlertCircle size={16} className="validation-icon error" />
              )}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${error && error.includes('email') ? 'error' : ''} ${emailValid === true ? 'success' : ''}`}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
            {emailValid === true && (
              <div className="form-hint success">Valid email address</div>
            )}
            {emailValid === false && formData.email && (
              <div className="form-hint error">Please enter a valid email address</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock size={16} className="form-label-icon" />
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${error && error.includes('password') ? 'error' : ''}`}
                placeholder="Create a password"
                required
                autoComplete="new-password"
                minLength="6"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {formData.password && (
              <div className="form-hint">
                Password strength: {formData.password.length < 8 ? 'Weak (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol)' : 'Good'}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock size={16} className="form-label-icon" />
              Confirm Password
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <CheckCircle size={16} className="validation-icon success" />
              )}
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <AlertCircle size={16} className="validation-icon error" />
              )}
            </label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`form-input ${error && error.includes('password') ? 'error' : ''} ${formData.confirmPassword && formData.password === formData.confirmPassword ? 'success' : ''}`}
                placeholder="Confirm your password"
                required
                autoComplete="new-password"
                minLength="6"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="password-toggle"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <div className="form-hint success">Passwords match</div>
            )}
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <div className="form-hint error">Passwords do not match</div>
            )}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary auth-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus size={16} />
                Create Account
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
