'use client';

import { useState } from 'react';

interface MonthData {
  month: number;
  startingBalance: number;
  contribution: number;
  interestEarned: number;
  endingBalance: number;
}

interface CalculationResult {
  goalName: string;
  targetAmount: number;
  currentSavings: number;
  savingsGap: number;
  months: number;
  apy: number;
  monthlyRequired: number;
  weeklyRequired: number;
  biweeklyRequired: number;
  totalContributions: number;
  totalInterestEarned: number;
  projectedWithCurrentSavings: number;
  currentMonthlySavings: number;
  currentPlanShortfall: number;
  currentPlanSurplus: number;
  goalDate: Date;
  timeline: MonthData[];
  isAlreadyFunded: boolean;
}

export default function SavingsGoalCalculator() {
  const [goalName, setGoalName] = useState('Vacation');
  const [targetAmount, setTargetAmount] = useState('10000');
  const [currentSavings, setCurrentSavings] = useState('1500');
  const [targetMonths, setTargetMonths] = useState('18');
  const [apy, setApy] = useState('4.5');
  const [currentMonthlySavings, setCurrentMonthlySavings] = useState('300');

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  const calculateSavingsGoal = () => {
    const goal = parseFloat(targetAmount) || 0;
    const current = parseFloat(currentSavings) || 0;
    const months = parseInt(targetMonths) || 0;
    const annualRate = parseFloat(apy) || 0;
    const currentMonthly = parseFloat(currentMonthlySavings) || 0;

    if (goal <= 0) {
      alert('Please enter a savings goal greater than $0.');
      return;
    }

    if (current < 0) {
      alert('Current savings cannot be negative.');
      return;
    }

    if (months <= 0) {
      alert('Please enter a valid timeline greater than 0 months.');
      return;
    }

    if (annualRate < 0) {
      alert('APY cannot be negative.');
      return;
    }

    if (currentMonthly < 0) {
      alert('Current monthly savings cannot be negative.');
      return;
    }

    const monthlyRate = annualRate / 100 / 12;
    const futureValueOfCurrent =
      monthlyRate === 0
        ? current
        : current * Math.pow(1 + monthlyRate, months);

    const isAlreadyFunded = futureValueOfCurrent >= goal;

    let monthlyRequired = 0;

    if (!isAlreadyFunded) {
      const amountNeededAfterCurrentGrowth = goal - futureValueOfCurrent;

      if (monthlyRate === 0) {
        monthlyRequired = amountNeededAfterCurrentGrowth / months;
      } else {
        const annuityFactor =
          (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;

        monthlyRequired = amountNeededAfterCurrentGrowth / annuityFactor;
      }
    }

    monthlyRequired = Math.max(0, monthlyRequired);

    const weeklyRequired = (monthlyRequired * 12) / 52;
    const biweeklyRequired = (monthlyRequired * 12) / 26;

    const timeline: MonthData[] = [];
    let balance = current;
    let totalInterestEarned = 0;
    let totalContributions = 0;

    for (let month = 1; month <= months; month++) {
      const startingBalance = balance;
      const interestEarned = balance * monthlyRate;

      balance += interestEarned;
      balance += monthlyRequired;

      totalInterestEarned += interestEarned;
      totalContributions += monthlyRequired;

      timeline.push({
        month,
        startingBalance: Math.round(startingBalance * 100) / 100,
        contribution: Math.round(monthlyRequired * 100) / 100,
        interestEarned: Math.round(interestEarned * 100) / 100,
        endingBalance: Math.round(balance * 100) / 100,
      });
    }

    // Projection using current monthly savings amount
    let projectedBalance = current;

    for (let month = 1; month <= months; month++) {
      projectedBalance += projectedBalance * monthlyRate;
      projectedBalance += currentMonthly;
    }

    const shortfall = Math.max(0, goal - projectedBalance);
    const surplus = Math.max(0, projectedBalance - goal);

    const goalDate = new Date();
    goalDate.setMonth(goalDate.getMonth() + months);

    setResult({
      goalName: goalName.trim() || 'Savings Goal',
      targetAmount: Math.round(goal * 100) / 100,
      currentSavings: Math.round(current * 100) / 100,
      savingsGap: Math.max(0, Math.round((goal - current) * 100) / 100),
      months,
      apy: annualRate,
      monthlyRequired: Math.round(monthlyRequired * 100) / 100,
      weeklyRequired: Math.round(weeklyRequired * 100) / 100,
      biweeklyRequired: Math.round(biweeklyRequired * 100) / 100,
      totalContributions: Math.round(totalContributions * 100) / 100,
      totalInterestEarned: Math.round(totalInterestEarned * 100) / 100,
      projectedWithCurrentSavings: Math.round(projectedBalance * 100) / 100,
      currentMonthlySavings: Math.round(currentMonthly * 100) / 100,
      currentPlanShortfall: Math.round(shortfall * 100) / 100,
      currentPlanSurplus: Math.round(surplus * 100) / 100,
      goalDate,
      timeline,
      isAlreadyFunded,
    });

    setHasCalculated(true);
    setShowTimeline(false);
  };

  const handleReset = () => {
    setGoalName('Vacation');
    setTargetAmount('10000');
    setCurrentSavings('1500');
    setTargetMonths('18');
    setApy('4.5');
    setCurrentMonthlySavings('300');
    setResult(null);
    setHasCalculated(false);
    setShowTimeline(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number.isFinite(amount) ? amount : 0);
  };

  const formatPercent = (amount: number) => {
    return `${amount.toFixed(2)}%`;
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

    return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} ${
      remainingMonths === 1 ? 'month' : 'months'
    }`;
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-[#1F4E78] mb-4 sm:mb-6">
          Enter Your Savings Goal
        </h3>

        <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
          {/* Goal Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Goal Name
            </label>
            <input
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              className="w-full px-4 py-3 text-base text-gray-900 bg-white placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
              placeholder="Vacation, car, emergency fund..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Name the goal you are saving for
            </p>
          </div>

          {/* Target Amount */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Target Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 text-sm">
                $
              </span>
              <input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 text-base text-gray-900 bg-white placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                placeholder="10000"
                min="0"
                step="100"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Total amount you want to have saved
            </p>
          </div>

          {/* Current Savings */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Savings
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
                placeholder="1500"
                min="0"
                step="100"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Amount already saved toward this goal
            </p>
          </div>

          {/* Target Timeline */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Timeline
            </label>
            <div className="relative">
              <input
                type="number"
                value={targetMonths}
                onChange={(e) => setTargetMonths(e.target.value)}
                className="w-full pl-4 pr-20 py-3 text-base text-gray-900 bg-white placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                placeholder="18"
                min="1"
                step="1"
              />
              <span className="absolute right-3 top-3 text-gray-500 text-sm">
                months
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              How long until you want to reach the goal
            </p>
          </div>

          {/* APY */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Savings Account APY
            </label>
            <div className="relative">
              <input
                type="number"
                value={apy}
                onChange={(e) => setApy(e.target.value)}
                className="w-full pl-4 pr-8 py-3 text-base text-gray-900 bg-white placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                placeholder="4.5"
                min="0"
                step="0.1"
              />
              <span className="absolute right-3 top-3 text-gray-500 text-sm">
                %
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Estimated annual percentage yield
            </p>
          </div>

          {/* Current Monthly Savings */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Monthly Savings
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 text-sm">
                $
              </span>
              <input
                type="number"
                value={currentMonthlySavings}
                onChange={(e) => setCurrentMonthlySavings(e.target.value)}
                className="w-full pl-8 pr-4 py-3 text-base text-gray-900 bg-white placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                placeholder="300"
                min="0"
                step="25"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              What you currently save each month for comparison
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={calculateSavingsGoal}
            className="w-full bg-[#4472C4] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#1F4E78] transition-colors shadow-md hover:shadow-lg text-base"
          >
            Calculate Savings Plan
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
          {/* Already Funded */}
          {result.isAlreadyFunded && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 sm:p-6 rounded">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎉</span>
                <div>
                  <h4 className="font-semibold text-green-900 mb-2 text-sm sm:text-base">
                    You are already on track!
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-700">
                    Your current savings may reach or exceed your goal by the
                    target date based on the APY entered. You may not need any
                    additional monthly contribution for this goal.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Monthly Needed
              </div>
              <div className="text-2xl sm:text-3xl font-bold break-words">
                {formatCurrency(result.monthlyRequired)}
              </div>
              <div className="text-xs opacity-80 mt-2">
                To reach {result.goalName}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Weekly Needed
              </div>
              <div className="text-2xl sm:text-3xl font-bold break-words">
                {formatCurrency(result.weeklyRequired)}
              </div>
              <div className="text-xs opacity-80 mt-2">
                Easier weekly target
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Goal Date
              </div>
              <div className="text-xl sm:text-2xl font-bold break-words">
                {formatDate(result.goalDate)}
              </div>
              <div className="text-xs opacity-80 mt-2">
                In {formatMonths(result.months)}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Interest Earned
              </div>
              <div className="text-2xl sm:text-3xl font-bold break-words">
                {formatCurrency(result.totalInterestEarned)}
              </div>
              <div className="text-xs opacity-80 mt-2">
                Based on {formatPercent(result.apy)} APY
              </div>
            </div>
          </div>

          {/* Goal Summary */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-bold text-[#1F4E78] mb-4">
              🎁 Savings Goal Summary
            </h4>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Goal</span>
                <strong>{result.goalName}</strong>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Target Amount</span>
                <strong>{formatCurrency(result.targetAmount)}</strong>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Current Savings</span>
                <strong>{formatCurrency(result.currentSavings)}</strong>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Remaining Gap</span>
                <strong>{formatCurrency(result.savingsGap)}</strong>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Total Contributions</span>
                <strong>{formatCurrency(result.totalContributions)}</strong>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-600">Bi-weekly Needed</span>
                <strong>{formatCurrency(result.biweeklyRequired)}</strong>
              </div>
            </div>
          </div>

          {/* Current Plan Comparison */}
          <div
            className={`rounded-xl p-6 border shadow-sm ${
              result.currentPlanShortfall > 0
                ? 'bg-red-50 border-red-200'
                : 'bg-green-50 border-green-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">
                {result.currentPlanShortfall > 0 ? '⚠️' : '✅'}
              </span>

              <div>
                <h4
                  className={`text-lg font-bold mb-2 ${
                    result.currentPlanShortfall > 0
                      ? 'text-red-800'
                      : 'text-green-800'
                  }`}
                >
                  Current Savings Plan Check
                </h4>

                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  If you keep saving{' '}
                  <strong>
                    {formatCurrency(result.currentMonthlySavings)}/month
                  </strong>
                  , your projected balance by {formatDate(result.goalDate)} is{' '}
                  <strong>
                    {formatCurrency(result.projectedWithCurrentSavings)}
                  </strong>
                  .
                </p>

                {result.currentPlanShortfall > 0 ? (
                  <p className="text-sm text-gray-700">
                    You may be short by about{' '}
                    <strong className="text-red-700">
                      {formatCurrency(result.currentPlanShortfall)}
                    </strong>
                    . Consider increasing your monthly savings to{' '}
                    <strong>{formatCurrency(result.monthlyRequired)}</strong>.
                  </p>
                ) : (
                  <p className="text-sm text-gray-700">
                    You may exceed your goal by about{' '}
                    <strong className="text-green-700">
                      {formatCurrency(result.currentPlanSurplus)}
                    </strong>
                    . Your current plan appears to be on track.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* What This Means */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-bold text-[#1F4E78] mb-4">
              💡 What This Means
            </h4>

            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>
                  To reach{' '}
                  <strong>{formatCurrency(result.targetAmount)}</strong> for{' '}
                  <strong>{result.goalName}</strong>, save about{' '}
                  <strong>{formatCurrency(result.monthlyRequired)}</strong> per
                  month.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>
                  That equals about{' '}
                  <strong>{formatCurrency(result.weeklyRequired)}</strong> per
                  week or{' '}
                  <strong>{formatCurrency(result.biweeklyRequired)}</strong>{' '}
                  every two weeks.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>
                  With a {formatPercent(result.apy)} APY, estimated interest
                  could contribute about{' '}
                  <strong>{formatCurrency(result.totalInterestEarned)}</strong>{' '}
                  toward your goal.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>
                  Your target date is approximately{' '}
                  <strong>{formatDate(result.goalDate)}</strong>.
                </span>
              </li>
            </ul>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-base sm:text-lg font-bold text-[#1F4E78]">
                Month-by-Month Savings Timeline
              </h4>

              <button
                onClick={() => setShowTimeline(!showTimeline)}
                className="text-[#4472C4] font-medium hover:underline text-sm"
              >
                {showTimeline ? '▲ Hide' : '▼ Show'}
              </button>
            </div>

            {showTimeline && (
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                  <table className="min-w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">
                          Month
                        </th>
                        <th className="text-right py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">
                          Start
                        </th>
                        <th className="text-right py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">
                          Save
                        </th>
                        <th className="text-right py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">
                          Interest
                        </th>
                        <th className="text-right py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">
                          End
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {result.timeline.map((row) => (
                        <tr key={row.month} className="border-b border-gray-100">
                          <td className="py-2 sm:py-3 px-1 sm:px-2 font-medium text-gray-900">
                            {row.month}
                          </td>
                          <td className="py-2 sm:py-3 px-1 sm:px-2 text-right whitespace-nowrap">
                            {formatCurrency(row.startingBalance)}
                          </td>
                          <td className="py-2 sm:py-3 px-1 sm:px-2 text-right text-green-600 whitespace-nowrap">
                            {formatCurrency(row.contribution)}
                          </td>
                          <td className="py-2 sm:py-3 px-1 sm:px-2 text-right text-blue-600 whitespace-nowrap">
                            {formatCurrency(row.interestEarned)}
                          </td>
                          <td className="py-2 sm:py-3 px-1 sm:px-2 text-right font-semibold text-gray-900 whitespace-nowrap">
                            {formatCurrency(row.endingBalance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-500 mt-4">
              Timeline assumes monthly contributions are made at the end of each
              month and interest compounds monthly.
            </p>
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
                  This calculator is for educational purposes only. Results are
                  estimates and may differ from actual savings growth due to
                  changing APYs, fees, taxes, contribution timing, inflation, or
                  account rules. This is not financial advice. Consider speaking
                  with a qualified financial professional for personal guidance.
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
            <span className="text-2xl">🎁</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Plan your next financial goal
              </h4>
              <p className="text-xs sm:text-sm text-gray-700">
                Enter your savings target, current savings, timeline, and APY.
                Then calculate how much you need to save monthly, weekly, or
                bi-weekly to reach your goal.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}