import prisma from '../../../prisma/client.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const createUser = async (userData) => {
  const { username, password, name, email, phoneNumber, profilePicture } = userData;

  // Log de ontvangen data voor debugging
  console.log('✅ Creating user with data:', userData);

  // Check eerst op verplichte velden
  if (!username || !password || !email) {
    throw new Error('Username, password en email zijn verplicht.');
  }

  // Hash het wachtwoord voordat we het opslaan
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
        email,
        phoneNumber,
        profilePicture,
      },
    });

    console.log('🎉 Gebruiker succesvol aangemaakt:', newUser.id);
    return newUser;
  } catch (error) {
    console.error('❌ Prisma fout bij het aanmaken van gebruiker:', error.message);
    throw error;
  }
};
