import prisma from '../../../prisma/client.js';

export const deleteBooking = async (bookingId) => {
  return await prisma.booking.delete({
    where: { id: bookingId },
  });
};
