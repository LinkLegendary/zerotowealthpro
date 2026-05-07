'use client';

import { useState } from 'react';

interface CalculationResult {
  monthlyPayment: number;
  principalAndInterest: number;
  propertyTax: number;
  homeInsurance: number;
  pmi: number;
  hoaFees: number;
  totalPaid: number;
  totalInterest: number;
  downPayment: number;
  loanAmount: number;
  payoffDate: Date;
  yearlyBreakdown: YearData[];
}

interface YearData {
  year: number;
  startingBalance: number;
  principalPaid: number;
  interestPaid: number;
  endingBalance: number;
  taxesPaid: number;
  insurancePaid: number;
  totalPaid: number;
}

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState<string>('350000');
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>('20');
  const [interestRate, setInterestRate] = useState<string>('7');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [propertyTaxRate, setPropertyTaxRate] = useState<string>('1.2');
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<string>('1200');
  const [hoaFees, setHoaFees] = useState<string>('0');
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showYearlyBreakdown, setShowYearlyBreakdown] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateMortgage = () => {
    const price = parseFloat(homePrice) || 0;
    const dpPercent = parseFloat(downPaymentPercent) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseFloat(loanTerm) || 0;
    const taxRate = parseFloat(propertyTaxRate) || 0;
    const insurance = parseFloat(homeInsuranceAnnual) || 0;
    const hoa = parseFloat(hoaFees) || 0;

    // Validation
    if (price <= 0) {
      alert('Please enter a valid home price greater than $0');
      return;
    }

    if (dpPercent < 0 || dpPercent > 100) {
      alert('Down payment must be between 0% and 100%');
      return;
    }

    if (rate < 0) {
      alert('Please enter a valid interest rate');
      return;
    }

    if (years <= 0) {
      alert('Please enter a valid loan term');
      return;
    }

    // Calculate down payment and loan amount
    const downPayment = price * (dpPercent / 100);
    const loanAmount = price - downPayment;

    // Check if PMI is required (less than 20% down)
    const requiresPMI = dpPercent < 20;
    const pmiRate = requiresPMI ? 0.005 : 0;
    const monthlyPMI = requiresPMI ? (loanAmount * pmiRate) / 12 : 0;

    // Calculate monthly property tax
    const monthlyPropertyTax = (price * (taxRate / 100)) / 12;

    // Calculate monthly home insurance
    const monthlyInsurance = insurance / 12;

    // Calculate monthly principal and interest
    const totalMonths = years * 12;
    const monthlyRate = rate / 100 / 12;

    let principalAndInterest: number;
    
    if (monthlyRate === 0) {
      principalAndInterest = loanAmount / totalMonths;
    } else {
      principalAndInterest = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                            (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    // Total monthly payment
    const totalMonthlyPayment = principalAndInterest + monthlyPropertyTax + monthlyInsurance + monthlyPMI + hoa;

    // Calculate amortization schedule
    let balance = loanAmount;
    let totalInterestPaid = 0;
    const yearlyBreakdown: YearData[] = [];

    let currentYear = 1;
    let yearStartBalance = loanAmount;
    let yearPrincipalPaid = 0;
    let yearInterestPaid = 0;

    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = principalAndInterest - interestPayment;
      balance -= principalPayment;
      totalInterestPaid += interestPayment;
      yearPrincipalPaid += principalPayment;
      yearInterestPaid += interestPayment;

      if (balance < 0.01) balance = 0;

      if (month % 12 === 0 || month === totalMonths) {
        yearlyBreakdown.push({
          year: currentYear,
          startingBalance: Math.round(yearStartBalance * 100) / 100,
          principalPaid: Math.round(yearPrincipalPaid * 100) / 100,
          interestPaid: Math.round(yearInterestPaid * 100) / 100,
          endingBalance: Math.round(balance * 100) / 100,
          taxesPaid: Math.round(monthlyPropertyTax * 12 * 100) / 100,
          insurancePaid: Math.round(monthlyInsurance * 12 * 100) / 100,
          totalPaid: Math.round((yearPrincipalPaid + yearInterestPaid + (monthlyPropertyTax * 12) + (monthlyInsurance * 12) + (monthlyPMI * 12) + (hoa * 12)) * 100) / 100,
        });

        yearStartBalance = balance;
        yearPrincipalPaid = 0;
        yearInterestPaid = 0;
        currentYear++;
      }
    }

    // Calculate payoff date
    const start = new Date(startDate);
    const payoffDate = new Date(start);
    payoffDate.setMonth(payoffDate.getMonth() + totalMonths);

    const totalPrincipalInterest = principalAndInterest * totalMonths;
    const totalTaxes = monthlyPropertyTax * totalMonths;
    const totalInsurance = monthlyInsurance * totalMonths;
    const totalPMI = monthlyPMI * totalMonths;
    const totalHOA = hoa * totalMonths;
    const totalPaid = totalPrincipalInterest + totalTaxes + totalInsurance + totalPMI + totalHOA;

    setResult({
      monthlyPayment: Math.round(totalMonthlyPayment * 100) / 100,
      principalAndInterest: Math.round(principalAndInterest * 100) / 100,
      propertyTax: Math.round(monthlyPropertyTax * 100) / 100,
      homeInsurance: Math.round(monthlyInsurance * 100) / 100,
      pmi: Math.round(monthlyPMI * 100) / 100,
      hoaFees: hoa,
      totalPaid: Math.round(totalPaid * 100) / 100,
      totalInterest: Math.round(totalInterestPaid * 100) / 100,
      downPayment: Math.round(downPayment * 100) / 100,
      loanAmount: Math.round(loanAmount * 100) / 100,
      payoffDate,
      yearlyBreakdown,
    });

    setHasCalculated(true);
    setShowYearlyBreakdown(false);
  };

  const handleReset = () => {
    setHomePrice('350000');
    setDownPaymentPercent('20');
    setInterestRate('7');
    setLoanTerm('30');
    setPropertyTaxRate('1.2');
    setHomeInsuranceAnnual('1200');
    setHoaFees('0');
    setStartDate(new Date().toISOString().split('T')[0]);
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

  const formatCurrencyDetailed = (amount: number) => {
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

  const downPaymentDollars = (parseFloat(homePrice) || 0) * ((parseFloat(downPaymentPercent) || 0) / 100);

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-[#1F4E78] mb-6">
          Enter Your Home Purchase Details
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Home Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Home Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                placeholder="350000"
                min="0"
                step="1000"
              />
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Down Payment
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(e.target.value)}
                  className="w-full pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                  placeholder="20"
                  min="0"
                  max="100"
                  step="0.5"
                />
                <span className="absolute right-3 top-3 text-gray-500">%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {formatCurrency(downPaymentDollars)} ({downPaymentPercent}%)
              {parseFloat(downPaymentPercent) < 20 && (
                <span className="text-orange-600 font-semibold"> • PMI Required</span>
              )}
            </p>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Interest Rate (APR)
            </label>
            <div className="relative">
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                placeholder="7"
                min="0"
                max="30"
                step="0.125"
              />
              <span className="absolute right-3 top-3 text-gray-500">%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Current average: 6.5% - 7.5%
            </p>
          </div>

          {/* Loan Term */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Loan Term
            </label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
            >
              <option value="15">15 years</option>
              <option value="20">20 years</option>
              <option value="30">30 years</option>
            </select>
          </div>

          {/* Property Tax Rate */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Property Tax Rate (Annual)
            </label>
            <div className="relative">
              <input
                type="number"
                value={propertyTaxRate}
                onChange={(e) => setPropertyTaxRate(e.target.value)}
                className="w-full pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                placeholder="1.2"
                min="0"
                max="10"
                step="0.1"
              />
              <span className="absolute right-3 top-3 text-gray-500">%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Varies by location (avg: 0.5% - 2.5%)
            </p>
          </div>

          {/* Home Insurance */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Home Insurance (Annual)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                value={homeInsuranceAnnual}
                onChange={(e) => setHomeInsuranceAnnual(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                placeholder="1200"
                min="0"
                step="100"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Average: $1,000 - $2,000/year
            </p>
          </div>

          {/* HOA Fees */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              HOA Fees (Monthly)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                value={hoaFees}
                onChange={(e) => setHoaFees(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                placeholder="0"
                min="0"
                step="10"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Leave at $0 if no HOA
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={calculateMortgage}
            className="flex-1 bg-[#4472C4] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#1F4E78] transition-colors shadow-md hover:shadow-lg"
          >
            Calculate My Mortgage Payment
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

      {/* Results Section */}
      {hasCalculated && result && (
        <div className="space-y-6">
          {/* Main Monthly Payment Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-8 text-white shadow-2xl">
            <div className="text-center">
              <div className="text-sm opacity-90 mb-2">Your Total Monthly Payment</div>
              <div className="text-5xl md:text-6xl font-bold mb-4">
                {formatCurrency(result.monthlyPayment)}
              </div>
              <div className="text-sm opacity-90">
                Principal & Interest + Taxes + Insurance {result.pmi > 0 && '+ PMI'} {result.hoaFees > 0 && '+ HOA'}
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-bold text-[#1F4E78] mb-4">
              Monthly Payment Breakdown
            </h4>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded"></span>
                  <span className="text-gray-700">Principal & Interest</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {formatCurrencyDetailed(result.principalAndInterest)}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-purple-500 rounded"></span>
                  <span className="text-gray-700">Property Taxes</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {formatCurrencyDetailed(result.propertyTax)}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-orange-500 rounded"></span>
                  <span className="text-gray-700">Home Insurance</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {formatCurrencyDetailed(result.homeInsurance)}
                </span>
              </div>

              {result.pmi > 0 && (
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded"></span>
                    <span className="text-gray-700">PMI (Private Mortgage Insurance)</span>
                  </div>
                  <span className="font-semibold text-red-600">
                    {formatCurrencyDetailed(result.pmi)}
                  </span>
                </div>
              )}

              {result.hoaFees > 0 && (
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-gray-500 rounded"></span>
                    <span className="text-gray-700">HOA Fees</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {formatCurrencyDetailed(result.hoaFees)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center pt-3 bg-green-50 -mx-2 px-2 py-3 rounded">
                <span className="font-bold text-gray-900">Total Monthly Payment</span>
                <span className="font-bold text-green-600 text-xl">
                  {formatCurrencyDetailed(result.monthlyPayment)}
                </span>
              </div>
            </div>
          </div>

          {/* Loan Summary Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
              <div className="text-sm text-gray-600 mb-1">Loan Amount</div>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(result.loanAmount)}</div>
              <div className="text-xs text-gray-500 mt-1">After {formatCurrency(result.downPayment)} down</div>
            </div>

            <div className="bg-red-50 rounded-xl p-5 border border-red-200">
              <div className="text-sm text-gray-600 mb-1">Total Interest</div>
              <div className="text-2xl font-bold text-red-600">{formatCurrency(result.totalInterest)}</div>
              <div className="text-xs text-gray-500 mt-1">Over {loanTerm} years</div>
            </div>

            <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
              <div className="text-sm text-gray-600 mb-1">Total Amount Paid</div>
              <div className="text-2xl font-bold text-purple-600">{formatCurrency(result.totalPaid)}</div>
              <div className="text-xs text-gray-500 mt-1">All costs included</div>
            </div>
          </div>

          {/* Year-by-Year Breakdown */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold text-[#1F4E78]">
                Year-by-Year Amortization Schedule
              </h4>
              <button
                onClick={() => setShowYearlyBreakdown(!showYearlyBreakdown)}
                className="text-[#4472C4] font-medium hover:underline text-sm"
              >
                {showYearlyBreakdown ? '▲ Hide' : '▼ Show'}
              </button>
            </div>

            {showYearlyBreakdown && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Year</th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-700">Principal Paid</th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-700">Interest Paid</th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-700">Balance</th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-700">Total Paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.yearlyBreakdown.map((year) => (
                      <tr key={year.year} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-2 font-medium text-gray-900">{year.year}</td>
                        <td className="py-3 px-2 text-right text-green-600">
                          {formatCurrency(year.principalPaid)}
                        </td>
                        <td className="py-3 px-2 text-right text-red-600">
                          {formatCurrency(year.interestPaid)}
                        </td>
                        <td className="py-3 px-2 text-right font-semibold text-gray-900">
                          {formatCurrency(year.endingBalance)}
                        </td>
                        <td className="py-3 px-2 text-right text-gray-600">
                          {formatCurrency(year.totalPaid)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Initial State */}
      {!hasCalculated && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏡</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Calculate your total monthly mortgage payment
              </h4>
              <p className="text-sm text-gray-700">
                Get a complete breakdown including principal, interest, taxes, insurance, and PMI. 
                Click &quot;Calculate My Mortgage Payment&quot; to see your results.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}