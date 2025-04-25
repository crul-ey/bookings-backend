import prisma from '../../../prisma/client.js';

export const deleteHost = async (hostId) => {
  return await prisma.host.delete({
    where: { id: hostId },
  });
};
