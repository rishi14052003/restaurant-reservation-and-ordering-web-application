import React, { useState } from 'react';
import { Utensils, Clock, Calendar, User, Menu, X, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ user, onSignOut }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    onSignOut();
    navigate('/login');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <Utensils size={24} color="white" />
            </div>
            <div className="logo-text">
              <h1>RestaurantHub</h1>
              <p>Premium Dining Experience</p>
            </div>
          </div>
          
          <nav className="nav-menu">
            <div className="nav-item">
              <Calendar size={16} />
              <span>Reservations</span>
            </div>
            <div className="nav-item">
              <Utensils size={16} />
              <span>Menu</span>
            </div>
            <div className="nav-item">
              <Clock size={16} />
              <span>History</span>
            </div>
          </nav>

          <div className="header-actions">
            {user ? (
              <div className="user-menu">
                <div className="user-info">
                  <div className="user-avatar">
                    <User size={16} />
                  </div>
                  <span className="user-name">{user.name}</span>
                </div>
                <button className="sign-out-btn" onClick={handleSignOut}>
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button 
                className="sign-in-btn" 
                onClick={handleSignIn}
              >
                <User size={16} />
                <span>Sign In</span>
              </button>
            )}
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-btn"
            >
              {isMobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <div className="nav-item">
              <Calendar size={16} />
              <span>Reservations</span>
            </div>
            <div className="nav-item">
              <Utensils size={16} />
              <span>Menu</span>
            </div>
            <div className="nav-item">
              <Clock size={16} />
              <span>History</span>
            </div>
            {user ? (
              <>
                <div className="mobile-user-info">
                  <div className="user-avatar">
                    <User size={16} />
                  </div>
                  <span className="user-name">{user.name}</span>
                </div>
                <button className="sign-out-btn" onClick={handleSignOut}>
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <button 
                className="sign-in-btn" 
                onClick={handleSignIn}
              >
                <User size={16} />
                <span>Sign In</span>
              </button>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
