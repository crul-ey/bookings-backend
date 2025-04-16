import express from 'express';
import authenticateToken from '../middleware/auth.js';
import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
} from '../controllers/propertiesController.js';

const router = express.Router();

// ✅ Alle properties ophalen
router.get('/', getAllProperties);

// ✅ Eén specifieke property ophalen
router.get('/:id', getPropertyById);

// ✅ Nieuwe property aanmaken (auth vereist)
router.post('/', authenticateToken, createProperty);

// ✅ Property updaten (auth vereist)
router.put('/:id', authenticateToken, updateProperty);

// ✅ Property verwijderen (auth vereist)
router.delete('/:id', authenticateToken, deleteProperty);

export default router;
