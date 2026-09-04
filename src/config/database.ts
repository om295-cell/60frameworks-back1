import mongoose from 'mongoose';
import { config } from './environment.js';

import { Project } from '../models/Project.js';
import { Service } from '../models/Service.js';
import { Sector } from '../models/Sector.js';
import { Client } from '../models/Client.js';
import { Testimonial } from '../models/Testimonial.js';
import {
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_SECTORS,
  INITIAL_CLIENTS,
  INITIAL_TESTIMONIALS,
} from '../services/seedData.js';

async function autoSeedIfEmpty() {
  try {
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log('[AutoSeed] Collections empty, auto-populating initial data in MongoDB Atlas...');
      await Promise.allSettled([
        Project.insertMany(INITIAL_PROJECTS),
        Service.insertMany(INITIAL_SERVICES),
        Sector.insertMany(INITIAL_SECTORS),
        Client.insertMany(INITIAL_CLIENTS),
        Testimonial.insertMany(INITIAL_TESTIMONIALS),
      ]);
      console.log('[AutoSeed] Successfully populated initial data in database!');
    }
  } catch (err) {
    console.warn('[AutoSeed] Notice:', err);
  }
}

export const connectDB = async (): Promise<typeof mongoose | null> => {
  try {
    const options: mongoose.ConnectOptions = {
      maxPoolSize: 20, // Connection pooling for horizontal scaling
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      autoIndex: config.nodeEnv !== 'production',
    };

    const conn = await mongoose.connect(config.mongoUri, options);
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
    autoSeedIfEmpty().catch(() => {});
    return conn;
  } catch (error) {
    console.error('[MongoDB] Connection error:', error);
    // In dev mode or preview, we log and do not crash so API can provide mock/fallback data if needed
    if (config.nodeEnv === 'production') {
      console.warn('[MongoDB] Running in production without active DB connection - fallback mode enabled.');
    }
    return null;
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB] Disconnected. Attempting to reconnect...');
});

mongoose.connection.on('error', (err) => {
  console.error('[MongoDB] Error event:', err);
});
