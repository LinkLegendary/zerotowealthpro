'use client';

import { useState } from 'react';

interface CalculationResult {
  totalSavingsAtRetirement: number;
  totalContributions: number;
  totalGrowth: number;
  monthlyRetirementIncome: number;
  retirementNestEggNeeded: number;
  surplus: number;
  onTrack: boolean;
  yearlyProjection: YearData[];
}

interface YearData {
  age: number;
  year: number;
  contributions: number;
  growth: number;
  balance: number;
}

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState<string>('30');
  const [retirementAge, setRetirementAge] = useState<string>('65');
  const [currentSavings, setCurrentSavings] = useState<string>('50000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500');
  const [annualReturn, setAnnualReturn] = useState<string>('7');
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState<string>('5000');
  const [lifeExpectancy, setLifeExpectancy] = useState<string>('90');
  const [socialSecurityMonthly, setSocialSecurityMonthly] = useState<string>('2000');
  const [inflationRate, setInflationRate] = useState<string>('3');
  
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showYearlyProjection, setShowYearlyProjection] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateRetirement = () => {
    const currAge = parseFloat(currentAge) || 0;
    const retAge = parseFloat(retirementAge) || 0;
    const savings = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const returnRate = parseFloat(annualReturn) || 0;
    const desiredIncome = parseFloat(desiredMonthlyIncome) || 0;
    const lifeExp = parseFloat(lifeExpectancy) || 0;
    const socialSec = parseFloat(socialSecurityMonthly) || 0;
    const inflation = parseFloat(inflationRate) || 0;

    // Validation
    if (currAge <= 0 || currAge >= 100) {
      alert('Please enter a valid current age between 1 and 99');
      return;
    }

    if (retAge <= currAge || retAge > 100) {
      alert('Retirement age must be greater than current age and less than 100');
      return;
    }

    if (returnRate < 0 || returnRate > 100) {
      alert('Please enter a valid return rate');
      return;
    }

    if (lifeExp <= retAge) {
      alert('Life expectancy must be greater than retirement age');
      return;
    }

    // Calculate years until retirement
    const yearsUntilRetirement = retAge - currAge;
    const yearsInRetirement = lifeExp - retAge;

    // Calculate savings at retirement
    const yearlyProjection: YearData[] = [];
    let balance = savings;
    let totalContributions = savings;
    const monthlyRate = returnRate / 100 / 12;

    for (let year = 1; year <= yearsUntilRetirement; year++) {
      const yearStartBalance = balance;
      let yearContributions = 0;
      let yearGrowth = 0;

      // Monthly calculations
      for (let month = 1; month <= 12; month++) {
        balance += monthly;
        yearContributions += monthly;
        totalContributions += monthly;

        const monthlyGrowth = balance * monthlyRate;
        balance += monthlyGrowth;
        yearGrowth += monthlyGrowth;
      }

      yearlyProjection.push({
        age: currAge + year,
        year,
        contributions: Math.round(yearContributions * 100) / 100,
        growth: Math.round(yearGrowth * 100) / 100,
        balance: Math.round(balance * 100) / 100,
      });
    }

    const totalSavingsAtRetirement = balance;
    const totalGrowth = totalSavingsAtRetirement - totalContributions;

    // Calculate how much is needed for retirement
    // Account for Social Security
    const incomeNeededFromSavings = Math.max(0, desiredIncome - socialSec);
    
    // Adjust for inflation during retirement
    const avgInflationAdjustedIncome = incomeNeededFromSavings * Math.pow(1 + inflation / 100, yearsInRetirement / 2);
    
    // Using 4% withdrawal rule adjusted for actual return rate
    const withdrawalRate = 0.04; // 4% rule
    const retirementNestEggNeeded = (avgInflationAdjustedIncome * 12) / withdrawalRate;

    // Calculate if on track
    const surplus = totalSavingsAtRetirement - retirementNestEggNeeded;
    const onTrack = surplus >= 0;

    // Calculate monthly income from savings using 4% rule
    const monthlyRetirementIncome = (totalSavingsAtRetirement * withdrawalRate) / 12;

    setResult({
      totalSavingsAtRetirement: Math.round(totalSavingsAtRetirement * 100) / 100,
      totalContributions: Math.round(totalContributions * 100) / 100,
      totalGrowth: Math.round(totalGrowth * 100) / 100,
      monthlyRetirementIncome: Math.round(monthlyRetirementIncome * 100) / 100,
      retirementNestEggNeeded: Math.round(retirementNestEggNeeded * 100) / 100,
      surplus: Math.round(surplus * 100) / 100,
      onTrack,
      yearlyProjection,
    });

    setHasCalculated(true);
    setShowYearlyProjection(false);
  };

  const handleReset = () => {
    setCurrentAge('30');
    setRetirementAge('65');
    setCurrentSavings('50000');
    setMonthlyContribution('500');
    setAnnualReturn('7');
    setDesiredMonthlyIncome('5000');
    setLifeExpectancy('90');
    setSocialSecurityMonthly('2000');
    setInflationRate('3');
    setResult(null);
    setHasCalculated(false);
    setShowYearlyProjection(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const yearsUntilRetirement = parseFloat(retirementAge) - parseFloat(currentAge);

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-[#1F4E78] mb-4 sm:mb-6">
          Enter Your Retirement Information
        </h3>

        <div className="space-y-6">
          {/* Age Information */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Age & Timeline</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Current Age
                </label>
                <input
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(e.target.value)}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                  placeholder="30"
                  min="18"
                  max="99"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Retirement Age
                </label>
                <input
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(e.target.value)}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                  placeholder="65"
                  min="50"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Life Expectancy
                </label>
                <input
                  type="number"
                  value={lifeExpectancy}
                  onChange={(e) => setLifeExpectancy(e.target.value)}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                  placeholder="90"
                  min="60"
                  max="120"
                />
              </div>
            </div>
            {yearsUntilRetirement > 0 && (
              <p className="text-xs text-gray-500 mt-2">
                You have {yearsUntilRetirement} years until retirement
              </p>
            )}
          </div>

          {/* Current Savings & Contributions */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Savings & Contributions</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Current Retirement Savings
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 text-sm">$</span>
                  <input
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                    placeholder="50000"
                    min="0"
                    step="1000"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  401k, IRA, savings, etc.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Monthly Contribution
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 text-sm">$</span>
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
                <p className="text-xs text-gray-500 mt-1">
                  How much you save monthly
                </p>
              </div>
            </div>
          </div>

          {/* Investment Return */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Investment Assumptions</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Expected Annual Return
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(e.target.value)}
                    className="w-full pl-4 pr-8 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                    placeholder="7"
                    min="0"
                    max="20"
                    step="0.5"
                  />
                  <span className="absolute right-3 top-3 text-gray-500 text-sm">%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Conservative: 6-7%
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Inflation Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(e.target.value)}
                    className="w-full pl-4 pr-8 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                    placeholder="3"
                    min="0"
                    max="10"
                    step="0.5"
                  />
                  <span className="absolute right-3 top-3 text-gray-500 text-sm">%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Historical avg: 3%
                </p>
              </div>
            </div>
          </div>

          {/* Retirement Income Needs */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Retirement Income Needs</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Desired Monthly Income
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 text-sm">$</span>
                  <input
                    type="number"
                    value={desiredMonthlyIncome}
                    onChange={(e) => setDesiredMonthlyIncome(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                    placeholder="5000"
                    min="0"
                    step="100"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  In today's dollars
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Expected Social Security
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 text-sm">$</span>
                  <input
                    type="number"
                    value={socialSecurityMonthly}
                    onChange={(e) => setSocialSecurityMonthly(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                    placeholder="2000"
                    min="0"
                    step="100"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Avg: $1,500-$3,500/month
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={calculateRetirement}
            className="w-full bg-[#4472C4] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#1F4E78] transition-colors shadow-md hover:shadow-lg text-base"
          >
            Calculate My Retirement Plan
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
          {/* On Track Status */}
          <div className={`rounded-xl p-6 sm:p-8 text-white shadow-2xl ${
            result.onTrack 
              ? 'bg-gradient-to-br from-green-500 to-green-600' 
              : 'bg-gradient-to-br from-orange-500 to-red-600'
          }`}>
            <div className="text-center">
              <div className="text-5xl mb-4">
                {result.onTrack ? '✅' : '⚠️'}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                {result.onTrack ? 'You\'re On Track!' : 'Action Needed'}
              </h3>
              <p className="text-lg opacity-95 mb-4">
                {result.onTrack 
                  ? `You're projected to have ${formatCurrency(Math.abs(result.surplus))} more than needed`
                  : `You're projected to be ${formatCurrency(Math.abs(result.surplus))} short of your goal`
                }
              </p>
              {!result.onTrack && (
                <div className="bg-white/20 backdrop-blur rounded-lg p-4 text-sm">
                  <p className="font-semibold mb-2">To get on track, you can:</p>
                  <ul className="space-y-1 text-left max-w-md mx-auto">
                    <li>• Increase monthly contributions by ${Math.round(Math.abs(result.surplus) / (yearsUntilRetirement * 12))}</li>
                    <li>• Work {Math.round(Math.abs(result.surplus) / (parseFloat(monthlyContribution) * 12))} more years</li>
                    <li>• Lower retirement spending expectations</li>
                    <li>• Pursue higher investment returns (with more risk)</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Main Results Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">Savings at Retirement</div>
              <div className="text-2xl sm:text-3xl font-bold break-words">{formatCurrency(result.totalSavingsAtRetirement)}</div>
              <div className="text-xs opacity-80 mt-2">At age {retirementAge}</div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">Monthly Income</div>
              <div className="text-2xl sm:text-3xl font-bold break-words">{formatCurrency(result.monthlyRetirementIncome + parseFloat(socialSecurityMonthly))}</div>
              <div className="text-xs opacity-80 mt-2">From savings + Social Security</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">Investment Growth</div>
              <div className="text-2xl sm:text-3xl font-bold break-words">{formatCurrency(result.totalGrowth)}</div>
              <div className="text-xs opacity-80 mt-2">Interest earnings</div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-bold text-[#1F4E78] mb-6">
              Retirement Plan Breakdown
            </h4>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-3 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Total You'll Contribute</span>
                <span className="text-xl font-bold text-blue-600">{formatCurrency(result.totalContributions)}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-3 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Investment Growth</span>
                <span className="text-xl font-bold text-green-600">{formatCurrency(result.totalGrowth)}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-3 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Total at Retirement</span>
                <span className="text-xl font-bold text-gray-900">{formatCurrency(result.totalSavingsAtRetirement)}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-3 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Nest Egg Needed</span>
                <span className="text-xl font-bold text-purple-600">{formatCurrency(result.retirementNestEggNeeded)}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pt-3 bg-gray-50 -mx-2 px-2 py-3 rounded">
                <span className="text-gray-900 font-bold">Surplus / (Shortfall)</span>
                <span className={`text-2xl font-bold ${result.onTrack ? 'text-green-600' : 'text-red-600'}`}>
                  {result.onTrack ? '+' : ''}{formatCurrency(result.surplus)}
                </span>
              </div>
            </div>
          </div>

          {/* Income Breakdown */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-bold text-[#1F4E78] mb-4">
              Monthly Retirement Income
            </h4>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-600">From Savings (4% withdrawal)</span>
                <span className="font-semibold text-gray-900">{formatCurrency(result.monthlyRetirementIncome)}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-600">Social Security</span>
                <span className="font-semibold text-gray-900">{formatCurrency(parseFloat(socialSecurityMonthly))}</span>
              </div>

              <div className="flex justify-between items-center pt-3 bg-green-50 -mx-2 px-2 py-3 rounded">
                <span className="font-bold text-gray-900">Total Monthly Income</span>
                <span className="text-xl font-bold text-green-600">
                  {formatCurrency(result.monthlyRetirementIncome + parseFloat(socialSecurityMonthly))}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-600">Your Goal</span>
                <span className="font-semibold text-gray-700">{formatCurrency(parseFloat(desiredMonthlyIncome))}</span>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl p-6 shadow-lg">
            <h4 className="text-lg font-bold mb-3">💡 Key Insights</h4>
            <ul className="space-y-2 text-sm">
              <li>• You have <strong>{yearsUntilRetirement} years</strong> until retirement (age {retirementAge})</li>
              <li>• Contributing <strong>{formatCurrency(parseFloat(monthlyContribution))}/month</strong> for {yearsUntilRetirement} years</li>
              <li>• At <strong>{annualReturn}% return</strong>, you'll have {formatCurrency(result.totalSavingsAtRetirement)} by retirement</li>
              <li>• This provides <strong>{formatCurrency(result.monthlyRetirementIncome)}/month</strong> from savings (using 4% rule)</li>
              <li>• Plus Social Security of <strong>{formatCurrency(parseFloat(socialSecurityMonthly))}/month</strong></li>
              <li>• Total retirement income: <strong>{formatCurrency(result.monthlyRetirementIncome + parseFloat(socialSecurityMonthly))}/month</strong></li>
            </ul>
          </div>

          {/* Year-by-Year Projection */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-base sm:text-lg font-bold text-[#1F4E78]">
                Year-by-Year Projection
              </h4>
              <button
                onClick={() => setShowYearlyProjection(!showYearlyProjection)}
                className="text-[#4472C4] font-medium hover:underline text-sm"
              >
                {showYearlyProjection ? '▲ Hide' : '▼ Show'}
              </button>
            </div>

            {showYearlyProjection && (
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                  <table className="min-w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">Age</th>
                        <th className="text-right py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">Contributed</th>
                        <th className="text-right py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">Growth</th>
                        <th className="text-right py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyProjection.map((year) => (
                        <tr key={year.age} className="border-b border-gray-100">
                          <td className="py-2 sm:py-3 px-1 sm:px-2 font-medium text-gray-900">{year.age}</td>
                          <td className="py-2 sm:py-3 px-1 sm:px-2 text-right text-blue-600 whitespace-nowrap">
                            {formatCurrency(year.contributions)}
                          </td>
                          <td className="py-2 sm:py-3 px-1 sm:px-2 text-right text-green-600 whitespace-nowrap">
                            {formatCurrency(year.growth)}
                          </td>
                          <td className="py-2 sm:py-3 px-1 sm:px-2 text-right font-semibold text-gray-900 whitespace-nowrap">
                            {formatCurrency(year.balance)}
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
            <span className="text-2xl">🏖️</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Plan your retirement
              </h4>
              <p className="text-xs sm:text-sm text-gray-700">
                Enter your information above to see if you're on track for retirement and 
                how much monthly income you'll have when you stop working.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}