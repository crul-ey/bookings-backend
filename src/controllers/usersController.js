import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// ✅ Haal alle gebruikers op
export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// ✅ Haal één gebruiker op basis van UUID
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// ✅ Maak een nieuwe gebruiker aan
export const createUser = async (req, res, next) => {
  try {
    const { username, password, email, name, phonenumber, pictureURL } = req.body;

    console.log("Received body in createUser:", req.body);

    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: "Username, password, and email are required" });
    }

    // Check op bestaande email
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        name,
        phonenumber,
        pictureURL,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("createUser error:", error);
    next(error);
  }
};

// ✅ Update een gebruiker
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, name, email, phonenumber, pictureURL } = req.body;

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username: username || undefined,
        password: hashedPassword || undefined,
        name: name || undefined,
        email: email || undefined,
        phonenumber: phonenumber || undefined,
        pictureURL: pictureURL || undefined,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// ✅ Verwijder een gebruiker
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// ✅ Login gebruiker en geef JWT terug
export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    console.log("Login body:", req.body);

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
