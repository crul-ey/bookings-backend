import prisma from '../../../prisma/client.js';

export const getHostById = async (hostId) => {
  return await prisma.host.findUnique({
    where: { id: hostId },
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
