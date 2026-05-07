'use client';

import { useState } from 'react';

type FilingStatus = 'single' | 'married' | 'hoh';
type DeductionType = 'standard' | 'itemized';
type PayFrequency = 'weekly' | 'biweekly' | 'semimonthly' | 'monthly';

interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

interface BracketBreakdown {
  rate: number;
  min: number;
  max: number;
  taxed: number;
  amount: number;
}

interface FicaResult {
  ss: number;
  medicare: number;
}

interface SelfEmploymentResult {
  netEarnings: number;
  tax: number;
  deduction: number;
}

interface CalculationResult {
  totalGross: number;
  w2Income: number;
  otherIncomeAmount: number;
  selfEmploymentIncomeAmount: number;
  agi: number;
  taxableIncome: number;
  federalTaxBeforeCredits: number;
  totalCredits: number;
  federalTax: number;
  breakdown: BracketBreakdown[];
  marginalRate: number;
  effectiveFederal: number;
  fica: FicaResult;
  ficaTotal: number;
  selfEmployment: SelfEmploymentResult;
  stateTax: number;
  stateTaxRate: number;
  totalTax: number;
  takeHome: number;
  effectiveTotal: number;
  deduction: number;
  deductionLabel: string;
  standardDeduction: number;
  itemizedDeduction: number;
  monthlyTakeHome: number;
  selectedPaycheckTakeHome: number;
  refundOrOwed: number;
  totalWithholding: number;
  incomeTaxDue: number;
  taxSavingsFromExtraPretax: number;
  extraPretaxNetCost: number;
}


// 2025 Federal Ordinary Income Tax Brackets
// For returns generally filed in 2026.
// Verify against official IRS guidance before relying on results.
const TAX_BRACKETS: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { min: 0, max: 11925, rate: 0.1 },
    { min: 11925, max: 48475, rate: 0.12 },
    { min: 48475, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250525, rate: 0.32 },
    { min: 250525, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 },
  ],
  married: [
    { min: 0, max: 23850, rate: 0.1 },
    { min: 23850, max: 96950, rate: 0.12 },
    { min: 96950, max: 206700, rate: 0.22 },
    { min: 206700, max: 394600, rate: 0.24 },
    { min: 394600, max: 501050, rate: 0.32 },
    { min: 501050, max: 751600, rate: 0.35 },
    { min: 751600, max: Infinity, rate: 0.37 },
  ],
  hoh: [
    { min: 0, max: 17000, rate: 0.1 },
    { min: 17000, max: 64850, rate: 0.12 },
    { min: 64850, max: 103350, rate: 0.22 },
    { min: 103350, max: 197300, rate: 0.24 },
    { min: 197300, max: 250500, rate: 0.32 },
    { min: 250500, max: 626350, rate: 0.35 },
    { min: 626350, max: Infinity, rate: 0.37 },
  ],
};





const STANDARD_DEDUCTIONS: Record<FilingStatus, number> = {
  single: 15000,
  married: 30000,
  hoh: 22500,
};






const FICA_RATES = {
  socialSecurity: 0.062,
  medicare: 0.0145,
  ssWageCap: 176100,
  additionalMedicare: 0.009,
  additionalMedicareThreshold: {
    single: 200000,
    married: 250000,
    hoh: 200000,
  } as Record<FilingStatus, number>,
};

// Simplified approximate state tax rates.
// These are not exact state tax calculations.
const STATE_TAXES = {
  AL: { name: 'Alabama', rate: 0.05 },
  AK: { name: 'Alaska', rate: 0 },
  AZ: { name: 'Arizona', rate: 0.025 },
  AR: { name: 'Arkansas', rate: 0.047 },
  CA: { name: 'California', rate: 0.093 },
  CO: { name: 'Colorado', rate: 0.044 },
  CT: { name: 'Connecticut', rate: 0.0699 },
  DE: { name: 'Delaware', rate: 0.066 },
  FL: { name: 'Florida', rate: 0 },
  GA: { name: 'Georgia', rate: 0.055 },
  HI: { name: 'Hawaii', rate: 0.11 },
  ID: { name: 'Idaho', rate: 0.058 },
  IL: { name: 'Illinois', rate: 0.0495 },
  IN: { name: 'Indiana', rate: 0.031 },
  IA: { name: 'Iowa', rate: 0.06 },
  KS: { name: 'Kansas', rate: 0.057 },
  KY: { name: 'Kentucky', rate: 0.045 },
  LA: { name: 'Louisiana', rate: 0.0425 },
  ME: { name: 'Maine', rate: 0.0715 },
  MD: { name: 'Maryland', rate: 0.0575 },
  MA: { name: 'Massachusetts', rate: 0.05 },
  MI: { name: 'Michigan', rate: 0.0425 },
  MN: { name: 'Minnesota', rate: 0.0985 },
  MS: { name: 'Mississippi', rate: 0.05 },
  MO: { name: 'Missouri', rate: 0.0495 },
  MT: { name: 'Montana', rate: 0.069 },
  NE: { name: 'Nebraska', rate: 0.0664 },
  NV: { name: 'Nevada', rate: 0 },
  NH: { name: 'New Hampshire', rate: 0 },
  NJ: { name: 'New Jersey', rate: 0.1075 },
  NM: { name: 'New Mexico', rate: 0.059 },
  NY: { name: 'New York', rate: 0.0685 },
  NC: { name: 'North Carolina', rate: 0.0475 },
  ND: { name: 'North Dakota', rate: 0.025 },
  OH: { name: 'Ohio', rate: 0.04 },
  OK: { name: 'Oklahoma', rate: 0.0475 },
  OR: { name: 'Oregon', rate: 0.099 },
  PA: { name: 'Pennsylvania', rate: 0.0307 },
  RI: { name: 'Rhode Island', rate: 0.0599 },
  SC: { name: 'South Carolina', rate: 0.07 },
  SD: { name: 'South Dakota', rate: 0 },
  TN: { name: 'Tennessee', rate: 0 },
  TX: { name: 'Texas', rate: 0 },
  UT: { name: 'Utah', rate: 0.0485 },
  VT: { name: 'Vermont', rate: 0.0875 },
  VA: { name: 'Virginia', rate: 0.0575 },
  WA: { name: 'Washington', rate: 0 },
  WV: { name: 'West Virginia', rate: 0.065 },
  WI: { name: 'Wisconsin', rate: 0.0765 },
  WY: { name: 'Wyoming', rate: 0 },
  DC: { name: 'Washington DC', rate: 0.0895 },
} as const;

type StateCode = keyof typeof STATE_TAXES;

const CHILD_TAX_CREDIT = 2000;
const OTHER_DEPENDENT_CREDIT = 500;

function calcFederalTax(taxableIncome: number, filingStatus: FilingStatus) {
  const brackets = TAX_BRACKETS[filingStatus];
  let tax = 0;
  const breakdown: BracketBreakdown[] = [];

  for (const bracket of brackets) {
    if (taxableIncome <= bracket.min) break;

    const taxed = Math.min(taxableIncome, bracket.max) - bracket.min;
    const amount = taxed * bracket.rate;

    tax += amount;

    breakdown.push({
      rate: bracket.rate,
      min: bracket.min,
      max: bracket.max,
      taxed,
      amount,
    });
  }

  return { tax, breakdown };
}

function calcFICA(w2Income: number, filingStatus: FilingStatus): FicaResult {
  const ss =
    Math.min(w2Income, FICA_RATES.ssWageCap) * FICA_RATES.socialSecurity;

  const medicareBase = w2Income * FICA_RATES.medicare;
  const threshold = FICA_RATES.additionalMedicareThreshold[filingStatus];

  const additionalMedicare =
    Math.max(0, w2Income - threshold) * FICA_RATES.additionalMedicare;

  return {
    ss,
    medicare: medicareBase + additionalMedicare,
  };
}

function calcSelfEmploymentTax(selfEmploymentIncome: number): SelfEmploymentResult {
  const netEarnings = Math.max(0, selfEmploymentIncome * 0.9235);
  const ssTax = Math.min(netEarnings, FICA_RATES.ssWageCap) * 0.124;
  const medicareTax = netEarnings * 0.029;
  const tax = ssTax + medicareTax;

  return {
    netEarnings,
    tax,
    deduction: tax / 2,
  };
}

function getPayPeriods(freq: PayFrequency) {
  switch (freq) {
    case 'weekly':
      return 52;
    case 'biweekly':
      return 26;
    case 'semimonthly':
      return 24;
    case 'monthly':
      return 12;
    default:
      return 26;
  }
}

function payFrequencyLabel(freq: PayFrequency) {
  switch (freq) {
    case 'weekly':
      return 'weekly paycheck';
    case 'biweekly':
      return 'bi-weekly paycheck';
    case 'semimonthly':
      return 'semi-monthly paycheck';
    case 'monthly':
      return 'monthly paycheck';
    default:
      return 'paycheck';
  }
}

export default function IncomeTaxCalculator() {
  const [grossIncome, setGrossIncome] = useState('85000');
  const [otherIncome, setOtherIncome] = useState('0');
  const [selfEmploymentIncome, setSelfEmploymentIncome] = useState('0');

  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [stateCode, setStateCode] = useState<StateCode>('NY');

  const [deductionType, setDeductionType] = useState<DeductionType>('standard');
  const [optimizeDeduction, setOptimizeDeduction] = useState(true);
  const [itemizedDeductions, setItemizedDeductions] = useState('0');

  const [preTaxDeductions, setPreTaxDeductions] = useState('0');
  const [extraPretaxContribution, setExtraPretaxContribution] = useState('0');

  const [childDependents, setChildDependents] = useState('0');
  const [otherDependents, setOtherDependents] = useState('0');
  const [otherCredits, setOtherCredits] = useState('0');

  const [federalWithholding, setFederalWithholding] = useState('9000');
  const [stateWithholding, setStateWithholding] = useState('3000');

  const [payFrequency, setPayFrequency] = useState<PayFrequency>('biweekly');

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showBracketBreakdown, setShowBracketBreakdown] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number.isFinite(amount) ? amount : 0);
  };

  const formatPercent = (value: number) => {
    return `${((Number.isFinite(value) ? value : 0) * 100).toFixed(2)}%`;
  };

  const buildCalculation = (extraPretax = 0): CalculationResult => {
    const w2Income = parseFloat(grossIncome) || 0;
    const otherIncomeAmount = parseFloat(otherIncome) || 0;
    const selfEmploymentIncomeAmount = parseFloat(selfEmploymentIncome) || 0;

    const basePretax = parseFloat(preTaxDeductions) || 0;
    const preTax = basePretax + extraPretax;

    const totalGross =
      w2Income + otherIncomeAmount + selfEmploymentIncomeAmount;

    const selfEmployment = calcSelfEmploymentTax(selfEmploymentIncomeAmount);

    const agi = Math.max(0, totalGross - preTax - selfEmployment.deduction);

    const standardDeduction = STANDARD_DEDUCTIONS[filingStatus];
    const itemizedDeduction = parseFloat(itemizedDeductions) || 0;

    let deduction = standardDeduction;
    let deductionLabel = 'Standard';

    if (deductionType === 'itemized') {
      if (optimizeDeduction) {
        deduction = Math.max(standardDeduction, itemizedDeduction);
        deductionLabel =
          deduction === standardDeduction
            ? 'Standard optimized'
            : 'Itemized optimized';
      } else {
        deduction = itemizedDeduction;
        deductionLabel = 'Itemized';
      }
    }

    const taxableIncome = Math.max(0, agi - deduction);

    const federal = calcFederalTax(taxableIncome, filingStatus);

    const federalTaxBeforeCredits = federal.tax;

    const totalCredits =
      (parseInt(childDependents) || 0) * CHILD_TAX_CREDIT +
      (parseInt(otherDependents) || 0) * OTHER_DEPENDENT_CREDIT +
      (parseFloat(otherCredits) || 0);

    const federalTax = Math.max(0, federalTaxBeforeCredits - totalCredits);

    const marginalRate =
      federal.breakdown.length > 0
        ? federal.breakdown[federal.breakdown.length - 1].rate
        : 0;

    const effectiveFederal = totalGross > 0 ? federalTax / totalGross : 0;

    const fica = calcFICA(w2Income, filingStatus);
    const ficaTotal = fica.ss + fica.medicare;

    const stateTaxRate = STATE_TAXES[stateCode].rate;

    // Simplified state tax estimate:
    // taxable income multiplied by approximate state rate.
    const stateTax = taxableIncome * stateTaxRate;

    const totalTax = federalTax + ficaTotal + selfEmployment.tax + stateTax;

    const takeHome = Math.max(0, totalGross - preTax - totalTax);

    const effectiveTotal = totalGross > 0 ? totalTax / totalGross : 0;

    const totalWithholding =
      (parseFloat(federalWithholding) || 0) +
      (parseFloat(stateWithholding) || 0);

    const incomeTaxDue = federalTax + stateTax;
    const refundOrOwed = totalWithholding - incomeTaxDue;

    return {
      totalGross,
      w2Income,
      otherIncomeAmount,
      selfEmploymentIncomeAmount,
      agi,
      taxableIncome,
      federalTaxBeforeCredits,
      totalCredits,
      federalTax,
      breakdown: federal.breakdown,
      marginalRate,
      effectiveFederal,
      fica,
      ficaTotal,
      selfEmployment,
      stateTax,
      stateTaxRate,
      totalTax,
      takeHome,
      effectiveTotal,
      deduction,
      deductionLabel,
      standardDeduction,
      itemizedDeduction,
      monthlyTakeHome: takeHome / 12,
      selectedPaycheckTakeHome: takeHome / getPayPeriods(payFrequency),
      refundOrOwed,
      totalWithholding,
      incomeTaxDue,
      taxSavingsFromExtraPretax: 0,
      extraPretaxNetCost: 0,
    };
  };

  const calculate = () => {
    const w2 = parseFloat(grossIncome) || 0;
    const other = parseFloat(otherIncome) || 0;
    const selfEmployment = parseFloat(selfEmploymentIncome) || 0;

    if (w2 + other + selfEmployment <= 0) {
      alert('Please enter income greater than $0');
      return;
    }

    const baseResult = buildCalculation(0);
    const extraPretax = parseFloat(extraPretaxContribution) || 0;

    if (extraPretax > 0) {
      const scenario = buildCalculation(extraPretax);
      const taxSavings = baseResult.totalTax - scenario.totalTax;

      setResult({
        ...baseResult,
        taxSavingsFromExtraPretax: Math.max(0, taxSavings),
        extraPretaxNetCost: Math.max(0, extraPretax - taxSavings),
      });
    } else {
      setResult(baseResult);
    }

    setHasCalculated(true);
    setShowBracketBreakdown(false);
  };

  const reset = () => {
    setGrossIncome('85000');
    setOtherIncome('0');
    setSelfEmploymentIncome('0');
    setFilingStatus('single');
    setStateCode('NY');
    setDeductionType('standard');
    setOptimizeDeduction(true);
    setItemizedDeductions('0');
    setPreTaxDeductions('0');
    setExtraPretaxContribution('0');
    setChildDependents('0');
    setOtherDependents('0');
    setOtherCredits('0');
    setFederalWithholding('9000');
    setStateWithholding('3000');
    setPayFrequency('biweekly');
    setResult(null);
    setHasCalculated(false);
    setShowBracketBreakdown(false);
  };

  const filingOptions: {
    value: FilingStatus;
    label: string;
    description: string;
  }[] = [
    {
      value: 'single',
      label: 'Single',
      description: 'Single filer',
    },
    {
      value: 'married',
      label: 'Married Jointly',
      description: 'Married filing jointly',
    },
    {
      value: 'hoh',
      label: 'Head of Household',
      description: 'Qualifying household filer',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-[#1F4E78]">
            Enter Your Tax Details
          </h3>
          <span className="inline-flex w-fit rounded-full bg-blue-100 text-[#1F4E78] px-3 py-1 text-xs font-bold">
            Tax Year 2025 Estimate
          </span>
        </div>

        <div className="space-y-6">
          {/* Income */}
          <section>
            <h4 className="font-bold text-gray-900 mb-4">Income</h4>

            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  W-2 Gross Annual Income
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    value={grossIncome}
                    onChange={(e) => setGrossIncome(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                    placeholder="85000"
                    min="0"
                    step="1000"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Salary or wages from an employer.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Other Ordinary Income
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    value={otherIncome}
                    onChange={(e) => setOtherIncome(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Interest, bonus, rental income, etc.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Self-Employment Income
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    value={selfEmploymentIncome}
                    onChange={(e) => setSelfEmploymentIncome(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Freelance or business profit.
                </p>
              </div>
            </div>
          </section>

          {/* Filing Status */}
          <section>
            <h4 className="font-bold text-gray-900 mb-4">Filing Status</h4>

            <div className="grid sm:grid-cols-3 gap-4">
              {filingOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilingStatus(option.value)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    filingStatus === option.value
                      ? 'border-[#4472C4] bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        filingStatus === option.value
                          ? 'border-[#4472C4]'
                          : 'border-gray-300'
                      }`}
                    >
                      {filingStatus === option.value && (
                        <div className="w-2 h-2 rounded-full bg-[#4472C4]"></div>
                      )}
                    </div>
                    <span className="font-semibold text-gray-900">
                      {option.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* Deductions */}
          <section>
            <h4 className="font-bold text-gray-900 mb-4">
              Deductions & Pre-Tax Savings
            </h4>

            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Deduction Type
                </label>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button
                    onClick={() => setDeductionType('standard')}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      deductionType === 'standard'
                        ? 'border-[#4472C4] bg-blue-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 text-sm">
                      Standard
                    </div>
                    <div className="text-xs text-gray-600">
                      {formatCurrency(STANDARD_DEDUCTIONS[filingStatus])}
                    </div>
                  </button>

                  <button
                    onClick={() => setDeductionType('itemized')}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      deductionType === 'itemized'
                        ? 'border-[#4472C4] bg-blue-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 text-sm">
                      Itemized
                    </div>
                    <div className="text-xs text-gray-600">
                      Custom amount
                    </div>
                  </button>
                </div>

                {deductionType === 'itemized' && (
                  <div className="space-y-3">
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500 text-sm">
                        $
                      </span>
                      <input
                        type="number"
                        value={itemizedDeductions}
                        onChange={(e) =>
                          setItemizedDeductions(e.target.value)
                        }
                        className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                        placeholder="0"
                        min="0"
                      />
                    </div>

                    <label className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={optimizeDeduction}
                        onChange={(e) =>
                          setOptimizeDeduction(e.target.checked)
                        }
                        className="mt-1 h-4 w-4 text-[#4472C4] rounded border-gray-300 focus:ring-[#4472C4]"
                      />
                      <span className="text-xs text-gray-700">
                        Use the larger deduction automatically if the standard
                        deduction is better.
                      </span>
                    </label>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pre-Tax Deductions
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    value={preTaxDeductions}
                    onChange={(e) => setPreTaxDeductions(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  401(k), HSA, FSA, pre-tax insurance, etc.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Extra Pre-Tax Contribution Scenario
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    value={extraPretaxContribution}
                    onChange={(e) =>
                      setExtraPretaxContribution(e.target.value)
                    }
                    className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  See estimated tax savings from saving more pre-tax.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Paycheck Frequency
                </label>
                <select
                  value={payFrequency}
                  onChange={(e) =>
                    setPayFrequency(e.target.value as PayFrequency)
                  }
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent bg-white"
                >
                  <option value="weekly">Weekly - 52 checks/year</option>
                  <option value="biweekly">Bi-weekly - 26 checks/year</option>
                  <option value="semimonthly">
                    Semi-monthly - 24 checks/year
                  </option>
                  <option value="monthly">Monthly - 12 checks/year</option>
                </select>
              </div>
            </div>
          </section>

          {/* Credits */}
          <section>
            <h4 className="font-bold text-gray-900 mb-4">Tax Credits</h4>

            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Qualifying Child Dependents
                </label>
                <input
                  type="number"
                  value={childDependents}
                  onChange={(e) => setChildDependents(e.target.value)}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                  placeholder="0"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Estimated {formatCurrency(CHILD_TAX_CREDIT)} each.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Other Dependents
                </label>
                <input
                  type="number"
                  value={otherDependents}
                  onChange={(e) => setOtherDependents(e.target.value)}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                  placeholder="0"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Estimated {formatCurrency(OTHER_DEPENDENT_CREDIT)} each.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Other Tax Credits
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    value={otherCredits}
                    onChange={(e) => setOtherCredits(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Education, energy, foreign tax, or other estimated credits.
                </p>
              </div>
            </div>
          </section>

          {/* State + Withholding */}
          <section>
            <h4 className="font-bold text-gray-900 mb-4">
              State & Withholding
            </h4>

            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State of Residence
                </label>

                <select
                  value={stateCode}
                  onChange={(e) => setStateCode(e.target.value as StateCode)}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent bg-white"
                >
                  {Object.entries(STATE_TAXES)
                    .sort(([, a], [, b]) => a.name.localeCompare(b.name))
                    .map(([code, info]) => (
                      <option key={code} value={code}>
                        {info.name}{' '}
                        {info.rate === 0
                          ? '(No state tax)'
                          : `(${(info.rate * 100).toFixed(2)}% estimated)`}
                      </option>
                    ))}
                </select>

                <p className="text-xs text-gray-500 mt-1">
                  Uses an estimated state income tax rate for quick planning.
                </p>

                <div className="mt-3 bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                  <p className="text-xs text-gray-700 leading-relaxed">
                    <strong>What does this percentage mean?</strong>{' '}
                    The state percentage is a simplified estimated state income
                    tax rate. For example, New York at 6.85% means the
                    calculator estimates state tax as taxable income × 6.85%.
                    Actual state taxes may use brackets, deductions,
                    exemptions, local taxes, credits, and special rules.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Federal Income Tax Withheld
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    value={federalWithholding}
                    onChange={(e) => setFederalWithholding(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                    placeholder="9000"
                    min="0"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Total federal income tax withheld.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State Income Tax Withheld
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    value={stateWithholding}
                    onChange={(e) => setStateWithholding(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                    placeholder="3000"
                    min="0"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Total state income tax withheld.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={calculate}
            className="w-full bg-[#4472C4] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#1F4E78] transition-colors shadow-md hover:shadow-lg text-base"
          >
            Calculate My Taxes
          </button>

          {hasCalculated && (
            <button
              onClick={reset}
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
          {/* Main Results */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Annual Take-Home
              </div>
              <div className="text-2xl sm:text-3xl font-bold break-words">
                {formatCurrency(result.takeHome)}
              </div>
              <div className="text-xs opacity-80 mt-2">
                After taxes and pre-tax deductions
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Per Paycheck
              </div>
              <div className="text-2xl sm:text-3xl font-bold break-words">
                {formatCurrency(result.selectedPaycheckTakeHome)}
              </div>
              <div className="text-xs opacity-80 mt-2">
                {payFrequencyLabel(payFrequency)}
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Total Tax
              </div>
              <div className="text-2xl sm:text-3xl font-bold break-words">
                {formatCurrency(result.totalTax)}
              </div>
              <div className="text-xs opacity-80 mt-2">
                Federal + state + payroll
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Effective Rate
              </div>
              <div className="text-2xl sm:text-3xl font-bold">
                {formatPercent(result.effectiveTotal)}
              </div>
              <div className="text-xs opacity-80 mt-2">
                Total tax ÷ gross income
              </div>
            </div>
          </div>

          {/* Refund / Owed */}
          <div
            className={`rounded-xl p-6 shadow-lg ${
              result.refundOrOwed >= 0
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">
                {result.refundOrOwed >= 0 ? '✅' : '⚠️'}
              </span>
              <div>
                <h4
                  className={`text-xl font-bold mb-2 ${
                    result.refundOrOwed >= 0
                      ? 'text-green-800'
                      : 'text-red-800'
                  }`}
                >
                  {result.refundOrOwed >= 0
                    ? 'Estimated Refund'
                    : 'Estimated Amount Owed'}
                </h4>

                <div
                  className={`text-3xl font-bold mb-2 ${
                    result.refundOrOwed >= 0
                      ? 'text-green-700'
                      : 'text-red-700'
                  }`}
                >
                  {formatCurrency(Math.abs(result.refundOrOwed))}
                </div>

                <p className="text-sm text-gray-700 leading-relaxed">
                  Based on {formatCurrency(result.totalWithholding)} of entered
                  federal/state withholding and{' '}
                  {formatCurrency(result.incomeTaxDue)} of estimated federal
                  and state income tax due. Payroll taxes are usually withheld
                  separately during payroll.
                </p>
              </div>
            </div>
          </div>

          {/* Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: 'Federal Tax',
                value: formatCurrency(result.federalTax),
                sub: `${formatPercent(result.effectiveFederal)} effective`,
                color: 'text-red-600',
              },
              {
                label: 'State Tax',
                value: formatCurrency(result.stateTax),
                sub: `${STATE_TAXES[stateCode].name} · ${formatPercent(
                  result.stateTaxRate
                )} estimated`,
                color: 'text-orange-600',
              },
              {
                label: 'FICA Tax',
                value: formatCurrency(result.ficaTotal),
                sub: 'Social Security + Medicare',
                color: 'text-yellow-600',
              },
              {
                label: 'Self-Employment Tax',
                value: formatCurrency(result.selfEmployment.tax),
                sub: 'If self-employment income entered',
                color: 'text-pink-600',
              },
              {
                label: 'Taxable Income',
                value: formatCurrency(result.taxableIncome),
                sub: `After ${formatCurrency(result.deduction)} deduction`,
                color: 'text-[#1F4E78]',
              },
              {
                label: 'Marginal Rate',
                value: formatPercent(result.marginalRate),
                sub: 'Highest federal bracket reached',
                color: 'text-purple-600',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"
              >
                <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                <div className={`text-2xl font-bold ${item.color}`}>
                  {item.value}
                </div>
                <div className="text-xs text-gray-500 mt-2">{item.sub}</div>
              </div>
            ))}
          </div>

          {/* State Tax Explanation */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-bold text-[#1F4E78] mb-4">
              🏛️ About the State Tax Percentage
            </h4>

            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                The <strong>State of Residence</strong> percentage is a
                simplified estimated state income tax rate used to calculate
                your approximate state income tax.
              </p>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="mb-2">
                  <strong>Formula used by this calculator:</strong>
                </p>
                <p className="font-mono text-xs sm:text-sm text-gray-800 bg-white border border-gray-200 rounded p-3">
                  Estimated State Tax = Taxable Income × Estimated State Rate
                </p>
              </div>

              <p>
                For your selected state,{' '}
                <strong>{STATE_TAXES[stateCode].name}</strong>, the calculator
                uses an estimated state rate of{' '}
                <strong>{formatPercent(result.stateTaxRate)}</strong>.
              </p>

              <p>
                This is only a planning estimate. Actual state tax may be higher
                or lower because many states use progressive brackets,
                deductions, exemptions, credits, local/city taxes, and other tax
                rules.
              </p>
            </div>
          </div>

          {/* Pre-tax Scenario */}
          {parseFloat(extraPretaxContribution) > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200 shadow-sm">
              <h4 className="text-lg font-bold text-[#1F4E78] mb-4">
                💡 Pre-Tax Contribution Scenario
              </h4>

              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  If you contribute an extra{' '}
                  <strong>
                    {formatCurrency(parseFloat(extraPretaxContribution))}
                  </strong>{' '}
                  to a pre-tax account, your estimated tax savings may be about{' '}
                  <strong className="text-green-700">
                    {formatCurrency(result.taxSavingsFromExtraPretax)}
                  </strong>
                  .
                </li>
                <li>
                  The estimated after-tax cost of that contribution is about{' '}
                  <strong>{formatCurrency(result.extraPretaxNetCost)}</strong>.
                </li>
              </ul>
            </div>
          )}

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Donut */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h4 className="text-lg font-bold text-[#1F4E78] mb-4">
                Tax Breakdown
              </h4>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <DonutChart
                  segments={[
                    {
                      label: 'Take-Home',
                      value: result.takeHome,
                      color: '#22c55e',
                    },
                    {
                      label: 'Federal Tax',
                      value: result.federalTax,
                      color: '#ef4444',
                    },
                    {
                      label: 'State Tax',
                      value: result.stateTax,
                      color: '#f97316',
                    },
                    {
                      label: 'FICA',
                      value: result.ficaTotal,
                      color: '#eab308',
                    },
                    {
                      label: 'Self-Employment',
                      value: result.selfEmployment.tax,
                      color: '#ec4899',
                    },
                  ]}
                  total={result.totalGross}
                />

                <div className="space-y-3 w-full">
                  {[
                    {
                      label: 'Take-Home',
                      value: result.takeHome,
                      color: '#22c55e',
                    },
                    {
                      label: 'Federal Tax',
                      value: result.federalTax,
                      color: '#ef4444',
                    },
                    {
                      label: 'State Tax',
                      value: result.stateTax,
                      color: '#f97316',
                    },
                    {
                      label: 'FICA',
                      value: result.ficaTotal,
                      color: '#eab308',
                    },
                    {
                      label: 'Self-Employment',
                      value: result.selfEmployment.tax,
                      color: '#ec4899',
                    },
                  ]
                    .filter((item) => item.value > 0)
                    .map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded"
                            style={{ background: item.color }}
                          />
                          <span className="text-gray-700">{item.label}</span>
                        </div>
                        <strong>{formatCurrency(item.value)}</strong>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Bars */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h4 className="text-lg font-bold text-[#1F4E78] mb-4">
                Where Your Money Goes
              </h4>

              <div className="space-y-4">
                {[
                  {
                    label: 'Take-Home Pay',
                    value: result.takeHome,
                    color: 'bg-green-500',
                  },
                  {
                    label: 'Federal Tax',
                    value: result.federalTax,
                    color: 'bg-red-500',
                  },
                  {
                    label: 'State Tax',
                    value: result.stateTax,
                    color: 'bg-orange-500',
                  },
                  {
                    label: 'FICA',
                    value: result.ficaTotal,
                    color: 'bg-yellow-500',
                  },
                  {
                    label: 'Self-Employment Tax',
                    value: result.selfEmployment.tax,
                    color: 'bg-pink-500',
                  },
                ]
                  .filter((item) => item.value > 0)
                  .map((item) => {
                    const width =
                      result.totalGross > 0
                        ? Math.min(100, (item.value / result.totalGross) * 100)
                        : 0;

                    return (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{item.label}</span>
                          <span className="font-semibold">
                            {formatCurrency(item.value)} ·{' '}
                            {formatPercent(item.value / result.totalGross)}
                          </span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full`}
                            style={{ width: `${width}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-bold text-[#1F4E78] mb-4">
              💡 What This Means
            </h4>

            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>
                  Your estimated taxable income is{' '}
                  <strong>{formatCurrency(result.taxableIncome)}</strong> after
                  your <strong>{result.deductionLabel.toLowerCase()}</strong>{' '}
                  deduction of{' '}
                  <strong>{formatCurrency(result.deduction)}</strong>.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>
                  Your federal marginal tax bracket is{' '}
                  <strong>{formatPercent(result.marginalRate)}</strong>. This
                  does not mean every dollar is taxed at that rate.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>
                  Your total estimated effective tax rate is{' '}
                  <strong>{formatPercent(result.effectiveTotal)}</strong>.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>
                  Your estimated take-home pay is{' '}
                  <strong>{formatCurrency(result.takeHome)}</strong> per year,
                  or about{' '}
                  <strong>
                    {formatCurrency(result.selectedPaycheckTakeHome)}
                  </strong>{' '}
                  per {payFrequencyLabel(payFrequency)}.
                </span>
              </li>
            </ul>
          </div>

          {/* Federal Brackets */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-base sm:text-lg font-bold text-[#1F4E78]">
                Federal Tax Brackets Applied
              </h4>

              <button
                onClick={() => setShowBracketBreakdown(!showBracketBreakdown)}
                className="text-[#4472C4] font-medium hover:underline text-sm"
              >
                {showBracketBreakdown ? '▲ Hide' : '▼ Show'}
              </button>
            </div>

            {showBracketBreakdown && (
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                  <table className="min-w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">
                          Rate
                        </th>
                        <th className="text-right py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">
                          Income Range
                        </th>
                        <th className="text-right py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">
                          Amount Taxed
                        </th>
                        <th className="text-right py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-700">
                          Tax
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {result.breakdown.map((bracket, index) => (
                        <tr
                          key={index}
                          className={`border-b border-gray-100 ${
                            bracket.rate === result.marginalRate
                              ? 'bg-blue-50'
                              : ''
                          }`}
                        >
                          <td className="py-2 sm:py-3 px-1 sm:px-2 font-medium text-gray-900 whitespace-nowrap">
                            {formatPercent(bracket.rate)}
                            {bracket.rate === result.marginalRate && (
                              <span className="ml-1 text-[#4472C4] text-xs">
                                marginal
                              </span>
                            )}
                          </td>

                          <td className="py-2 sm:py-3 px-1 sm:px-2 text-right text-gray-700 whitespace-nowrap">
                            {formatCurrency(bracket.min)} –{' '}
                            {bracket.max === Infinity
                              ? '∞'
                              : formatCurrency(bracket.max)}
                          </td>

                          <td className="py-2 sm:py-3 px-1 sm:px-2 text-right text-gray-700 whitespace-nowrap">
                            {formatCurrency(bracket.taxed)}
                          </td>

                          <td className="py-2 sm:py-3 px-1 sm:px-2 text-right font-semibold text-red-600 whitespace-nowrap">
                            {formatCurrency(bracket.amount)}
                          </td>
                        </tr>
                      ))}

                      <tr className="border-b border-gray-100">
                        <td
                          colSpan={3}
                          className="py-2 sm:py-3 px-1 sm:px-2 text-right font-semibold text-gray-700"
                        >
                          Federal Tax Before Credits
                        </td>
                        <td className="py-2 sm:py-3 px-1 sm:px-2 text-right font-semibold text-red-600">
                          {formatCurrency(result.federalTaxBeforeCredits)}
                        </td>
                      </tr>

                      <tr className="border-b border-gray-100">
                        <td
                          colSpan={3}
                          className="py-2 sm:py-3 px-1 sm:px-2 text-right font-semibold text-gray-700"
                        >
                          Tax Credits
                        </td>
                        <td className="py-2 sm:py-3 px-1 sm:px-2 text-right font-semibold text-green-600">
                          -{formatCurrency(result.totalCredits)}
                        </td>
                      </tr>

                      <tr>
                        <td
                          colSpan={3}
                          className="py-2 sm:py-3 px-1 sm:px-2 text-right font-bold text-gray-900"
                        >
                          Total Federal Tax
                        </td>
                        <td className="py-2 sm:py-3 px-1 sm:px-2 text-right font-bold text-[#1F4E78]">
                          {formatCurrency(result.federalTax)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-500 mt-4">
  Federal brackets use 2025 ordinary income tax brackets for estimation.
  Capital gains, AMT, phaseouts, Net Investment Income Tax, and many special
  tax rules are not included.
</p>



          </div>

          {/* YMYL Disclaimer */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 sm:p-6 rounded">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                  Important Tax Disclaimer
                </h4>

                <div className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
                  <p>
                    This calculator is provided for{' '}
                    <strong>
                      general educational and informational purposes only
                    </strong>
                    . It is not tax advice, legal advice, financial advice,
                    accounting advice, or a substitute for professional guidance.
                  </p>

                  <p>
                    The results are estimates based on simplified assumptions,
                    including 2025 federal tax brackets and approximate state
                    tax rates. The calculator may not include all deductions,
                    credits, phaseouts, exemptions, local taxes, capital gains
                    rules, Alternative Minimum Tax, Net Investment Income Tax,
                    self-employment deductions, filing limitations, or
                    state-specific tax rules.
                  </p>

                  <p>
                    Tax laws change frequently and individual situations vary.
                    You should consult a qualified tax professional, CPA,
                    enrolled agent, attorney, or official IRS/state tax
                    resources before making tax decisions or filing a tax
                    return.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Initial State */}
      {!hasCalculated && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 sm:p-6 rounded">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🧾</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Estimate your income tax and take-home pay
              </h4>
              <p className="text-xs sm:text-sm text-gray-700">
                Enter your income, deductions, credits, state, and withholding.
                Then click &quot;Calculate My Taxes&quot; to see your federal
                tax, state tax, FICA, refund or amount owed, and take-home pay.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

function DonutChart({
  segments,
  total,
}: {
  segments: DonutSegment[];
  total: number;
}) {
  const size = 170;
  const radius = 58;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;

  const paths = segments
    .filter((segment) => segment.value > 0 && total > 0)
    .map((segment) => {
      const fraction = segment.value / total;
      const offset = circumference * (1 - cumulative);
      cumulative += fraction;

      return {
        ...segment,
        dash: circumference * fraction,
        offset,
      };
    });

  const kept =
    total > 0
      ? ((segments.find((segment) => segment.label === 'Take-Home')?.value ||
          0) /
          total) *
        100
      : 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="22"
      />

      {paths.map((path, index) => (
        <circle
          key={index}
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={path.color}
          strokeWidth="20"
          strokeDasharray={`${path.dash} ${circumference - path.dash}`}
          strokeDashoffset={path.offset}
          strokeLinecap="butt"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
            transition: 'stroke-dasharray 0.8s ease',
          }}
        />
      ))}

      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fill="#1F4E78"
        fontSize="12"
        fontWeight="700"
      >
        Kept
      </text>

      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        fill="#4472C4"
        fontSize="13"
        fontWeight="700"
      >
        {kept.toFixed(0)}%
      </text>
    </svg>
  );
}