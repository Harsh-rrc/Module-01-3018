// Define interface for the function output
export interface PortfolioPerformance {
  initialInvestment: number;
  currentValue: number;
  profitOrLoss: number;
  percentageChange: number;
  performanceSummary: string;
}

// Function to calculate portfolio performance dynamically
export function calculatePortfolioPerformance(
  initialInvestment: number,
  currentValue: number
): PortfolioPerformance {
  // Calculate how much money was gained or lost
  const profitOrLoss = currentValue - initialInvestment;

  // Calculate percentage change with respect to initial investment
  const percentageChange = (profitOrLoss / initialInvestment) * 100;

  // Use nested ternary expressions to generate performance summary without 'if'
  const performanceSummary = 
     percentageChange > 20 ? `The portfolio has gained significantly with a profit of $${profitOrLoss.toFixed(2)}.` :
     percentageChange > 0 ? `The portfolio shows a modest profit of $${profitOrLoss.toFixed(2)}.` :
     percentageChange === 0 ? `The portfolio value has not changed.`
     : `The portfolio has a loss of $${Math.abs(profitOrLoss).toFixed(2)}.`;

  // Return all results in the defined interface structure
  return {
    initialInvestment,
    currentValue,
    profitOrLoss,
    percentageChange,
    performanceSummary,
  };
}