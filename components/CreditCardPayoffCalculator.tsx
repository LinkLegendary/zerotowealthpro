'use client';

import { useState } from 'react';

interface CalculationResult {
  monthsToPayoff: number;
  totalPaid: number;
  totalInterest: number;
  monthlyPayment: number;
  payoffDate: Date;
  yearlyBreakdown: YearData[];
  minimumPaymentComparison?: ComparisonData;
}

interface YearData {
  year: number;
  startingBalance: number;
  totalPaid: number;
  principalPaid: number;
  interestPaid: number;
  endingBalance: number;
}

interface ComparisonData {
  monthsToPayoff: number;
  totalPaid: number;
  totalInterest: number;
  savings: number;
  timeSaved: number;
}

export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState<string>('5000');
  const [apr, setApr] = useState<string>('18.99');
  const [paymentType, setPaymentType] = useState<'minimum' | 'fixed'>('fixed');
  const [fixedPayment, setFixedPayment] = useState<string>('200');
  const [minimumPercent, setMinimumPercent] = useState<string>('2');
  const [minimumFloor, setMinimumFloor] = useState<string>('25');
  const [extraPayment, setExtraPayment] = useState<string>('0');
  
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showYearlyBreakdown, setShowYearlyBreakdown] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculatePayoff = () => {
    const bal = parseFloat(balance) || 0;
    const rate = parseFloat(apr) || 0;
    const fixed = parseFloat(fixedPayment) || 0;
    const extra = parseFloat(extraPayment) || 0;
    const minPercent = parseFloat(minimumPercent) || 2;
    const minFloor = parseFloat(minimumFloor) || 25;

    // Validation
    if (bal <= 0) {
      alert('Please enter a valid balance greater than $0');
      return;
    }

    if (rate < 0) {
      alert('Please enter a valid APR');
      return;
    }

    if (paymentType === 'fixed' && fixed <= 0) {
      alert('Please enter a valid monthly payment');
      return;
    }

    const monthlyRate = rate / 100 / 12;
    let currentBalance = bal;
    let totalInterestPaid = 0;
    let monthCount = 0;
    const maxMonths = 600; // 50 years safety limit

    const yearlyBreakdown: YearData[] = [];
    let currentYear = 1;
    let yearStartBalance = bal;
    let yearPrincipalPaid = 0;
    let yearInterestPaid = 0;

    while (currentBalance > 0.01 && monthCount < maxMonths) {
      monthCount++;

      // Calculate interest for this month
      const interestCharge = currentBalance * monthlyRate;
      totalInterestPaid += interestCharge;

      // Calculate payment amount
      let payment: number;
      if (paymentType === 'minimum') {
        // Minimum payment = greater of (balance * %) or floor amount
        const percentPayment = currentBalance * (minPercent / 100);
        payment = Math.max(percentPayment, minFloor);
        // Don't pay more than balance + interest
        payment = Math.min(payment, currentBalance + interestCharge);
      } else {
        payment = fixed;
      }

      // Add extra payment
      payment += extra;

      // Apply payment
      currentBalance += interestCharge;
      
      // Don't overpay
      if (payment > currentBalance) {
        payment = currentBalance;
      }

      const principalPaid = payment - interestCharge;
      currentBalance -= payment;
      
      yearPrincipalPaid += principalPaid;
      yearInterestPaid += interestCharge;

      // End of year
      if (monthCount % 12 === 0 || currentBalance <= 0.01) {
        yearlyBreakdown.push({
          year: currentYear,
          startingBalance: Math.round(yearStartBalance * 100) / 100,
          totalPaid: Math.round((yearPrincipalPaid + yearInterestPaid) * 100) / 100,
          principalPaid: Math.round(yearPrincipalPaid * 100) / 100,
          interestPaid: Math.round(yearInterestPaid * 100) / 100,
          endingBalance: Math.max(0, Math.round(currentBalance * 100) / 100),
        });

        if (currentBalance > 0.01) {
          yearStartBalance = currentBalance;
          yearPrincipalPaid = 0;
          yearInterestPaid = 0;
          currentYear++;
        }
      }
    }

    // If using fixed payment, calculate minimum payment comparison
    let minimumPaymentComparison: ComparisonData | undefined;
    
    if (paymentType === 'fixed') {
      // Calculate what would happen with minimum payments
      let minBalance = bal;
      let minTotalInterest = 0;
      let minMonths = 0;
      
      while (minBalance > 0.01 && minMonths < maxMonths) {
        minMonths++;
        const minInterest = minBalance * monthlyRate;
        minTotalInterest += minInterest;
        
        const percentPayment = minBalance * (minPercent / 100);
        let minPay = Math.max(percentPayment, minFloor);
        
        minBalance += minInterest;
        minPay = Math.min(minPay, minBalance);
        minBalance -= minPay;
      }

      const minTotalPaid = bal + minTotalInterest;
      const actualTotalPaid = bal + totalInterestPaid;

      minimumPaymentComparison = {
        monthsToPayoff: minMonths,
        totalPaid: Math.round(minTotalPaid * 100) / 100,
        totalInterest: Math.round(minTotalInterest * 100) / 100,
        savings: Math.round((minTotalPaid - actualTotalPaid) * 100) / 100,
        timeSaved: minMonths - monthCount,
      };
    }

    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + monthCount);

    const monthlyPmt = paymentType === 'fixed' ? fixed + extra : 0;

    setResult({
      monthsToPayoff: monthCount,
      totalPaid: Math.round((bal + totalInterestPaid) * 100) / 100,
      totalInterest: Math.round(totalInterestPaid * 100) / 100,
      monthlyPayment: monthlyPmt,
      payoffDate,
      yearlyBreakdown,
      minimumPaymentComparison,
    });

    setHasCalculated(true);
    setShowYearlyBreakdown(false);
  };

  const handleReset = () => {
    setBalance('5000');
    setApr('18.99');
    setPaymentType('fixed');
    setFixedPayment('200');
    setMinimumPercent('2');
    setMinimumFloor('25');
    setExtraPayment('0');
    setResult(null);
    setHasCalculated(false);
    setShowYearlyBreakdown(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  const formatMonths = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) return `${months} months`;
    if (remainingMonths === 0) return `${years} ${years === 1 ? 'year' : 'years'}`;
    return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-[#1F4E78] mb-4 sm:mb-6">
          Enter Your Credit Card Details
        </h3>

        <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
          {/* Current Balance */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Balance
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 text-sm">$</span>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                placeholder="5000"
                min="0"
                step="100"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Total amount you owe
            </p>
          </div>

          {/* APR */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Annual Percentage Rate (APR)
            </label>
            <div className="relative">
              <input
                type="number"
                value={apr}
                onChange={(e) => setApr(e.target.value)}
                className="w-full pl-4 pr-8 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                placeholder="18.99"
                min="0"
                max="100"
                step="0.01"
              />
              <span className="absolute right-3 top-3 text-gray-500 text-sm">%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Check your credit card statement
            </p>
          </div>

          {/* Payment Strategy */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Payment Strategy
            </label>
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentType('fixed')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentType === 'fixed'
                    ? 'border-[#4472C4] bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    paymentType === 'fixed' ? 'border-[#4472C4]' : 'border-gray-300'
                  }`}>
                    {paymentType === 'fixed' && (
                      <div className="w-2 h-2 rounded-full bg-[#4472C4]"></div>
                    )}
                  </div>
                  <span className="font-semibold text-gray-900">Fixed Payment</span>
                </div>
                <p className="text-xs text-gray-600">
                  Pay the same amount each month (recommended)
                </p>
              </button>

              <button
                onClick={() => setPaymentType('minimum')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentType === 'minimum'
                    ? 'border-[#4472C4] bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    paymentType === 'minimum' ? 'border-[#4472C4]' : 'border-gray-300'
                  }`}>
                    {paymentType === 'minimum' && (
                      <div className="w-2 h-2 rounded-full bg-[#4472C4]"></div>
                    )}
                  </div>
                  <span className="font-semibold text-gray-900">Minimum Payment</span>
                </div>
                <p className="text-xs text-gray-600">
                  Pay only the minimum (not recommended)
                </p>
              </button>
            </div>
          </div>

          {/* Fixed Payment Amount */}
          {paymentType === 'fixed' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Monthly Payment Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500 text-sm">$</span>
                <input
                  type="number"
                  value={fixedPayment}
                  onChange={(e) => setFixedPayment(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                  placeholder="200"
                  min="0"
                  step="10"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Amount you'll pay each month
              </p>
            </div>
          )}

          {/* Minimum Payment Settings */}
          {paymentType === 'minimum' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minimum Payment Percentage
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={minimumPercent}
                    onChange={(e) => setMinimumPercent(e.target.value)}
                    className="w-full pl-4 pr-8 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                    placeholder="2"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-3 text-gray-500 text-sm">%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Usually 1-3% of balance
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minimum Payment Floor
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 text-sm">$</span>
                  <input
                    type="number"
                    value={minimumFloor}
                    onChange={(e) => setMinimumFloor(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                    placeholder="25"
                    min="0"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Minimum amount regardless of %
                </p>
              </div>
            </>
          )}

          {/* Extra Payment */}
          <div className={paymentType === 'minimum' ? 'sm:col-span-2' : ''}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Extra Payment (Optional)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 text-sm">$</span>
              <input
                type="number"
                value={extraPayment}
                onChange={(e) => setExtraPayment(e.target.value)}
                className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                placeholder="0"
                min="0"
                step="10"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Additional amount to pay each month
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={calculatePayoff}
            className="w-full bg-[#4472C4] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#1F4E78] transition-colors shadow-md hover:shadow-lg text-base"
          >
            Calculate Payoff Timeline
          </button>
          
          {hasCalculated && (
            <button
              onClick={handleReset}
              className="w-full bg-gray-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-600 transition-colors text-base"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Results Section */}
      {hasCalculated && result && (
        <div className="space-y-6">
          {/* Main Results Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">Time to Payoff</div>
              <div className="text-2xl sm:text-3xl font-bold">{formatMonths(result.monthsToPayoff)}</div>
              <div className="text-xs opacity-80 mt-2">Debt-free by {formatDate(result.payoffDate)}</div>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">Total Interest</div>
              <div className="text-2xl sm:text-3xl font-bold break-words">{formatCurrency(result.totalInterest)}</div>
              <div className="text-xs opacity-80 mt-2">Money lost to interest</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">Total Paid</div>
              <div className="text-2xl sm:text-3xl font-bold break-words">{formatCurrency(result.totalPaid)}</div>
              <div className="text-xs opacity-80 mt-2">Principal + Interest</div>
            </div>
          </div>

          {/* Minimum Payment Trap Warning */}
          {result.minimumPaymentComparison && (
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-6 shadow-xl">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">⚠️</span>
                <div>
                  <h4 className="text-xl font-bold mb-2">
                    You're Avoiding the Minimum Payment Trap!
                  </h4>
                  <p className="text-sm opacity-95 mb-4">
                    By paying {formatCurrency(result.monthlyPayment)}/month instead of minimum payments, you're saving:
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 bg-white/10 backdrop-blur rounded-lg p-4">
                <div>
                  <div className="text-xs opacity-80 mb-1">Money Saved</div>
                  <div className="text-2xl font-bold">{formatCurrency(result.minimumPaymentComparison.savings)}</div>
                </div>
                <div>
                  <div className="text-xs opacity-80 mb-1">Time Saved</div>
                  <div className="text-2xl font-bold">{formatMonths(result.minimumPaymentComparison.timeSaved)}</div>
                </div>
              </div>

              <div className="mt-4 text-sm opacity-90">
                <p><strong>With minimum payments:</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Payoff time: {formatMonths(result.minimumPaymentComparison.monthsToPayoff)}</li>
                  <li>Total interest: {formatCurrency(result.minimumPaymentComparison.totalInterest)}</li>
                  <li>Total paid: {formatCurrency(result.minimumPaymentComparison.totalPaid)}</li>
                </ul>
              </div>
            </div>
          )}

          {/* Key Insights */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-bold text-[#1F4E78] mb-4">
              💡 What This Means
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>You'll be debt-free in <strong>{formatMonths(result.monthsToPayoff)}</strong> ({formatDate(result.payoffDate)})</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Your {formatCurrency(parseFloat(balance))} balance will cost you <strong>{formatCurrency(result.totalInterest)}</strong> in interest</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>That's <strong>{((result.totalInterest / parseFloat(balance)) * 100).toFixed(1)}%</strong> extra on top of what you borrowed</span>
              </li>
              {result.minimumPaymentComparison && (
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>By paying more than minimum, you save <strong>{formatCurrency(result.minimumPaymentComparison.savings)}</strong> and get out of debt <strong>{formatMonths(result.minimumPaymentComparison.timeSaved)}</strong> faster!</span>
                </li>
              )}
            </ul>
          </div>

          {/* Year-by-Year Breakdown */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-base sm:text-lg font-bold text-[#1F4E78]">
                Year-by-Year Payoff
              </h4>
              <button
                onClick={() => setShowYearlyBreakdown(!showYearlyBreakdown)}
                className="text-[#4472C4] font-medium hover:underline text-sm"
              >
                {showYearlyBreakdown ? '▲ Hide' : '▼ Show'}
              </button>
            </div>

            {showYearlyBreakdown && (
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                  <table className="min-w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">Year</th>
                        <th className="text-right py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">Principal</th>
                        <th className="text-right py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">Interest</th>
                        <th className="text-right py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyBreakdown.map((year) => (
                        <tr key={year.year} className="border-b border-gray-100">
                          <td className="py-2 sm:py-3 px-1 sm:px-2 font-medium text-gray-900">{year.year}</td>
                          <td className="py-2 sm:py-3 px-1 sm:px-2 text-right text-green-600 whitespace-nowrap">
                            {formatCurrency(year.principalPaid)}
                          </td>
                          <td className="py-2 sm:py-3 px-1 sm:px-2 text-right text-red-600 whitespace-nowrap">
                            {formatCurrency(year.interestPaid)}
                          </td>
                          <td className="py-2 sm:py-3 px-1 sm:px-2 text-right font-semibold text-gray-900 whitespace-nowrap">
                            {formatCurrency(year.endingBalance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Initial State */}
      {!hasCalculated && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 sm:p-6 rounded">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💳</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Calculate when you'll be debt-free
              </h4>
              <p className="text-xs sm:text-sm text-gray-700">
                Enter your credit card details above and click &quot;Calculate Payoff Timeline&quot; 
                to see how quickly you can eliminate your debt and how much interest you'll pay.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}