import express from 'express';
import { calculatePortfolioPerformance, findLargestHolding, calculateAssetAllocation, Asset } from './portfolio/portfolioPerformance';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.get('/api/v1/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    uptime: process.uptime(), 
    timestamp: Date.now(),
    version: '1.0.0'
  });
});

app.get('/api/v1/portfolio/performance', (req, res) => {
  const initial = Number(req.query.initialInvestment) || 10000;
  const current = Number(req.query.currentValue) || 12000;
  
  if (!initial || !current) {
    return res.status(400).json({ error: 'initialInvestment and currentValue required' });
  }
  
  res.json(calculatePortfolioPerformance(initial, current));
});

app.get('/api/v1/portfolio/largest-holding', (req, res) => {
  const sampleAssets: Asset[] = [
    { name: 'Stocks', value: 5000 },
    { name: 'Bonds', value: 3000 },
    { name: 'Real Estate', value: 7000 }
  ];
  res.json({ largestHolding: findLargestHolding(sampleAssets) });
});

app.get('/api/v1/portfolio/allocation', (req, res) => {
  const sampleAssets: Asset[] = [
    { name: 'Stocks', value: 5000 },
    { name: 'Bonds', value: 3000 },
    { name: 'Real Estate', value: 7000 }
  ];
  res.json({ allocation: calculateAssetAllocation(sampleAssets) });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;