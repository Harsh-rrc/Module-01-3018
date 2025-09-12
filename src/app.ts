import express from 'express';

const API_VERSION = '1.0.0';

const app = express();
app.use(express.json());

// Common route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Health check End-points.

app.get('/api/v1/health', (_req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
    version: API_VERSION,
  });
});

export default app;