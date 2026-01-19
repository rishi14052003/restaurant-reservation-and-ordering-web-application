import React, { useState } from 'react';
import { Utensils, Clock, Calendar, User, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">
            <Utensils size={24} color="white" />
          </div>
          <div className="logo-text">
            <h1>Restaurant Hub</h1>
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
          <button className="sign-in-btn">
            <User size={16} />
            <span>Sign In</span>
          </button>
          
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
          <button className="sign-in-btn">
            <User size={16} />
            <span>Sign In</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
