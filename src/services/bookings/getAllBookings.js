import prisma from '../../../prisma/client.js';

export const getAllBookings = async (filters) => {
  return await prisma.booking.findMany({
    where: filters,
    include: {
      user: { select: { id: true, name: true, email: true } },
      property: { select: { id: true, title: true, location: true } },
    },
  });
};
