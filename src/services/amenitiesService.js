import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 📦 Haal alle amenities op
export async function getAllAmenities() {
  return await prisma.amenity.findMany();
}

// 🔍 Haal specifieke amenity op via ID
export async function getAmenityById(id) {
  return await prisma.amenity.findUnique({
    where: { id },
  });
}

// ➕ Maak een nieuwe amenity aan
export async function createAmenity(data) {
  return await prisma.amenity.create({
    data,
  });
}

// ✏️ Update een amenity (met check)
export async function updateAmenity(id, data) {
  const exists = await prisma.amenity.findUnique({ where: { id } });
  if (!exists) {
    const error = new Error("Amenity niet gevonden");
    error.statusCode = 404;
    throw error;
  }

  return await prisma.amenity.update({
    where: { id },
    data,
  });
}

// ❌ Verwijder een amenity en ontkoppel het van properties (met check)
export async function deleteAmenity(id) {
  const exists = await prisma.amenity.findUnique({ where: { id } });
  if (!exists) {
    const error = new Error("Amenity niet gevonden");
    error.statusCode = 404;
    throw error;
  }

  const relatedProperties = await prisma.property.findMany({
    where: {
      amenities: {
        some: { id },
      },
    },
    select: { id: true },
  });

  for (const property of relatedProperties) {
    await prisma.property.update({
      where: { id: property.id },
      data: {
        amenities: {
          disconnect: [{ id }],
        },
      },
    });
  }

  return await prisma.amenity.delete({
    where: { id },
  });
}
