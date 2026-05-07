'use client';

import { useState } from 'react';

interface NetWorthResult {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  previousNetWorth: number;
  netWorthChange: number;
  netWorthChangePercent: number;
  assetBreakdown: BreakdownItem[];
  liabilityBreakdown: BreakdownItem[];
  debtToAssetRatio: number;
  equityRatio: number;
  status: 'Negative' | 'Starting' | 'Building' | 'Strong';
}

interface BreakdownItem {
  label: string;
  value: number;
  percent: number;
}

export default function NetWorthCalculator() {
  // Assets
  const [checking, setChecking] = useState('5000');
  const [savings, setSavings] = useState('15000');
  const [emergencyFund, setEmergencyFund] = useState('10000');
  const [retirement401k, setRetirement401k] = useState('85000');
  const [ira, setIra] = useState('25000');
  const [brokerage, setBrokerage] = useState('20000');
  const [homeValue, setHomeValue] = useState('350000');
  const [vehicleValue, setVehicleValue] = useState('18000');
  const [businessValue, setBusinessValue] = useState('0');
  const [otherAssets, setOtherAssets] = useState('5000');

  // Liabilities
  const [creditCards, setCreditCards] = useState('4000');
  const [studentLoans, setStudentLoans] = useState('25000');
  const [autoLoans, setAutoLoans] = useState('12000');
  const [mortgage, setMortgage] = useState('275000');
  const [personalLoans, setPersonalLoans] = useState('0');
  const [medicalDebt, setMedicalDebt] = useState('0');
  const [otherDebt, setOtherDebt] = useState('0');

  // Tracking
  const [previousNetWorth, setPreviousNetWorth] = useState('125000');

  const [result, setResult] = useState<NetWorthResult | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const parseMoney = (value: string) => parseFloat(value) || 0;

  const calculateNetWorth = () => {
    const assets = [
      { label: 'Checking', value: parseMoney(checking) },
      { label: 'Savings', value: parseMoney(savings) },
      { label: 'Emergency Fund', value: parseMoney(emergencyFund) },
      { label: '401(k) / Workplace Retirement', value: parseMoney(retirement401k) },
      { label: 'IRA / Roth IRA', value: parseMoney(ira) },
      { label: 'Brokerage Investments', value: parseMoney(brokerage) },
      { label: 'Home Value', value: parseMoney(homeValue) },
      { label: 'Vehicle Value', value: parseMoney(vehicleValue) },
      { label: 'Business Value', value: parseMoney(businessValue) },
      { label: 'Other Assets', value: parseMoney(otherAssets) },
    ];

    const liabilities = [
      { label: 'Credit Cards', value: parseMoney(creditCards) },
      { label: 'Student Loans', value: parseMoney(studentLoans) },
      { label: 'Auto Loans', value: parseMoney(autoLoans) },
      { label: 'Mortgage', value: parseMoney(mortgage) },
      { label: 'Personal Loans', value: parseMoney(personalLoans) },
      { label: 'Medical Debt', value: parseMoney(medicalDebt) },
      { label: 'Other Debt', value: parseMoney(otherDebt) },
    ];

    const totalAssets = assets.reduce((sum, item) => sum + item.value, 0);
    const totalLiabilities = liabilities.reduce((sum, item) => sum + item.value, 0);
    const netWorth = totalAssets - totalLiabilities;
    const previous = parseMoney(previousNetWorth);

    if (totalAssets < 0 || totalLiabilities < 0 || previous < 0) {
      alert('Please enter valid positive amounts.');
      return;
    }

    const netWorthChange = netWorth - previous;
    const netWorthChangePercent =
      previous !== 0 ? (netWorthChange / Math.abs(previous)) * 100 : 0;

    const assetBreakdown = assets
      .filter((item) => item.value > 0)
      .map((item) => ({
        ...item,
        percent: totalAssets > 0 ? (item.value / totalAssets) * 100 : 0,
      }))
      .sort((a, b) => b.value - a.value);

    const liabilityBreakdown = liabilities
      .filter((item) => item.value > 0)
      .map((item) => ({
        ...item,
        percent: totalLiabilities > 0 ? (item.value / totalLiabilities) * 100 : 0,
      }))
      .sort((a, b) => b.value - a.value);

    const debtToAssetRatio =
      totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;

    const equityRatio = totalAssets > 0 ? (netWorth / totalAssets) * 100 : 0;

    let status: NetWorthResult['status'] = 'Starting';

    if (netWorth < 0) status = 'Negative';
    else if (netWorth < 50000) status = 'Starting';
    else if (netWorth < 250000) status = 'Building';
    else status = 'Strong';

    setResult({
      totalAssets: Math.round(totalAssets * 100) / 100,
      totalLiabilities: Math.round(totalLiabilities * 100) / 100,
      netWorth: Math.round(netWorth * 100) / 100,
      previousNetWorth: Math.round(previous * 100) / 100,
      netWorthChange: Math.round(netWorthChange * 100) / 100,
      netWorthChangePercent: Math.round(netWorthChangePercent * 100) / 100,
      assetBreakdown,
      liabilityBreakdown,
      debtToAssetRatio: Math.round(debtToAssetRatio * 100) / 100,
      equityRatio: Math.round(equityRatio * 100) / 100,
      status,
    });

    setHasCalculated(true);
    setShowBreakdown(false);
  };

  const handleReset = () => {
    setChecking('5000');
    setSavings('15000');
    setEmergencyFund('10000');
    setRetirement401k('85000');
    setIra('25000');
    setBrokerage('20000');
    setHomeValue('350000');
    setVehicleValue('18000');
    setBusinessValue('0');
    setOtherAssets('5000');

    setCreditCards('4000');
    setStudentLoans('25000');
    setAutoLoans('12000');
    setMortgage('275000');
    setPersonalLoans('0');
    setMedicalDebt('0');
    setOtherDebt('0');

    setPreviousNetWorth('125000');
    setResult(null);
    setHasCalculated(false);
    setShowBreakdown(false);
  };

  const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(Number.isFinite(amount) ? amount : 0));

    return amount < 0 ? `-${formatted}` : formatted;
  };

  const formatPercent = (amount: number) => {
    return `${amount.toFixed(1)}%`;
  };

  const moneyInputClass =
    'w-full pl-8 pr-4 py-3 text-base text-gray-900 bg-white placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent';

  const renderMoneyInput = (
    label: string,
    value: string,
    setter: (value: string) => void,
    help: string
  ) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-500 text-sm">$</span>
        <input
          type="number"
          value={value}
          onChange={(e) => setter(e.target.value)}
          className={moneyInputClass}
          placeholder="0"
          min="0"
          step="100"
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">{help}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-[#1F4E78] mb-4 sm:mb-6">
          Enter Your Assets and Liabilities
        </h3>

        <div className="space-y-8">
          {/* Assets */}
          <section>
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>💎</span> Assets
            </h4>

            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
              {renderMoneyInput(
                'Checking Account',
                checking,
                setChecking,
                'Cash available in checking'
              )}

              {renderMoneyInput(
                'Savings Account',
                savings,
                setSavings,
                'General savings outside emergency fund'
              )}

              {renderMoneyInput(
                'Emergency Fund',
                emergencyFund,
                setEmergencyFund,
                'Cash reserved for emergencies'
              )}

              {renderMoneyInput(
                '401(k) / Workplace Retirement',
                retirement401k,
                setRetirement401k,
                'Current retirement account balance'
              )}

              {renderMoneyInput(
                'IRA / Roth IRA',
                ira,
                setIra,
                'Traditional IRA, Roth IRA, SEP IRA, etc.'
              )}

              {renderMoneyInput(
                'Brokerage Investments',
                brokerage,
                setBrokerage,
                'Taxable investments, stocks, ETFs, funds'
              )}

              {renderMoneyInput(
                'Home Value',
                homeValue,
                setHomeValue,
                'Estimated current market value'
              )}

              {renderMoneyInput(
                'Vehicle Value',
                vehicleValue,
                setVehicleValue,
                'Estimated resale value of vehicles'
              )}

              {renderMoneyInput(
                'Business Value',
                businessValue,
                setBusinessValue,
                'Estimated business equity or ownership value'
              )}

              {renderMoneyInput(
                'Other Assets',
                otherAssets,
                setOtherAssets,
                'Valuables, crypto, collectibles, other property'
              )}
            </div>
          </section>

          {/* Liabilities */}
          <section>
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📉</span> Liabilities
            </h4>

            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
              {renderMoneyInput(
                'Credit Card Debt',
                creditCards,
                setCreditCards,
                'Total balances owed on credit cards'
              )}

              {renderMoneyInput(
                'Student Loans',
                studentLoans,
                setStudentLoans,
                'Federal and private student loans'
              )}

              {renderMoneyInput(
                'Auto Loans',
                autoLoans,
                setAutoLoans,
                'Remaining balance on vehicle loans'
              )}

              {renderMoneyInput(
                'Mortgage',
                mortgage,
                setMortgage,
                'Remaining mortgage balance'
              )}

              {renderMoneyInput(
                'Personal Loans',
                personalLoans,
                setPersonalLoans,
                'Personal loans or installment loans'
              )}

              {renderMoneyInput(
                'Medical Debt',
                medicalDebt,
                setMedicalDebt,
                'Medical bills or payment plans'
              )}

              {renderMoneyInput(
                'Other Debt',
                otherDebt,
                setOtherDebt,
                'Any other money owed'
              )}
            </div>
          </section>

          {/* Tracking */}
          <section>
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📊</span> Progress Tracking
            </h4>

            <div className="max-w-md">
              {renderMoneyInput(
                'Previous Net Worth',
                previousNetWorth,
                setPreviousNetWorth,
                'Optional: enter last month, last quarter, or last year net worth'
              )}
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={calculateNetWorth}
            className="w-full bg-[#4472C4] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#1F4E78] transition-colors shadow-md hover:shadow-lg text-base"
          >
            Calculate Net Worth
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
            <div
              className={`rounded-xl p-4 sm:p-6 text-white shadow-lg ${
                result.netWorth >= 0
                  ? 'bg-gradient-to-br from-green-500 to-green-600'
                  : 'bg-gradient-to-br from-red-500 to-red-600'
              }`}
            >
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Net Worth
              </div>
              <div className="text-2xl sm:text-3xl font-bold break-words">
                {formatCurrency(result.netWorth)}
              </div>
              <div className="text-xs opacity-80 mt-2">
                Assets minus liabilities
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Total Assets
              </div>
              <div className="text-2xl sm:text-3xl font-bold break-words">
                {formatCurrency(result.totalAssets)}
              </div>
              <div className="text-xs opacity-80 mt-2">
                Everything you own
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Total Liabilities
              </div>
              <div className="text-2xl sm:text-3xl font-bold break-words">
                {formatCurrency(result.totalLiabilities)}
              </div>
              <div className="text-xs opacity-80 mt-2">
                Everything you owe
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
              <div className="text-xs sm:text-sm opacity-90 mb-1">
                Financial Stage
              </div>
              <div className="text-2xl sm:text-3xl font-bold">
                {result.status}
              </div>
              <div className="text-xs opacity-80 mt-2">
                Based on current net worth
              </div>
            </div>
          </div>

          {/* Change Card */}
          <div
            className={`rounded-xl p-6 border shadow-sm ${
              result.netWorthChange >= 0
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">
                {result.netWorthChange >= 0 ? '📈' : '📉'}
              </span>
              <div>
                <h4
                  className={`text-lg font-bold mb-2 ${
                    result.netWorthChange >= 0
                      ? 'text-green-800'
                      : 'text-red-800'
                  }`}
                >
                  Net Worth Change
                </h4>

                <p className="text-sm text-gray-700 leading-relaxed">
                  Compared with your previous net worth of{' '}
                  <strong>{formatCurrency(result.previousNetWorth)}</strong>,
                  your net worth has{' '}
                  {result.netWorthChange >= 0 ? 'increased' : 'decreased'} by{' '}
                  <strong>
                    {formatCurrency(Math.abs(result.netWorthChange))}
                  </strong>{' '}
                  ({formatPercent(Math.abs(result.netWorthChangePercent))}).
                </p>
              </div>
            </div>
          </div>

          {/* Ratios */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-bold text-[#1F4E78] mb-4">
              📊 Financial Snapshot
            </h4>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="text-sm text-gray-600 mb-1">
                  Debt-to-Asset Ratio
                </div>
                <div className="text-2xl font-bold text-[#1F4E78]">
                  {formatPercent(result.debtToAssetRatio)}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Lower generally means less leverage
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <div className="text-sm text-gray-600 mb-1">
                  Equity Ratio
                </div>
                <div className="text-2xl font-bold text-green-700">
                  {formatPercent(result.equityRatio)}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Portion of assets you truly own
                </p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                <div className="text-sm text-gray-600 mb-1">
                  Net Worth Formula
                </div>
                <div className="text-lg font-bold text-purple-700">
                  Assets − Debt
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {formatCurrency(result.totalAssets)} −{' '}
                  {formatCurrency(result.totalLiabilities)}
                </p>
              </div>
            </div>
          </div>

          {/* Breakdown Toggle */}
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-base sm:text-lg font-bold text-[#1F4E78]">
                Asset & Liability Breakdown
              </h4>

              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="text-[#4472C4] font-medium hover:underline text-sm"
              >
                {showBreakdown ? '▲ Hide' : '▼ Show'}
              </button>
            </div>

            {showBreakdown && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-bold text-green-700 mb-3">Assets</h5>
                  <div className="space-y-3">
                    {result.assetBreakdown.map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">{item.label}</span>
                          <span className="font-semibold">
                            {formatCurrency(item.value)} ·{' '}
                            {formatPercent(item.percent)}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${Math.min(100, item.percent)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-red-700 mb-3">Liabilities</h5>
                  <div className="space-y-3">
                    {result.liabilityBreakdown.length > 0 ? (
                      result.liabilityBreakdown.map((item) => (
                        <div key={item.label}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-700">{item.label}</span>
                            <span className="font-semibold">
                              {formatCurrency(item.value)} ·{' '}
                              {formatPercent(item.percent)}
                            </span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-500 rounded-full"
                              style={{
                                width: `${Math.min(100, item.percent)}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-600">
                        No liabilities entered.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
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
                  Your current net worth is{' '}
                  <strong>{formatCurrency(result.netWorth)}</strong>.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>
                  You own approximately{' '}
                  <strong>{formatCurrency(result.totalAssets)}</strong> in
                  assets and owe{' '}
                  <strong>{formatCurrency(result.totalLiabilities)}</strong> in
                  liabilities.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span
                  className={
                    result.netWorthChange >= 0
                      ? 'text-green-500 mt-0.5'
                      : 'text-red-500 mt-0.5'
                  }
                >
                  {result.netWorthChange >= 0 ? '✓' : '⚠'}
                </span>
                <span>
                  Your net worth has{' '}
                  {result.netWorthChange >= 0 ? 'grown' : 'declined'} by{' '}
                  <strong>
                    {formatCurrency(Math.abs(result.netWorthChange))}
                  </strong>{' '}
                  compared with your previous entry.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>
                  Tracking net worth monthly or quarterly helps you measure
                  long-term financial progress beyond income alone.
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
                  financial advice. Asset values, home values, vehicle values,
                  business values, investment balances, and debts can change
                  over time. Net worth is only one measure of financial health.
                  Consider speaking with a qualified financial professional for
                  personalized guidance.
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
            <span className="text-2xl">💎</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Track your financial progress
              </h4>
              <p className="text-xs sm:text-sm text-gray-700">
                Enter what you own and what you owe. Your net worth is your
                total assets minus your total liabilities.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}