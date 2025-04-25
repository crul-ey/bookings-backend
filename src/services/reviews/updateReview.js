import prisma from '../../../prisma/client.js';

export const updateReview = async (reviewId, updateData) => {
  const { rating, comment } = updateData;

  return await prisma.review.update({
    where: { id: reviewId },
    data: { rating, comment },
  });
};
