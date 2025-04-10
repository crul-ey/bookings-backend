import express from "express";
import {
  createBooking,
  getAllBookings,
  cancelBooking,
} from "../controllers/bookingsController.js";

const router = express.Router();

// Haal alle boekingen op (optioneel met query filter)
router.get("/", getAllBookings);

// Maak een nieuwe boeking aan
router.post("/", createBooking);

// Annuleer een boeking via UUID
router.delete("/:id", cancelBooking);

export default router;
