import { getAllReviews } from '../services/reviews/getAllReviews.js';
import { getReviewById } from '../services/reviews/getReviewById.js';
import { createReview } from '../services/reviews/createReview.js';
import { updateReview } from '../services/reviews/updateReview.js';
import { deleteReview } from '../services/reviews/deleteReview.js';

// ✅ GET /reviews – alle reviews ophalen
export const getAllReviewsController = async (req, res) => {
  try {
    const reviews = await getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('❌ Error fetching reviews:', error.message);
    res.status(500).json({ error: 'Server error while fetching reviews' });
  }
};

// ✅ GET /reviews/:id – specifieke review ophalen
export const getReviewByIdController = async (req, res) => {
  try {
    const review = await getReviewById(req.params.id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error('❌ Error fetching review:', error.message);
    res.status(500).json({ error: 'Server error while fetching review' });
  }
};

// ✅ POST /reviews – nieuwe review aanmaken
export const createReviewController = async (req, res) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;

    if (!userId || !propertyId || !rating) {
      return res.status(400).json({ error: 'userId, propertyId en rating zijn verplicht' });
    }

    const newReview = await createReview({ userId, propertyId, rating, comment });

    res.status(201).json({ id: newReview.id });
  } catch (error) {
    console.error('❌ Error creating review:', error.message);
    res.status(500).json({ error: 'Server error while creating review' });
  }
};

// ✅ PUT /reviews/:id – review bijwerken
export const updateReviewController = async (req, res) => {
  try {
    const updatedReview = await updateReview(req.params.id, req.body);

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error('❌ Error updating review:', error.message);

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Review not found' });
    } else {
      res.status(500).json({ error: 'Server error while updating review' });
    }
  }
};

// ✅ DELETE /reviews/:id – review verwijderen
export const deleteReviewController = async (req, res) => {
  try {
    await deleteReview(req.params.id);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting review:', error.message);

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Review not found' });
    } else {
      res.status(500).json({ error: 'Server error while deleting review' });
    }
  }
};

export {
  getAllReviewsController as getAllReviews,
  getReviewByIdController as getReviewById,
  createReviewController as createReview,
  updateReviewController as updateReview,
  deleteReviewController as deleteReview,
}