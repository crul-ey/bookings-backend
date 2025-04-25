import prisma from '../../../prisma/client.js';

export const deleteProperty = async (propertyId) => {
  return await prisma.property.delete({
    where: { id: propertyId },
  });
};
