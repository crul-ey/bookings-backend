import express from "express";
import { 
  getAllProperties, 
  createProperty, 
  getPropertyById, 
  updateProperty, 
  deleteProperty, 
  addAmenitiesToProperty,
  removeAmenitiesFromProperty
} from "../controllers/propertiesController.js";
import { authenticateToken } from "../middleware/auth.js"; 
import { validateUUID } from "../middleware/validateUUID.js"; 

const router = express.Router();

// Haal alle properties op
router.get("/", getAllProperties);

// Haal een specifieke property op, met UUID-validatie
router.get("/:id", validateUUID, getPropertyById);

// Voeg een nieuwe property toe
router.post("/", authenticateToken, createProperty);

// Werk een bestaande property bij, met UUID-validatie
router.put("/:id", validateUUID, updateProperty);

// Verwijder een property, met UUID-validatie
router.delete("/:id", validateUUID, deleteProperty);

// Voeg voorzieningen toe aan een property
router.post("/:propertyId/amenities", authenticateToken, addAmenitiesToProperty);

// verwijder voorzieningen van een property
router.delete("/:propertyId/amenities", authenticateToken, removeAmenitiesFromProperty);

export default router;
