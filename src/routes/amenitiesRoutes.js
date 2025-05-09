import express from 'express';
import {
  getAmenities,
  getAmenity,
  postAmenity,
  putAmenity,
  removeAmenity,
} from '../controllers/amenitiesController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// /amenities
router.get('/', getAmenities);          // GET alle amenities
router.post('/', verifyToken, postAmenity);          // POST nieuwe amenity

// /amenities/:id
router.get('/:id', getAmenity);         // GET amenity by ID
router.put('/:id', verifyToken, putAmenity);         // PUT update amenity by ID
router.delete('/:id', verifyToken, removeAmenity);   // DELETE amenity by ID

export default router;
