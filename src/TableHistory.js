import React from 'react';
import { Clock, Calendar, Users, History, CheckCircle } from 'lucide-react';
import './index.css';

function TableHistory({ reservations }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };
  
  return (
    <div className="card">
      <div className="history-header">
        <div className="history-icon">
          <History size={24} />
        </div>
        <h2 className="history-title">Reservation History</h2>
      </div>
      <p className="card-subtitle">View all your past and upcoming reservations</p>
      
      {reservations.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <Calendar size={32} />
          </div>
          <h3 className="empty-title">No Reservations Yet</h3>
          <p className="empty-description">Your reservation history will appear here once you make a reservation.</p>
        </div>
      ) : (
        <div>
          <div className="history-stats">
            <p className="history-count">
              {reservations.length} {reservations.length === 1 ? 'Reservation' : 'Reservations'}
            </p>
            <div className="history-status">
              <CheckCircle size={16} />
              <span>Confirmed</span>
            </div>
          </div>
          
          <div>
            {reservations.map((res, index) => (
              <div key={index} className="reservation-item">
                <div className="reservation-header">
                  <div className="reservation-table-icon">
                    <Users size={20} />
                  </div>
                  <div className="reservation-table-info">
                    <h4>Table {res.tableId}</h4>
                    <p className="reservation-seats">{res.seats} {res.seats === 1 ? 'Person' : 'People'}</p>
                  </div>
                </div>
                
                <div className="reservation-details">
                  <div className="reservation-detail">
                    <Calendar size={16} className="reservation-detail-icon" />
                    <span className="reservation-detail-text">{formatDate(res.date)}</span>
                  </div>
                  <div className="reservation-detail">
                    <Clock size={16} className="reservation-detail-icon" />
                    <span className="reservation-detail-text">{formatTime(res.startTime)} - {formatTime(res.endTime)}</span>
                  </div>
                </div>
                
                <div className="reservation-status">
                  Confirmed
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TableHistory;
