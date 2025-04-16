import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js'; // login route
import hostRoutes from './routes/hosts.js'; // host route
import propertyRoutes from './routes/properties.js'; // property route
import bookingRoutes from './routes/bookings.js'; // booking route
import reviewsRoutes from './routes/reviews.js'; // review route
import amenitiesRoutes from './routes/amenities.js'; // amenities route
import prisma from '../prisma/client.js'; 
import sentry from '@sentry/node';
import authenticateToken from './middleware/auth.js';
import { sentryErrorHandler, generalErrorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Sentry setup (voor error monitoring)
sentry.init({
  dsn: process.env.SENTRY_DSN || '',
  tracesSampleRate: 1.0,
});

console.log('✅ Sentry initialized');

app.use(sentry.Handlers.requestHandler());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// ✅ Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/hosts', hostRoutes);
app.use('/properties', propertyRoutes);
app.use('/bookings', bookingRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/amenities', amenitiesRoutes);

// ✅ Health check of root endpoint
app.get('/', (req, res) => {
  res.send('📦 Bookings API is running');
});

// ✅ Error handling
app.use(sentryErrorHandler);
app.use(generalErrorHandler);

// ✅ Start de server
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
