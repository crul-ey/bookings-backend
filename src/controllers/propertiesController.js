import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

// ✅ Haal alle properties op
export const getAllProperties = async (req, res, next) => {
  try {
    const properties = await prisma.property.findMany();
    res.status(200).json(properties);
  } catch (error) {
    console.error("getAllProperties error:", error);
    next(error);
  }
};

// ✅ Haal specifieke property op (inclusief voorzieningen)
export const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        amenities: {
          include: { amenity: true },
        },
      },
    });

    if (!property) return res.status(404).json({ error: "Property niet gevonden." });

    res.status(200).json(property);
  } catch (error) {
    console.error("getPropertyById error:", error);
    next(error);
  }
};

// ✅ Nieuwe property aanmaken
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
      rating,
    } = req.body;

    console.log("createProperty body:", req.body);

    if (!title || !location || !price || !maxGuestCount || !hostId) {
      return res.status(400).json({ error: "Verplichte velden ontbreken." });
    }

    const newProperty = await prisma.property.create({
      data: {
        id: crypto.randomUUID(),
        title,
        description,
        location,
        price,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        hostId,
        rating,
      },
    });

    res.status(201).json(newProperty);
  } catch (error) {
    console.error("createProperty error:", error);
    next(error);
  }
};

// ✅ Property bijwerken
export const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedProperty = await prisma.property.update({
      where: { id },
      data: req.body,
    });

    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error("updateProperty error:", error);
    next(error);
  }
};

// ✅ Property verwijderen
export const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.property.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({ error: "Property niet gevonden." });
    }

    await prisma.property.delete({
      where: { id },
    });

    res.status(200).json({
      message: `Property met ID ${id} is succesvol verwijderd.`,
      deletedId: id,
    });
  } catch (error) {
    console.error("deleteProperty error:", error);
    next(error);
  }
};

// ✅ Voeg voorzieningen toe aan een property
export const addAmenitiesToProperty = async (req, res, next) => {
  try {
    const { propertyId, amenityIds } = req.body;

    if (!propertyId || !Array.isArray(amenityIds) || amenityIds.length === 0) {
      return res.status(400).json({
        error: "propertyId en een lijst met amenityIds zijn verplicht.",
      });
    }

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      return res.status(404).json({ error: "Property niet gevonden." });
    }

    await prisma.propertyAmenity.createMany({
      data: amenityIds.map((amenityId) => ({
        propertyId,
        amenityId,
      })),
    });

    const updatedProperty = await prisma.property.findUnique({
      where: { id: propertyId },
      include: { amenities: { include: { amenity: true } } },
    });

    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error("addAmenitiesToProperty error:", error);
    next(error);
  }
};

// ✅ Verwijder voorzieningen van een property
export const removeAmenitiesFromProperty = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const { amenityIds } = req.body;

    if (!Array.isArray(amenityIds) || amenityIds.length === 0) {
      return res.status(400).json({ error: "amenityIds zijn verplicht." });
    }

    await prisma.propertyAmenity.deleteMany({
      where: {
        propertyId,
        amenityId: { in: amenityIds },
      },
    });

    res.status(200).json({
      message: "Voorzieningen succesvol verwijderd van de property.",
    });
  } catch (error) {
    console.error("removeAmenitiesFromProperty error:", error);
    next(error);
  }
};
