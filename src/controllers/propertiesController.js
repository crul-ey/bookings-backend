import prisma from '../../prisma/client.js';

// ✅ GET /properties – met filtering op location, pricePerNight, amenities
export const getAllProperties = async (req, res) => {
  try {
    const { location, pricePerNight, amenities } = req.query;

    const filters = {};

    // Filter op locatie (string match)
    if (location) {
      filters.location = { contains: location };
    }

    // Filter op maximale prijs
    if (pricePerNight) {
      filters.pricePerNight = { lte: parseFloat(pricePerNight) };
    }

    // Haal alle properties op (met relaties)
    const properties = await prisma.property.findMany({
      where: filters,
      include: {
        host: { select: { id: true, name: true, email: true } },
        amenities: { include: { amenity: true } },
        bookings: true,
        reviews: true,
      },
    });

    // Filter op specifieke amenity (optioneel)
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
    console.error('❌ Error fetching properties:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ GET /properties/:id – specifieke property ophalen
export const getPropertyById = async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
      include: {
        host: { select: { id: true, name: true, email: true } },
        amenities: { include: { amenity: true } },
        bookings: true,
        reviews: true,
      },
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error('❌ Error fetching property by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ POST /properties – nieuwe property aanmaken
export const createProperty = async (req, res) => {
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

    const newProperty = await prisma.property.create({
      data: {
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        rating,
        hostId,
      },
    });

    res.status(201).json({ id: newProperty.id });
  } catch (error) {
    console.error('❌ Error creating property:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ PUT /properties/:id – property bijwerken
export const updateProperty = async (req, res) => {
  const { id } = req.params;
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

  try {
    const updated = await prisma.property.update({
      where: { id },
      data: {
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        rating,
        hostId,
      },
    });

    res.status(200).json(updated);
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Property not found' });
    } else {
      console.error('❌ Error updating property:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// ✅ DELETE /properties/:id – property verwijderen
export const deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.property.delete({ where: { id } });
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Property not found' });
    } else {
      console.error('❌ Error deleting property:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
