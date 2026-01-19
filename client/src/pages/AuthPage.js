import React, { useState, useEffect } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      navigate('/');
    }
  }, [navigate]);

  const handleAuthSuccess = () => {
    navigate('/');
  };

  return (
    <div>
      {isLogin ? (
        <Login 
          onAuthSuccess={handleAuthSuccess}
          onSwitchToRegister={() => setIsLogin(false)}
        />
      ) : (
        <Register 
          onAuthSuccess={handleAuthSuccess}
          onSwitchToLogin={() => setIsLogin(true)}
        />
      )}
    </div>
  );
};

export default AuthPage;
