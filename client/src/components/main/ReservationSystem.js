import React, { useState } from 'react';
import { Calendar, Clock, Users, Check, Utensils } from 'lucide-react';
import '../../index.css';

function ReservationSystem({ onReserve, showModal, loading, reservations }) {
  const [tables, setTables] = useState([
    { id: 1, seats: 4, available: true },
    { id: 2, seats: 4, available: true },
    { id: 3, seats: 4, available: true },
    { id: 4, seats: 6, available: true },
    { id: 5, seats: 6, available: true },
    { id: 6, seats: 6, available: true },
    { id: 7, seats: 8, available: true },
    { id: 8, seats: 8, available: true },
    { id: 9, seats: 8, available: true },
    { id: 10, seats: 8, available: true },
    { id: 11, seats: 4, available: true },
    { id: 12, seats: 4, available: true },
  ]);

  const [selectedTable, setSelectedTable] = useState(null);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [seatsToReserve, setSeatsToReserve] = useState(4);

  const handleTableSelect = (tableId) => {
    const table = tables.find(t => t.id === tableId);
    if (table.available) {
      setSelectedTable(tableId);
    }
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

    // Create reservation object
    const reservation = {
      tableId: selectedTable,
      date,
      startTime,
      endTime,
      seats: seatsToReserve,
    };

    // Call parent handler to add reservation
    onReserve(reservation);

    // Update local tables array to mark as reserved
    const updatedTables = tables.map((t) =>
      t.id === selectedTable ? { ...t, available: false } : t
    );
    setTables(updatedTables);

    // Reset form
    setSelectedTable(null);
    setDate('');
    setStartTime('');
    setEndTime('');
    setSeatsToReserve(4);
  };

  return (
    <div className="card">
      <div className="card-title">Reserve Your Table</div>
      <p className="card-subtitle">Select a table and choose your preferred time slot</p>      
      <div className="table-grid">
        {tables.map((table) => {
          const isMatchingCapacity = table.seats === seatsToReserve;
          const hasEnoughCapacity = table.seats >= seatsToReserve;
          
          return (
            <div
              key={table.id}
              className={`table-card ${selectedTable === table.id ? 'selected' : ''} ${!table.available ? 'reserved' : ''} ${isMatchingCapacity ? 'matching-capacity' : ''} ${hasEnoughCapacity ? 'has-capacity' : 'insufficient-capacity'}`}
              onClick={() => handleTableSelect(table.id)}
            >
            <div className="table-icon">
              <Utensils size={24} />
            </div>
            <div className="table-number">Table {table.id}</div>
            <div className="table-capacity">{table.seats} seats</div>
            <div className={`table-status table-status-${table.available ? 'available' : 'reserved'}`}>
              {table.available ? 'Available' : 'Reserved'}
            </div>
            {selectedTable === table.id && (
              <div className="table-check">
                <Check size={16} />
              </div>
            )}
          </div>
          );
        })}
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">
            <Users size={16} className="form-label-icon" />
            Number of Seats (4, 6, or 8)
          </label>
          <select
            value={seatsToReserve}
            onChange={(e) => setSeatsToReserve(parseInt(e.target.value))}
            className="form-input"
          >
            <option value={4}>4 Seats</option>
            <option value={6}>6 Seats</option>
            <option value={8}>8 Seats</option>
          </select>
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
        disabled={loading}
      >
        {loading ? (
          <>
            <div className="spinner"></div>
            Reserving...
          </>
        ) : (
          <span>Reserve Table Now</span>
        )}
      </button>
    </div>
  );
}

export default ReservationSystem;
