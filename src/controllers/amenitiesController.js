import { getAllAmenities } from '../services/amenities/getAllAmenities.js';
import { getAmenityById } from '../services/amenities/getAmenityById.js';
import { createAmenity } from '../services/amenities/createAmenity.js';
import { updateAmenity } from '../services/amenities/updateAmenity.js';
import { deleteAmenity } from '../services/amenities/deleteAmenity.js';

// ✅ GET /amenities – alle voorzieningen ophalen
export const getAllAmenitiesController = async (req, res) => {
  try {
    const amenities = await getAllAmenities();
    res.status(200).json(amenities);
  } catch (error) {
    console.error('❌ Error fetching amenities:', error.message);
    res.status(500).json({ error: 'Server error while fetching amenities' });
  }
};

// ✅ GET /amenities/:id – één voorziening ophalen
export const getAmenityByIdController = async (req, res) => {
  try {
    const amenity = await getAmenityById(req.params.id);

    if (!amenity) {
      return res.status(404).json({ error: 'Amenity not found' });
    }

    res.status(200).json(amenity);
  } catch (error) {
    console.error('❌ Error fetching amenity:', error.message);
    res.status(500).json({ error: 'Server error while fetching amenity' });
  }
};

// ✅ POST /amenities – nieuwe voorziening aanmaken
export const createAmenityController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newAmenity = await createAmenity(name);
    res.status(201).json({ id: newAmenity.id });
  } catch (error) {
    console.error('❌ Error creating amenity:', error.message);
    res.status(500).json({ error: 'Server error while creating amenity' });
  }
};

// ✅ PUT /amenities/:id – voorziening bijwerken
export const updateAmenityController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const updatedAmenity = await updateAmenity(req.params.id, name);
    res.status(200).json(updatedAmenity);
  } catch (error) {
    console.error('❌ Error updating amenity:', error.message);

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Amenity not found' });
    } else {
      res.status(500).json({ error: 'Server error while updating amenity' });
    }
  }
};

// ✅ DELETE /amenities/:id – voorziening verwijderen
export const deleteAmenityController = async (req, res) => {
  try {
    await deleteAmenity(req.params.id);
    res.status(200).json({ message: 'Amenity deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting amenity:', error.message);

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Amenity not found' });
    } else {
      res.status(500).json({ error: 'Server error while deleting amenity' });
    }
  }
};


export {
  getAllAmenitiesController as getAllAmenities,
  getAmenityByIdController as getAmenityById,
  createAmenityController as createAmenity,
  updateAmenityController as updateAmenity,
  deleteAmenityController as deleteAmenity, 
}