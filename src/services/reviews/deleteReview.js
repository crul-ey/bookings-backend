import prisma from '../../../prisma/client.js';

export const deleteReview = async (reviewId) => {
  return await prisma.review.delete({
    where: { id: reviewId },
  });
};
