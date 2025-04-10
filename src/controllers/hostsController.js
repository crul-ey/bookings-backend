import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Haal alle hosts op
export const getAllHosts = async (req, res, next) => {
  try {
    const hosts = await prisma.host.findMany();
    res.status(200).json(hosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Haal een specifieke host op via UUID
export const getHostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const host = await prisma.host.findUnique({
      where: { id: id },
    });

    if (!host) return res.status(404).json({ error: "Host not found" });

    res.status(200).json(host);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Voeg een nieuwe host toe
export const createHost = async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;

    // Zorg ervoor dat de benodigde velden aanwezig zijn
    if (!username || !password || !email) {
      return res.status(400).json({ error: "Username, password and email are required" });
    }

    // Controleer of de host al bestaat
    const existingHost = await prisma.host.findUnique({
      where: { email },
    });
    if (existingHost) {
      return res.status(400).json({ error: "Host with this email already exists" });
    }

    const newHost = await prisma.host.create({
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

    res.status(201).json(newHost);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Werk een bestaande host bij
export const updateHost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;

    // Zorg ervoor dat de benodigde velden aanwezig zijn
    if (!username || !password || !email) {
      return res.status(400).json({ error: "Username, password and email are required" });
    }

    const updatedHost = await prisma.host.update({
      where: { id: id },
      data: { username, password, name, email, phonenumber: phoneNumber, profilePicture, aboutMe },
    });

    res.status(200).json(updatedHost);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Verwijder een host
export const deleteHost = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.host.delete({
      where: { id: id },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
