'use client';

import { useState } from 'react';

type JobStability = 'stable' | 'moderate' | 'unstable';
type HouseholdType = 'single' | 'couple' | 'family';
type HealthRisk = 'low' | 'medium' | 'high';

interface TimelineOption {
  months: number;
  monthlySavingsNeeded: number;
}

interface CalculationResult {
  monthlyEssentials: number;
  currentSavings: number;
  recommendedMonths: number;
  recommendedFund: number;
  minimumFund: number;
  strongFund: number;
  currentMonthsCovered: number;
  savingsGap: number;
  surplus: number;
  progressPercent: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  timelineOptions: TimelineOption[];
}

export default function EmergencyFundCalculator() {
  const [housing, setHousing] = useState('1800');
  const [utilities, setUtilities] = useState('300');
  const [food, setFood] = useState('700');
  const [transportation, setTransportation] = useState('450');
  const [insurance, setInsurance] = useState('350');
  const [debtPayments, setDebtPayments] = useState('400');
  const [medical, setMedical] = useState('150');
  const [otherEssentials, setOtherEssentials] = useState('300');

  const [currentSavings, setCurrentSavings] = useState('5000');
  const [jobStability, setJobStability] = useState<JobStability>('moderate');
  const [householdType, setHouseholdType] = useState<HouseholdType>('family');
  const [healthRisk, setHealthRisk] = useState<HealthRisk>('medium');

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number.isFinite(amount) ? amount : 0);
  };

  const formatPercent = (amount: number) => {
    return `${Math.min(100, Math.max(0, amount)).toFixed(0)}%`;
  };

  const getRecommendedMonths = () => {
    let months = 3;

    if (jobStability === 'moderate') months += 1;
    if (jobStability === 'unstable') months += 3;

    if (householdType === 'couple') months += 1;
    if (householdType === 'family') months += 2;

    if (healthRisk === 'medium') months += 1;
    if (healthRisk === 'high') months += 2;

    return Math.min(Math.max(months, 3), 12);
  };

  const getRiskLevel = (
    job: JobStability,
    household: HouseholdType,
    health: HealthRisk
  ): 'Low' | 'Moderate' | 'High' => {
    let score = 0;

    if (job === 'moderate') score += 1;
    if (job === 'unstable') score += 3;

    if (household === 'couple') score += 1;
    if (household === 'family') score += 2;

    if (health === 'medium') score += 1;
    if (health === 'high') score += 2;

    if (score >= 5) return 'High';
    if (score >= 2) return 'Moderate';
    return 'Low';
  };

  const calculateEmergencyFund = () => {
    const monthlyEssentials =
      (parseFloat(housing) || 0) +
      (parseFloat(utilities) || 0) +
      (parseFloat(food) || 0) +
      (parseFloat(transportation) || 0) +
      (parseFloat(insurance) || 0) +
      (parseFloat(debtPayments) || 0) +
      (parseFloat(medical) || 0) +
      (parseFloat(otherEssentials) || 0);

    const savings = parseFloat(currentSavings) || 0;

    if (monthlyEssentials <= 0) {
      alert('Please enter monthly essential expenses greater than $0.');
      return;
    }

    if (savings < 0) {
      alert('Current emergency savings cannot be negative.');
      return;
    }

    const recommendedMonths = getRecommendedMonths();
    const recommendedFund = monthlyEssentials * recommendedMonths;
    const minimumFund = monthlyEssentials * 3;
    const strongFund = monthlyEssentials * 6;

    const currentMonthsCovered =
      monthlyEssentials > 0 ? savings / monthlyEssentials : 0;

    const savingsGap = Math.max(0, recommendedFund - savings);
    const surplus = Math.max(0, savings - recommendedFund);
    const progressPercent =
      recommendedFund > 0 ? (savings / recommendedFund) * 100 : 0;

    const timelineOptions = [6, 12, 18, 24].map((months) => ({
      months,
      monthlySavingsNeeded: savingsGap / months,
    }));

    setResult({
      monthlyEssentials: Math.round(monthlyEssentials * 100) / 100,
      currentSavings: Math.round(savings * 100) / 100,
      recommendedMonths,
      recommendedFund: Math.round(recommendedFund * 100) / 100,
      minimumFund: Math.round(minimumFund * 100) / 100,
      strongFund: Math.round(strongFund * 100) / 100,
      currentMonthsCovered: Math.round(currentMonthsCovered * 10) / 10,
      savingsGap: Math.round(savingsGap * 100) / 100,
      surplus: Math.round(surplus * 100) / 100,
      progressPercent,
      riskLevel: getRiskLevel(jobStability, householdType, healthRisk),
      timelineOptions,
    });

    setHasCalculated(true);
  };

  const handleReset = () => {
    setHousing('1800');
    setUtilities('300');
    setFood('700');
    setTransportation('450');
    setInsurance('350');
    setDebtPayments('400');
    setMedical('150');
    setOtherEssentials('300');
    setCurrentSavings('5000');
    setJobStability('moderate');
    setHouseholdType('family');
    setHealthRisk('medium');
    setResult(null);
    setHasCalculated(false);
  };

  const riskColor =
    result?.riskLevel === 'High'
      ? 'text-red-600'
      : result?.riskLevel === 'Moderate'
        ? 'text-orange-600'
        : 'text-green-600';

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-[#1F4E78] mb-4 sm:mb-6">
          Enter Your Emergency Fund Details
        </h3>

        <div className="space-y-6">
          {/* Expenses */}
          <section>
            <h4 className="font-bold text-gray-900 mb-4">
              Monthly Essential Expenses
            </h4>

            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
              {[
                {
                  label: 'Housing',
                  value: housing,
                  setter: setHousing,
                  help: 'Rent or mortgage payment',
                },
                {
                  label: 'Utilities',
                  value: utilities,
                  setter: setUtilities,
                  help: 'Electric, water, gas, phone, internet',
                },
                {
                  label: 'Food & Groceries',
                  value: food,
                  setter: setFood,
                  help: 'Essential food spending',
                },
                {
                  label: 'Transportation',
                  value: transportation,
                  setter: setTransportation,
                  help: 'Gas, public transit, car expenses',
                },
                {
                  label: 'Insurance',
                  value: insurance,
                  setter: setInsurance,
                  help: 'Health, auto, renters, life insurance',
                },
                {
                  label: 'Debt Minimum Payments',
                  value: debtPayments,
                  setter: setDebtPayments,
                  help: 'Minimum payments required each month',
                },
                {
                  label: 'Medical Essentials',
                  value: medical,
                  setter: setMedical,
                  help: 'Prescriptions, copays, routine care',
                },
                {
                  label: 'Other Essentials',
                  value: otherEssentials,
                  setter: setOtherEssentials,
                  help: 'Childcare, pet care, required expenses',
                },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500 text-sm">
                      $
                    </span>
                    <input
                      type="number"
                      value={field.value}
                      onChange={(e) => field.setter(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 text-base text-gray-900 bg-white placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                      placeholder="0"
                      min="0"
                      step="50"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{field.help}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Current Savings */}
          <section>
            <h4 className="font-bold text-gray-900 mb-4">
              Current Emergency Savings
            </h4>

            <div className="max-w-md">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Amount Already Saved
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500 text-sm">
                  $
                </span>
                <input
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 text-base text-gray-900 bg-white placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                  placeholder="5000"
                  min="0"
                  step="100"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Cash set aside specifically for emergencies
              </p>
            </div>
          </section>

          {/* Risk Factors */}
          <section>
            <h4 className="font-bold text-gray-900 mb-4">
              Your Situation
            </h4>

            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Stability
                </label>
                <select
                  value={jobStability}
                  onChange={(e) =>
                    setJobStability(e.target.value as JobStability)
                  }
                  className="w-full px-4 py-3 text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                >
                  <option value="stable">Stable income</option>
                  <option value="moderate">Somewhat stable</option>
                  <option value="unstable">Unstable / variable income</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Variable income usually needs more cushion
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Household Type
                </label>
                <select
                  value={householdType}
                  onChange={(e) =>
                    setHouseholdType(e.target.value as HouseholdType)
                  }
                  className="w-full px-4 py-3 text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                >
                  <option value="single">Single / no dependents</option>
                  <option value="couple">Couple</option>
                  <option value="family">Family / dependents</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  More dependents usually means higher risk
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Health / Expense Risk
                </label>
                <select
                  value={healthRisk}
                  onChange={(e) => setHealthRisk(e.target.value as HealthRisk)}
                  className="w-full px-4 py-3 text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                >
                  <option value="low">Low risk</option>
                  <option value="medium">Moderate risk</option>
                  <option value="high">High / unpredictable expenses</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Medical or irregular expenses increase cushion needed
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={calculateEmergencyFund}
            className="w-full bg-[#4472C4] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#1F4E78] transition-colors shadow-md hover:shadow-lg text-base"
          >
            Calculate Emergency Fund
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

      {/* Results */}
      {hasCalculated && result && (
        <div className="space-y-6">
          {/* Main Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Recommended Fund
              </div>
              <div className="text-2xl sm:text-3xl font-bold break-words">
                {formatCurrency(result.recommendedFund)}
              </div>
              <div className="text-xs opacity-80 mt-2">
                {result.recommendedMonths} months of essentials
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Current Coverage
              </div>
              <div className="text-2xl sm:text-3xl font-bold">
                {result.currentMonthsCovered} mo
              </div>
              <div className="text-xs opacity-80 mt-2">
                Based on current savings
              </div>
            </div>

            <div
              className={`rounded-xl p-4 sm:p-6 text-white shadow-lg ${
                result.savingsGap > 0
                  ? 'bg-gradient-to-br from-red-500 to-red-600'
                  : 'bg-gradient-to-br from-purple-500 to-purple-600'
              }`}
            >
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                {result.savingsGap > 0 ? 'Savings Gap' : 'Surplus'}
              </div>
              <div className="text-2xl sm:text-3xl font-bold break-words">
                {formatCurrency(
                  result.savingsGap > 0 ? result.savingsGap : result.surplus
                )}
              </div>
              <div className="text-xs opacity-80 mt-2">
                {result.savingsGap > 0 ? 'Still needed' : 'Above target'}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Risk Level
              </div>
              <div className="text-2xl sm:text-3xl font-bold">
                {result.riskLevel}
              </div>
              <div className="text-xs opacity-80 mt-2">
                Based on your situation
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-bold text-[#1F4E78] mb-4">
              🛡️ Emergency Fund Progress
            </h4>

            <div className="mb-3 flex justify-between text-sm">
              <span className="text-gray-600">
                {formatCurrency(result.currentSavings)} saved
              </span>
              <span className="font-semibold text-[#1F4E78]">
                {formatPercent(result.progressPercent)}
              </span>
            </div>

            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{
                  width: `${Math.min(100, result.progressPercent)}%`,
                }}
              />
            </div>

            <p className="text-sm text-gray-700 mt-4">
              Your monthly essential expenses are approximately{' '}
              <strong>{formatCurrency(result.monthlyEssentials)}</strong>. Based
              on your situation, this calculator recommends{' '}
              <strong>{result.recommendedMonths} months</strong> of coverage.
            </p>
          </div>

          {/* Fund Levels */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-bold text-[#1F4E78] mb-4">
              Recommended Emergency Fund Levels
            </h4>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">
                  Starter Minimum
                </div>
                <div className="text-2xl font-bold text-yellow-700">
                  {formatCurrency(result.minimumFund)}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  3 months of essential expenses
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">
                  Strong Baseline
                </div>
                <div className="text-2xl font-bold text-green-700">
                  {formatCurrency(result.strongFund)}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  6 months of essential expenses
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">
                  Your Recommended Target
                </div>
                <div className="text-2xl font-bold text-[#1F4E78]">
                  {formatCurrency(result.recommendedFund)}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Adjusted for your risk factors
                </p>
              </div>
            </div>
          </div>

          {/* Savings Timeline */}
          {result.savingsGap > 0 && (
            <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
              <h4 className="text-base sm:text-lg font-bold text-[#1F4E78] mb-4">
                How Much to Save Monthly
              </h4>

              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                  <table className="min-w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">
                          Timeline
                        </th>
                        <th className="text-right py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">
                          Monthly Savings Needed
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {result.timelineOptions.map((option) => (
                        <tr
                          key={option.months}
                          className="border-b border-gray-100"
                        >
                          <td className="py-2 sm:py-3 px-1 sm:px-2 font-medium text-gray-900">
                            {option.months} months
                          </td>
                          <td className="py-2 sm:py-3 px-1 sm:px-2 text-right font-semibold text-green-600">
                            {formatCurrency(option.monthlySavingsNeeded)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Insights */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-bold text-[#1F4E78] mb-4">
              💡 What This Means
            </h4>

            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>
                  Your essential monthly expenses are about{' '}
                  <strong>{formatCurrency(result.monthlyEssentials)}</strong>.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>
                  You currently have about{' '}
                  <strong>{result.currentMonthsCovered} months</strong> of
                  emergency coverage.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className={riskColor}>✓</span>
                <span>
                  Your situation suggests a{' '}
                  <strong className={riskColor}>{result.riskLevel}</strong>{' '}
                  emergency fund risk level.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>
                  Your recommended emergency fund target is{' '}
                  <strong>{formatCurrency(result.recommendedFund)}</strong>.
                </span>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 sm:p-6 rounded">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  Important Disclaimer
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  This calculator is for educational purposes only and is not
                  financial advice. Emergency fund needs vary based on income,
                  expenses, job security, family situation, health needs, debt,
                  insurance coverage, and personal risk tolerance. Consider
                  speaking with a qualified financial professional for personal
                  guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Initial State */}
      {!hasCalculated && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 sm:p-6 rounded">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Determine the right emergency fund size
              </h4>
              <p className="text-xs sm:text-sm text-gray-700">
                Enter your essential monthly expenses, current emergency savings,
                and personal risk factors. Then calculate a recommended
                emergency fund target for your situation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}