import prisma from '../../../prisma/client.js';

export const deleteAmenity = async (amenityId) => {
  return await prisma.amenity.delete({
    where: { id: amenityId },
  });
};
