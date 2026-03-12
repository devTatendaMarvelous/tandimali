/**
 * Loan Calculator Module for Microfinance Website
 */

/**
 * Helper: Validates that the amount is a positive number.
 * @param {number} amount
 * @returns {boolean}
 */
const isValidAmount = (amount) => {
  return typeof amount === 'number' && amount > 0;
};

/**
 * Helper: Rounds monetary values to 2 decimal places.
 * @param {number} value
 * @returns {number}
 */
const formatCurrency = (value) => {
  return Math.round(value * 100) / 100;
};

/**
 * Calculates Payday Loan details.
 * 
 * Rules:
 * - Calculates 10% interest upfront
 * - Disburses 90% of the requested amount
 * - Borrower repays the full 100% requested amount
 * 
 * @param {number} requestedAmount - The full amount requested
 * @returns {Object} Payday loan details
 */
const calculatePaydayLoan = (requestedAmount) => {
  if (!isValidAmount(requestedAmount)) {
    throw new Error('Requested amount must be greater than 0.');
  }

  const interest = requestedAmount * 0.10;
  const disbursedAmount = requestedAmount * 0.90;
  const repaymentAmount = requestedAmount;

  return {
    requestedAmount: formatCurrency(requestedAmount),
    interest: formatCurrency(interest),
    disbursedAmount: formatCurrency(disbursedAmount),
    repaymentAmount: formatCurrency(repaymentAmount)
  };
};

/**
 * Calculates Short-Term Loan details.
 * 
 * Rules:
 * - Tenure must be between 1 and 6 months
 * - Monthly interest is 10% of the principal
 * - Monthly principal repayment is principal / tenure
 * 
 * @param {number} principal - The loan amount
 * @param {number} tenure - The loan duration in months (1-6)
 * @returns {Object} Short-term loan details
 */
const calculateShortTermLoan = (principal, tenure) => {
  if (!isValidAmount(principal)) {
    throw new Error('Principal amount must be greater than 0.');
  }

  if (typeof tenure !== 'number' || !Number.isInteger(tenure) || tenure < 1 || tenure > 6) {
    throw new Error('Tenure must be a whole number between 1 and 6 months.');
  }

  // Fixed 10% interest for the whole loan
  const monthlyInterest = principal * 0.10;
  const totalInterest = monthlyInterest * tenure
  const totalPayment = principal + totalInterest;

  const monthlyPrincipal = principal / tenure;
  const monthlyPayment = totalPayment / tenure;

  return {
    principal: formatCurrency(principal),
    tenure: tenure,
    monthlyInterest: formatCurrency(monthlyInterest),
    monthlyPrincipal: formatCurrency(monthlyPrincipal),
    monthlyPayment: formatCurrency(monthlyPayment),
    totalPayment: formatCurrency(totalPayment),
    totalInterest: formatCurrency(totalInterest)
  };
};
