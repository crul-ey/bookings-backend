import prisma from '../../prisma/client.js';

// ✅ GET /bookings – met filtering op userId
export const getAllBookings = async (req, res) => {
  try {
    const { userId } = req.query;

    const filters = {};

    if (userId) {
      filters.userId = userId;
    }

    const bookings = await prisma.booking.findMany({
      where: filters,
      include: {
        user: { select: { id: true, name: true, email: true } },
        property: { select: { id: true, title: true, location: true } },
      },
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error('❌ Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ GET /bookings/:id
export const getBookingById = async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: req.params.id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        property: { select: { id: true, title: true, location: true } },
      },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error('❌ Error fetching booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ POST /bookings
export const createBooking = async (req, res) => {
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

    const newBooking = await prisma.booking.create({
      data: {
        userId,
        propertyId,
        checkinDate: new Date(checkinDate),
        checkoutDate: new Date(checkoutDate),
        numberOfGuests,
        totalPrice,
        bookingStatus: bookingStatus || 'confirmed',
      },
    });

    res.status(201).json({ id: newBooking.id });
  } catch (error) {
    console.error('❌ Error creating booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ PUT /bookings/:id
export const updateBooking = async (req, res) => {
  const { id } = req.params;
  const {
    checkinDate,
    checkoutDate,
    numberOfGuests,
    totalPrice,
    bookingStatus,
  } = req.body;

  try {
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        checkinDate: checkinDate && new Date(checkinDate),
        checkoutDate: checkoutDate && new Date(checkoutDate),
        numberOfGuests,
        totalPrice,
        bookingStatus,
      },
    });

    res.status(200).json(updatedBooking);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Booking not found' });
    } else {
      console.error('❌ Error updating booking:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// ✅ DELETE /bookings/:id
export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.booking.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Booking not found' });
    } else {
      console.error('❌ Error deleting booking:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
