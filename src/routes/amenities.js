import express from 'express';
import authenticateToken from '../middleware/auth.js';
import {
  getAllAmenities,
  getAmenityById,
  createAmenity,
  updateAmenity,
  deleteAmenity
} from '../controllers/amenitiesController.js';

const router = express.Router();

// ✅ Alle voorzieningen ophalen
router.get('/', getAllAmenities);

// ✅ Eén voorziening ophalen
router.get('/:id', getAmenityById);

// ✅ Nieuwe voorziening aanmaken (auth vereist)
router.post('/', authenticateToken, createAmenity);

// ✅ Voorziening bijwerken (auth vereist)
router.put('/:id', authenticateToken, updateAmenity);

// ✅ Voorziening verwijderen (auth vereist)
router.delete('/:id', authenticateToken, deleteAmenity);

export default router;
