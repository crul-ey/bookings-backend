import { getAllProperties } from '../services/properties/getAllProperties.js';
import { getPropertyById } from '../services/properties/getPropertyById.js';
import { createProperty } from '../services/properties/createProperty.js';
import { updateProperty } from '../services/properties/updateProperty.js';
import { deleteProperty } from '../services/properties/deleteProperty.js';

// ✅ GET /properties – met filtering op location, pricePerNight, amenities
export const getAllPropertiesController = async (req, res) => {
  try {
    const { location, pricePerNight, amenities } = req.query;

    const filters = {};

    if (location) {
      filters.location = {
        contains: location,
        mode: 'insensitive',
      };
    }

    if (pricePerNight) {
      filters.pricePerNight = parseFloat(pricePerNight);
    }

    const properties = await getAllProperties(Object.keys(filters).length > 0 ? filters : undefined);

    // Client-side filter voor amenities
    let filteredProperties = properties;

    if (amenities) {
      const requestedAmenity = amenities.toLowerCase();
      filteredProperties = properties.filter((property) =>
        property.amenities.some((a) =>
          a.amenity.name.toLowerCase().includes(requestedAmenity)
        )
      );
    }

    res.status(200).json(filteredProperties);
  } catch (error) {
    console.error('❌ Error fetching properties:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ GET /properties/:id – specifieke property ophalen
export const getPropertyByIdController = async (req, res) => {
  try {
    const property = await getPropertyById(req.params.id);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error('❌ Error fetching property by ID:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ POST /properties – nieuwe property aanmaken
export const createPropertyController = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      hostId,
    } = req.body;

    if (!title || !description || !location || !pricePerNight || !hostId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newProperty = await createProperty({
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      hostId,
    });

    res.status(201).json({ id: newProperty.id });
  } catch (error) {
    console.error('❌ Error creating property:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ PUT /properties/:id – property bijwerken
export const updatePropertyController = async (req, res) => {
  try {
    const updatedProperty = await updateProperty(req.params.id, req.body);

    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error('❌ Error updating property:', error.message);

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Property not found' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// ✅ DELETE /properties/:id – property verwijderen
export const deletePropertyController = async (req, res) => {
  try {
    await deleteProperty(req.params.id);

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting property:', error.message);

    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Property not found' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};


export { 
  getAllPropertiesController as getAllProperties,
  getPropertyByIdController as getPropertyById,
  createPropertyController as createProperty,
  updatePropertyController as updateProperty,
  deletePropertyController as deleteProperty,
}