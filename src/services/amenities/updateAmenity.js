import prisma from '../../../prisma/client.js';

export const updateAmenity = async (amenityId, name) => {
  return await prisma.amenity.update({
    where: { id: amenityId },
    data: { name },
  });
};
