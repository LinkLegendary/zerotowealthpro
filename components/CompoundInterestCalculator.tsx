'use client';

import { useState } from 'react';

interface CalculationResult {
  finalAmount: number;
  totalContributions: number;
  totalInterest: number;
  yearlyBreakdown: YearData[];
}

interface YearData {
  year: number;
  balance: number;
  totalContributions: number;
  totalInterest: number;
}

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState<string>('10000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('200');
  const [annualRate, setAnnualRate] = useState<string>('7');
  const [years, setYears] = useState<string>('10');
  const [compoundFrequency, setCompoundFrequency] = useState<string>('12'); // Monthly
  
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const r = (parseFloat(annualRate) || 0) / 100;
    const t = parseFloat(years) || 0;
    const n = parseFloat(compoundFrequency) || 12;

    // Validation
    if (P < 0 || r < 0 || t <= 0) {
      alert('Please enter valid positive numbers');
      return;
    }

    if (P === 0 && PMT === 0) {
      alert('Please enter an initial investment or monthly contribution');
      return;
    }

    const yearlyBreakdown: YearData[] = [];
    let balance = P;
    let totalContributions = P;

    // Calculate year by year
    for (let year = 1; year <= t; year++) {
      // Compound interest on current balance
      balance = balance * Math.pow(1 + r / n, n);
      
      // Add monthly contributions with compound interest
      for (let month = 1; month <= 12; month++) {
        balance += PMT;
        totalContributions += PMT;
        // Compound the new contribution for the remaining periods in the year
        const periodsRemaining = (12 - month) * (n / 12);
        if (periodsRemaining > 0) {
          balance = balance * Math.pow(1 + r / n, n / 12);
        }
      }

      yearlyBreakdown.push({
        year,
        balance: Math.round(balance * 100) / 100,
        totalContributions: Math.round(totalContributions * 100) / 100,
        totalInterest: Math.round((balance - totalContributions) * 100) / 100,
      });
    }

    const finalAmount = balance;
    const totalInterest = finalAmount - totalContributions;

    setResult({
      finalAmount: Math.round(finalAmount * 100) / 100,
      totalContributions: Math.round(totalContributions * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      yearlyBreakdown,
    });

    setHasCalculated(true);
    setShowBreakdown(false); // Reset breakdown view
  };

  const handleReset = () => {
    setPrincipal('10000');
    setMonthlyContribution('200');
    setAnnualRate('7');
    setYears('10');
    setCompoundFrequency('12');
    setResult(null);
    setHasCalculated(false);
    setShowBreakdown(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getPercentage = (part: number, total: number) => {
    return total > 0 ? ((part / total) * 100).toFixed(1) : '0';
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-[#1F4E78] mb-6">
          Enter Your Information
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Initial Investment */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Initial Investment
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                placeholder="10000"
                min="0"
              />
            </div>
          </div>

          {/* Monthly Contribution */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Monthly Contribution
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                placeholder="200"
                min="0"
              />
            </div>
          </div>

          {/* Annual Interest Rate */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Annual Interest Rate
            </label>
            <div className="relative">
              <input
                type="number"
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
                className="w-full pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                placeholder="7"
                min="0"
                max="100"
                step="0.1"
              />
              <span className="absolute right-3 top-3 text-gray-500">%</span>
            </div>
          </div>

          {/* Time Period */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Time Period (Years)
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
              placeholder="10"
              min="1"
              max="50"
            />
          </div>

          {/* Compound Frequency */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Compound Frequency
            </label>
            <select
              value={compoundFrequency}
              onChange={(e) => setCompoundFrequency(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
            >
              <option value="1">Annually</option>
              <option value="2">Semi-annually</option>
              <option value="4">Quarterly</option>
              <option value="12">Monthly</option>
              <option value="52">Weekly</option>
              <option value="365">Daily</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={calculateCompoundInterest}
            className="flex-1 bg-[#4472C4] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#1F4E78] transition-colors shadow-md hover:shadow-lg"
          >
            Calculate My Investment Growth
          </button>
          
          {hasCalculated && (
            <button
              onClick={handleReset}
              className="sm:w-auto bg-gray-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Results Section - Only shown after calculation */}
      {hasCalculated && result && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
              <div className="text-sm opacity-90 mb-1">Final Amount</div>
              <div className="text-3xl font-bold">{formatCurrency(result.finalAmount)}</div>
              <div className="text-xs opacity-80 mt-2">After {years} years</div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
              <div className="text-sm opacity-90 mb-1">Total Contributions</div>
              <div className="text-3xl font-bold">{formatCurrency(result.totalContributions)}</div>
              <div className="text-xs opacity-80 mt-2">What you put in</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
              <div className="text-sm opacity-90 mb-1">Total Interest Earned</div>
              <div className="text-3xl font-bold">{formatCurrency(result.totalInterest)}</div>
              <div className="text-xs opacity-80 mt-2">Your profit</div>
            </div>
          </div>

          {/* Visual Breakdown */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-bold text-[#1F4E78] mb-4">
              Breakdown
            </h4>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">
                  Contributions: {getPercentage(result.totalContributions, result.finalAmount)}%
                </span>
                <span className="text-gray-600">
                  Interest: {getPercentage(result.totalInterest, result.finalAmount)}%
                </span>
              </div>
              <div className="h-8 bg-gray-200 rounded-full overflow-hidden flex">
                <div
                  className="bg-blue-500 flex items-center justify-center text-white text-xs font-semibold"
                  style={{ width: `${getPercentage(result.totalContributions, result.finalAmount)}%` }}
                >
                  {parseFloat(getPercentage(result.totalContributions, result.finalAmount)) > 15 && 
                    formatCurrency(result.totalContributions)
                  }
                </div>
                <div
                  className="bg-purple-500 flex items-center justify-center text-white text-xs font-semibold"
                  style={{ width: `${getPercentage(result.totalInterest, result.finalAmount)}%` }}
                >
                  {parseFloat(getPercentage(result.totalInterest, result.finalAmount)) > 15 && 
                    formatCurrency(result.totalInterest)
                  }
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">You Contributed</div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(result.totalContributions)}
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Interest Earned</div>
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(result.totalInterest)}
                </div>
              </div>
            </div>

            {/* Return on Investment */}
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Return on Investment (ROI)</div>
              <div className="text-2xl font-bold text-green-600">
                {((result.totalInterest / result.totalContributions) * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Your money grew by {formatCurrency(result.totalInterest)} over {years} years
              </div>
            </div>
          </div>

          {/* Year-by-Year Breakdown */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold text-[#1F4E78]">
                Year-by-Year Growth
              </h4>
              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="text-[#4472C4] font-medium hover:underline text-sm"
              >
                {showBreakdown ? '▲ Hide Details' : '▼ Show Details'}
              </button>
            </div>

            {showBreakdown && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Year</th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-700">Balance</th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-700">Contributed</th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-700">Interest</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.yearlyBreakdown.map((yearData) => (
                      <tr key={yearData.year} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-2 font-medium text-gray-900">{yearData.year}</td>
                        <td className="py-3 px-2 text-right font-semibold text-green-600">
                          {formatCurrency(yearData.balance)}
                        </td>
                        <td className="py-3 px-2 text-right text-gray-600">
                          {formatCurrency(yearData.totalContributions)}
                        </td>
                        <td className="py-3 px-2 text-right text-purple-600">
                          {formatCurrency(yearData.totalInterest)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Key Takeaways */}
          <div className="bg-[#1F4E78] text-white rounded-xl p-6 shadow-lg">
            <h4 className="text-lg font-bold mb-4">💡 Key Takeaways</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>• Starting with {formatCurrency(parseFloat(principal))} and adding {formatCurrency(parseFloat(monthlyContribution))}/month</li>
              <li>• At {annualRate}% annual return, you'll have {formatCurrency(result.finalAmount)} in {years} years</li>
              <li>• Your {formatCurrency(result.totalContributions)} will earn {formatCurrency(result.totalInterest)} in interest</li>
              <li>• That's a {((result.totalInterest / result.totalContributions) * 100).toFixed(1)}% return on your contributions!</li>
            </ul>
          </div>
        </div>
      )}

      {/* Initial State - Before Calculation */}
      {!hasCalculated && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Ready to see your potential?
              </h4>
              <p className="text-sm text-gray-700">
                Fill in your information above and click "Calculate My Investment Growth" 
                to see how compound interest can help you build wealth over time.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}