import express from "express";
import { getAllHosts, getHostById, createHost, updateHost, deleteHost } from "../controllers/hostsController.js";

const router = express.Router();

// Haal alle hosts op
router.get("/", getAllHosts);

// Haal een specifieke host op via UUID
router.get("/:id", getHostById);

// Voeg een nieuwe host toe
router.post("/", createHost);

// Werk een bestaande host bij
router.put("/:id", updateHost);

// Verwijder een host via UUID
router.delete("/:id", deleteHost);

export default router;
