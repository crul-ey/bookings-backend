import prisma from '../../../prisma/client.js';

export const updateBooking = async (bookingId, updateData) => {
  return await prisma.booking.update({
    where: { id: bookingId },
    data: {
      ...updateData,
      checkinDate: updateData.checkinDate ? new Date(updateData.checkinDate) : undefined,
      checkoutDate: updateData.checkoutDate ? new Date(updateData.checkoutDate) : undefined,
    },
  });
};
