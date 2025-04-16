import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../../prisma/client.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  console.log('🔐 Login attempt:', { username, password });

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username }
    });

    console.log('🧍‍♂️ Gebruiker gevonden:', user);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials (user not found)' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    console.log('🔑 Password match:', isValid);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials (wrong password)' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.AUTH_SECRET_KEY,
      { expiresIn: '1h' }
    );

    console.log('✅ Token gegenereerd:', token);
    res.status(200).json({ token });
  } catch (error) {
    console.error('❌ Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
