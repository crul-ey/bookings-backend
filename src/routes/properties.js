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

// 🔍 Alle properties ophalen (open endpoint)
router.get("/", getAllProperties);

// 🔍 Eén specifieke property ophalen (UUID vereist)
router.get("/:id", validateUUID, getPropertyById);

// ➕ Nieuwe property toevoegen (alleen ingelogde gebruikers)
router.post("/", authenticateToken, createProperty);

// ✏️ Property bijwerken (alleen ingelogd + geldige UUID)
router.put("/:id", authenticateToken, validateUUID, updateProperty);

// ❌ Property verwijderen (alleen ingelogd + geldige UUID)
router.delete("/:id", authenticateToken, validateUUID, deleteProperty);

// 🧩 Voeg voorzieningen toe aan een property (alleen ingelogd)
router.post("/:propertyId/amenities", authenticateToken, addAmenitiesToProperty);

// 🧹 Verwijder voorzieningen van een property (alleen ingelogd)
router.delete("/:propertyId/amenities", authenticateToken, removeAmenitiesFromProperty);

export default router;
