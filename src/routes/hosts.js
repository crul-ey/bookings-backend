import express from "express";
import {
  getAllHosts,
  getHostById,
  createHost,
  updateHost,
  deleteHost
} from "../controllers/hostsController.js";

import { authenticateToken } from "../middleware/auth.js";
import { validateUUID } from "../middleware/validateUUID.js";

const router = express.Router();

// 🔍 Alle hosts ophalen (open endpoint)
router.get("/", getAllHosts);

// 🔍 Eén specifieke host ophalen (alleen geldige UUID)
router.get("/:id", validateUUID, getHostById);

// ➕ Nieuwe host aanmaken (alleen ingelogde gebruikers)
router.post("/", authenticateToken, createHost);

// ✏️ Host bijwerken (alleen ingelogd + geldige UUID)
router.put("/:id", authenticateToken, validateUUID, updateHost);

// ❌ Host verwijderen (alleen ingelogd + geldige UUID)
router.delete("/:id", authenticateToken, validateUUID, deleteHost);

export default router;
