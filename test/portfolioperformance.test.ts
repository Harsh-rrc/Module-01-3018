import { calculatePortfolioPerformance } from '../src/portfolio/portfolioPerformance';

describe('calculatePortfolioPerformance', () => {
  it('returns correct result for profit', () => {
    const result = calculatePortfolioPerformance(10000, 12000);
    expect(result.profitOrLoss).toBe(2000);
    expect(result.percentageChange).toBeCloseTo(20);
    expect(result.performanceSummary).toMatch(/profit/);
  });

  it('returns correct result for loss', () => {
    const result = calculatePortfolioPerformance(10000, 8000);
    expect(result.profitOrLoss).toBe(-2000);
    expect(result.percentageChange).toBeCloseTo(-20);
    expect(result.performanceSummary).toMatch(/loss/);
  });

  it('returns correct result for no change', () => {
    const result = calculatePortfolioPerformance(10000, 10000);
    expect(result.profitOrLoss).toBe(0);
    expect(result.percentageChange).toBeCloseTo(0);
    expect(result.performanceSummary).toMatch(/not changed/);
  });
});