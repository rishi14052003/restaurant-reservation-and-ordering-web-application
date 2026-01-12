
import React from 'react';

function TableHistory({ reservations }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="history-section" style={{ textAlign: 'center' }}>
      <h2>Reservation History</h2>
      {reservations.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {reservations.map((res, index) => (
            <li
              key={index}
              style={{
                background: '#eaf5ea',
                border: '2px solid #4CAF50',
                borderRadius: '8px',
                padding: '8px',
                margin: '8px auto',
                maxWidth: '500px',
                fontWeight: '500',
              }}
            >
              Table- {res.tableId} , {formatDate(res.date)} , {res.startTime}-{res.endTime} , No Of People:{res.seats}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TableHistory;
