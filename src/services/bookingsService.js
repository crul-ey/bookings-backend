import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 📦 Haal alle bookings op met optionele filters
export async function getAllBookings(filter = {}) {
  const where = {};

  if (filter.userId) {
    where.user = { id: filter.userId };
  }

  if (filter.propertyId) {
    where.property = { id: filter.propertyId };
  }

  if (filter.bookingStatus) {
    where.bookingStatus = filter.bookingStatus;
  }

  return await prisma.booking.findMany({
    where,
    include: {
      user: { select: { id: true, name: true, email: true } },
      property: { select: { id: true, title: true, location: true } },
    },
  });
}

// 🔍 Haal booking op via ID
export async function getBookingById(id) {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true } },
      property: { select: { id: true, title: true, location: true } },
    },
  });

  if (!booking) {
    const error = new Error("Boeking niet gevonden");
    error.statusCode = 404;
    throw error;
  }

  return booking;
}

// ➕ Maak een booking aan
export async function createBooking(data) {
  return await prisma.booking.create({
    data: {
      checkinDate: data.checkinDate,
      checkoutDate: data.checkoutDate,
      numberOfGuests: data.numberOfGuests,
      totalPrice: data.totalPrice,
      bookingStatus: data.bookingStatus,
      user: { connect: { id: data.userId } },
      property: { connect: { id: data.propertyId } },
    },
    include: {
      user: true,
      property: true,
    },
  });
}

// ✏️ Update een bestaande booking
export async function updateBooking(id, data) {
  const exists = await prisma.booking.findUnique({ where: { id } });
  if (!exists) {
    const error = new Error("Boeking niet gevonden");
    error.statusCode = 404;
    throw error;
  }

  const updateData = {
    checkinDate: data.checkinDate,
    checkoutDate: data.checkoutDate,
    numberOfGuests: data.numberOfGuests,
    totalPrice: data.totalPrice,
    bookingStatus: data.bookingStatus,
  };

  if (data.userId) {
    updateData.user = { connect: { id: data.userId } };
  }

  if (data.propertyId) {
    updateData.property = { connect: { id: data.propertyId } };
  }

  return await prisma.booking.update({
    where: { id },
    data: updateData,
    include: {
      user: true,
      property: true,
    },
  });
}

// ❌ Verwijder booking
export async function deleteBooking(id) {
  const exists = await prisma.booking.findUnique({ where: { id } });
  if (!exists) {
    const error = new Error("Boeking niet gevonden");
    error.statusCode = 404;
    throw error;
  }

  return await prisma.booking.delete({
    where: { id },
  });
}
