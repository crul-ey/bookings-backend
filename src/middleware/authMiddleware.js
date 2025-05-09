import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Geen token meegegeven of verkeerd formaat' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET_KEY);
    req.user = decoded; // bevat: id, username, role
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Ongeldige of verlopen token' });
  }
}
