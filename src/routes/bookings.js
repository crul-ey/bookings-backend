import express from "express";
import {
  createBooking,
  getAllBookings,
  cancelBooking,
} from "../controllers/bookingsController.js";

import { authenticateToken } from "../middleware/auth.js";
import { validateUUID } from "../middleware/validateUUID.js";

const router = express.Router();

// 📚 Haal alle boekingen op (optioneel filter op userId)
router.get("/", authenticateToken, getAllBookings);

// 📅 Maak een nieuwe boeking aan (alleen ingelogde gebruikers)
router.post("/", authenticateToken, createBooking);

// ❌ Annuleer een boeking (alleen ingelogd + geldige UUID)
router.delete("/:id", authenticateToken, validateUUID, cancelBooking);

export default router;
