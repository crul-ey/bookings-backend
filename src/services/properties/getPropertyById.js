import prisma from '../../../prisma/client.js';

export const getPropertyById = async (propertyId) => {
  return await prisma.property.findUnique({
    where: { id: propertyId },
    include: {
      host: { select: { id: true, name: true, email: true } },
      amenities: { include: { amenity: true } },
      bookings: true,
      reviews: true,
    },
  });
};
