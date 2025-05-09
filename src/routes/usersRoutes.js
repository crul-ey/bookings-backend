import express from 'express';
import {
  getUsers,
  getUser,
  postUser,
  putUser,
  removeUser,
} from '../controllers/usersController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// /users
router.get('/', getUsers);         // GET alle users
router.post('/', verifyToken, postUser);        // POST nieuwe user

// /users/:id
router.get('/:id', getUser);       // GET user by ID
router.put('/:id', verifyToken, putUser);       // PUT update user by ID
router.delete('/:id', verifyToken, removeUser); // DELETE user by ID

export default router;
