import express from 'express';
import authenticateToken from '../middleware/auth.js';
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
} from '../controllers/reviewsController.js';

const router = express.Router();

// ✅ Alle reviews ophalen
router.get('/', getAllReviews);

// ✅ Eén specifieke review ophalen
router.get('/:id', getReviewById);

// ✅ Nieuwe review aanmaken (auth vereist)
router.post('/', authenticateToken, createReview);

// ✅ Review bijwerken (auth vereist)
router.put('/:id', authenticateToken, updateReview);

// ✅ Review verwijderen (auth vereist)
router.delete('/:id', authenticateToken, deleteReview);

export default router;
