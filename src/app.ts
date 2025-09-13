import express from 'express';

// API version
const API_VERSION = '1.0.0';
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Health check requirement
app.get('/api/v1/health', (_req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
    version: API_VERSION,
  });
});

export default app;