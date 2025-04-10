import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 📅 Maak een nieuwe boeking aan
export const createBooking = async (req, res, next) => {
  try {
    const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;

    if (!userId || !propertyId || !checkinDate || !checkoutDate) {
      return res.status(400).json({ error: "userId, propertyId, checkinDate en checkoutDate zijn verplicht." });
    }

    const newBooking = await prisma.booking.create({
      data: {
        id: crypto.randomUUID(),
        userId,
        propertyId,
        checkinDate: new Date(checkinDate),
        checkoutDate: new Date(checkoutDate),
        numberOfGuests,
        totalPrice,
        bookingStatus,
      },
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("❌ createBooking error:", error);
    next(error);
  }
};

// 📚 Haal alle boekingen op (optioneel filteren op userId)
export const getAllBookings = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const bookings = await prisma.booking.findMany({
      where: userId ? { userId } : {},
      include: {
        property: true,
        user: true,
      },
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ getAllBookings error:", error);
    next(error);
  }
};

// ❌ Annuleer een boeking
export const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return res.status(404).json({ error: "Boeking niet gevonden." });
    }

    const now = new Date();
    const checkin = new Date(booking.checkinDate);
    const cutoff = new Date(checkin.getTime() - 24 * 60 * 60 * 1000);

    if (now > cutoff) {
      return res.status(400).json({ error: "Je kunt alleen annuleren tot 24 uur van tevoren." });
    }

    await prisma.booking.delete({ where: { id } });

    res.status(200).json({ message: `Boeking met ID ${id} is geannuleerd.` });
  } catch (error) {
    console.error("❌ cancelBooking error:", error);
    next(error);
  }
};
