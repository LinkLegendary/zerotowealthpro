'use client';

import { useState } from 'react';

interface CalculationResult {
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
  payoffDate: Date;
  yearlyBreakdown: YearData[];
  monthlyBreakdown: MonthData[];
}

interface YearData {
  year: number;
  startingBalance: number;
  totalPaid: number;
  principalPaid: number;
  interestPaid: number;
  endingBalance: number;
}

interface MonthData {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function LoanPaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('200000');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [termUnit, setTermUnit] = useState<string>('years');
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showMonthlyBreakdown, setShowMonthlyBreakdown] = useState(false);
  const [showYearlyBreakdown, setShowYearlyBreakdown] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateLoanPayment = () => {
    const P = parseFloat(loanAmount) || 0;
    const annualRate = parseFloat(interestRate) || 0;
    const term = parseFloat(loanTerm) || 0;

    if (P <= 0) {
      alert('Please enter a valid loan amount greater than $0');
      return;
    }

    if (annualRate < 0) {
      alert('Please enter a valid interest rate');
      return;
    }

    if (term <= 0) {
      alert('Please enter a valid loan term');
      return;
    }

    const totalMonths = termUnit === 'years' ? term * 12 : term;
    const monthlyRate = annualRate / 100 / 12;

    let monthlyPayment: number;

    if (monthlyRate === 0) {
      monthlyPayment = P / totalMonths;
    } else {
      monthlyPayment =
        (P * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    let balance = P;
    const monthlyBreakdown: MonthData[] = [];
    let totalInterestPaid = 0;

    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      totalInterestPaid += interestPayment;

      if (balance < 0.01) balance = 0;

      monthlyBreakdown.push({
        month,
        payment: Math.round(monthlyPayment * 100) / 100,
        principal: Math.round(principalPayment * 100) / 100,
        interest: Math.round(interestPayment * 100) / 100,
        balance: Math.round(balance * 100) / 100,
      });
    }

    const yearlyBreakdown: YearData[] = [];
    let currentYear = 1;
    let yearStartBalance = P;
    let yearPrincipalPaid = 0;
    let yearInterestPaid = 0;

    monthlyBreakdown.forEach((month, index) => {
      yearPrincipalPaid += month.principal;
      yearInterestPaid += month.interest;

      if ((index + 1) % 12 === 0 || index === monthlyBreakdown.length - 1) {
        yearlyBreakdown.push({
          year: currentYear,
          startingBalance: Math.round(yearStartBalance * 100) / 100,
          totalPaid:
            Math.round((yearPrincipalPaid + yearInterestPaid) * 100) / 100,
          principalPaid: Math.round(yearPrincipalPaid * 100) / 100,
          interestPaid: Math.round(yearInterestPaid * 100) / 100,
          endingBalance: month.balance,
        });

        yearStartBalance = month.balance;
        yearPrincipalPaid = 0;
        yearInterestPaid = 0;
        currentYear++;
      }
    });

    const start = new Date(startDate);
    const payoffDate = new Date(start);
    payoffDate.setMonth(payoffDate.getMonth() + totalMonths);

    const totalPaid = monthlyPayment * totalMonths;

    setResult({
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalPaid: Math.round(totalPaid * 100) / 100,
      totalInterest: Math.round(totalInterestPaid * 100) / 100,
      payoffDate,
      yearlyBreakdown,
      monthlyBreakdown,
    });

    setHasCalculated(true);
    setShowMonthlyBreakdown(false);
    setShowYearlyBreakdown(false);
  };

  const handleReset = () => {
    setLoanAmount('200000');
    setInterestRate('6.5');
    setLoanTerm('30');
    setTermUnit('years');
    setStartDate(new Date().toISOString().split('T')[0]);
    setResult(null);
    setHasCalculated(false);
    setShowMonthlyBreakdown(false);
    setShowYearlyBreakdown(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-[#1F4E78] mb-4 sm:mb-6">
          Enter Your Loan Information
        </h3>

        <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
          {/* Loan Amount */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Loan Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 text-sm">
                $
              </span>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                placeholder="200000"
                min="0"
                step="1000"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              The total amount you're borrowing
            </p>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Annual Interest Rate
            </label>
            <div className="relative">
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full pl-4 pr-8 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                placeholder="6.5"
                min="0"
                max="100"
                step="0.1"
              />
              <span className="absolute right-3 top-3 text-gray-500 text-sm">
                %
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Your loan's annual percentage rate
            </p>
          </div>

          
          {/* Loan Term */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Loan Term
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="flex-1 min-w-0 px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                placeholder="30"
                min="1"
              />
              <select
                value={termUnit}
                onChange={(e) => setTermUnit(e.target.value)}
                className="w-24 px-2 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent bg-white"
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              How long you'll take to repay
            </p>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Loan Start Date (Optional)
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">When your loan begins</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={calculateLoanPayment}
            className="w-full bg-[#4472C4] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#1F4E78] transition-colors shadow-md hover:shadow-lg text-base"
          >
            Calculate My Loan Payment
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
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Monthly Payment
              </div>
              <div className="text-2xl sm:text-3xl font-bold break-words">
                {formatCurrency(result.monthlyPayment)}
              </div>
              <div className="text-xs opacity-80 mt-2">Per month</div>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Total Interest
              </div>
              <div className="text-2xl sm:text-3xl font-bold break-words">
                {formatCurrency(result.totalInterest)}
              </div>
              <div className="text-xs opacity-80 mt-2">Over life of loan</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Total Paid
              </div>
              <div className="text-2xl sm:text-3xl font-bold break-words">
                {formatCurrency(result.totalPaid)}
              </div>
              <div className="text-xs opacity-80 mt-2">
                Principal + Interest
              </div>
            </div>
          </div>

          {/* Loan Summary */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
            <h4 className="text-base sm:text-lg font-bold text-[#1F4E78] mb-4">
              Loan Summary
            </h4>

            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-600 text-sm">Loan Amount:</span>
                <span className="font-semibold text-gray-900 text-sm">
                  {formatCurrency(parseFloat(loanAmount))}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-600 text-sm">Interest Rate:</span>
                <span className="font-semibold text-gray-900 text-sm">
                  {interestRate}%
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-600 text-sm">Loan Term:</span>
                <span className="font-semibold text-gray-900 text-sm">
                  {loanTerm} {termUnit}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-600 text-sm">Monthly Payment:</span>
                <span className="font-semibold text-blue-600 text-sm">
                  {formatCurrency(result.monthlyPayment)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-600 text-sm">Total Interest:</span>
                <span className="font-semibold text-red-600 text-sm">
                  {formatCurrency(result.totalInterest)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-600 text-sm">Payoff Date:</span>
                <span className="font-semibold text-gray-900 text-sm">
                  {formatDate(result.payoffDate)}
                </span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-600">Principal</span>
                <span className="text-gray-600">Interest</span>
              </div>
              <div className="h-6 sm:h-8 bg-gray-200 rounded-full overflow-hidden flex">
                <div
                  className="bg-green-500 flex items-center justify-center text-white text-xs font-semibold"
                  style={{
                    width: `${((parseFloat(loanAmount) / result.totalPaid) * 100).toFixed(1)}%`,
                  }}
                >
                  {(parseFloat(loanAmount) / result.totalPaid) * 100 > 20 && (
                    <span className="hidden sm:inline">
                      {formatCurrency(parseFloat(loanAmount))}
                    </span>
                  )}
                </div>
                <div
                  className="bg-red-500 flex items-center justify-center text-white text-xs font-semibold"
                  style={{
                    width: `${((result.totalInterest / result.totalPaid) * 100).toFixed(1)}%`,
                  }}
                >
                  {(result.totalInterest / result.totalPaid) * 100 > 20 && (
                    <span className="hidden sm:inline">
                      {formatCurrency(result.totalInterest)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>
                  {((parseFloat(loanAmount) / result.totalPaid) * 100).toFixed(
                    1
                  )}
                  %
                </span>
                <span>
                  {((result.totalInterest / result.totalPaid) * 100).toFixed(1)}
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-4 sm:p-6 shadow-lg">
            <h4 className="text-base sm:text-lg font-bold mb-3">
              💡 What This Means
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                • You'll pay{' '}
                <strong>{formatCurrency(result.monthlyPayment)}</strong> every
                month for {loanTerm} {termUnit}
              </li>
              <li>
                • On a {formatCurrency(parseFloat(loanAmount))} loan, you'll pay{' '}
                <strong>{formatCurrency(result.totalInterest)}</strong> in
                interest
              </li>
              <li>
                • That's{' '}
                <strong>
                  {(
                    (result.totalInterest / parseFloat(loanAmount)) *
                    100
                  ).toFixed(1)}
                  %
                </strong>{' '}
                of your loan going to interest
              </li>
              <li>
                • Your loan will be paid off by{' '}
                <strong>{formatDate(result.payoffDate)}</strong>
              </li>
            </ul>
          </div>

          {/* Year-by-Year Breakdown */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-base sm:text-lg font-bold text-[#1F4E78]">
                Year-by-Year
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
                          Principal
                        </th>
                        <th className="text-right py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">
                          Interest
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

          {/* Month-by-Month Breakdown */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-base sm:text-lg font-bold text-[#1F4E78]">
                Monthly Schedule
              </h4>
              <button
                onClick={() => setShowMonthlyBreakdown(!showMonthlyBreakdown)}
                className="text-[#4472C4] font-medium hover:underline text-sm"
              >
                {showMonthlyBreakdown ? '▲ Hide' : '▼ Show All'}
              </button>
            </div>

            {showMonthlyBreakdown && (
              <div className="overflow-x-auto -mx-4 sm:mx-0 max-h-96 overflow-y-auto">
                <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                  <table className="min-w-full text-xs">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-2 px-1 sm:px-2 font-semibold text-gray-700">
                          Mo
                        </th>
                        <th className="text-right py-2 px-1 sm:px-2 font-semibold text-gray-700">
                          Payment
                        </th>
                        <th className="text-right py-2 px-1 sm:px-2 font-semibold text-gray-700">
                          Principal
                        </th>
                        <th className="text-right py-2 px-1 sm:px-2 font-semibold text-gray-700">
                          Interest
                        </th>
                        <th className="text-right py-2 px-1 sm:px-2 font-semibold text-gray-700">
                          Balance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.monthlyBreakdown.map((month) => (
                        <tr
                          key={month.month}
                          className="border-b border-gray-100"
                        >
                          <td className="py-2 px-1 sm:px-2 text-gray-900">
                            {month.month}
                          </td>
                          <td className="py-2 px-1 sm:px-2 text-right text-gray-600 whitespace-nowrap">
                            {formatCurrency(month.payment)}
                          </td>
                          <td className="py-2 px-1 sm:px-2 text-right text-green-600 whitespace-nowrap">
                            {formatCurrency(month.principal)}
                          </td>
                          <td className="py-2 px-1 sm:px-2 text-right text-red-600 whitespace-nowrap">
                            {formatCurrency(month.interest)}
                          </td>
                          <td className="py-2 px-1 sm:px-2 text-right text-gray-900 whitespace-nowrap">
                            {formatCurrency(month.balance)}
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
            <span className="text-2xl">🏠</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Calculate your loan payment
              </h4>
              <p className="text-xs sm:text-sm text-gray-700">
                Enter your loan details above and click &quot;Calculate My Loan
                Payment&quot; to see your monthly payment, total interest, and
                full amortization schedule.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
