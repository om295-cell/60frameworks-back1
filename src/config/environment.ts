import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/creative_agency',
  blob: {
    storeId: process.env.BLOB_STORE_ID || 'store_sPiUBsxm2VG65SDM',
    token: process.env.BLOB_READ_WRITE_TOKEN || 'vercel_blob_rw_sPiUBsxm2VG65SDM_qg4ygQJbf4ESISy9AX3xGFxJTzx1Ia',
  },
  corsOrigins: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
    : ['*'],
  rateLimiting: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    contactMaxRequests: parseInt(process.env.CONTACT_RATE_LIMIT_MAX || '10', 10),
  },
};
