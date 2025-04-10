import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

// ✅ Haal alle voorzieningen op
export const getAllAmenities = async (req, res, next) => {
  try {
    const amenities = await prisma.amenity.findMany();
    res.status(200).json(amenities);
  } catch (error) {
    console.error("getAllAmenities error:", error);
    next(error);
  }
};

// ✅ Haal een specifieke voorziening op via UUID
export const getAmenityById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const amenity = await prisma.amenity.findUnique({
      where: { id },
    });

    if (!amenity) {
      return res.status(404).json({ error: "Voorziening niet gevonden." });
    }

    res.status(200).json(amenity);
  } catch (error) {
    console.error("getAmenityById error:", error);
    next(error);
  }
};

// ✅ Voeg een nieuwe voorziening toe
export const createAmenity = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ error: "Een geldige naam is verplicht." });
    }

    const newAmenity = await prisma.amenity.create({
      data: {
        id: crypto.randomUUID(),
        name: name.trim(),
      },
    });

    res.status(201).json(newAmenity);
  } catch (error) {
    console.error("createAmenity error:", error);
    next(error);
  }
};

// ✅ Werk een bestaande voorziening bij
export const updateAmenity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ error: "Een geldige naam is verplicht." });
    }

    const updatedAmenity = await prisma.amenity.update({
      where: { id },
      data: { name: name.trim() },
    });

    res.status(200).json(updatedAmenity);
  } catch (error) {
    console.error("updateAmenity error:", error);
    next(error);
  }
};

// ✅ Verwijder een voorziening
export const deleteAmenity = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.amenity.delete({
      where: { id },
    });

    res.status(200).json({ message: `Voorziening met ID ${id} is verwijderd.` });
  } catch (error) {
    console.error("deleteAmenity error:", error);
    next(error);
  }
};
