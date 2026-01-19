import React, { useState } from 'react';
import tableImage from './images.png';
import { Calendar, Clock, Users, Check } from 'lucide-react';
import './index.css';

function ReservationSystem({ onReserve, showModal }) {
  const [tables, setTables] = useState([
    { id: 1, seats: 5 },
    { id: 2, seats: 5 },
    { id: 3, seats: 5 },
    { id: 4, seats: 5 },
    { id: 5, seats: 5 },
    { id: 6, seats: 5 },
    { id: 7, seats: 5 },
    { id: 8, seats: 5 },
    { id: 9, seats: 5 },
    { id: 10, seats: 5 },
  ]);

  const [reservations, setReservations] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [seatsToReserve, setSeatsToReserve] = useState(1);

  const handleTableSelect = (tableId) => {
    setSelectedTable(tableId);
  };

  const checkOverlap = (start1, end1, start2, end2) => {
    return start1 < end2 && start2 < end1;
  };

  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleReserve = () => {
    if (!selectedTable) {
      showModal('No Table Selected', 'Please select a table before making a reservation.', 'error');
      return;
    }
    if (!date || !startTime || !endTime) {
      showModal('Missing Information', 'Please enter date, start time, and end time for your reservation.', 'error');
      return;
    }
    if (endTime <= startTime) {
      showModal('Invalid Time', 'End time must be after start time. Please adjust your reservation times.', 'error');
      return;
    }

    const selectedStart = new Date(`${date}T${startTime}`);
    const now = new Date();
    if (selectedStart < now) {
      showModal('Invalid Date', 'Cannot book a table in the past. Please select a future date and time.', 'error');
      return;
    }

    const alreadyReserved = reservations.some(
      (r) =>
        r.tableId === selectedTable &&
        r.date === date &&
        checkOverlap(startTime, endTime, r.startTime, r.endTime)
    );

    if (alreadyReserved) {
      showModal('Table Already Booked', `Table ${selectedTable} is already booked between ${startTime} and ${endTime} on ${date}. Please choose a different time or table.`, 'error');
      return;
    }

    const table = tables.find((t) => t.id === selectedTable);
    if (seatsToReserve > table.seats) {
      showModal('Not Enough Seats', `Only ${table.seats} seats are available for this table. Please reduce the number of seats.`, 'error');
      return;
    }

    const updatedTables = tables.map((t) =>
      t.id === selectedTable ? { ...t, seats: t.seats - seatsToReserve } : t
    );
    setTables(updatedTables);

    const reservation = {
      tableId: selectedTable,
      date,
      startTime,
      endTime,
      seats: seatsToReserve,
    };

    setReservations([...reservations, reservation]);
    onReserve(reservation);

    setSelectedTable(null);
    setDate('');
    setStartTime('');
    setEndTime('');
    setSeatsToReserve(1);
  };

  return (
    <div className="card">
      <div className="card-title">Reserve Your Table</div>
      <p className="card-subtitle">Select a table and choose your preferred time slot</p>
      
      <div>
        <div className="status-badges">
          <div className="status-badge status-available">
            <div className="status-dot available"></div>
            <span>Available</span>
          </div>
          <div className="status-badge status-reserved">
            <div className="status-dot reserved"></div>
            <span>Reserved</span>
          </div>
        </div>
        
        <div className="table-grid">
          {tables.map((table) => (
            <div
              key={table.id}
              className={`table-item ${selectedTable === table.id ? 'selected' : ''} ${table.seats === 0 ? 'reserved' : ''}`}
              onClick={() => table.seats > 0 && handleTableSelect(table.id)}
            >
              <img src={tableImage} alt={`Table ${table.id}`} className="table-image" />
              <p className="table-name">Table {table.id}</p>
              <p className="table-seats">{table.seats} seats</p>
              {selectedTable === table.id && (
                <div className="table-check">
                  <Check size={16} color="white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">
            <Users size={16} className="form-label-icon" />
            Number of Seats
          </label>
          <input
            type="number"
            min="1"
            max="5"
            value={seatsToReserve}
            onChange={(e) => setSeatsToReserve(parseInt(e.target.value))}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">
            <Calendar size={16} className="form-label-icon" />
            Select Date
          </label>
          <input 
            type="date" 
            value={date} 
            min={getTodayString()}
            onChange={(e) => setDate(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">
            <Clock size={16} className="form-label-icon" />
            Start Time
          </label>
          <input 
            type="time" 
            value={startTime} 
            onChange={(e) => setStartTime(e.target.value)}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">
            <Clock size={16} className="form-label-icon" />
            End Time
          </label>
          <input 
            type="time" 
            value={endTime} 
            onChange={(e) => setEndTime(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <button 
        onClick={handleReserve}
        className="btn btn-primary"
      >
        Reserve Table Now
      </button>
    </div>
  );
}

export default ReservationSystem;
