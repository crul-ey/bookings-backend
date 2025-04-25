import prisma from '../../../prisma/client.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const updateHost = async (hostId, updateData) => {
  const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = updateData;

  const dataToUpdate = {
    username,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe,
  };

  if (password) {
    dataToUpdate.password = await bcrypt.hash(password, SALT_ROUNDS);
  }

  return await prisma.host.update({
    where: { id: hostId },
    data: dataToUpdate,
  });
};
