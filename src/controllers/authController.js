import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function login(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    const error = new Error('Vul gebruikersnaam en wachtwoord in');
    error.statusCode = 400;
    return next(error);
  }

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    const host = await prisma.host.findUnique({ where: { username } });

    const account = user || host;
    const role = user ? 'user' : 'host';

    if (!account) {
      const error = new Error('Gebruiker niet gevonden');
      error.statusCode = 401;
      return next(error);
    }

    const wachtwoordOk = await bcrypt.compare(password, account.password);
    if (!wachtwoordOk) {
      const error = new Error('Ongeldig wachtwoord');
      error.statusCode = 401;
      return next(error);
    }

    const token = jwt.sign(
      {
        id: account.id,
        username: account.username,
        role: role,
      },
      process.env.AUTH_SECRET_KEY,
      { expiresIn: '2h' }
    );

    res.json({ token });
  } catch (err) {
    next(err); // centrale error handler doet de rest
  }
}
