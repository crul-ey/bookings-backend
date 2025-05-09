import express from 'express';
import {
  getHosts,
  getHost,
  postHost,
  putHost,
  removeHost,
} from '../controllers/hostsController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// /hosts
router.get('/', getHosts);         // GET alle hosts
router.post('/', verifyToken, postHost);        // POST nieuwe host

// /hosts/:id
router.get('/:id', getHost);       // GET host by ID
router.put('/:id', verifyToken, putHost);       // PUT update host by ID
router.delete('/:id', verifyToken, removeHost); // DELETE host by ID

export default router;
