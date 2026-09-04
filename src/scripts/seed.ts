import mongoose from 'mongoose';
import { config } from '../config/environment.js';
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

export const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB at', config.mongoUri);
    await mongoose.connect(config.mongoUri);

    console.log('[Seed] Clearing existing collections...');
    await Promise.all([
      Project.deleteMany({}),
      Service.deleteMany({}),
      Sector.deleteMany({}),
      Client.deleteMany({}),
      Testimonial.deleteMany({}),
    ]);

    console.log('[Seed] Inserting fresh seed data...');
    const [projects, services, sectors, clients, testimonials] = await Promise.all([
      Project.insertMany(INITIAL_PROJECTS),
      Service.insertMany(INITIAL_SERVICES),
      Sector.insertMany(INITIAL_SECTORS),
      Client.insertMany(INITIAL_CLIENTS),
      Testimonial.insertMany(INITIAL_TESTIMONIALS),
    ]);

    console.log(`[Seed] Success! Seeded:
      - ${projects.length} Projects
      - ${services.length} Services
      - ${sectors.length} Sectors
      - ${clients.length} Clients
      - ${testimonials.length} Testimonials`);

    await mongoose.disconnect();
    console.log('[Seed] Disconnected from MongoDB.');
  } catch (error) {
    console.error('[Seed] Database seeding failed:', error);
    process.exit(1);
  }
};

// If executed directly from CLI
if (process.argv[1]?.endsWith('seed.ts') || process.argv[1]?.endsWith('seed.js')) {
  seedDatabase();
}
