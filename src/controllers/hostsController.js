import { getAllHosts } from '../services/hosts/getAllHosts.js';
import { getHostById } from '../services/hosts/getHostById.js';
import { createHost } from '../services/hosts/createHost.js';
import { updateHost } from '../services/hosts/updateHost.js';
import { deleteHost } from '../services/hosts/deleteHost.js';

// ✅ GET /hosts – met filtering op naam
export const getAllHostsController = async (req, res) => {
  try {
    const { name } = req.query;

    const filters = {};
    if (name) {
      filters.name = { contains: name, mode: 'insensitive' };
    }

    const hosts = await getAllHosts(Object.keys(filters).length > 0 ? filters : undefined);

    res.status(200).json(hosts);
  } catch (error) {
    console.error('❌ Error fetching hosts:', error.message);
    res.status(500).json({ error: 'Server error while fetching hosts' });
  }
};

// ✅ GET /hosts/:id
export const getHostByIdController = async (req, res) => {
  try {
    const host = await getHostById(req.params.id);

    if (!host) {
      return res.status(404).json({ error: 'Host not found' });
    }

    res.status(200).json(host);
  } catch (error) {
    console.error('❌ Error fetching host:', error.message);
    res.status(500).json({ error: 'Server error while fetching host' });
  }
};

// ✅ POST /hosts
export const createHostController = async (req, res) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Username, password en email zijn verplicht' });
    }

    const newHost = await createHost({ username, password, name, email, phoneNumber, profilePicture, aboutMe });

    res.status(201).json({ id: newHost.id });
  } catch (error) {
    console.error('❌ Error creating host:', error.message);
    res.status(500).json({ error: 'Server error while creating host' });
  }
};

// ✅ PUT /hosts/:id
export const updateHostController = async (req, res) => {
  try {
    const updatedHost = await updateHost(req.params.id, req.body);

    res.status(200).json(updatedHost);
  } catch (error) {
    console.error('❌ Error updating host:', error.message);

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Host not found' });
    } else {
      res.status(500).json({ error: 'Server error while updating host' });
    }
  }
};

// ✅ DELETE /hosts/:id
export const deleteHostController = async (req, res) => {
  try {
    await deleteHost(req.params.id);

    res.status(200).json({ message: 'Host deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting host:', error.message);

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Host not found' });
    } else {
      res.status(500).json({ error: 'Server error while deleting host' });
    }
  }
};


export {
  getAllHostsController as getAllHosts,
  getHostByIdController as getHostById,
  createHostController as createHost,
  updateHostController as updateHost,
  deleteHostController as deleteHost,
};