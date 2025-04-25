import prisma from '../../../prisma/client.js';

export const deleteUser = async (userId) => {
  return await prisma.user.delete({
    where: { id: userId },
  });
};
