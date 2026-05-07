'use client';

import { useState } from 'react';

interface CalculationResult {
  futureValue: number;
  totalContributions: number;
  totalGains: number;
  roi: number;
  yearlyBreakdown: YearData[];
  comparisonScenarios?: ComparisonData[];
}

interface YearData {
  year: number;
  startingBalance: number;
  contributions: number;
  gains: number;
  endingBalance: number;
  totalContributions: number;
  totalGains: number;
}

interface ComparisonData {
  label: string;
  returnRate: number;
  futureValue: number;
  totalGains: number;
}

export default function InvestmentReturnCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<string>('10000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500');
  const [years, setYears] = useState<string>('20');
  const [returnRate, setReturnRate] = useState<string>('8');
  const [contributionIncrease, setContributionIncrease] = useState<string>('0');
  const [investmentStyle, setInvestmentStyle] = useState<
    'conservative' | 'moderate' | 'aggressive' | 'custom'
  >('moderate');

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showYearlyBreakdown, setShowYearlyBreakdown] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Preset return rates based on investment style
  const styleRates = {
    conservative: 5,
    moderate: 8,
    aggressive: 10,
    custom: parseFloat(returnRate) || 8,
  };

  const calculateInvestment = () => {
    const initial = parseFloat(initialInvestment) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const time = parseFloat(years) || 0;
    const rate =
      investmentStyle === 'custom'
        ? parseFloat(returnRate) || 0
        : styleRates[investmentStyle];
    const increase = parseFloat(contributionIncrease) || 0;

    // Validation
    if (initial < 0) {
      alert('Please enter a valid initial investment (0 or greater)');
      return;
    }

    if (monthly < 0) {
      alert('Please enter a valid monthly contribution (0 or greater)');
      return;
    }

    if (initial === 0 && monthly === 0) {
      alert('Please enter an initial investment or monthly contribution');
      return;
    }

    if (time <= 0) {
      alert('Please enter a valid time period');
      return;
    }

    if (rate < 0 || rate > 100) {
      alert('Please enter a valid return rate between 0% and 100%');
      return;
    }

    // Calculate year by year
    const yearlyBreakdown: YearData[] = [];
    let balance = initial;
    let totalContributions = initial;
    let currentMonthlyContribution = monthly;

    for (let year = 1; year <= time; year++) {
      const yearStartBalance = balance;
      let yearContributions = 0;
      let yearGains = 0;

      // Monthly calculations
      for (let month = 1; month <= 12; month++) {
        // Add monthly contribution
        balance += currentMonthlyContribution;
        yearContributions += currentMonthlyContribution;
        totalContributions += currentMonthlyContribution;

        // Calculate monthly gains
        const monthlyReturn = balance * (rate / 100 / 12);
        balance += monthlyReturn;
        yearGains += monthlyReturn;
      }

      // Increase monthly contribution for next year if applicable
      if (increase > 0) {
        currentMonthlyContribution *= 1 + increase / 100;
      }

      yearlyBreakdown.push({
        year,
        startingBalance: Math.round(yearStartBalance * 100) / 100,
        contributions: Math.round(yearContributions * 100) / 100,
        gains: Math.round(yearGains * 100) / 100,
        endingBalance: Math.round(balance * 100) / 100,
        totalContributions: Math.round(totalContributions * 100) / 100,
        totalGains: Math.round((balance - totalContributions) * 100) / 100,
      });
    }

    const futureValue = balance;
    const totalGains = futureValue - totalContributions;
    const roi =
      totalContributions > 0 ? (totalGains / totalContributions) * 100 : 0;

    // Create comparison scenarios (Conservative, Moderate, Aggressive)
    const comparisonScenarios: ComparisonData[] = [];

    if (investmentStyle === 'custom') {
      [
        { label: 'Conservative (5%)', rate: 5 },
        { label: 'Moderate (8%)', rate: 8 },
        { label: 'Aggressive (10%)', rate: 10 },
      ].forEach((scenario) => {
        let scenarioBalance = initial;
        let scenarioContributions = initial;
        let scenarioMonthly = monthly;

        for (let year = 1; year <= time; year++) {
          for (let month = 1; month <= 12; month++) {
            scenarioBalance += scenarioMonthly;
            scenarioContributions += scenarioMonthly;
            scenarioBalance += scenarioBalance * (scenario.rate / 100 / 12);
          }
          if (increase > 0) {
            scenarioMonthly *= 1 + increase / 100;
          }
        }

        comparisonScenarios.push({
          label: scenario.label,
          returnRate: scenario.rate,
          futureValue: Math.round(scenarioBalance * 100) / 100,
          totalGains:
            Math.round((scenarioBalance - scenarioContributions) * 100) / 100,
        });
      });
    }

    setResult({
      futureValue: Math.round(futureValue * 100) / 100,
      totalContributions: Math.round(totalContributions * 100) / 100,
      totalGains: Math.round(totalGains * 100) / 100,
      roi: Math.round(roi * 100) / 100,
      yearlyBreakdown,
      comparisonScenarios:
        comparisonScenarios.length > 0 ? comparisonScenarios : undefined,
    });

    setHasCalculated(true);
    setShowYearlyBreakdown(false);
  };

  const handleReset = () => {
    setInitialInvestment('10000');
    setMonthlyContribution('500');
    setYears('20');
    setReturnRate('8');
    setContributionIncrease('0');
    setInvestmentStyle('moderate');
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

  const currentRate =
    investmentStyle === 'custom'
      ? parseFloat(returnRate) || 8
      : styleRates[investmentStyle];

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-[#1F4E78] mb-4 sm:mb-6">
          Enter Your Investment Details
        </h3>

        <div className="space-y-6">
          {/* Investment Style Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Investment Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => setInvestmentStyle('conservative')}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  investmentStyle === 'conservative'
                    ? 'border-[#4472C4] bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="font-semibold text-sm text-gray-900">
                  Conservative
                </div>
                <div className="text-xs text-gray-600">5% return</div>
              </button>

              <button
                onClick={() => setInvestmentStyle('moderate')}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  investmentStyle === 'moderate'
                    ? 'border-[#4472C4] bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="font-semibold text-sm text-gray-900">
                  Moderate
                </div>
                <div className="text-xs text-gray-600">8% return</div>
              </button>

              <button
                onClick={() => setInvestmentStyle('aggressive')}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  investmentStyle === 'aggressive'
                    ? 'border-[#4472C4] bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="font-semibold text-sm text-gray-900">
                  Aggressive
                </div>
                <div className="text-xs text-gray-600">10% return</div>
              </button>

              <button
                onClick={() => setInvestmentStyle('custom')}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  investmentStyle === 'custom'
                    ? 'border-[#4472C4] bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="font-semibold text-sm text-gray-900">
                  Custom
                </div>
                <div className="text-xs text-gray-600">Your rate</div>
              </button>
            </div>
          </div>

          {/* Input Fields */}
          <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
            {/* Initial Investment */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Initial Investment
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500 text-sm">
                  $
                </span>
                <input
                  type="number"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                  placeholder="10000"
                  min="0"
                  step="1000"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Starting amount to invest
              </p>
            </div>

            {/* Monthly Contribution */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Monthly Contribution
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500 text-sm">
                  $
                </span>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                  placeholder="500"
                  min="0"
                  step="50"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Amount added monthly</p>
            </div>

            {/* Time Period */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Investment Period (Years)
              </label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                placeholder="20"
                min="1"
                max="50"
              />
              <p className="text-xs text-gray-500 mt-1">
                How long you'll invest
              </p>
            </div>

            {/* Expected Return Rate */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expected Annual Return
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={
                    investmentStyle === 'custom' ? returnRate : currentRate
                  }
                  onChange={(e) => {
                    setReturnRate(e.target.value);
                    setInvestmentStyle('custom');
                  }}
                  disabled={investmentStyle !== 'custom'}
                  className={`w-full pl-4 pr-8 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent ${
                    investmentStyle !== 'custom'
                      ? 'bg-gray-100 cursor-not-allowed'
                      : ''
                  }`}
                  placeholder="8"
                  min="0"
                  max="100"
                  step="0.1"
                />
                <span className="absolute right-3 top-3 text-gray-500 text-sm">
                  %
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                S&P 500 avg: ~10% annually
              </p>
            </div>

            {/* Annual Contribution Increase */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Annual Contribution Increase (Optional)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={contributionIncrease}
                  onChange={(e) => setContributionIncrease(e.target.value)}
                  className="w-full pl-4 pr-8 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                  placeholder="0"
                  min="0"
                  max="100"
                  step="1"
                />
                <span className="absolute right-3 top-3 text-gray-500 text-sm">
                  %
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Increase contributions each year (e.g., 3% for inflation/raises)
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={calculateInvestment}
            className="w-full bg-[#4472C4] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#1F4E78] transition-colors shadow-md hover:shadow-lg text-base"
          >
            Calculate Investment Returns
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
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Future Value
              </div>
              <div className="text-2xl sm:text-3xl font-bold break-words">
                {formatCurrency(result.futureValue)}
              </div>
              <div className="text-xs opacity-80 mt-2">After {years} years</div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Total Contributions
              </div>
              <div className="text-2xl sm:text-3xl font-bold break-words">
                {formatCurrency(result.totalContributions)}
              </div>
              <div className="text-xs opacity-80 mt-2">What you put in</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Investment Gains
              </div>
              <div className="text-2xl sm:text-3xl font-bold break-words">
                {formatCurrency(result.totalGains)}
              </div>
              <div className="text-xs opacity-80 mt-2">Your profit</div>
            </div>
          </div>

          {/* ROI and Breakdown */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-bold text-[#1F4E78] mb-4">
              Investment Breakdown
            </h4>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">
                  Contributions:{' '}
                  {(
                    (result.totalContributions / result.futureValue) *
                    100
                  ).toFixed(1)}
                  %
                </span>
                <span className="text-gray-600">
                  Gains:{' '}
                  {((result.totalGains / result.futureValue) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-8 bg-gray-200 rounded-full overflow-hidden flex">
                <div
                  className="bg-blue-500 flex items-center justify-center text-white text-xs font-semibold"
                  style={{
                    width: `${((result.totalContributions / result.futureValue) * 100).toFixed(1)}%`,
                  }}
                >
                  {(result.totalContributions / result.futureValue) * 100 >
                    15 && (
                    <span className="hidden sm:inline">
                      {formatCurrency(result.totalContributions)}
                    </span>
                  )}
                </div>
                <div
                  className="bg-purple-500 flex items-center justify-center text-white text-xs font-semibold"
                  style={{
                    width: `${((result.totalGains / result.futureValue) * 100).toFixed(1)}%`,
                  }}
                >
                  {(result.totalGains / result.futureValue) * 100 > 15 && (
                    <span className="hidden sm:inline">
                      {formatCurrency(result.totalGains)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ROI */}
            <div className="bg-green-50 rounded-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6">
                <div>
                  <div className="text-sm text-gray-600 mb-2">
                    Return on Investment (ROI)
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold text-green-600">
                    {result.roi.toFixed(1)}%
                  </div>
                </div>
                <div className="sm:text-right">
                  <div className="text-sm text-gray-600 mb-2">
                    Your money grew by
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {formatCurrency(result.totalGains)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Scenarios */}
          {result.comparisonScenarios &&
            result.comparisonScenarios.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h4 className="text-lg font-bold text-[#1F4E78] mb-4">
                  Compare Different Return Rates
                </h4>

                <div className="space-y-3">
                  {result.comparisonScenarios.map((scenario, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-900">
                          {scenario.label}
                        </span>
                        <span className="text-sm text-gray-600">
                          {scenario.returnRate}% annual return
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Future Value</div>
                          <div className="font-semibold text-gray-900">
                            {formatCurrency(scenario.futureValue)}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Total Gains</div>
                          <div className="font-semibold text-green-600">
                            {formatCurrency(scenario.totalGains)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> A small difference in return rate has
                    a huge impact over time. This is why choosing the right
                    investment strategy matters.
                  </p>
                </div>
              </div>
            )}

          {/* Key Insights */}
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl p-6 shadow-lg">
            <h4 className="text-lg font-bold mb-3">💡 Key Insights</h4>
            <ul className="space-y-2 text-sm">
              <li>
                • Starting with {formatCurrency(parseFloat(initialInvestment))}{' '}
                and adding {formatCurrency(parseFloat(monthlyContribution))}
                /month
              </li>
              <li>
                • At {currentRate}% annual return, you'll have{' '}
                <strong>{formatCurrency(result.futureValue)}</strong> in {years}{' '}
                years
              </li>
              <li>
                • Your {formatCurrency(result.totalContributions)} investment
                will earn <strong>{formatCurrency(result.totalGains)}</strong>
              </li>
              <li>
                • That's a <strong>{result.roi.toFixed(1)}%</strong> return on
                your contributions!
              </li>
              <li>
                • The power of compound interest:{' '}
                <strong>
                  {(
                    (result.totalGains / result.totalContributions) *
                    100
                  ).toFixed(0)}
                  %
                </strong>{' '}
                of your final balance is pure gains
              </li>
            </ul>
          </div>

          {/* Year-by-Year Breakdown */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-base sm:text-lg font-bold text-[#1F4E78]">
                Year-by-Year Growth
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
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">
                          Year
                        </th>
                        <th className="text-right py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">
                          Added
                        </th>
                        <th className="text-right py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">
                          Gains
                        </th>
                        <th className="text-right py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">
                          Balance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyBreakdown.map((year) => (
                        <tr
                          key={year.year}
                          className="border-b border-gray-100"
                        >
                          <td className="py-2 sm:py-3 px-1 sm:px-2 font-medium text-gray-900">
                            {year.year}
                          </td>
                          <td className="py-2 sm:py-3 px-1 sm:px-2 text-right text-blue-600 whitespace-nowrap">
                            {formatCurrency(year.contributions)}
                          </td>
                          <td className="py-2 sm:py-3 px-1 sm:px-2 text-right text-green-600 whitespace-nowrap">
                            {formatCurrency(year.gains)}
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
            <span className="text-2xl">📈</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Project your investment growth
              </h4>
              <p className="text-xs sm:text-sm text-gray-700">
                Choose your investment style and enter your details above to see
                how your money can grow over time with the power of compound
                interest.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
