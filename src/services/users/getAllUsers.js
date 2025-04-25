import prisma from '../../../prisma/client.js';

export const getAllUsers = async (filters) => {
  return await prisma.user.findMany({
    where: filters,
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
    },
  });
};
