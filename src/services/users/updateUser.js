import prisma from '../../../prisma/client.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const updateUser = async (userId, userData) => {
  const { username, password, name, email, phoneNumber, profilePicture } = userData;

  const dataToUpdate = {
    username,
    name,
    email,
    phoneNumber,
    profilePicture,
  };

  if (password) {
    dataToUpdate.password = await bcrypt.hash(password, SALT_ROUNDS);
  }

  return await prisma.user.update({
    where: { id: userId },
    data: dataToUpdate,
  });
};
