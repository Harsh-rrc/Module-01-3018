import { findLargestHolding, Asset } from '../src/portfolio/portfolioPerformance';

describe('findLargestHolding', () => {
  it('finds largest asset in normal case', () => {
    const assets: Asset[] = [
      { name: 'Stocks', value: 5000 },
      { name: 'House', value: 15000 },
      { name: 'Bonds', value: 2000 },
    ];
    const largest = findLargestHolding(assets);
    expect(largest).not.toBeNull();
    expect(largest?.name).toBe('House');
  });

  it('returns null for empty array', () => {
    const largest = findLargestHolding([]);
    expect(largest).toBeNull();
  });

  it('returns first occurrence when values tie', () => {
    const assets: Asset[] = [
      { name: 'A', value: 5000 },
      { name: 'B', value: 8000 },
      { name: 'C', value: 8000 },
    ];
    const largest = findLargestHolding(assets);
    expect(largest?.name).toBe('B'); // first occurrence of the tie
  });
});