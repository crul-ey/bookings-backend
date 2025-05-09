import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 📦 Haal alle reviews op
export async function getAllReviews() {
  return await prisma.review.findMany({
    include: {
      user: {
        select: { id: true, name: true },
      },
      property: {
        select: { id: true, title: true, location: true },
      },
    },
  });
}

// 🔍 Haal een review op via ID
export async function getReviewById(id) {
  const review = await prisma.review.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, name: true },
      },
      property: {
        select: { id: true, title: true, location: true },
      },
    },
  });

  if (!review) {
    const error = new Error("Review niet gevonden");
    error.statusCode = 404;
    throw error;
  }

  return review;
}

// ➕ Maak een nieuwe review aan
export async function createReview(data) {
  return await prisma.review.create({
    data: {
      rating: data.rating,
      comment: data.comment,
      user: { connect: { id: data.userId } },
      property: { connect: { id: data.propertyId } },
    },
    include: {
      user: true,
      property: true,
    },
  });
}

// ✏️ Update een review
export async function updateReview(id, data) {
  const exists = await prisma.review.findUnique({ where: { id } });
  if (!exists) {
    const error = new Error("Review niet gevonden");
    error.statusCode = 404;
    throw error;
  }

  const updateData = {
    rating: data.rating,
    comment: data.comment,
  };

  if (data.userId) {
    updateData.user = { connect: { id: data.userId } };
  }

  if (data.propertyId) {
    updateData.property = { connect: { id: data.propertyId } };
  }

  return await prisma.review.update({
    where: { id },
    data: updateData,
    include: {
      user: true,
      property: true,
    },
  });
}

// ❌ Verwijder een review
export async function deleteReview(id) {
  const exists = await prisma.review.findUnique({ where: { id } });
  if (!exists) {
    const error = new Error("Review niet gevonden");
    error.statusCode = 404;
    throw error;
  }

  return await prisma.review.delete({
    where: { id },
  });
}
