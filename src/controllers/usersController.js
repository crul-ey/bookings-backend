import prisma from '../../prisma/client.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

// ✅ GET /users – met filtering op username en email
export const getAllUsers = async (req, res) => {
  try {
    const { username, email } = req.query;

    const filters = {};

    if (username) {
      filters.username = { contains: username, mode: 'insensitive' };
    }

    if (email) {
      filters.email = { contains: email, mode: 'insensitive' };
    }

    const users = await prisma.user.findMany({
      where: filters,
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    res.status(500).json({ error: 'Server error while fetching users' });
  }
};

// ✅ POST /users
export const createUser = async (req, res) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Username, password en email zijn verplicht' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
        email,
        phoneNumber,
        profilePicture,
      },
    });

    res.status(201).json({ id: newUser.id });
  } catch (error) {
    console.error('❌ Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// ✅ GET /users/:id
export const getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
      },
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user' });
  }
};

// ✅ PUT /users/:id
export const updateUser = async (req, res) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } = req.body;

    const data = {
      username,
      name,
      email,
      phoneNumber,
      profilePicture,
    };

    if (password) {
      data.password = await bcrypt.hash(password, SALT_ROUNDS);
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(500).json({ error: 'Failed to update user' });
    }
  }
};

// ✅ DELETE /users/:id
export const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
};
