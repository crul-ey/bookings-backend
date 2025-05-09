// 📦 Entry point van de applicatie
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import * as Sentry from '@sentry/node';
import { errorHandler } from './middleware/errorHandler.js';

// 📄 Laad environment variabelen
dotenv.config();

// 🛡️ Initialiseer Sentry monitoring
Sentry.init({
  dsn: process.env.SENTRY_DSN || '', // fallback bij ontbreken
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV || 'development',
});

// 🚀 Maak Express app aan
const app = express();

// 🧠 Sentry request logger (moet vóór routes)
app.use(Sentry.Handlers.requestHandler());

// 🔍 HTTP-request logging (kleur + timing)
app.use(morgan('[EvaAPI] :method :url => :status (:response-time ms)'));

// 📦 JSON body parser
app.use(express.json());

// 🔗 API Routes
import authRoutes from './routes/authRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import hostsRoutes from './routes/hostsRoutes.js';
import propertiesRoutes from './routes/propertiesRoutes.js';
import amenitiesRoutes from './routes/amenitiesRoutes.js';
import bookingsRoutes from './routes/bookingsRoutes.js';
import reviewsRoutes from './routes/reviewsRoutes.js';

app.use('/login', authRoutes);
app.use('/users', usersRoutes);
app.use('/hosts', hostsRoutes);
app.use('/properties', propertiesRoutes);
app.use('/amenities', amenitiesRoutes);
app.use('/bookings', bookingsRoutes);
app.use('/reviews', reviewsRoutes);

// ⚠️ 404 fallback voor onbekende routes
app.use((req, res, next) => {
  const error = new Error(`❌ Endpoint ${req.originalUrl} niet gevonden`);
  error.statusCode = 404;
  next(error);
});

// ❌ Sentry error handler (vóór custom handler)
app.use(Sentry.Handlers.errorHandler());

// 🧯 Custom error handler (JSON output)
app.use(errorHandler);

// 🟢 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server draait op http://localhost:${PORT}`);
});
