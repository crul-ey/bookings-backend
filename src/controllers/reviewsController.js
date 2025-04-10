import { PrismaClient } from "@prisma/client";
import crypto from "crypto"; // voor UUID genereren

const prisma = new PrismaClient();

// ✅ Alle reviews ophalen
export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: true,
        property: true,
      },
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("getAllReviews error:", error);
    next(error);
  }
};

// ✅ Eén specifieke review ophalen (UUID)
export const getReviewById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const review = await prisma.review.findUnique({
      where: { id },
      include: {
        user: true,
        property: true,
      },
    });

    if (!review) {
      return res.status(404).json({ error: "Review niet gevonden." });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error("getReviewById error:", error);
    next(error);
  }
};

// ✅ Nieuwe review aanmaken
export const createReview = async (req, res, next) => {
  try {
    const { propertyId, userId, rating, comment } = req.body;

    console.log("Review body ontvangen:", req.body);

    if (!propertyId || !userId || !rating || !comment) {
      return res.status(400).json({
        error: "propertyId, userId, rating en comment zijn verplicht.",
      });
    }

    const newReview = await prisma.review.create({
      data: {
        id: crypto.randomUUID(),
        propertyId,
        userId,
        rating,
        comment,
      },
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error("createReview error:", error);
    next(error);
  }
};

// ✅ Review bijwerken
export const updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ error: "Rating en comment zijn verplicht." });
    }

    const updatedReview = await prisma.review.update({
      where: { id },
      data: { rating, comment },
    });

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("updateReview error:", error);
    next(error);
  }
};

// ✅ Review verwijderen
export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.review.delete({
      where: { id },
    });

    res.status(200).json({ message: `Review met id ${id} is succesvol verwijderd.` });
  } catch (error) {
    console.error("deleteReview error:", error);
    next(error);
  }
};
