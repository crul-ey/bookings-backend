import express from 'express';
import {
  getProperties,
  getProperty,
  postProperty,
  putProperty,
  removeProperty,
} from '../controllers/propertiesController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// /properties
router.get('/', getProperties);          // GET alle properties
router.post('/', verifyToken, postProperty);          // POST nieuwe property

// /properties/:id
router.get('/:id', getProperty);         // GET property by ID
router.put('/:id', verifyToken, putProperty);         // PUT update property by ID
router.delete('/:id', verifyToken, removeProperty);   // DELETE property by ID

export default router;
