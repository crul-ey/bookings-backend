import prisma from '../../prisma/client.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

// ✅ GET /hosts – met filtering op naam
export const getAllHosts = async (req, res) => {
  try {
    const { name } = req.query;

    const filters = {};

    if (name) {
      filters.name = { contains: name };
    }

    const hosts = await prisma.host.findMany({
      where: filters,
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
        aboutMe: true,
      },
    });

    res.status(200).json(hosts);
  } catch (error) {
    console.error('❌ Error fetching hosts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ GET /hosts/:id
export const getHostById = async (req, res) => {
  const { id } = req.params;

  try {
    const host = await prisma.host.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePicture: true,
        aboutMe: true,
      },
    });

    if (!host) {
      return res.status(404).json({ error: 'Host not found' });
    }

    res.status(200).json(host);
  } catch (error) {
    console.error('❌ Error fetching host by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ POST /hosts
export const createHost = async (req, res) => {
  const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: 'Username, password en email zijn verplicht' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newHost = await prisma.host.create({
      data: {
        username,
        password: hashedPassword,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      },
    });

    res.status(201).json({ id: newHost.id });
  } catch (error) {
    console.error('❌ Error creating host:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ PUT /hosts/:id
export const updateHost = async (req, res) => {
  const { id } = req.params;
  const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;

  const updateData = {
    username,
    name,
    email,
    phoneNumber,
    profilePicture,
    aboutMe,
  };

  if (password) {
    updateData.password = await bcrypt.hash(password, SALT_ROUNDS);
  }

  try {
    const updatedHost = await prisma.host.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json(updatedHost);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Host not found' });
    } else {
      console.error('❌ Error updating host:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// ✅ DELETE /hosts/:id
export const deleteHost = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.host.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Host deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Host not found' });
    } else {
      console.error('❌ Error deleting host:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
