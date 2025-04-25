import { getAllBookings } from '../services/bookings/getAllBookings.js';
import { getBookingById } from '../services/bookings/getBookingById.js';
import { createBooking } from '../services/bookings/createBooking.js';
import { updateBooking } from '../services/bookings/updateBooking.js';
import { deleteBooking } from '../services/bookings/deleteBooking.js';

// ✅ GET /bookings?userId=xxx
export const getAllBookingsController = async (req, res) => {
  try {
    const { userId } = req.query;

    const filters = {};
    if (userId) filters.userId = userId;

    const bookings = await getAllBookings(Object.keys(filters).length ? filters : undefined);
    res.status(200).json(bookings);
  } catch (error) {
    console.error('❌ Error fetching bookings:', error.message);
    res.status(500).json({ error: 'Server error while fetching bookings' });
  }
};

// ✅ GET /bookings/:id
export const getBookingByIdController = async (req, res) => {
  try {
    const booking = await getBookingById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error('❌ Error fetching booking by ID:', error.message);
    res.status(500).json({ error: 'Server error while fetching booking' });
  }
};

// ✅ POST /bookings
export const createBookingController = async (req, res) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;

    if (!userId || !propertyId || !checkinDate || !checkoutDate || !totalPrice || !numberOfGuests) {
      return res.status(400).json({ error: 'Missing required booking data' });
    }

    const newBooking = await createBooking({
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    });

    res.status(201).json({ id: newBooking.id });
  } catch (error) {
    console.error('❌ Error creating booking:', error.message);
    res.status(500).json({ error: 'Server error while creating booking' });
  }
};

// ✅ PUT /bookings/:id
export const updateBookingController = async (req, res) => {
  try {
    const updatedBooking = await updateBooking(req.params.id, req.body);
    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error('❌ Error updating booking:', error.message);

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Booking not found' });
    } else {
      res.status(500).json({ error: 'Server error while updating booking' });
    }
  }
};

// ✅ DELETE /bookings/:id
export const deleteBookingController = async (req, res) => {
  try {
    await deleteBooking(req.params.id);
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting booking:', error.message);

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Booking not found' });
    } else {
      res.status(500).json({ error: 'Server error while deleting booking' });
    }
  }
};


export {
  getAllBookingsController as getAllBookings,
  getBookingByIdController as getBookingById,
  createBookingController as createBooking,
  updateBookingController as updateBooking,
  deleteBookingController as deleteBooking,
}