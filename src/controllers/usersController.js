import { getAllUsers } from '../services/users/getAllUsers.js';
import { getUserById } from '../services/users/getUserById.js';
import { createUser } from '../services/users/createUser.js';
import { updateUser } from '../services/users/updateUser.js';
import { deleteUser } from '../services/users/deleteUser.js';

// ✅ GET /users – met filtering op username en email
export const getAllUsersController = async (req, res) => {
  try {
    const { username, email } = req.query;

    const filters = {};

    if (username) {
      filters.username = { contains: username, mode: 'insensitive' };
    }

    if (email) {
      filters.email = { contains: email, mode: 'insensitive' };
    }

    const users = await getAllUsers(Object.keys(filters).length > 0 ? filters : undefined);

    res.status(200).json(users);
  } catch (error) {
    console.error('❌ Error fetching users:', error.message);
    res.status(500).json({ error: 'Server error while fetching users' });
  }
};

// ✅ POST /users
export const createUserController = async (req, res) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Username, password en email zijn verplicht' });
    }

    const newUser = await createUser({ username, password, name, email, phoneNumber, profilePicture });

    res.status(201).json({ id: newUser.id });
  } catch (error) {
    console.error('❌ Error creating user:', error.message);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// ✅ GET /users/:id
export const getUserByIdController = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    console.error('❌ Error fetching user by ID:', error.message);
    res.status(500).json({ error: 'Failed to get user' });
  }
};

// ✅ PUT /users/:id
export const updateUserController = async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('❌ Error updating user:', error.message);

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(500).json({ error: 'Failed to update user' });
    }
  }
};

// ✅ DELETE /users/:id
export const deleteUserController = async (req, res) => {
  try {
    await deleteUser(req.params.id);

    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.error('❌ Error deleting user:', error.message);

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
};

export {
  getAllUsersController as getAllUsers,
  createUserController as createUser,
  getUserByIdController as getUserById,
  updateUserController as updateUser,
  deleteUserController as deleteUser,
}