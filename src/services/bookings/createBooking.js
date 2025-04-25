import prisma from '../../../prisma/client.js';

export const createBooking = async (bookingData) => {
  return await prisma.booking.create({
    data: {
      userId: bookingData.userId,
      propertyId: bookingData.propertyId,
      checkinDate: new Date(bookingData.checkinDate),
      checkoutDate: new Date(bookingData.checkoutDate),
      numberOfGuests: bookingData.numberOfGuests,
      totalPrice: bookingData.totalPrice,
      bookingStatus: bookingData.bookingStatus || 'confirmed',
    },
  });
};
