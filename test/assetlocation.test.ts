import { calculateAssetAllocation } from '../src/portfolio/portfolioPerformance';

describe('calculateAssetAllocation', () => {
  it('calculates even allocation correctly', () => {
    const assets = [
      { name: 'Stocks', value: 5000 },
      { name: 'Bonds', value: 5000 },
    ];
    const allocation = calculateAssetAllocation(assets as any);
    expect(allocation).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Stocks', percentage: 50 }),
        expect.objectContaining({ name: 'Bonds', percentage: 50 }),
      ])
    );
  });

  it('calculates uneven allocation correctly', () => {
    const assets = [
      { name: 'Stocks', value: 7500 },
      { name: 'Bonds', value: 2500 },
    ];
    const allocation = calculateAssetAllocation(assets as any);
    expect(allocation.find((a) => a.name === 'Stocks')?.percentage).toBeCloseTo(75);
    expect(allocation.find((a) => a.name === 'Bonds')?.percentage).toBeCloseTo(25);
  });

  it('returns empty array for empty input', () => {
    const allocation = calculateAssetAllocation([]);
    expect(allocation).toEqual([]);
  });
});