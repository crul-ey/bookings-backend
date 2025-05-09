import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 🔍 Haal alle properties op met optionele filters
export async function getAllProperties(filter = {}) {
  const where = {};

  if (filter.location) where.location = filter.location;
  if (filter.pricePerNight) where.pricePerNight = parseFloat(filter.pricePerNight);

  if (filter.amenities) {
    const amenityNames = filter.amenities.split(',').map(a => a.trim());
    where.amenities = {
      some: {
        name: { in: amenityNames },
      },
    };
  }

  return await prisma.property.findMany({
    where,
    include: {
      host: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      amenities: true,
      bookings: true,
      reviews: true,
    },
  });
}

// 🔍 Haal specifieke property op via ID
export async function getPropertyById(id) {
  return await prisma.property.findUnique({
    where: { id },
    include: {
      host: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      amenities: true,
      bookings: true,
      reviews: true,
    },
  });
}

// ➕ Maak een nieuwe property aan
export async function createProperty(data) {
  const { amenityIds, ...propertyData } = data;

  return await prisma.property.create({
    data: {
      ...propertyData,
      amenities: {
        connect: amenityIds?.map(id => ({ id })) || [],
      },
    },
    include: {
      amenities: true,
    },
  });
}

// ✏️ Update een bestaande property (met check)
export async function updateProperty(id, data) {
  const exists = await prisma.property.findUnique({ where: { id } });
  if (!exists) {
    const error = new Error("Property niet gevonden");
    error.statusCode = 404;
    throw error;
  }

  const { amenityIds, ...updateData } = data;

  return await prisma.property.update({
    where: { id },
    data: {
      ...updateData,
      ...(amenityIds && {
        amenities: {
          set: amenityIds.map(id => ({ id })),
        },
      }),
    },
    include: {
      amenities: true,
    },
  });
}

// ❌ Verwijder een property + gekoppelde data (met check)
export async function deleteProperty(id) {
  const exists = await prisma.property.findUnique({ where: { id } });
  if (!exists) {
    const error = new Error("Property niet gevonden");
    error.statusCode = 404;
    throw error;
  }

  await prisma.booking.deleteMany({ where: { propertyId: id } });
  await prisma.review.deleteMany({ where: { propertyId: id } });

  return await prisma.property.delete({
    where: { id },
  });
}
