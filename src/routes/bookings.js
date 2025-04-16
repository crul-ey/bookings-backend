import express from 'express';
import authenticateToken from '../middleware/auth.js';
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
} from '../controllers/bookingsController.js';

const router = express.Router();

// ✅ Alle bookings ophalen
router.get('/', getAllBookings);

// ✅ Eén specifieke booking ophalen
router.get('/:id', getBookingById);

// ✅ Nieuwe booking aanmaken (auth vereist)
router.post('/', authenticateToken, createBooking);

// ✅ Booking updaten (auth vereist)
router.put('/:id', authenticateToken, updateBooking);

// ✅ Booking verwijderen (auth vereist)
router.delete('/:id', authenticateToken, deleteBooking);

export default router;
