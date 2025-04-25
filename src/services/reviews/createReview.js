import prisma from '../../../prisma/client.js';

export const createReview = async (reviewData) => {
  const { userId, propertyId, rating, comment } = reviewData;

  return await prisma.review.create({
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });
};
