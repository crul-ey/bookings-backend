import prisma from '../../../prisma/client.js';

export const getReviewById = async (reviewId) => {
  return await prisma.review.findUnique({
    where: { id: reviewId },
    include: {
      user: { select: { id: true, name: true, email: true } },
      property: { select: { id: true, title: true, location: true } },
    },
  });
};
