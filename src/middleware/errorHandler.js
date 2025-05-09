// src/middleware/errorHandler.js
import * as Sentry from '@sentry/node';

export function errorHandler(err, req, res, next) {
  // 🔥 Log lokaal in console
  console.error('💥 ERROR:', err);

  // 📡 Stuur error door naar Sentry
  Sentry.captureException(err);

  // 🔎 Prisma specifieke fout (bijv. not found)
  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Niet gevonden' });
  }

  // ⚠️ Bekende fout met statusCode (bijv. handmatig gegooid)
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // 🔚 Standaard fallback voor onbekende serverfouten
  res.status(500).json({
    error: 'Er is een fout opgetreden op de server, controleer je verzoek.',
  });
}
