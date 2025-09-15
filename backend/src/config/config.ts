import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  // Server
  port: parseInt(process.env['PORT'] || '3000'),
  nodeEnv: process.env['NODE_ENV'] || 'development',
  
  // Database
  databaseUrl: process.env['DATABASE_URL'] || '',
  
  // JWT
  jwtSecret: process.env['JWT_SECRET'] || 'fallback_secret_key',
  jwtExpiresIn: process.env['JWT_EXPIRES_IN'] || '7d',
  
  // Security
  bcryptRounds: parseInt(process.env['BCRYPT_ROUNDS'] || '12'),
  
  // Rate Limiting
  rateLimitWindowMs: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '900000'),
  rateLimitMaxRequests: parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] || '100'),
  
  // CORS
  allowedOrigins: process.env['ALLOWED_ORIGINS']?.split(',') || ['http://localhost:3000'],
  
  // File Upload
  maxFileSize: parseInt(process.env['MAX_FILE_SIZE'] || '5242880'), // 5MB
  uploadPath: process.env['UPLOAD_PATH'] || 'uploads/',
  
  // Email
  email: {
    host: process.env['EMAIL_HOST'],
    port: parseInt(process.env['EMAIL_PORT'] || '587'),
    user: process.env['EMAIL_USER'],
    pass: process.env['EMAIL_PASS']
  }
};

// Validation
if (!config.databaseUrl) {
  console.warn('⚠️  DATABASE_URL not set. Database operations will fail.');
}

if (config.jwtSecret === 'fallback_secret_key') {
  console.warn('⚠️  JWT_SECRET not set. Using fallback (not secure for production).');
}

export default config;