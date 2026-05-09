import type { Metadata } from 'next';
import Link from 'next/link';
import BudgetCalculator from '@/components/BudgetCalculator';

export const metadata: Metadata = {
  title: 'Budget Calculator - Free 50/30/20 Monthly Budget Planner (2026)',
  description:
    'Use our free 50/30/20 budget calculator to balance your monthly income. Track needs, wants, and savings with custom case studies, professional budgeting advice, and interactive tools.',
  keywords: [
    'budget calculator',
    '50/30/20 budget',
    'monthly budget planner',
    'budget tracker',
    'personal budget calculator',
    'household budget calculator',
    'how to budget money',
    'zero-based budgeting tool',
  ],
  alternates: {
    canonical:
      'https://zerotowealthpro.com/financial-utilities/budget-calculator',
  },
  openGraph: {
    title: '50/30/20 Budget Calculator | Zero to Wealth Pro',
    description:
      'Balance your monthly income, essential expenses, lifestyle desires, and wealth-building targets with our interactive 50/30/20 budget planner.',
    url: 'https://zerotowealthpro.com/financial-utilities/budget-calculator',
    type: 'website',
  },
};

const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Budget Calculator',
  applicationCategory: 'FinanceApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'Free interactive 50/30/20 budget calculator designed to categorize net household income into needs, wants, and savings.',
};

export default function BudgetCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-[#4472C4]/20 via-[#1F4E78]/5 to-white py-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="max-w-[1000px] mx-auto px-5 mb-6"
        >
          <ol className="flex items-center space-x-2 text-xs text-gray-600">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <span>/</span>
            </li>
            <li>
              <Link href="/financial-utilities" className="hover:underline">
                Utilities
              </Link>
            </li>
            <li>
              <span>/</span>
            </li>
            <li className="font-semibold text-[#1F4E78]">Budget Calculator</li>
          </ol>
        </nav>

        <main className="max-w-[1000px] mx-auto px-5 pb-16">
          {/* Header Hero Area */}
          <header className="py-6 text-center sm:text-left mb-6">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1F4E78] tracking-tight leading-tight mb-3">
              50/30/20 Budget Calculator
            </h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed">
              Take complete control of your cash flow. This calculator
              simplifies monthly budgeting by automatically applying the proven
              50/30/20 rule to your net after-tax income, striking the perfect
              balance between paying bills, enjoying life, and building
              long-term wealth.
            </p>
          </header>

          {/* Calculator Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-xl mb-10 border border-gray-100">
            <BudgetCalculator />
          </div>

          {/* Deep Educational Content (SEO-Optimized, 1,600+ Words) */}
          <article className="bg-white rounded-2xl p-6 sm:p-10 shadow-lg mb-10 border border-gray-100 prose prose-slate max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F4E78] mb-4">
                The Science of Budgeting: Why Most Budgets Fail
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Budgeting is often associated with restriction, sacrifice, and
                endless spreadsheet tracking. Because of this, traditional
                budgeting can feel like a chore, leading to &quot;budget
                fatigue&quot; where individuals completely abandon their
                financial tracking after just a few weeks.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Most personal budgets fail not because of a lack of willpower,
                but because they are too restrictive. If a budget doesn&apos;t
                allow room for spontaneous enjoyment, hobbies, or dining out, it
                becomes unsustainable. This is where proportional
                budgeting—specifically the **50/30/20 Budgeting Rule**—comes in.
                By focusing on percentages rather than rigid category limits,
                you build a flexible framework that aligns your money with your
                actual life.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                What is the 50/30/20 Budgeting Rule?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Popularized by Senator Elizabeth Warren in her book *All Your
                Worth: The Ultimate Lifetime Money Plan*, the 50/30/20 rule is
                designed to divide your after-tax monthly income into three
                simple categories:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100 text-left">
                  <div className="text-3xl mb-3">🏠</div>
                  <h4 className="font-bold text-blue-900 text-lg mb-2">
                    50% - Essential Needs
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    These are your absolute baseline obligations—the bills you
                    must pay to keep your home, health, and livelihood secure.
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1.5 list-disc list-inside">
                    <li>Rent or Mortgage payments</li>
                    <li>Electric, Gas, and Water bills</li>
                    <li>Basic groceries and food staples</li>
                    <li>Minimum required debt payments</li>
                    <li>Health and Auto insurance premiums</li>
                  </ul>
                </div>

                <div className="bg-orange-50/50 rounded-xl p-5 border border-orange-100 text-left">
                  <div className="text-3xl mb-3">🎉</div>
                  <h4 className="font-bold text-orange-900 text-lg mb-2">
                    30% - Lifestyle Wants
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    These represent optional choices that improve your quality
                    of life but are not strictly required for survival.
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1.5 list-disc list-inside">
                    <li>Dining out and craft coffee</li>
                    <li>Concerts, movies, and sports games</li>
                    <li>Streaming services and apps</li>
                    <li>New clothing and personal shopping</li>
                    <li>Vacations and holiday travel</li>
                  </ul>
                </div>

                <div className="bg-green-50/50 rounded-xl p-5 border border-green-100 text-left">
                  <div className="text-3xl mb-3">🛡️</div>
                  <h4 className="font-bold text-green-900 text-lg mb-2">
                    20% - Wealth Savings
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    This is your financial engine. Money allocated here is used
                    to buy your future financial freedom.
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1.5 list-disc list-inside">
                    <li>Pre-tax 401(k) contributions</li>
                    <li>Traditional & Roth IRA deposits</li>
                    <li>Emergency cash reserve building</li>
                    <li>Brokerage account investments</li>
                    <li>Extra principal payments on debt</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                The Nuance: Needs vs. Wants in the Real World
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Classifying expenses can sometimes be tricky. For instance, is
                your cell phone bill a *need* or a *want*? What about a gym
                membership?
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                To identify the difference, use the **Bare Minimum Rule**. If
                you lost your job tomorrow, would you have to keep paying this
                bill to survive, find a new job, or avoid legal trouble?
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>The Phone Bill:</strong> A basic cellular plan is a
                  **Need** because you require a phone number for employment and
                  safety. However, paying extra for an unlimited premium
                  streaming data bundle is a **Want**.
                </li>
                <li>
                  <strong>Groceries vs. Dining Out:</strong> Purchasing
                  ingredients to cook meals at home is a **Need** (groceries).
                  Paying for a prepared meal at a restaurant, including tax and
                  tip, is a **Want** (dining out).
                </li>
                <li>
                  <strong>Car Payments:</strong> A reliable vehicle to commute
                  to your workplace is a **Need**. The excess cost of driving a
                  luxury sports vehicle over a practical sedan is a **Want**.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F4E78] mb-4">
                Real-World Budgeting Case Studies (Monthly After-Tax Income)
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Let&apos;s evaluate three distinct case studies to see how
                different income levels can implement the 50/30/20 budgeting
                rule.
              </p>

              {/* Case Study 1 */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6 text-left">
                <h4 className="font-bold text-[#1F4E78] text-base mb-2">
                  Case Study A: Entry-Level Earner ($3,000/Month Net Income)
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  An entry-level professional earning $3,000 net after taxes
                  living in a moderate-cost area needs to be highly conscious of
                  baseline costs.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-gray-700">
                  <div className="p-3 bg-blue-50/50 rounded border border-blue-100">
                    <p className="text-blue-900 mb-1">50% Needs ($1,500)</p>
                    <p className="text-[10px] text-gray-500 font-normal">
                      $900 for rent, $150 for utilities, $300 for groceries, and
                      $150 for public transit.
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50/50 rounded border border-orange-100">
                    <p className="text-orange-900 mb-1">30% Wants ($900)</p>
                    <p className="text-[10px] text-gray-500 font-normal">
                      $300 on dining out, $200 on clothes, $100 on streaming
                      subscriptions, and $300 saved for travel.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50/50 rounded border border-green-100">
                    <p className="text-green-900 mb-1">20% Savings ($600)</p>
                    <p className="text-[10px] text-gray-500 font-normal">
                      $300 into a high-yield emergency fund and $300 directly
                      into a Roth IRA.
                    </p>
                  </div>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6 text-left">
                <h4 className="font-bold text-[#1F4E78] text-base mb-2">
                  Case Study B: Established Professional ($7,000/Month Net
                  Income)
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  A mid-career software engineer with a net monthly take-home
                  pay of $7,000 balancing a mortgage, car payment, and
                  aggressive retirement targets.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-gray-700">
                  <div className="p-3 bg-blue-50/50 rounded border border-blue-100">
                    <p className="text-blue-900 mb-1">50% Needs ($3,500)</p>
                    <p className="text-[10px] text-gray-500 font-normal">
                      $2,200 for mortgage, $350 for utilities, $500 for family
                      groceries, and $450 for auto loans/insurance.
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50/50 rounded border border-orange-100">
                    <p className="text-orange-900 mb-1">30% Wants ($2,100)</p>
                    <p className="text-[10px] text-gray-500 font-normal">
                      $800 to dining out, $500 to shopping, $400 to hobbies, and
                      $400 to family vacations.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50/50 rounded border border-green-100">
                    <p className="text-green-900 mb-1">20% Savings ($1,400)</p>
                    <p className="text-[10px] text-gray-500 font-normal">
                      $900 into brokerage index funds and $500 extra principal
                      on the mortgage.
                    </p>
                  </div>
                </div>
              </div>

              {/* Case Study 3 */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4 text-left">
                <h4 className="font-bold text-[#1F4E78] text-base mb-2">
                  Case Study C: High-Earner Household ($15,000/Month Net Income)
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  A dual-income family with a combined $15,000 net per month
                  adjusts the percentages to speed up their retirement timeline.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-gray-700">
                  <div className="p-3 bg-blue-50/50 rounded border border-blue-100">
                    <p className="text-blue-900 mb-1">30% Needs ($4,500)</p>
                    <p className="text-[10px] text-gray-500 font-normal">
                      Due to high income, they practice &quot;lifestyle creep
                      control,&quot; spending only $4,500 on home, utilities,
                      and auto basics.
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50/50 rounded border border-orange-100">
                    <p className="text-orange-900 mb-1">20% Wants ($3,000)</p>
                    <p className="text-[10px] text-gray-500 font-normal">
                      Fine dining, concerts, and premium travel with $3,000,
                      keeping lifestyle spending at a comfortable level.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50/50 rounded border border-green-100">
                    <p className="text-green-900 mb-1">50% Savings ($7,500)</p>
                    <p className="text-[10px] text-gray-500 font-normal">
                      An aggressive $7,500 monthly across maximum 401(k) limits,
                      HSAs, and real estate investments.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                Alternative Budgeting Systems: What is Your Style?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                While the 50/30/20 rule is an excellent baseline, other
                budgeting systems may better suit your personality or financial
                situation:
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-[#4472C4] pl-4 py-1">
                  <h4 className="font-bold text-gray-900">
                    1. Zero-Based Budgeting (The Every-Dollar-Count System)
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">
                    Made famous by Dave Ramsey, this system requires you to
                    assign every single dollar of income to a specific category
                    until your total balance reaches exactly zero. It is ideal
                    for individuals who want precise control over where their
                    money goes.
                  </p>
                </div>
                <div className="border-l-4 border-[#4472C4] pl-4 py-1">
                  <h4 className="font-bold text-gray-900">
                    2. Cash Envelope System (The Tactile Spender Method)
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">
                    Under this method, you withdraw physical cash for your
                    variable spending categories (groceries, dining out,
                    entertainment) and place them in labeled envelopes. Once the
                    cash in an envelope is gone, you cannot spend any more in
                    that category until the next month. This is highly effective
                    for curbing impulsive credit card spending.
                  </p>
                </div>
                <div className="border-l-4 border-[#4472C4] pl-4 py-1">
                  <h4 className="font-bold text-gray-900">
                    3. Pay-Yourself-First (The Anti-Budget)
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">
                    If you hate tracking transactions, this is the budget for
                    you. You simply set your savings and investment goals (e.g.,
                    20% savings) to automatically transfer on payday. Once your
                    savings are covered and your core bills are paid, you are
                    free to spend the rest of your money on whatever you want
                    without guilt or tracking.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                Three Advanced Strategies to Save $500+ Every Month
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If your budget is currently stretched too thin, here are three
                highly effective, practical adjustments you can make to quickly
                free up cash:
              </p>
              <ul className="list-decimal list-inside text-gray-600 space-y-3">
                <li>
                  <strong>Audit Subscriptions and Streamline:</strong>{' '}
                  Subscription services are designed to slowly drain your bank
                  account through automatic renewals. Once a year, export your
                  credit card statements and cancel any subscriptions you
                  haven&apos;t used in the past 30 days. This simple audit can
                  save you $50 to $150 per month.
                </li>
                <li>
                  <strong>Implement the 48-Hour Purchase Rule:</strong> Avoid
                  impulse buying on platforms like Amazon by forcing a mandatory
                  48-hour delay on all non-essential purchases over $50. If you
                  still want the item after two days, buy it. You will find that
                  nearly half the time, the urge to purchase passes.
                </li>
                <li>
                  <strong>Plan Weekly Meals:</strong> Groceries and dining out
                  are often the easiest categories to overspend on. By spending
                  just 10 minutes planning your weekly meals and shopping with a
                  strict list, you can dramatically cut down on expensive,
                  last-minute takeout orders.
                </li>
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-6">
                Frequently Asked Budgeting Questions
              </h2>

              <div className="space-y-4">
                <details className="bg-gray-50 rounded-lg p-5 group cursor-pointer border border-gray-100">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-sm sm:text-base">
                    <span>
                      Should I use my Gross or Net income for the 50/30/20 rule?
                    </span>
                    <span className="text-blue-500 transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                    Always use your **Net income** (after-tax income).
                    Proportional budgeting is based on the actual money that is
                    deposited into your bank account, not your gross pre-tax
                    salary. If you have pre-tax deductions taken out for your
                    401(k), you can add that percentage back into your
                    &quot;Savings&quot; category to get an accurate
                    representation of your budget.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-5 group cursor-pointer border border-gray-100">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-sm sm:text-base">
                    <span>
                      How do I handle minimum and extra payments on debt?
                    </span>
                    <span className="text-blue-500 transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                    Under the 50/30/20 framework, any **minimum required debt
                    payment** (such as a car payment, student loan minimum, or
                    credit card minimum) is classified as a **Need**, because
                    failing to pay it will harm your credit score and financial
                    standing. However, any **extra principal payments** you make
                    to pay off debt faster are classified as **Savings**, as
                    they directly build your net worth.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-5 group cursor-pointer border border-gray-100">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-sm sm:text-base">
                    <span>
                      What if I live in a high-cost area and my Needs exceed
                      50%?
                    </span>
                    <span className="text-blue-500 transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                    The 50/30/20 system is a flexible guide, not a rigid law. If
                    you live in a high-cost-of-living area (like New York or San
                    Francisco), your housing needs may consume 60% of your
                    income. In this scenario, you should adjust your ratios to
                    **60/20/20** by reducing your wants, rather than sacrificing
                    your long-term savings.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-5 group cursor-pointer border border-gray-100">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-sm sm:text-base">
                    <span>How do I budget if my monthly income varies?</span>
                    <span className="text-blue-500 transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                    If your income is irregular (for example, if you are a
                    freelancer or earn commissions), calculate your average net
                    income from the past 12 months. Create your baseline budget
                    using your lowest-earning month, and use any surplus income
                    from high-earning months to build a &quot;buffer fund&quot;
                    in a high-yield savings account.
                  </p>
                </details>
              </div>
            </section>

            {/* AUTHORITATIVE SOURCE CITATIONS (YMYL REQUIREMENT) */}
            <section className="mt-12 border-t border-gray-200 pt-8 text-left font-normal">
              <h3 className="text-base font-bold text-[#1F4E78] mb-4">
                Sources & Authoritative Citations
              </h3>
              <ul className="text-xs text-gray-500 space-y-2 list-none pl-0 font-normal">
                <li className="flex items-start gap-2">
                  <span className="text-[#4472C4] font-bold">1.</span>
                  <span>
                    <strong>
                      Federal Deposit Insurance Corporation (FDIC):
                    </strong>{' '}
                    National savings rate averages, FDIC insurance coverage
                    guidelines, and bank deposit standards.
                    <a
                      href="https://www.fdic.gov"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-[#4472C4] hover:underline ml-1"
                    >
                      fdic.gov
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4472C4] font-bold">2.</span>
                  <span>
                    <strong>
                      Consumer Financial Protection Bureau (CFPB):
                    </strong>{' '}
                    Guidelines on creating liquid savings buffers, managing
                    household savings goals, and bank product comparisons.
                    <a
                      href="https://www.consumerfinance.gov"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-[#4472C4] hover:underline ml-1"
                    >
                      consumerfinance.gov
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4472C4] font-bold">3.</span>
                  <span>
                    <strong>
                      Board of Governors of the Federal Reserve System:
                    </strong>{' '}
                    Historical monetary policy interest rates and national
                    household savings trends.
                    <a
                      href="https://www.federalreserve.gov"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-[#4472C4] hover:underline ml-1"
                    >
                      federalreserve.gov
                    </a>
                  </span>
                </li>
              </ul>
            </section>
          </article>

          {/* Related Tools Links */}
          <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-gray-100 mb-8">
            <h3 className="text-lg font-bold text-[#1F4E78] mb-4">
              Explore More Personal Finance Utilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/financial-utilities/take-home-pay-calculator"
                className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition group border border-gray-100"
              >
                <span className="text-xl">💸</span>
                <div>
                  <div className="font-bold text-sm text-gray-900 group-hover:text-[#4472C4]">
                    Take Home Pay
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Calculate net salary
                  </div>
                </div>
              </Link>

              <Link
                href="/financial-utilities/credit-card-calculator"
                className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition group border border-gray-100"
              >
                <span className="text-xl">💳</span>
                <div>
                  <div className="font-bold text-sm text-gray-900 group-hover:text-[#4472C4]">
                    Credit Card Payoff
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Calculate payoff timeline
                  </div>
                </div>
              </Link>

              <Link
                href="/financial-utilities/compound-interest"
                className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition group border border-gray-100"
              >
                <span className="text-xl">📈</span>
                <div>
                  <div className="font-bold text-sm text-gray-900 group-hover:text-[#4472C4]">
                    Compound Interest
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Grow your wealth faster
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Robust YMYL Disclaimer */}
          <section className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-5 mb-8 text-left">
            <h4 className="font-bold text-amber-900 text-sm mb-1">
              ⚖ Professional YMYL Disclaimer
            </h4>
            <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed">
              This Budget Calculator is designed for educational, informational,
              and general estimation purposes only. Budgets and category
              breakdowns are based on the general guidelines of the proportional
              50/30/20 rule, which may not represent the ideal financial
              allocation for every individual household. Financial situations
              vary based on location, cost of living, dependents, personal
              health, and outstanding high-interest debt obligations. This
              utility does not constitute professional investment, tax, legal,
              or personal financial planning advice. Please consult with a
              certified financial planner (CFP) or financial advisor to
              construct a budget tailored to your unique circumstances.
            </p>
          </section>

          {/* CTA Wealth Strategy */}
          <section className="bg-[#1F4E78] text-white rounded-2xl p-6 sm:p-8 text-center shadow-xl">
            <h3 className="text-xl font-bold mb-2">
              Ready to Optimize Your Wealth Strategy?
            </h3>
            <p className="mb-4 opacity-95 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Now that you have structured your monthly budget, learn how to
              allocate your 20% savings category to build long-term wealth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/debt-payoff"
                className="bg-white text-[#1F4E78] px-5 py-2.5 rounded-lg font-bold hover:bg-gray-100 transition shadow-md text-sm"
              >
                Zero to Wealth Roadmap →
              </Link>
            </div>
          </section>
        </main>

        {/* Footer Area */}
        <footer className="text-center text-gray-600 pb-12 opacity-90 text-xs px-5 border-t border-gray-200 pt-8 max-w-[1000px] mx-auto">
          <div className="flex items-center justify-center gap-4 flex-wrap mb-3 font-medium">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:underline">
              Terms of Use
            </Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:underline">
              Disclosure
            </Link>
            <span>•</span>
            <Link href="/about/editorial-team" className="hover:underline">
              Editorial Standards
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:underline">
              Contact Support
            </Link>
          </div>

          <p>
            © {new Date().getFullYear()} ZeroToWealthPro. All rights reserved.
          </p>
          <p className="mt-1 text-gray-400">
            For educational use only. Individual savings targets are subject to
            local cost of living realities.
          </p>
        </footer>
      </div>
    </>
  );
}
