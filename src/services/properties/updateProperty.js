import prisma from '../../../prisma/client.js';

export const updateProperty = async (propertyId, propertyData) => {
  return await prisma.property.update({
    where: { id: propertyId },
    data: propertyData,
  });
};
