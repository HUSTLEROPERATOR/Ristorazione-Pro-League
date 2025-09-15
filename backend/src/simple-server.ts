import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
// Use explicit host/port and default to 0.0.0.0 so local tools can connect reliably
const PORT = parseInt(process.env['PORT'] || '4000', 10);
const HOST = process.env['HOST'] || '0.0.0.0';

// Basic middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));
// Serve uploaded logos and graphics from project root
app.use('/assets/loghi', express.static(path.join(__dirname, '../../LOGHI E GRAFICHE')));
// Serve favicons folder if present
app.use('/favicons', express.static(path.join(__dirname, '../public/favicons')));

// Simple request logger
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// --- API routes (mock, in-memory) ---
import usersRouter from './routes/mockUsers';
import restaurantsRouter from './routes/mockRestaurants';
app.use('/api/users', usersRouter);
app.use('/api/restaurants', restaurantsRouter);

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
    version: '1.0.0'
  });
});

// Test endpoint
app.get('/test-all', async (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'RPL Backend Test - Server is running!',
    timestamp: new Date().toISOString(),
    endpoints: [
      'GET /health',
      'GET /test-all',
      'GET /',
    ]
  });
});

// Catch all other routes
app.get('*', (_req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: 'This endpoint does not exist'
  });
});

// Start server
const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 RPL Backend server running on ${HOST}:${PORT}`);
  console.log(`📊 Health check: http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env['NODE_ENV'] || 'development'}`);
});

server.on('error', (err: any) => {
  console.error('Server error:', err && err.message ? err.message : err);
  process.exit(1);
});

export default app;