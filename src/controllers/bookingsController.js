import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from '../services/bookingsService.js';

// ✅ GET /bookings
export async function getBookings(req, res, next) {
  try {
    const filters = {
      userId: req.query.userId,
      propertyId: req.query.propertyId,
      bookingStatus: req.query.bookingStatus,
    };

    const bookings = await getAllBookings(filters);
    res.json(bookings);
  } catch (err) {
    next(err);
  }
}

// ✅ GET /bookings/:id
export async function getBooking(req, res, next) {
  try {
    const booking = await getBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Boeking niet gevonden' });
    }
    res.json(booking);
  } catch (err) {
    next(err);
  }
}

// ✅ POST /bookings
export async function postBooking(req, res, next) {
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

    // 🔐 Validatie
    if (!userId || !propertyId) {
      return res.status(400).json({ error: 'userId en propertyId zijn verplicht.' });
    }

    if (!checkinDate || !checkoutDate) {
      return res.status(400).json({ error: 'Check-in en check-out data zijn verplicht.' });
    }

    if (typeof numberOfGuests !== 'number' || numberOfGuests < 1) {
      return res.status(400).json({ error: 'Aantal gasten moet een positief getal zijn.' });
    }

    if (typeof totalPrice !== 'number' || totalPrice < 0) {
      return res.status(400).json({ error: 'Totaalprijs moet een geldig positief getal zijn.' });
    }

    const allowedStatuses = ['pending', 'confirmed', 'cancelled'];
    if (bookingStatus && !allowedStatuses.includes(bookingStatus)) {
      return res.status(400).json({ error: 'Ongeldige bookingStatus waarde.' });
    }

    const newBooking = await createBooking(req.body);
    res.status(201).json(newBooking);
  } catch (err) {
    next(err);
  }
}

// ✅ PUT /bookings/:id
export async function putBooking(req, res, next) {
  try {
    const updated = await updateBooking(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Boeking niet gevonden' });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// ✅ DELETE /bookings/:id
export async function removeBooking(req, res, next) {
  try {
    const deleted = await deleteBooking(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Boeking niet gevonden' });
    }
    res.status(200).json({ message: 'Boeking succesvol verwijderd' });
  } catch (err) {
    next(err);
  }
}
