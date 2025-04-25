import { Prisma } from '@prisma/client';
import * as Sentry from '@sentry/node';

export const sentryErrorHandler = Sentry.Handlers.errorHandler();

export const generalErrorHandler = (err, req, res, next) => {
  console.error('💥 Error:', err.message || err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Item not found' });
    }
  }

  res.status(500).json({ error: 'Internal Server Error' });
};
