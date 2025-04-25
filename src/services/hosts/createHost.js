import prisma from '../../../prisma/client.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const createHost = async (hostData) => {
  const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = hostData;

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return await prisma.host.create({
    data: {
      username,
      password: hashedPassword,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    },
  });
};
