'use client';

import { useState } from 'react';

interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

interface TaxBreakdown {
  grossPay: number;
  federalTax: number;
  stateTax: number;
  ficaTax: number;
  retirementDeduction: number;
  healthDeduction: number;
  netPay: number;
  effectiveTaxRate: number;
  preTaxDeductionTotal: number;
}

interface ComparisonData {
  with401k: TaxBreakdown;
  without401k: TaxBreakdown;
  taxSavings: number;
  actualTakeHomeDifference: number;
}

const STATES = [
  { code: 'AK', name: 'Alaska (0%)', rate: 0, type: 'flat' },
  { code: 'AL', name: 'Alabama (Flat ~5%)', rate: 0.05, type: 'flat' },
  { code: 'AZ', name: 'Arizona (Flat 2.5%)', rate: 0.025, type: 'flat' },
  { code: 'CA', name: 'California (Progressive)', type: 'progressive' },
  { code: 'CO', name: 'Colorado (Flat 4.4%)', rate: 0.044, type: 'flat' },
  { code: 'FL', name: 'Florida (0%)', rate: 0, type: 'flat' },
  { code: 'GA', name: 'Georgia (Flat 5.49%)', rate: 0.0549, type: 'flat' },
  { code: 'IL', name: 'Illinois (Flat 4.95%)', rate: 0.0495, type: 'flat' },
  { code: 'NC', name: 'North Carolina (Flat 4.5%)', rate: 0.045, type: 'flat' },
  { code: 'NY', name: 'New York (Progressive)', type: 'progressive' },
  { code: 'PA', name: 'Pennsylvania (Flat 3.07%)', rate: 0.0307, type: 'flat' },
  { code: 'TX', name: 'Texas (0%)', rate: 0, type: 'flat' },
  { code: 'WA', name: 'Washington (0%)', rate: 0, type: 'flat' },
  { code: 'OTHER_FLAT', name: 'Other Flat Tax State (approx 4%)', rate: 0.04, type: 'flat' },
];

export default function TakeHomePayCalculator() {
  const [grossSalary, setGrossSalary] = useState<string>('75000');
  const [filingStatus, setFilingStatus] = useState<'single' | 'joint' | 'head'>('single');
  const [selectedState, setSelectedState] = useState<string>('OTHER_FLAT');
  const [retirementRate, setRetirementRate] = useState<string>('6');
  const [healthMonthly, setHealthMonthly] = useState<string>('150');
  const [payFrequency, setPayFrequency] = useState<'weekly' | 'biweekly' | 'semimonthly' | 'monthly'>('biweekly');

  const [result, setResult] = useState<TaxBreakdown | null>(null);
  const [comparison, setComparison] = useState<ComparisonData | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  // 2026 Projected Progressive Federal Tax Brackets
  const federalBrackets: Record<'single' | 'joint' | 'head', TaxBracket[]> = {
    single: [
      { min: 0, max: 12200, rate: 0.10 },
      { min: 12200, max: 49500, rate: 0.12 },
      { min: 49500, max: 105500, rate: 0.22 },
      { min: 105500, max: 201500, rate: 0.24 },
      { min: 201500, max: 255900, rate: 0.32 },
      { min: 255900, max: 639800, rate: 0.35 },
      { min: 639800, max: Infinity, rate: 0.37 },
    ],
    joint: [
      { min: 0, max: 24400, rate: 0.10 },
      { min: 24400, max: 99000, rate: 0.12 },
      { min: 99000, max: 211000, rate: 0.22 },
      { min: 211000, max: 403000, rate: 0.24 },
      { min: 403000, max: 511800, rate: 0.32 },
      { min: 511800, max: 767800, rate: 0.35 },
      { min: 767800, max: Infinity, rate: 0.37 },
    ],
    head: [
      { min: 0, max: 17400, rate: 0.10 },
      { min: 17400, max: 66200, rate: 0.12 },
      { min: 66200, max: 105500, rate: 0.22 },
      { min: 105500, max: 201500, rate: 0.24 },
      { min: 201500, max: 255900, rate: 0.32 },
      { min: 255900, max: 639800, rate: 0.35 },
      { min: 639800, max: Infinity, rate: 0.37 },
    ],
  };

  // 2026 Projected Standard Deductions
  const standardDeductions: Record<'single' | 'joint' | 'head', number> = {
    single: 15400,
    joint: 30800,
    head: 23100,
  };

  // 2026 State Income Tax Brackets (CA and NY)
  const caBrackets = [
    { min: 0, max: 11000, rate: 0.01 },
    { min: 11000, max: 26000, rate: 0.02 },
    { min: 26000, max: 41000, rate: 0.04 },
    { min: 41000, max: 57000, rate: 0.06 },
    { min: 57000, max: 72000, rate: 0.08 },
    { min: 72000, max: 368000, rate: 0.093 },
    { min: 368000, max: 442000, rate: 0.103 },
    { min: 442000, max: 736000, rate: 0.113 },
    { min: 736000, max: Infinity, rate: 0.123 },
  ];

  const nyBrackets = [
    { min: 0, max: 9000, rate: 0.04 },
    { min: 9000, max: 12400, rate: 0.045 },
    { min: 12400, max: 14700, rate: 0.0525 },
    { min: 14700, max: 22600, rate: 0.059 },
    { min: 22600, max: 85000, rate: 0.0633 },
    { min: 85000, max: 227000, rate: 0.0685 },
    { min: 227000, max: 1130000, rate: 0.0965 },
    { min: 1130000, max: Infinity, rate: 0.109 },
  ];

  const calculateProgressiveTax = (taxable: number, brackets: TaxBracket[]): number => {
    let tax = 0;
    for (let i = 0; i < brackets.length; i++) {
      const { min, max, rate } = brackets[i];
      if (taxable > min) {
        const taxableInBracket = Math.min(taxable, max) - min;
        tax += taxableInBracket * rate;
      }
    }
    return tax;
  };

  const runCalculationFor401k = (gross: number, retRate: number, healthCostAnnual: number): TaxBreakdown => {
    const retirementCostAnnual = gross * (retRate / 100);

    // 2026 FICA calculations (Social Security wage base cap projected at $181,200)
    const FicaBase = Math.max(0, gross - healthCostAnnual);
    const socialSecurity = Math.min(FicaBase * 0.062, 181200 * 0.062);
    const standardMedicare = FicaBase * 0.0145;
    
    // Additional Medicare Tax of 0.9%
    const medicareThreshold = filingStatus === 'joint' ? 250000 : 200000;
    const additionalMedicare = FicaBase > medicareThreshold ? (FicaBase - medicareThreshold) * 0.009 : 0;
    const totalFica = socialSecurity + standardMedicare + additionalMedicare;

    // Federal Tax calculations
    const standardDeduction = standardDeductions[filingStatus];
    const federalTaxable = Math.max(0, gross - healthCostAnnual - retirementCostAnnual - standardDeduction);
    const federalTax = calculateProgressiveTax(federalTaxable, federalBrackets[filingStatus]);

    // State Tax calculations
    const stateObj = STATES.find(s => s.code === selectedState) || STATES[STATES.length - 1];
    let stateTax = 0;
    const stateTaxable = Math.max(0, gross - healthCostAnnual - retirementCostAnnual);

    if (stateObj.type === 'progressive') {
      if (stateObj.code === 'CA') {
        stateTax = calculateProgressiveTax(stateTaxable, caBrackets);
      } else if (stateObj.code === 'NY') {
        stateTax = calculateProgressiveTax(stateTaxable, nyBrackets);
      }
    } else {
      stateTax = stateTaxable * (stateObj.rate || 0);
    }

    const preTaxDeductionTotal = retirementCostAnnual + healthCostAnnual;
    const netPay = Math.max(0, gross - federalTax - stateTax - totalFica - preTaxDeductionTotal);
    const totalTaxes = federalTax + stateTax + totalFica;
    const effectiveTaxRate = gross > 0 ? (totalTaxes / gross) * 100 : 0;

    return {
      grossPay: gross,
      federalTax: Math.round(federalTax),
      stateTax: Math.round(stateTax),
      ficaTax: Math.round(totalFica),
      retirementDeduction: Math.round(retirementCostAnnual),
      healthDeduction: Math.round(healthCostAnnual),
      netPay: Math.round(netPay),
      effectiveTaxRate: parseFloat(effectiveTaxRate.toFixed(2)),
      preTaxDeductionTotal: Math.round(preTaxDeductionTotal),
    };
  };

  const handleCalculate = () => {
    const gross = parseFloat(grossSalary) || 0;
    const retRate = parseFloat(retirementRate) || 0;
    const healthCostMonthly = parseFloat(healthMonthly) || 0;

    if (gross <= 0) {
      alert('Please enter a valid gross annual salary greater than $0.');
      return;
    }
    if (retRate < 0 || retRate > 100) {
      alert('Please enter a retirement contribution percentage between 0 and 100.');
      return;
    }
    if (healthCostMonthly < 0) {
      alert('Please enter a valid health insurance cost.');
      return;
    }

    const healthCostAnnual = healthCostMonthly * 12;

    const with401k = runCalculationFor401k(gross, retRate, healthCostAnnual);
    const without401k = runCalculationFor401k(gross, 0, healthCostAnnual);

    const taxSavings = Math.max(0, (without401k.federalTax + without401k.stateTax) - (with401k.federalTax + with401k.stateTax));
    const actualTakeHomeDifference = without401k.netPay - with401k.netPay;

    setResult(with401k);
    setComparison({
      with401k,
      without401k,
      taxSavings: Math.round(taxSavings),
      actualTakeHomeDifference: Math.round(actualTakeHomeDifference),
    });
    setHasCalculated(true);
  };

  const handleReset = () => {
    setGrossSalary('75000');
    setFilingStatus('single');
    setSelectedState('OTHER_FLAT');
    setRetirementRate('6');
    setHealthMonthly('150');
    setPayFrequency('biweekly');
    setResult(null);
    setComparison(null);
    setHasCalculated(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPaychecksPerYear = (): number => {
    switch (payFrequency) {
      case 'weekly': return 52;
      case 'biweekly': return 26;
      case 'semimonthly': return 24;
      case 'monthly': return 12;
    }
  };

  const getPctWidth = (val: number, total: number) => {
    if (total <= 0) return '0%';
    const percentage = Math.max(0, Math.min(100, (val / total) * 100));
    return `${percentage.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6 text-left">
      {/* Inputs */}
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-100">
        <h3 className="text-lg sm:text-xl font-bold text-[#1F4E78] mb-4">
          Enter Your Compensation & Deductions
        </h3>

        <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
          {/* Gross Salary */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Annual Gross Salary
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 font-medium">$</span>
              <input
                type="number"
                value={grossSalary}
                onChange={(e) => setGrossSalary(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent text-base text-gray-900"
                placeholder="75000"
                min="0"
                step="1000"
              />
            </div>
          </div>

          {/* Filing Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Federal Filing Status (2026)
            </label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value as 'single' | 'joint' | 'head')}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] text-base text-gray-900 bg-white"
            >
              <option value="single">Single</option>
              <option value="joint">Married Filing Jointly</option>
              <option value="head">Head of Household</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              State of Employment
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] text-base text-gray-900 bg-white"
            >
              {STATES.map((st) => (
                <option key={st.code} value={st.code}>{st.name}</option>
              ))}
            </select>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Paycheck Frequency
            </label>
            <select
              value={payFrequency}
              onChange={(e) => setPayFrequency(e.target.value as 'weekly' | 'biweekly' | 'semimonthly' | 'monthly')}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] text-base text-gray-900 bg-white"
            >
              <option value="weekly">Weekly (52 paychecks)</option>
              <option value="biweekly">Bi-weekly (26 paychecks)</option>
              <option value="semimonthly">Semi-monthly (24 paychecks)</option>
              <option value="monthly">Monthly (12 paychecks)</option>
            </select>
          </div>

          {/* 401k */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pre-tax 401(k) Contribution
            </label>
            <div className="relative">
              <input
                type="number"
                value={retirementRate}
                onChange={(e) => setRetirementRate(e.target.value)}
                className="w-full pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] text-base text-gray-900"
                placeholder="6"
                min="0"
                max="100"
                step="1"
              />
              <span className="absolute right-3 top-3 text-gray-500 font-semibold">%</span>
            </div>
          </div>

          {/* Health */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Health Insurance (Pre-tax)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 font-medium">$</span>
              <input
                type="number"
                value={healthMonthly}
                onChange={(e) => setHealthMonthly(e.target.value)}
                className="w-full pl-8 pr-16 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] text-base text-gray-900"
                placeholder="150"
                min="0"
                step="10"
              />
              <span className="absolute right-3 top-3 text-gray-500 text-xs font-semibold">/ month</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCalculate}
            className="flex-1 bg-[#4472C4] hover:bg-[#1F4E78] text-white py-3 px-6 rounded-lg font-bold text-base transition duration-200 shadow-md hover:shadow-lg text-center cursor-pointer"
          >
            Calculate Take Home Pay
          </button>
          {hasCalculated && (
            <button
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 rounded-lg font-bold text-base transition duration-200 text-center cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {hasCalculated && result && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-[#4472C4] to-[#1F4E78] rounded-xl p-5 text-white shadow-lg">
              <div className="text-xs font-medium uppercase tracking-wider opacity-90 mb-1">Take-Home / Paycheck</div>
              <div className="text-2xl sm:text-3xl font-bold">{formatCurrency(result.netPay / getPaychecksPerYear())}</div>
              <div className="text-[11px] opacity-85 mt-2">Based on {getPaychecksPerYear()} checks/year</div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white shadow-lg">
              <div className="text-xs font-medium uppercase tracking-wider opacity-90 mb-1">Annual Take-Home Pay</div>
              <div className="text-2xl sm:text-3xl font-bold">{formatCurrency(result.netPay)}</div>
              <div className="text-[11px] opacity-85 mt-2">Actual net income</div>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-5 text-white shadow-lg">
              <div className="text-xs font-medium uppercase tracking-wider opacity-90 mb-1">Effective Tax Rate</div>
              <div className="text-2xl sm:text-3xl font-bold">{result.effectiveTaxRate}%</div>
              <div className="text-[11px] opacity-85 mt-2">Combined tax rate</div>
            </div>
          </div>

          {/* Stacked Chart */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <h4 className="text-sm font-bold text-[#1F4E78] mb-3">Where Your Salary Goes</h4>
            <div className="w-full h-6 rounded-full overflow-hidden flex bg-gray-200">
              <div style={{ width: getPctWidth(result.netPay, result.grossPay) }} className="bg-emerald-500 h-full" />
              <div style={{ width: getPctWidth(result.federalTax, result.grossPay) }} className="bg-red-400 h-full" />
              <div style={{ width: getPctWidth(result.stateTax, result.grossPay) }} className="bg-amber-400 h-full" />
              <div style={{ width: getPctWidth(result.ficaTax, result.grossPay) }} className="bg-sky-400 h-full" />
              <div style={{ width: getPctWidth(result.preTaxDeductionTotal, result.grossPay) }} className="bg-violet-400 h-full" />
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] text-gray-600 font-medium">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-500" />Net Pay: {getPctWidth(result.netPay, result.grossPay)}</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-red-400" />Fed Tax: {getPctWidth(result.federalTax, result.grossPay)}</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-400" />State Tax: {getPctWidth(result.stateTax, result.grossPay)}</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-sky-400" />FICA: {getPctWidth(result.ficaTax, result.grossPay)}</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-violet-400" />Deductions: {getPctWidth(result.preTaxDeductionTotal, result.grossPay)}</div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h4 className="text-sm font-bold text-[#1F4E78]">Your Payroll Breakdown (2026 Limits)</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-100/50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200">
                    <th className="py-2.5 px-4">Line Item</th>
                    <th className="py-2.5 px-4 text-right">Per Check</th>
                    <th className="py-2.5 px-4 text-right">Monthly</th>
                    <th className="py-2.5 px-4 text-right">Annual</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 divide-y divide-gray-100 font-medium">
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-gray-900">Gross Salary</td>
                    <td className="py-2.5 px-4 text-right">{formatCurrency(result.grossPay / getPaychecksPerYear())}</td>
                    <td className="py-2.5 px-4 text-right">{formatCurrency(result.grossPay / 12)}</td>
                    <td className="py-2.5 px-4 text-right font-bold text-gray-900">{formatCurrency(result.grossPay)}</td>
                  </tr>
                  <tr className="text-red-600">
                    <td className="py-2.5 px-4">Federal Income Tax (-)</td>
                    <td className="py-2.5 px-4 text-right">{formatCurrency(result.federalTax / getPaychecksPerYear())}</td>
                    <td className="py-2.5 px-4 text-right">{formatCurrency(result.federalTax / 12)}</td>
                    <td className="py-2.5 px-4 text-right">{formatCurrency(result.federalTax)}</td>
                  </tr>
                  <tr className="text-amber-600">
                    <td className="py-2.5 px-4">State Income Tax (-)</td>
                    <td className="py-2.5 px-4 text-right">{formatCurrency(result.stateTax / getPaychecksPerYear())}</td>
                    <td className="py-2.5 px-4 text-right">{formatCurrency(result.stateTax / 12)}</td>
                    <td className="py-2.5 px-4 text-right">{formatCurrency(result.stateTax)}</td>
                  </tr>
                  <tr className="text-sky-600">
                    <td className="py-2.5 px-4">FICA Taxes (-)</td>
                    <td className="py-2.5 px-4 text-right">{formatCurrency(result.ficaTax / getPaychecksPerYear())}</td>
                    <td className="py-2.5 px-4 text-right">{formatCurrency(result.ficaTax / 12)}</td>
                    <td className="py-2.5 px-4 text-right">{formatCurrency(result.ficaTax)}</td>
                  </tr>
                  <tr className="text-violet-600">
                    <td className="py-2.5 px-4">401(k) Retirement (-)</td>
                    <td className="py-2.5 px-4 text-right">{formatCurrency(result.retirementDeduction / getPaychecksPerYear())}</td>
                    <td className="py-2.5 px-4 text-right">{formatCurrency(result.retirementDeduction / 12)}</td>
                    <td className="py-2.5 px-4 text-right">{formatCurrency(result.retirementDeduction)}</td>
                  </tr>
                  <tr className="text-blue-600">
                    <td className="py-2.5 px-4">Health Insurance (-)</td>
                    <td className="py-2.5 px-4 text-right">{formatCurrency(result.healthDeduction / getPaychecksPerYear())}</td>
                    <td className="py-2.5 px-4 text-right">{formatCurrency(result.healthDeduction / 12)}</td>
                    <td className="py-2.5 px-4 text-right">{formatCurrency(result.healthDeduction)}</td>
                  </tr>
                  <tr className="bg-[#4472C4]/5 text-emerald-700 font-bold">
                    <td className="py-3 px-4">Take-Home Pay</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(result.netPay / getPaychecksPerYear())}</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(result.netPay / 12)}</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(result.netPay)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 401k Advantage Comparison */}
          {comparison && comparison.with401k.retirementDeduction > 0 && (
            <div className="bg-gradient-to-r from-blue-500 to-[#1F4E78] text-white rounded-xl p-5 shadow-md">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h4 className="font-bold mb-1">Your 2026 Pre-Tax 401(k) Advantage</h4>
                  <p className="text-xs opacity-90 leading-relaxed">
                    By saving pre-tax, you lower your taxable base. You put money away for retirement, but your paychecks do not drop dollar-for-dollar because of tax savings!
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="bg-white/10 rounded p-2.5">
                  <div className="text-[10px] opacity-80 mb-0.5">Annual Saved</div>
                  <div className="text-sm sm:text-base font-bold">{formatCurrency(comparison.with401k.retirementDeduction)}</div>
                </div>
                <div className="bg-white/10 rounded p-2.5">
                  <div className="text-[10px] opacity-80 mb-0.5">Tax Savings</div>
                  <div className="text-sm sm:text-base font-bold text-emerald-300">+{formatCurrency(comparison.taxSavings)}</div>
                </div>
                <div className="bg-white/10 rounded p-2.5">
                  <div className="text-[10px] opacity-80 mb-0.5">Take-Home Impact</div>
                  <div className="text-sm sm:text-base font-bold text-amber-200">-{formatCurrency(comparison.actualTakeHomeDifference)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}