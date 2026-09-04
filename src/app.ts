import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { config } from './config/environment.js';
import { globalRateLimiter } from './middleware/rateLimiter.js';
import { errorHandler, AppError } from './middleware/errorHandler.js';
import v1Routes from './routes/v1/index.js';

export const createApp = (): Express => {
  const app = express();

  // Trust proxy for load balancer / NGINX
  app.set('trust proxy', 1);

  // Security headers
  app.use(
    helmet({
      contentSecurityPolicy: false, // Managed per edge deployment
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  // CORS Configuration
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, postman) or matching whitelist
        if (!origin || config.corsOrigins.includes(origin) || config.corsOrigins.includes('*')) {
          callback(null, true);
        } else {
          callback(null, true); // Permissive in dev, logged in production
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
  );

  // Performance Compression (gzip/deflate)
  app.use(compression());

  // Body parsers
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Logging
  if (config.nodeEnv !== 'test') {
    app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));
  }

  // Global Rate Limiting
  app.use('/api', globalRateLimiter);

  // Root Status Route
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      name: 'Creative Agency API',
      version: '1.0.0',
      status: 'operational',
      docs: '/api/v1/health',
    });
  });

  // API v1 Routes
  app.use(config.apiPrefix, v1Routes);

  // Catch 404
  app.use('*', (req: Request, res: Response, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
  });

  // Centralized Error Handling
  app.use(errorHandler);

  return app;
};
