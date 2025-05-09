import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function getAllHosts(filter = {}) {
  const where = {};

  if (filter.name) {
    where.name = filter.name;
  }

  if (filter.email) {
    where.email = filter.email;
  }

  if (filter.username) {
    where.username = filter.username;
  }

  return await prisma.host.findMany({
    where,
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      aboutMe: true,
      role: true,
    },
  });
}

export async function getHostById(id) {
  return await prisma.host.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      aboutMe: true,
      role: true,
    },
  });
}

export async function createHost(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await prisma.host.create({
    data: {
      username: data.username,
      password: hashedPassword,
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      profilePicture: data.profilePicture || '',
      aboutMe: data.aboutMe || '',
      role: 'host',
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      aboutMe: true,
      role: true,
    },
  });
}

export async function updateHost(id, data) {
  const updateData = { ...data };

  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  return await prisma.host.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      aboutMe: true,
      role: true,
    },
  });
}

export async function deleteHost(id) {
  // ✅ Controleer of host bestaat
  const host = await prisma.host.findUnique({ where: { id } });
  if (!host) {
    const error = new Error('Host bestaat niet');
    error.statusCode = 404;
    throw error;
  }

  // 1. Zoek alle properties van deze host
  const properties = await prisma.property.findMany({
    where: { hostId: id },
    select: { id: true },
  });

  const propertyIds = properties.map(p => p.id);

  // 2. Verwijder alle bookings van deze properties
  await prisma.booking.deleteMany({
    where: {
      propertyId: { in: propertyIds },
    },
  });

  // 3. Verwijder alle reviews van deze properties
  await prisma.review.deleteMany({
    where: {
      propertyId: { in: propertyIds },
    },
  });

  // 4. Ontkoppel amenities (many-to-many)
  await Promise.all(propertyIds.map(propertyId =>
    prisma.property.update({
      where: { id: propertyId },
      data: { amenities: { set: [] } },
    })
  ));

  // 5. Verwijder de properties zelf
  await prisma.property.deleteMany({
    where: { hostId: id },
  });

  // 6. Verwijder de host
  return await prisma.host.delete({
    where: { id },
  });
}
