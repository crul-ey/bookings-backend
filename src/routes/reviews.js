import express from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewsController.js";

import { authenticateToken } from "../middleware/auth.js";
import { validateUUID } from "../middleware/validateUUID.js";

const router = express.Router();

// 🔍 Alle reviews ophalen (open endpoint)
router.get("/", getAllReviews);

// 🔍 Eén specifieke review ophalen op basis van UUID
router.get("/:id", validateUUID, getReviewById);

// ✍ Nieuwe review toevoegen (alleen ingelogde gebruikers)
router.post("/", authenticateToken, createReview);

// ✏️ Review bijwerken (alleen ingelogd + geldige UUID)
router.put("/:id", authenticateToken, validateUUID, updateReview);

// ❌ Review verwijderen (alleen ingelogd + geldige UUID)
router.delete("/:id", authenticateToken, validateUUID, deleteReview);

export default router;
