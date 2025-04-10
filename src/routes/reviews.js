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

// 🔍 Haal alle reviews op
router.get("/", getAllReviews);

// 🔍 Haal een specifieke review op (alleen geldig UUID)
router.get("/:id", validateUUID, getReviewById);

// ✍ Voeg een review toe (alleen als je ingelogd bent)
router.post("/", authenticateToken, createReview);

// ✏️ Update een review (alleen ingelogd + valide UUID)
router.put("/:id", authenticateToken, validateUUID, updateReview);

// ❌ Verwijder een review (alleen ingelogd + valide UUID)
router.delete("/:id", authenticateToken, validateUUID, deleteReview);

export default router;
