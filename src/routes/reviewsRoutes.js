import express from 'express';
import {
  getReviews,
  getReview,
  postReview,
  putReview,
  removeReview,
} from '../controllers/reviewsController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// /reviews
router.get('/', getReviews);         // GET alle reviews
router.post('/', verifyToken, postReview);        // POST nieuwe review

// /reviews/:id
router.get('/:id', getReview);       // GET review by ID
router.put('/:id', verifyToken, putReview);       // PUT update review by ID
router.delete('/:id', verifyToken, removeReview); // DELETE review by ID

export default router;
