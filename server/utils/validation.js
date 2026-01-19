// Password validation regex
// Requirements: minimum length 8, 1 uppercase, 1 symbol compulsory
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-z])(?=.*\d).{8,}$/;

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation functions
const validatePassword = (password) => {
  if (!password) {
    return {
      isValid: false,
      error: 'Password is required',
      requirements: {
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        symbol: false
      }
    };
  }

  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  };

  const isValid = PASSWORD_REGEX.test(password);
  const error = isValid ? null : 'Password must be at least 8 characters long and contain 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character';

  return {
    isValid,
    error,
    requirements
  };
};

const validateEmail = (email) => {
  if (!email) {
    return {
      isValid: false,
      error: 'Email is required'
    };
  }

  const isValid = EMAIL_REGEX.test(email);
  const error = isValid ? null : 'Please enter a valid email address';

  return {
    isValid,
    error
  };
};

const validateName = (name) => {
  if (!name) {
    return {
      isValid: false,
      error: 'Name is required'
    };
  }

  if (name.length < 2) {
    return {
      isValid: false,
      error: 'Name must be at least 2 characters long'
    };
  }

  if (name.length > 50) {
    return {
      isValid: false,
      error: 'Name must be less than 50 characters long'
    };
  }

  const isValid = /^[a-zA-Z\s]+$/.test(name.trim());
  const error = isValid ? null : 'Name can only contain letters and spaces';

  return {
    isValid,
    error
  };
};

const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === '') {
    return {
      isValid: false,
      error: `${fieldName} is required`
    };
  }

  return {
    isValid: true,
    error: null
  };
};

module.exports = {
  PASSWORD_REGEX,
  EMAIL_REGEX,
  validatePassword,
  validateEmail,
  validateName,
  validateRequired
};
