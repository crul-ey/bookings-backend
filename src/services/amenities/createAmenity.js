import prisma from '../../../prisma/client.js';

export const createAmenity = async (name) => {
  return await prisma.amenity.create({
    data: { name },
  });
};
