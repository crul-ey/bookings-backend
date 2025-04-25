import prisma from '../../../prisma/client.js';

export const createProperty = async (propertyData) => {
  return await prisma.property.create({
    data: propertyData,
  });
};
