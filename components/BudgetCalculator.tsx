'use client';

import { useState } from 'react';

interface BudgetResult {
  totalIncome: number;
  totalExpenses: number;
  surplus: number;
  needsTotal: number;
  wantsTotal: number;
  savingsTotal: number;
  rule50_30_20: {
    needs: number;
    wants: number;
    savings: number;
  };
  categoryBreakdown: ExpenseCategory[];
  percentages: {
    needs: number;
    wants: number;
    savings: number;
  };
  status: 'surplus' | 'balanced' | 'deficit';
  recommendations: string[];
}

interface ExpenseCategory {
  name: string;
  amount: number;
  type: 'need' | 'want' | 'saving';
}

export default function BudgetCalculator() {
  // Income
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000');
  const [additionalIncome, setAdditionalIncome] = useState<string>('0');

  // Needs (50%)
  const [housing, setHousing] = useState<string>('1500');
  const [utilities, setUtilities] = useState<string>('200');
  const [groceries, setGroceries] = useState<string>('400');
  const [transportation, setTransportation] = useState<string>('300');
  const [insurance, setInsurance] = useState<string>('250');
  const [minimumDebt, setMinimumDebt] = useState<string>('200');
  const [healthcare, setHealthcare] = useState<string>('150');

  // Wants (30%)
  const [dining, setDining] = useState<string>('200');
  const [entertainment, setEntertainment] = useState<string>('150');
  const [shopping, setShopping] = useState<string>('200');
  const [subscriptions, setSubscriptions] = useState<string>('100');
  const [hobbies, setHobbies] = useState<string>('100');

  // Savings (20%)
  const [retirement, setRetirement] = useState<string>('500');
  const [emergencyFund, setEmergencyFund] = useState<string>('200');
  const [debtPayoff, setDebtPayoff] = useState<string>('100');
  const [investments, setInvestments] = useState<string>('200');

  const [result, setResult] = useState<BudgetResult | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateBudget = () => {
    // Calculate total income
    const income = parseFloat(monthlyIncome) || 0;
    const additional = parseFloat(additionalIncome) || 0;
    const totalIncome = income + additional;

    if (totalIncome <= 0) {
      alert('Please enter a valid monthly income');
      return;
    }

    // Calculate 50/30/20 ideal amounts
    const ideal50 = totalIncome * 0.5;
    const ideal30 = totalIncome * 0.3;
    const ideal20 = totalIncome * 0.2;

    // Needs expenses
    const needs: ExpenseCategory[] = [
      { name: 'Housing (Rent/Mortgage)', amount: parseFloat(housing) || 0, type: 'need' },
      { name: 'Utilities', amount: parseFloat(utilities) || 0, type: 'need' },
      { name: 'Groceries', amount: parseFloat(groceries) || 0, type: 'need' },
      { name: 'Transportation', amount: parseFloat(transportation) || 0, type: 'need' },
      { name: 'Insurance', amount: parseFloat(insurance) || 0, type: 'need' },
      { name: 'Minimum Debt Payments', amount: parseFloat(minimumDebt) || 0, type: 'need' },
      { name: 'Healthcare', amount: parseFloat(healthcare) || 0, type: 'need' },
    ];
    const needsTotal = needs.reduce((sum, cat) => sum + cat.amount, 0);

    // Wants expenses
    const wants: ExpenseCategory[] = [
      { name: 'Dining Out', amount: parseFloat(dining) || 0, type: 'want' },
      { name: 'Entertainment', amount: parseFloat(entertainment) || 0, type: 'want' },
      { name: 'Shopping', amount: parseFloat(shopping) || 0, type: 'want' },
      { name: 'Subscriptions', amount: parseFloat(subscriptions) || 0, type: 'want' },
      { name: 'Hobbies', amount: parseFloat(hobbies) || 0, type: 'want' },
    ];
    const wantsTotal = wants.reduce((sum, cat) => sum + cat.amount, 0);

    // Savings
    const savings: ExpenseCategory[] = [
      { name: 'Retirement', amount: parseFloat(retirement) || 0, type: 'saving' },
      { name: 'Emergency Fund', amount: parseFloat(emergencyFund) || 0, type: 'saving' },
      { name: 'Extra Debt Payoff', amount: parseFloat(debtPayoff) || 0, type: 'saving' },
      { name: 'Investments', amount: parseFloat(investments) || 0, type: 'saving' },
    ];
    const savingsTotal = savings.reduce((sum, cat) => sum + cat.amount, 0);

    // Total expenses
    const totalExpenses = needsTotal + wantsTotal + savingsTotal;
    const surplus = totalIncome - totalExpenses;

    // Calculate percentages
    const needsPercent = totalIncome > 0 ? (needsTotal / totalIncome) * 100 : 0;
    const wantsPercent = totalIncome > 0 ? (wantsTotal / totalIncome) * 100 : 0;
    const savingsPercent = totalIncome > 0 ? (savingsTotal / totalIncome) * 100 : 0;

    // Determine status
    let status: 'surplus' | 'balanced' | 'deficit';
    if (surplus > 50) status = 'surplus';
    else if (surplus >= -50) status = 'balanced';
    else status = 'deficit';

    // Generate recommendations
    const recommendations: string[] = [];

    if (needsPercent > 55) {
      recommendations.push('Your needs exceed 50% of income. Consider reducing housing costs or finding ways to lower essential expenses.');
    }

    if (wantsPercent > 35) {
      recommendations.push('Your wants exceed 30% of income. Consider cutting back on discretionary spending like dining out and entertainment.');
    }

    if (savingsPercent < 15) {
      recommendations.push('You\'re saving less than 20% of income. Try to increase retirement contributions and emergency fund savings.');
    }

    if (surplus < 0) {
      recommendations.push('You\'re spending more than you earn! Immediately cut expenses or increase income to avoid debt.');
    }

    if (surplus > totalIncome * 0.1) {
      recommendations.push('Great job! You have surplus budget. Consider increasing savings, investments, or extra debt payoff.');
    }

    if (parseFloat(housing) / totalIncome > 0.3) {
      recommendations.push('Housing costs exceed 30% of income. This is a major budget strain. Consider downsizing or finding a roommate.');
    }

    if (savingsTotal === 0) {
      recommendations.push('You have no savings allocated! Start with at least 10% for emergencies and retirement.');
    }

    setResult({
      totalIncome,
      totalExpenses,
      surplus,
      needsTotal,
      wantsTotal,
      savingsTotal,
      rule50_30_20: {
        needs: ideal50,
        wants: ideal30,
        savings: ideal20,
      },
      categoryBreakdown: [...needs, ...wants, ...savings].filter(cat => cat.amount > 0),
      percentages: {
        needs: Math.round(needsPercent * 10) / 10,
        wants: Math.round(wantsPercent * 10) / 10,
        savings: Math.round(savingsPercent * 10) / 10,
      },
      status,
      recommendations,
    });

    setHasCalculated(true);
  };

  const handleReset = () => {
    setMonthlyIncome('5000');
    setAdditionalIncome('0');
    setHousing('1500');
    setUtilities('200');
    setGroceries('400');
    setTransportation('300');
    setInsurance('250');
    setMinimumDebt('200');
    setHealthcare('150');
    setDining('200');
    setEntertainment('150');
    setShopping('200');
    setSubscriptions('100');
    setHobbies('100');
    setRetirement('500');
    setEmergencyFund('200');
    setDebtPayoff('100');
    setInvestments('200');
    setResult(null);
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

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-[#1F4E78] mb-4 sm:mb-6">
          Enter Your Monthly Budget
        </h3>

        <div className="space-y-6">
          {/* Income */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              💰 Income
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Monthly Income (After Tax)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 text-sm">$</span>
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                    placeholder="5000"
                    min="0"
                    step="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Additional Income (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 text-sm">$</span>
                  <input
                    type="number"
                    value={additionalIncome}
                    onChange={(e) => setAdditionalIncome(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
                    placeholder="0"
                    min="0"
                    step="100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Needs (50%) */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              🏠 Needs (Essentials - Target: 50%)
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField label="Housing (Rent/Mortgage)" value={housing} onChange={setHousing} />
              <InputField label="Utilities" value={utilities} onChange={setUtilities} />
              <InputField label="Groceries" value={groceries} onChange={setGroceries} />
              <InputField label="Transportation" value={transportation} onChange={setTransportation} />
              <InputField label="Insurance" value={insurance} onChange={setInsurance} />
              <InputField label="Minimum Debt Payments" value={minimumDebt} onChange={setMinimumDebt} />
              <InputField label="Healthcare" value={healthcare} onChange={setHealthcare} />
            </div>
          </div>

          {/* Wants (30%) */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              🎉 Wants (Discretionary - Target: 30%)
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField label="Dining Out" value={dining} onChange={setDining} />
              <InputField label="Entertainment" value={entertainment} onChange={setEntertainment} />
              <InputField label="Shopping" value={shopping} onChange={setShopping} />
              <InputField label="Subscriptions" value={subscriptions} onChange={setSubscriptions} />
              <InputField label="Hobbies" value={hobbies} onChange={setHobbies} />
            </div>
          </div>

          {/* Savings (20%) */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              💎 Savings & Investments (Target: 20%)
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField label="Retirement" value={retirement} onChange={setRetirement} />
              <InputField label="Emergency Fund" value={emergencyFund} onChange={setEmergencyFund} />
              <InputField label="Extra Debt Payoff" value={debtPayoff} onChange={setDebtPayoff} />
              <InputField label="Investments" value={investments} onChange={setInvestments} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={calculateBudget}
            className="w-full bg-[#4472C4] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#1F4E78] transition-colors shadow-md hover:shadow-lg text-base"
          >
            Calculate My Budget
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
          {/* Budget Status */}
          <div className={`rounded-xl p-6 sm:p-8 text-white shadow-2xl ${
            result.status === 'surplus' 
              ? 'bg-gradient-to-br from-green-500 to-green-600' 
              : result.status === 'balanced'
              ? 'bg-gradient-to-br from-blue-500 to-blue-600'
              : 'bg-gradient-to-br from-orange-500 to-red-600'
          }`}>
            <div className="text-center">
              <div className="text-5xl mb-4">
                {result.status === 'surplus' ? '✅' : result.status === 'balanced' ? '⚖️' : '⚠️'}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                {result.status === 'surplus' ? 'Budget Surplus!' : result.status === 'balanced' ? 'Balanced Budget' : 'Budget Deficit'}
              </h3>
              <p className="text-lg opacity-95 mb-4">
                {result.surplus >= 0 
                  ? `You have ${formatCurrency(result.surplus)} left over each month`
                  : `You're overspending by ${formatCurrency(Math.abs(result.surplus))} each month`
                }
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm sm:text-base">
                <div>
                  <div className="opacity-80">Income</div>
                  <div className="text-2xl font-bold">{formatCurrency(result.totalIncome)}</div>
                </div>
                <div className="text-3xl hidden sm:block">-</div>
                <div>
                  <div className="opacity-80">Expenses</div>
                  <div className="text-2xl font-bold">{formatCurrency(result.totalExpenses)}</div>
                </div>
                <div className="text-3xl hidden sm:block">=</div>
                <div>
                  <div className="opacity-80">{result.surplus >= 0 ? 'Surplus' : 'Deficit'}</div>
                  <div className="text-2xl font-bold">{formatCurrency(result.surplus)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 50/30/20 Rule Comparison */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-bold text-[#1F4E78] mb-6">
              50/30/20 Budget Rule Analysis
            </h4>
            
            <div className="space-y-6">
              {/* Needs */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                  <div>
                    <span className="font-semibold text-gray-900">Needs</span>
                    <span className="text-sm text-gray-600 ml-2">(Target: 50%)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-lg font-bold ${result.percentages.needs <= 55 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.percentages.needs}%
                    </span>
                    <span className="text-sm text-gray-600">
                      {formatCurrency(result.needsTotal)} / {formatCurrency(result.rule50_30_20.needs)}
                    </span>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${result.percentages.needs <= 55 ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(result.percentages.needs, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Wants */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                  <div>
                    <span className="font-semibold text-gray-900">Wants</span>
                    <span className="text-sm text-gray-600 ml-2">(Target: 30%)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-lg font-bold ${result.percentages.wants <= 35 ? 'text-green-600' : 'text-orange-600'}`}>
                      {result.percentages.wants}%
                    </span>
                    <span className="text-sm text-gray-600">
                      {formatCurrency(result.wantsTotal)} / {formatCurrency(result.rule50_30_20.wants)}
                    </span>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${result.percentages.wants <= 35 ? 'bg-green-500' : 'bg-orange-500'}`}
                    style={{ width: `${Math.min(result.percentages.wants, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Savings */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                  <div>
                    <span className="font-semibold text-gray-900">Savings</span>
                    <span className="text-sm text-gray-600 ml-2">(Target: 20%)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-lg font-bold ${result.percentages.savings >= 15 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.percentages.savings}%
                    </span>
                    <span className="text-sm text-gray-600">
                      {formatCurrency(result.savingsTotal)} / {formatCurrency(result.rule50_30_20.savings)}
                    </span>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${result.percentages.savings >= 15 ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(result.percentages.savings, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl p-6 shadow-lg">
              <h4 className="text-lg font-bold mb-4">💡 Budget Recommendations</h4>
              <ul className="space-y-2 text-sm">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Category Breakdown */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-bold text-[#1F4E78] mb-4">
              Detailed Category Breakdown
            </h4>
            
            <div className="space-y-2">
              {result.categoryBreakdown.map((cat, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-700">{cat.name}</span>
                  <span className={`font-semibold ${
                    cat.type === 'need' ? 'text-blue-600' : 
                    cat.type === 'want' ? 'text-orange-600' : 
                    'text-green-600'
                  }`}>
                    {formatCurrency(cat.amount)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t-2 border-gray-300">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">Total Expenses</span>
                <span className="text-xl font-bold text-gray-900">{formatCurrency(result.totalExpenses)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Initial State */}
      {!hasCalculated && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 sm:p-6 rounded">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💵</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Create your monthly budget
              </h4>
              <p className="text-xs sm:text-sm text-gray-700">
                Enter your income and expenses above to see if you're following the 50/30/20 rule 
                and get personalized recommendations to improve your budget.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper component for input fields
interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function InputField({ label, value, onChange }: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-500 text-sm">$</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
          placeholder="0"
          min="0"
          step="10"
        />
      </div>
    </div>
  );
}