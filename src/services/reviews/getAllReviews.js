import prisma from '../../../prisma/client.js';

export const getAllReviews = async () => {
  return await prisma.review.findMany({
    include: {
      user: { select: { id: true, name: true, email: true } },
      property: { select: { id: true, title: true, location: true } },
    },
  });
};
