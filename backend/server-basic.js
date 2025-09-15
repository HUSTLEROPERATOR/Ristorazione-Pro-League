const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

console.log('Starting server...');

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/', (req, res) => {
  console.log('Root route hit');
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/health', (req, res) => {
  console.log('Health check hit');
  res.json({
    status: 'OK',
    message: 'RPL Server funziona!',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Start server
app.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 SERVER ATTIVO SULLA PORTA ${PORT}`);
  console.log(`🌐 Apri: http://localhost:${PORT}`);
  console.log(`❤️ Health: http://localhost:${PORT}/health`);
  console.log(`📂 Directory: ${__dirname}`);
});

console.log('Server script loaded');