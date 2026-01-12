import React, { useState } from 'react';
import tableImage from './images.png';
import './App.css';

function ReservationSystem({ onReserve }) {
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

  const handleReserve = () => {
    if (!selectedTable) {
      alert('Please select a table');
      return;
    }
    if (!date || !startTime || !endTime) {
      alert('Please enter date, start time, and end time');
      return;
    }
    if (endTime <= startTime) {
      alert('End time must be after start time');
      return;
    }

    const selectedStart = new Date(`${date}T${startTime}`);
    const now = new Date();
    if (selectedStart < now) {
      alert('Cannot book a table in the past');
      return;
    }

    const alreadyReserved = reservations.some(
      (r) =>
        r.tableId === selectedTable &&
        r.date === date &&
        checkOverlap(startTime, endTime, r.startTime, r.endTime)
    );

    if (alreadyReserved) {
      alert(`Table ${selectedTable} is already booked between ${startTime} and ${endTime} on ${date}`);
      return;
    }

    const table = tables.find((t) => t.id === selectedTable);
    if (seatsToReserve > table.seats) {
      alert(`Only ${table.seats} seats are available for this table`);
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
    <div>
      <h2>Table Reservation</h2>
      <div className="reservation-grid">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`table ${selectedTable === table.id ? 'reserved' : ''} ${table.seats === 0 ? 'reserved' : ''}`}
            onClick={() => table.seats > 0 && handleTableSelect(table.id)}
          >
            <img src={tableImage} alt={`Table ${table.id}`} className="table-image" />
            <p>Table {table.id}</p>
          </div>
        ))}
      </div>

      <label>
        Number of Seats:
        <input
          type="number"
          min="1"
          max="5"
          value={seatsToReserve}
          onChange={(e) => setSeatsToReserve(parseInt(e.target.value))}
        />
      </label>
      <br />

      <label>
        Select Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <br />

      <label>
        Start Time:
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </label>
      <br />

      <label>
        End Time:
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </label>
      <br />

      <button onClick={handleReserve}>Reserve Table</button>
    </div>
  );
}

export default ReservationSystem;
