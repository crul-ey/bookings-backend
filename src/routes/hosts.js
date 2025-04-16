import express from 'express';
import authenticateToken from '../middleware/auth.js';
import {
  getAllHosts,
  getHostById,
  createHost,
  updateHost,
  deleteHost
} from '../controllers/hostsController.js';

const router = express.Router();

router.get('/', getAllHosts);
router.get('/:id', getHostById);
router.post('/', authenticateToken, createHost);
router.put('/:id', authenticateToken, updateHost);
router.delete('/:id', authenticateToken, deleteHost);

export default router;
