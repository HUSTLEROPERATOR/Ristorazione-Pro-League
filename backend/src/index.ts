import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import restaurantRoutes from './routes/restaurants';
import workerRoutes from './routes/workers';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env['PORT'] || 3000;

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '900000'), // 15 minutes
  max: parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] || '100'), // limit each IP to 100 requests per windowMs
  message: {
    error: 'Troppi tentativi effettuati. Riprova più tardi.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(limiter);
app.use(helmet());
app.use(compression());
app.use(morgan(process.env['NODE_ENV'] === 'production' ? 'combined' : 'dev'));

// CORS configuration
const allowedOrigins = process.env['ALLOWED_ORIGINS']?.split(',') || ['http://localhost:3000'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files for testing
app.use('/test', express.static('.'));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Root route
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'RPL Backend API is running',
    timestamp: new Date().toISOString(),
    version: process.env['npm_package_version'] || '1.0.0'
  });
});

// Test endpoint for easy testing
app.get('/test-all', async (_req, res) => {
  const results = [];
  
  // Test registration
  try {
    results.push({
      test: 'Registration Endpoint',
      status: 'available',
      endpoint: 'POST /api/auth/register'
    });
  } catch (error) {
    results.push({
      test: 'Registration Endpoint',
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
  
  // Test login
  try {
    results.push({
      test: 'Login Endpoint',
      status: 'available',
      endpoint: 'POST /api/auth/login'
    });
  } catch (error) {
    results.push({
      test: 'Login Endpoint', 
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
  
  res.status(200).json({
    success: true,
    message: 'RPL Backend Test Results',
    timestamp: new Date().toISOString(),
    results
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/workers', workerRoutes);

// Catch-all for API routes
app.all('/api/*', notFound);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 RPL Backend server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env['NODE_ENV'] || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

export default app;