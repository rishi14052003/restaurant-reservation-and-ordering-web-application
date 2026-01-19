import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';
import './Auth.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Register = ({ onAuthSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Password validation regex
  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters long';
    if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least 1 uppercase letter';
    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) return 'Password must contain at least 1 special character';
    if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least 1 lowercase letter';
    if (!/(?=.*\d)/.test(password)) return 'Password must contain at least 1 number';
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validateName = (name) => {
    if (!name) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters long';
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;

    // Email validation
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    // Password validation
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, formData);
      
      // Store auth data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      onAuthSuccess(response.data);
      setIsLoading(false);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      setErrors({ general: errorMessage });
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: '', color: '' };
    
    let strength = 0;
    let requirements = [];
    
    if (password.length >= 8) { strength++; requirements.push('Length ✓'); }
    if (/(?=.*[a-z])/.test(password)) { strength++; requirements.push('Lowercase ✓'); }
    if (/(?=.*[A-Z])/.test(password)) { strength++; requirements.push('Uppercase ✓'); }
    if (/(?=.*\d)/.test(password)) { strength++; requirements.push('Number ✓'); }
    if (/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) { strength++; requirements.push('Special ✓'); }

    const strengthLevels = [
      { text: 'Very Weak', color: '#e53e3e' },
      { text: 'Weak', color: '#f56565' },
      { text: 'Fair', color: '#ed8936' },
      { text: 'Good', color: '#38b2ac' },
      { text: 'Strong', color: '#48bb78' },
      { text: 'Very Strong', color: '#2f855a' }
    ];

    return {
      strength,
      requirements,
      ...strengthLevels[Math.min(strength, strengthLevels.length - 1)]
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <User size={32} />
          </div>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join us to book tables and order delicious food</p>
        </div>

        {errors.general && (
          <div className="error-message">
            <AlertCircle size={14} />
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">
              <User size={16} className="form-label-icon" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter your full name"
              autoComplete="name"
            />
            {errors.name && (
              <div className="error-message">
                <AlertCircle size={14} />
                {errors.name}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <Mail size={16} className="form-label-icon" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Enter your email"
              autoComplete="email"
            />
            {errors.email && (
              <div className="error-message">
                <AlertCircle size={14} />
                {errors.email}
              </div>
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
                onChange={handleInputChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className="strength-fill" 
                    style={{ 
                      width: `${(passwordStrength.strength / 5) * 100}%`,
                      backgroundColor: passwordStrength.color 
                    }}
                  />
                </div>
                <span className="strength-text" style={{ color: passwordStrength.color }}>
                  {passwordStrength.text}
                </span>
              </div>
            )}

            {/* Password Requirements */}
            {formData.password && (
              <div className="password-requirements">
                <div className="requirements-title">Password must contain:</div>
                <div className="requirements-list">
                  {['At least 8 characters', '1 uppercase letter', '1 lowercase letter', '1 number', '1 special character'].map((req, index) => (
                    <div key={index} className="requirement-item">
                      {passwordStrength.requirements[index] ? (
                        <CheckCircle size={12} className="requirement-met" />
                      ) : (
                        <div className="requirement-unmet" />
                      )}
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {errors.password && (
              <div className="error-message">
                <AlertCircle size={14} />
                {errors.password}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock size={16} className="form-label-icon" />
              Confirm Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="Confirm your password"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <div className="error-message">
                <AlertCircle size={14} />
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="auth-submit-btn"
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-switch">
            Already have an account?
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="auth-switch-btn"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
