import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} from "../controllers/usersController.js";

import { authenticateToken } from "../middleware/auth.js";
import { validateUUID } from "../middleware/validateUUID.js";

const router = express.Router();

// ✅ Beveiligde profielroute (LET OP: moet BOVEN "/:id" staan!)
router.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: "Welcome to your profile!", user: req.user });
});

// 🔓 Alle gebruikers ophalen
router.get("/", getUsers);

// 🔒 Specifieke gebruiker ophalen op basis van UUID
router.get("/:id", validateUUID, getUserById);

// 🔓 Nieuwe gebruiker aanmaken (signup)
router.post("/", createUser);

// 🔒 Gebruiker bijwerken
router.put("/:id", authenticateToken, validateUUID, updateUser);

// 🔒 Gebruiker verwijderen
router.delete("/:id", authenticateToken, validateUUID, deleteUser);

// 🔓 Inloggen
router.post("/login", loginUser);

export default router;
