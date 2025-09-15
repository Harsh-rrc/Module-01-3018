import express from 'express';
import {
  calculatePortfolioPerformance,
  findLargestHolding,
  calculateAssetAllocation,
  Asset,
} from './portfolio/portfolioPerformance';

const API_VERSION = '1.0.0';
const app = express();

app.use(express.json());

// Basic route
app.get('/', (_req, res) => {
  res.json({ message: 'Server is running!' });
});

// Health check
app.get('/api/v1/health', (_req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: Date.now(),
    version: API_VERSION,
  });
});

/**
 * GET /api/v1/portfolio/performance
 * Query params:
 *  - initialInvestment (number)
 *  - currentValue (number)
 */
app.get('/api/v1/portfolio/performance', (req, res) => {
  const initialInvestment = Number(req.query.initialInvestment);
  const currentValue = Number(req.query.currentValue);

  if (!Number.isFinite(initialInvestment) || !Number.isFinite(currentValue)) {
    return res.status(400).json({
      error:
        'initialInvestment and currentValue query parameters are required and must be valid numbers.',
    });
  }

  const result = calculatePortfolioPerformance(initialInvestment, currentValue);
  return res.json(result);
});

/**
 * GET /api/v1/portfolio/largest-holding
 * Query params:
 *  - assets (JSON encoded array of { name, value, type? })
 */
app.get('/api/v1/portfolio/largest-holding', (req, res) => {
  const assetsQuery = req.query.assets as string | undefined;
  if (!assetsQuery) {
    return res
      .status(400)
      .json({ error: 'assets query parameter is required (JSON encoded).' });
  }

  try {
    const assets: Asset[] = JSON.parse(assetsQuery);
    const largest = findLargestHolding(assets);
    return res.json({ largest });
  } catch (err) {
    return res.status(400).json({ error: 'Invalid JSON for assets parameter.' });
  }
});

/**
 * GET /api/v1/portfolio/allocation
 * Query params:
 *  - assets (JSON encoded array of { name, value, type? })
 */
app.get('/api/v1/portfolio/allocation', (req, res) => {
  const assetsQuery = req.query.assets as string | undefined;
  if (!assetsQuery) {
    return res
      .status(400)
      .json({ error: 'assets query parameter is required (JSON encoded).' });
  }

  try {
    const assets: Asset[] = JSON.parse(assetsQuery);
    const allocation = calculateAssetAllocation(assets);
    return res.json({ allocation });
  } catch (err) {
    return res.status(400).json({ error: 'Invalid JSON for assets parameter.' });
  }
});

export default app;