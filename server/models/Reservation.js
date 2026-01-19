class Reservation {
  constructor() {
    // Use global data from auth.js
    this.reservations = global.reservationsData || [];
  }

  // Create a new reservation
  create(reservationData) {
    const reservation = {
      id: global.getReservationIdCounter(),
      userId: reservationData.userId,
      tableId: reservationData.tableId,
      date: reservationData.date,
      startTime: reservationData.startTime,
      endTime: reservationData.endTime,
      seats: reservationData.seats,
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.reservations.push(reservation);
    global.saveReservations(); // Save to file
    return reservation;
  }

  // Find reservations by user ID
  findByUserId(userId) {
    return this.reservations.filter(reservation => reservation.userId === userId);
  }

  // Find reservation by ID
  findById(id) {
    return this.reservations.find(reservation => reservation.id === id);
  }

  // Check for conflicting reservations
  findConflict(tableId, date, startTime, endTime, excludeId = null) {
    return this.reservations.find(reservation => {
      if (excludeId && reservation.id === excludeId) {
        return false;
      }
      
      return reservation.tableId === tableId && 
             reservation.date === date && 
             ((startTime >= reservation.startTime && startTime < reservation.endTime) || 
              (endTime > reservation.startTime && endTime <= reservation.endTime));
    });
  }

  // Get all reservations (for admin purposes)
  findAll() {
    return this.reservations;
  }

  // Update reservation
  update(id, updateData) {
    const index = this.reservations.findIndex(reservation => reservation.id === id);
    if (index !== -1) {
      this.reservations[index] = {
        ...this.reservations[index],
        ...updateData,
        updatedAt: new Date()
      };
      global.saveReservations(); // Save to file
      return this.reservations[index];
    }
    return null;
  }

  // Delete reservation
  delete(id) {
    const index = this.reservations.findIndex(reservation => reservation.id === id);
    if (index !== -1) {
      const deleted = this.reservations[index];
      this.reservations.splice(index, 1);
      global.saveReservations(); // Save to file
      return deleted;
    }
    return null;
  }

  // Get reservation count
  getCount() {
    return this.reservations.length;
  }

  // Get reservations by date range
  findByDateRange(startDate, endDate) {
    return this.reservations.filter(reservation => 
      reservation.date >= startDate && reservation.date <= endDate
    );
  }
}

module.exports = new Reservation();
