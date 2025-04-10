import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

// ✅ Haal alle hosts op
export const getAllHosts = async (req, res, next) => {
  try {
    const hosts = await prisma.host.findMany();
    res.status(200).json(hosts);
  } catch (error) {
    console.error("getAllHosts error:", error);
    next(error);
  }
};

// ✅ Haal een specifieke host op via UUID
export const getHostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const host = await prisma.host.findUnique({
      where: { id },
    });

    if (!host) return res.status(404).json({ error: "Host niet gevonden." });

    res.status(200).json(host);
  } catch (error) {
    console.error("getHostById error:", error);
    next(error);
  }
};

// ✅ Voeg een nieuwe host toe
export const createHost = async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;

    console.log("createHost body:", req.body);

    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: "Username, password en email zijn verplicht." });
    }

    const existingHost = await prisma.host.findUnique({
      where: { email },
    });

    if (existingHost) {
      return res
        .status(400)
        .json({ error: "Er bestaat al een host met dit e-mailadres." });
    }

    const newHost = await prisma.host.create({
      data: {
        id: crypto.randomUUID(),
        username,
        password,
        name,
        email,
        phonenumber: phoneNumber,
        profilePicture,
        aboutMe,
      },
    });

    res.status(201).json(newHost);
  } catch (error) {
    console.error("createHost error:", error);
    next(error);
  }
};

// ✅ Werk een bestaande host bij
export const updateHost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;

    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: "Username, password en email zijn verplicht." });
    }

    const updatedHost = await prisma.host.update({
      where: { id },
      data: {
        username,
        password,
        name,
        email,
        phonenumber: phoneNumber,
        profilePicture,
        aboutMe,
      },
    });

    res.status(200).json(updatedHost);
  } catch (error) {
    console.error("updateHost error:", error);
    next(error);
  }
};

// ✅ Verwijder een host
export const deleteHost = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.host.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error("deleteHost error:", error);
    next(error);
  }
};
