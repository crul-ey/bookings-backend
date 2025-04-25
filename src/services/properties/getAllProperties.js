import prisma from '../../../prisma/client.js';

export const getAllProperties = async (filters) => {
  return await prisma.property.findMany({
    where: filters,
    include: {
      host: { select: { id: true, name: true, email: true } },
      amenities: { include: { amenity: true } },
      bookings: true,
      reviews: true,
    },
  });
};
