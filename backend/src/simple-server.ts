import express from 'express';
import path from 'path';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = parseInt(process.env['PORT'] || '4000', 10);
const HOST = process.env['HOST'] || '0.0.0.0';

// ---------- Rate Limiting ----------
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many authentication attempts, please try again later.' },
});

// ---------- Middleware ----------
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(generalLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from backend/public
const publicDir = path.join(process.cwd(), 'public');
app.use(express.static(publicDir));

// Simple request logger
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} [${req.method}] ${req.originalUrl}`);
  next();
});

// ---------- API Routes (in-memory, no DB required) ----------
import authRouter        from './routes/authInMemory';
import usersRouter       from './routes/inMemoryUsers';
import restaurantsRouter from './routes/inMemoryRestaurants';

app.use('/api/auth',        authLimiter, authRouter);
app.use('/api/users',       usersRouter);
app.use('/api/restaurants', restaurantsRouter);

// ---------- Health / Info Endpoints ----------
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'RPL Backend API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    mode: 'in-memory',
  });
});

app.get('/test-all', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'RPL Backend Test – Server is running!',
    timestamp: new Date().toISOString(),
    endpoints: [
      'GET  /health',
      'GET  /test-all',
      'POST /api/auth/login',
      'POST /api/auth/register',
      'POST /api/auth/logout',
      'GET  /api/auth/profile',
      'GET  /api/restaurants',
      'GET  /api/restaurants/:id',
      'POST /api/restaurants',
      'GET  /api/users',
      'GET  /api/users/:id',
      'POST /api/users',
    ],
    demoCredentials: {
      ristoratore: { email: 'ristoratore@rpl.example', password: 'rpl2025' },
      lavoratore:  { email: 'mario.rossi@rpl.example', password: 'rpl2025' },
    },
  });
});

// Root route – API info
app.get('/', (_req, res) => {
  res.json({
    name: 'RPL Backend API',
    version: '1.0.0',
    status: 'running',
    docs: '/test-all',
    health: '/health',
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ---------- Start ----------
const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 RPL Backend (in-memory) running on http://localhost:${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/health`);
  console.log(`📖 API docs: http://localhost:${PORT}/test-all`);
  console.log(`🌍 Environment: ${process.env['NODE_ENV'] || 'development'}`);
});

server.on('error', (err: NodeJS.ErrnoException) => {
  console.error('Server error:', err.message);
  process.exit(1);
});

export default app;
