import express from 'express';
import {
  getBookings,
  getBooking,
  postBooking,
  putBooking,
  removeBooking,
} from '../controllers/bookingsController.js';

import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// /bookings
router.get('/', getBookings);           // GET alle bookings
router.post('/', verifyToken, postBooking);          // POST nieuwe booking

// /bookings/:id
router.get('/:id', getBooking);         // GET booking by ID
router.put('/:id', verifyToken, putBooking);         // PUT update booking by ID
router.delete('/:id', verifyToken, removeBooking);   // DELETE booking by ID

export default router;
