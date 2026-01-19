import { useState, useEffect } from 'react';
import api from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userReservations, setUserReservations] = useState([]);

  const loadUserReservations = async () => {
    try {
      const response = await api.get('/reservations/user');
      setUserReservations(response.data.data || []);
    } catch (error) {
      console.error('Error loading reservations:', error);
      setUserReservations([]);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user info
      api.get('/auth/profile')
        .then(response => {
          setUser(response.data);
          // Load user reservations after successful authentication
          loadUserReservations();
        })
        .catch(() => {
          localStorage.removeItem('token');
          setUserReservations([]);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      setUserReservations([]);
    }
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, user: userData } = response.data;
    localStorage.setItem('token', token);
    setUser(userData);
    // Load user reservations after login
    await loadUserReservations();
    return userData;
  };

  const register = async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    const { token, user: userData } = response.data;
    localStorage.setItem('token', token);
    setUser(userData);
    // Load user reservations after registration
    await loadUserReservations();
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setUserReservations([]);
  };

  const refreshReservations = async () => {
    await loadUserReservations();
  };

  return { user, loading, userReservations, login, register, logout, refreshReservations };
};