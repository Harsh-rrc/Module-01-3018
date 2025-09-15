// Define interfaces
export interface PortfolioPerformance {
  initialInvestment: number;
  currentValue: number;
  profitOrLoss: number;
  percentageChange: number;
  performanceSummary: string;
}

export interface Asset {
  name: string;
  value: number;
  type?: string;
}

/**
 * calculatePortfolioPerformance
 * - No 'if' statements (uses nested ternary expressions)
 */
export function calculatePortfolioPerformance(
  initialInvestment: number,
  currentValue: number
): PortfolioPerformance {
  const profitOrLoss = currentValue - initialInvestment;
  const percentageChange = (profitOrLoss / initialInvestment) * 100;

  const performanceSummary =
    percentageChange > 20
      ? 'The portfolio has gained significantly with a profit of $' +
        profitOrLoss.toFixed(2) +
        '.'
      : percentageChange > 0
      ? 'The portfolio shows a modest profit of $' + profitOrLoss.toFixed(2) + '.'
      : percentageChange === 0
      ? 'The portfolio value has not changed.'
      : 'The portfolio has a loss of $' +
        Math.abs(profitOrLoss).toFixed(2) +
        '.';

  return {
    initialInvestment,
    currentValue,
    profitOrLoss,
    percentageChange,
    performanceSummary,
  };
}

/**
 * findLargestHolding
 * - Returns the largest asset (first occurrence on ties)
 * - Returns null for empty array
 */
export function findLargestHolding(assets: Asset[]): Asset | null {
  if (!Array.isArray(assets) || assets.length === 0) return null;

  return assets.reduce((maxSoFar: Asset, current: Asset) =>
    current.value > maxSoFar.value ? current : maxSoFar
  );
}

/**
 * calculateAssetAllocation
 * - Returns array [{ name, percentage }]
 * - For empty input returns []
 */
export function calculateAssetAllocation(
  assets: Asset[]
): { name: string; percentage: number }[] {
  if (!Array.isArray(assets) || assets.length === 0) return [];

  const total = assets.reduce((acc, a) => acc + a.value, 0);
  if (total === 0) {
    // if total is 0, return 0% for each asset
    return assets.map((a) => ({ name: a.name, percentage: 0 }));
  }

  return assets.map((a) => ({
    name: a.name,
    percentage: +( (a.value / total) * 100 ).toFixed(2),
  }));
}