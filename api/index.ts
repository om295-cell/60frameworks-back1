import { createApp } from '../src/app.js';
import { connectDB } from '../src/config/database.js';

let isConnected = false;
const app = createApp();

export default async function handler(req: any, res: any) {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      console.warn('[Vercel Handler] Database connection attempt logged:', err);
    }
  }
  return app(req, res);
}
