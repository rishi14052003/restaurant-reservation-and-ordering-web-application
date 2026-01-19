const Reservation = require('../models/Reservation');

// Create a new reservation
const createReservation = (req, res) => {
  try {
    const { tableId, date, startTime, endTime, seats } = req.body;
    const userId = req.user.id;

    // Validation
    if (!tableId || !date || !startTime || !endTime || !seats) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: tableId, date, startTime, endTime, seats'
      });
    }

    // Validate date format
    const reservationDate = new Date(date);
    const startDateTime = new Date(`${date} ${startTime}`);
    const endDateTime = new Date(`${date} ${endTime}`);

    if (isNaN(reservationDate.getTime()) || isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date or time format'
      });
    }

    // Check if end time is after start time
    if (endDateTime <= startDateTime) {
      return res.status(400).json({
        success: false,
        message: 'End time must be after start time'
      });
    }

    // Check for conflicts
    const conflict = Reservation.findConflict(tableId, date, startTime, endTime);
    if (conflict) {
      return res.status(409).json({
        success: false,
        message: 'Table already reserved for this time slot',
        conflict: {
          tableId: conflict.tableId,
          date: conflict.date,
          startTime: conflict.startTime,
          endTime: conflict.endTime
        }
      });
    }

    // Create reservation
    const reservation = Reservation.create({
      userId,
      tableId,
      date,
      startTime,
      endTime,
      seats
    });

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      data: reservation
    });
  } catch (error) {
    console.error('Create reservation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating reservation',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get user's reservations
const getUserReservations = (req, res) => {
  try {
    const userId = req.user.id;
    const reservations = Reservation.findByUserId(userId);

    res.status(200).json({
      success: true,
      message: 'Reservations retrieved successfully',
      data: reservations,
      count: reservations.length
    });
  } catch (error) {
    console.error('Get user reservations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving reservations',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all reservations (admin only)
const getAllReservations = (req, res) => {
  try {
    const reservations = Reservation.findAll();
    res.status(200).json({
      success: true,
      message: 'All reservations retrieved successfully',
      data: reservations,
      count: reservations.length
    });
  } catch (error) {
    console.error('Get all reservations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving reservations',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get reservation by ID
const getReservationById = (req, res) => {
  try {
    const { id } = req.params;
    const reservation = Reservation.findById(parseInt(id));

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    // Check if user owns this reservation or is admin
    if (reservation.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You can only view your own reservations'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Reservation retrieved successfully',
      data: reservation
    });
  } catch (error) {
    console.error('Get reservation by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving reservation',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update reservation
const updateReservation = (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const userId = req.user.id;

    const existingReservation = Reservation.findById(parseInt(id));
    if (!existingReservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    // Check if user owns this reservation
    if (existingReservation.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You can only update your own reservations'
      });
    }

    // Check for conflicts if date/time is being updated
    if (updateData.date || updateData.startTime || updateData.endTime) {
      const conflict = Reservation.findConflict(
        updateData.tableId || existingReservation.tableId,
        updateData.date || existingReservation.date,
        updateData.startTime || existingReservation.startTime,
        updateData.endTime || existingReservation.endTime,
        parseInt(id)
      );

      if (conflict) {
        return res.status(409).json({
          success: false,
          message: 'Table already reserved for this time slot',
          conflict
        });
      }
    }

    const updatedReservation = Reservation.update(parseInt(id), updateData);

    res.status(200).json({
      success: true,
      message: 'Reservation updated successfully',
      data: updatedReservation
    });
  } catch (error) {
    console.error('Update reservation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating reservation',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete reservation
const deleteReservation = (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingReservation = Reservation.findById(parseInt(id));
    if (!existingReservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    // Check if user owns this reservation
    if (existingReservation.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You can only delete your own reservations'
      });
    }

    const deletedReservation = Reservation.delete(parseInt(id));

    res.status(200).json({
      success: true,
      message: 'Reservation deleted successfully',
      data: deletedReservation
    });
  } catch (error) {
    console.error('Delete reservation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting reservation',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  createReservation,
  getUserReservations,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation
};
