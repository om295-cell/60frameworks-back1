import { createApp } from './app.js';
import { connectDB } from './config/database.js';
import { config } from './config/environment.js';

const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  const app = createApp();

  const server = app.listen(config.port, () => {
    console.log(`=========================================`);
    console.log(`  🚀 Creative Agency API Server Running  `);
    console.log(`  🌐 Port: ${config.port}`);
    console.log(`  ⚡ Mode: ${config.nodeEnv}`);
    console.log(`  📍 Prefix: ${config.apiPrefix}`);
    console.log(`  🩺 Health: http://localhost:${config.port}${config.apiPrefix}/health`);
    console.log(`=========================================`);
  });

  // Graceful shutdown handling for containerized / horizontal scaling
  const handleShutdown = (signal: string) => {
    console.log(`[Process] ${signal} signal received. Closing HTTP server gracefully...`);
    server.close(() => {
      console.log('[Process] HTTP server closed cleanly.');
      process.exit(0);
    });

    // Force close after 10s if connections linger
    setTimeout(() => {
      console.error('[Process] Forcing shutdown after timeout.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
};

startServer();
