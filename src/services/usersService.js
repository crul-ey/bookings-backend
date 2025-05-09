import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// 🔍 Haal alle users op met optionele filters
export async function getAllUsers(filter = {}) {
  const where = {};

  if (filter.username) where.username = filter.username;
  if (filter.email) where.email = filter.email;

  return await prisma.user.findMany({
    where,
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      role: true,
    },
  });
}

// 🔍 Haal een specifieke user op via ID
export async function getUserById(id) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      role: true,
    },
  });
}

// ➕ Maak een nieuwe user aan
export async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await prisma.user.create({
    data: {
      username: data.username,
      password: hashedPassword,
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      profilePicture: data.profilePicture || "",
      role: "user",
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      role: true,
    },
  });
}

// ✏️ Update een bestaande user
export async function updateUser(id, data) {
  const exists = await prisma.user.findUnique({ where: { id } });
  if (!exists) {
    const error = new Error("User niet gevonden");
    error.statusCode = 404;
    throw error;
  }

  const updateData = { ...data };
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  return await prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      role: true,
    },
  });
}

// ❌ Verwijder een user én gekoppelde data
export async function deleteUser(id) {
  const exists = await prisma.user.findUnique({ where: { id } });
  if (!exists) {
    const error = new Error("User niet gevonden");
    error.statusCode = 404;
    throw error;
  }

  // Eerst gekoppelde data verwijderen
  await prisma.booking.deleteMany({ where: { userId: id } });
  await prisma.review.deleteMany({ where: { userId: id } });

  // Daarna de user zelf
  return await prisma.user.delete({ where: { id } });
}
