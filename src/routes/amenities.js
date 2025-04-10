import express from "express";
import {
  getAllAmenities,
  createAmenity,
  getAmenityById,
  updateAmenity,
  deleteAmenity
} from "../controllers/amenitiesController.js";

import { authenticateToken } from "../middleware/auth.js";
import { validateUUID } from "../middleware/validateUUID.js";

const router = express.Router();

// 🔍 Alle voorzieningen ophalen (open)
router.get("/", getAllAmenities);

// 🔍 Eén voorziening ophalen (UUID vereist)
router.get("/:id", validateUUID, getAmenityById);

// ➕ Nieuwe voorziening toevoegen (alleen ingelogd)
router.post("/", authenticateToken, createAmenity);

// ✏️ Voorziening bijwerken (alleen ingelogd + geldige UUID)
router.put("/:id", authenticateToken, validateUUID, updateAmenity);

// ❌ Voorziening verwijderen (alleen ingelogd + geldige UUID)
router.delete("/:id", authenticateToken, validateUUID, deleteAmenity);

export default router;
