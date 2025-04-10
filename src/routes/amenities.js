import express from "express";
import {
  getAllAmenities,
  createAmenity,
  getAmenityById,
  updateAmenity,
  deleteAmenity
} from "../controllers/amenitiesController.js";

import { validateUUID } from "../middleware/validateUUID.js";

const router = express.Router();

router.get("/", getAllAmenities);
router.get("/:id", validateUUID, getAmenityById);
router.post("/", createAmenity);
router.put("/:id", validateUUID, updateAmenity);
router.delete("/:id", validateUUID, deleteAmenity);

export default router;
