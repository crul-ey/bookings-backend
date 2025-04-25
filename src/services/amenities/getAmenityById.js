import prisma from '../../../prisma/client.js';

export const getAmenityById = async (amenityId) => {
  return await prisma.amenity.findUnique({
    where: { id: amenityId },
  });
};
