import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Haal alle properties op
export const getAllProperties = async (req, res, next) => {
  try {
    const properties = await prisma.property.findMany();
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Haal een specifieke property op inclusief voorzieningen
export const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await prisma.property.findUnique({
      where: { id: parseInt(id) },
      include: {
        amenities: { include: { amenity: true } },
      },
    });

    if (!property) return res.status(404).json({ error: "Property not found" });

    res.status(200).json(property);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Voeg een nieuwe property toe
export const createProperty = async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      price,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating
    } = req.body;

    if (!title || !location || !price || !maxGuestCount || !hostId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newProperty = await prisma.property.create({
      data: {
        title,
        description,
        location,
        price,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        hostId,
        rating
      },
    });

    res.status(201).json(newProperty);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Werk een bestaande property bij
export const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedProperty = await prisma.property.update({
      where: { id: parseInt(id) },
      data: req.body,
    });

    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Verwijder een property
export const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.property.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existing) {
      return res.status(404).json({ error: "Property not found" });
    }

    await prisma.property.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      message: `Property met ID ${id} is succesvol verwijderd.`,
      deletedId: parseInt(id)
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Voeg voorzieningen toe aan een property
export const addAmenitiesToProperty = async (req, res, next) => {
  try {
    const { propertyId, amenityIds } = req.body;

    if (!propertyId || !Array.isArray(amenityIds) || amenityIds.length === 0) {
      return res.status(400).json({ error: "Property ID en amenity IDs zijn verplicht" });
    }

    const property = await prisma.property.findUnique({
      where: { id: propertyId }
    });

    if (!property) {
      return res.status(404).json({ error: "Property niet gevonden" });
    }

    await prisma.propertyAmenity.createMany({
      data: amenityIds.map(amenityId => ({ propertyId, amenityId }))
    });

    const updatedProperty = await prisma.property.findUnique({
      where: { id: propertyId },
      include: { amenities: { include: { amenity: true } } }
    });

    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Verwijder voorzieningen van een property
export const removeAmenitiesFromProperty = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const { amenityIds } = req.body;

    if (!Array.isArray(amenityIds) || amenityIds.length === 0) {
      return res.status(400).json({ error: "Amenity IDs zijn verplicht" });
    }

    await prisma.propertyAmenity.deleteMany({
      where: {
        propertyId: parseInt(propertyId),
        amenityId: { in: amenityIds }
      }
    });

    res.status(200).json({ message: "Voorzieningen verwijderd van de property." });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
