import prisma from '../../prisma/client.js';

// ✅ GET /amenities – alle voorzieningen ophalen
export const getAllAmenities = async (req, res) => {
  try {
    const amenities = await prisma.amenity.findMany();
    res.status(200).json(amenities);
  } catch (error) {
    console.error('❌ Error fetching amenities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ GET /amenities/:id – één voorziening ophalen
export const getAmenityById = async (req, res) => {
  const { id } = req.params;

  try {
    const amenity = await prisma.amenity.findUnique({ where: { id } });

    if (!amenity) {
      return res.status(404).json({ error: 'Amenity not found' });
    }

    res.status(200).json(amenity);
  } catch (error) {
    console.error('❌ Error fetching amenity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ POST /amenities – nieuwe voorziening aanmaken
export const createAmenity = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const newAmenity = await prisma.amenity.create({ data: { name } });
    res.status(201).json({ id: newAmenity.id });
  } catch (error) {
    console.error('❌ Error creating amenity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ PUT /amenities/:id – voorziening bijwerken
export const updateAmenity = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedAmenity = await prisma.amenity.update({
      where: { id },
      data: { name }
    });

    res.status(200).json(updatedAmenity);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Amenity not found' });
    } else {
      console.error('❌ Error updating amenity:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// ✅ DELETE /amenities/:id – voorziening verwijderen
export const deleteAmenity = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.amenity.delete({ where: { id } });
    res.status(200).json({ message: 'Amenity deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Amenity not found' });
    } else {
      console.error('❌ Error deleting amenity:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
