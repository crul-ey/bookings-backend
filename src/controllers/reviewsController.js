import prisma from '../../prisma/client.js';

// ✅ GET /reviews – alle reviews ophalen
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        property: { select: { id: true, title: true, location: true } }
      }
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('❌ Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ GET /reviews/:id – specifieke review ophalen
export const getReviewById = async (req, res) => {
  try {
    const review = await prisma.review.findUnique({
      where: { id: req.params.id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        property: { select: { id: true, title: true, location: true } }
      }
    });

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error('❌ Error fetching review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ POST /reviews – nieuwe review aanmaken
export const createReview = async (req, res) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;

    if (!userId || !propertyId || !rating) {
      return res.status(400).json({ error: 'userId, propertyId en rating zijn verplicht' });
    }

    const newReview = await prisma.review.create({
      data: {
        userId,
        propertyId,
        rating,
        comment
      }
    });

    res.status(201).json({ id: newReview.id });
  } catch (error) {
    console.error('❌ Error creating review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ PUT /reviews/:id – review bijwerken
export const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const updatedReview = await prisma.review.update({
      where: { id },
      data: { rating, comment }
    });

    res.status(200).json(updatedReview);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Review not found' });
    } else {
      console.error('❌ Error updating review:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// ✅ DELETE /reviews/:id – review verwijderen
export const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.review.delete({
      where: { id }
    });

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Review not found' });
    } else {
      console.error('❌ Error deleting review:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
