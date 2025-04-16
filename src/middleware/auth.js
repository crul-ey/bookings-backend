import jwt from "jsonwebtoken";

// Deze middleware controleert of een geldige JWT-token is meegegeven
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Verwacht 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ error: "Geen token meegegeven" });
  }

  jwt.verify(token, process.env.AUTH_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Ongeldige token" });
    }

    req.user = user; // Voegt gebruiker toe aan request
    next();
  });
};

export default authenticateToken;