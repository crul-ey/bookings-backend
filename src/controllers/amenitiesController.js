import {
  getAllAmenities,
  getAmenityById,
  createAmenity,
  updateAmenity,
  deleteAmenity,
} from '../services/amenitiesService.js';

// ✅ GET /amenities
export async function getAmenities(req, res, next) {
  try {
    const amenities = await getAllAmenities();
    res.json(amenities);
  } catch (err) {
    next(err);
  }
}

// ✅ GET /amenities/:id
export async function getAmenity(req, res, next) {
  try {
    const amenity = await getAmenityById(req.params.id);
    if (!amenity) {
      return res.status(404).json({ error: 'Amenity niet gevonden' });
    }
    res.json(amenity);
  } catch (err) {
    next(err);
  }
}

// ✅ POST /amenities
export async function postAmenity(req, res, next) {
  try {
    const { name } = req.body;

    if (!name || name.length < 2) {
      return res.status(400).json({ error: 'Naam is verplicht en moet minimaal 2 tekens bevatten.' });
    }

    const newAmenity = await createAmenity({ name });
    res.status(201).json(newAmenity);
  } catch (err) {
    next(err);
  }
}

// ✅ PUT /amenities/:id
export async function putAmenity(req, res, next) {
  try {
    const updatedAmenity = await updateAmenity(req.params.id, req.body);
    if (!updatedAmenity) {
      return res.status(404).json({ error: 'Amenity niet gevonden' });
    }
    res.json(updatedAmenity);
  } catch (err) {
    next(err);
  }
}

// ✅ DELETE /amenities/:id
export async function removeAmenity(req, res, next) {
  try {
    const deletedAmenity = await deleteAmenity(req.params.id);
    if (!deletedAmenity) {
      return res.status(404).json({ error: 'Amenity niet gevonden' });
    }
    res.status(200).json({ message: 'Amenity verwijderd' });
  } catch (err) {
    next(err);
  }
}
