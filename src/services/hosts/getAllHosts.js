import prisma from '../../../prisma/client.js';

export const getAllHosts = async (filters) => {
  return await prisma.host.findMany({
    where: filters,
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      aboutMe: true,
    },
  });
};
