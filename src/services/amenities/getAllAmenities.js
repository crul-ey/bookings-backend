import prisma from '../../../prisma/client.js';

export const getAllAmenities = async () => {
  return await prisma.amenity.findMany();
};
