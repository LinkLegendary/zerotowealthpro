import type { Metadata } from 'next';
import Link from 'next/link';
import TakeHomePayCalculator from '@/components/TakeHomePayCalculator';

export const metadata: Metadata = {
  title: 'Take Home Pay Calculator - Estimate Your Net After-Tax Income (2026)',
  description:
    'Calculate your actual take-home paycheck using our free take-home pay calculator. Account for 2026 progressive federal income taxes, state tax, pre-tax 401k deductions, and FICA.',
  keywords: [
    'take home pay calculator',
    'after tax salary calculator',
    'paycheck calculator',
    'net salary calculator',
    'payroll tax calculator',
    '401k tax savings calculator',
    '2026 paycheck calculator',
    'how to calculate take home pay',
  ],
  alternates: {
    canonical:
      'https://zerotowealthpro.com/financial-utilities/take-home-pay-calculator',
  },
  openGraph: {
    title: 'Free Take Home Pay Calculator (2026) | Zero to Wealth Pro',
    description:
      'Calculate your net take-home salary after federal tax, state tax, 401k contributions, and health insurance using 2026 tax brackets.',
    url: 'https://zerotowealthpro.com/financial-utilities/take-home-pay-calculator',
    type: 'website',
  },
};

const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Take Home Pay Calculator',
  applicationCategory: 'FinanceApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'Calculate your net take home paycheck with accurate 2026 progressive federal and state taxes.',
};

export default function TakeHomePayCalculatorPage() {
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
            <li className="font-semibold text-[#1F4E78]">
              Take Home Pay Calculator
            </li>
          </ol>
        </nav>

        <main className="max-w-[1000px] mx-auto px-5 pb-16">
          {/* Hero Section */}
          <header className="py-6 text-center sm:text-left mb-6">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1F4E78] tracking-tight leading-tight mb-3">
              2026 Take Home Pay Calculator
            </h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed">
              Estimate your actual net paycheck earnings instantly. This
              calculator accounts for the 2026 progressive federal income tax
              brackets, FICA payroll withholdings, standard state taxes, and the
              tax-shielding benefits of pre-tax 401(k) and health insurance
              deductions.
            </p>
          </header>

          {/* Interactive Calculator Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-xl mb-10 border border-gray-100">
            <TakeHomePayCalculator />
          </div>

          {/* Deep Educational Content (SEO-Optimized, 1,500+ Words) */}
          <article className="bg-white rounded-2xl p-6 sm:p-10 shadow-lg mb-10 border border-gray-100 prose prose-slate max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F4E78] mb-4">
                The Anatomy of a Paycheck: Gross vs. Net Income
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Have you ever felt a pang of disappointment when looking at your
                bank deposit on payday? The gap between what your employer pays
                you on paper (your **Gross Salary**) and the actual money that
                hits your account (your **Net Take-Home Pay**) can be massive.
                This gap is the result of federal, state, and local taxes,
                alongside pre-tax and post-tax employee deductions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                To manage your household budget, plan large purchases, or
                accurately determine how much you can afford to invest, you need
                to understand exactly where those missing dollars are going. In
                this guide, we will break down the precise mechanics of payroll
                deductions, progressive tax brackets, and retirement accounts
                using the projected **2026 tax standards**.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                1. Federal Income Tax & The Standard Deduction
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The United States utilizes a **progressive income tax system**.
                This means your income is divided into progressive "buckets"
                (brackets), and you only pay the designated tax rate on the
                portion of your income that falls within each bucket.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Before your income is subjected to these tax brackets, the IRS
                allows you to subtract a portion of your income from your tax
                bill completely. This is called the **Standard Deduction**. It
                acts as a baseline of tax-free income designed to cover basic
                living expenses. For the **2026 tax year**, the projected
                standard deductions adjusted for inflation are:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center text-xs sm:text-sm">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-150 font-semibold">
                  <div className="text-gray-500 uppercase text-[10px] tracking-wider">
                    Single Filers
                  </div>
                  <div className="text-xl text-[#1F4E78] font-bold mt-1">
                    $15,400
                  </div>
                  <p className="text-[10px] text-gray-400 font-normal mt-1">
                    For unmarried individuals
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-150 font-semibold">
                  <div className="text-gray-500 uppercase text-[10px] tracking-wider">
                    Married Filing Jointly
                  </div>
                  <div className="text-xl text-[#1F4E78] font-bold mt-1">
                    $30,800
                  </div>
                  <p className="text-[10px] text-gray-400 font-normal mt-1">
                    For married couples pooling income
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-150 font-semibold">
                  <div className="text-gray-500 uppercase text-[10px] tracking-wider">
                    Head of Household
                  </div>
                  <div className="text-xl text-[#1F4E78] font-bold mt-1">
                    $23,100
                  </div>
                  <p className="text-[10px] text-gray-400 font-normal mt-1">
                    For single parents/unmarried supporters
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-[#1F4E78] mb-2">
                The Myth of "Moving Into a Higher Tax Bracket"
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                One of the most persistent financial misconceptions is that
                earning more money and "stepping into a higher bracket" can
                cause you to take home less money overall. **This is
                mathematically impossible.**
              </p>
              <p className="text-gray-600 leading-relaxed">
                For example, if you are a single filer with a taxable income of
                $50,000 in 2026, only the portion of your income above $49,500
                is taxed at the 22% rate. The first $12,200 is taxed at 10%, the
                income between $12,200 and $49,500 is taxed at 12%, and only the
                final $500 is taxed at 22%. Your marginal tax rate is 22%, but
                your *effective* tax rate (the average percentage you pay) is
                significantly lower.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                2. Understanding FICA: Social Security and Medicare
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Even before federal or state income taxes are computed, the
                government levies flat-rate payroll taxes to fund Social
                Security and Medicare. These are known as **FICA (Federal
                Insurance Contributions Act)** taxes.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Unlike federal income taxes, FICA taxes do not have standard
                deductions. They are applied to your very first dollar of earned
                gross income:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>Social Security Withholding (6.2%):</strong> This flat
                  tax funds public retirement benefits. However, it is capped at
                  a maximum wage base. In **2026**, the projected Social
                  Security wage limit is **$181,200**. Any earned income above
                  this threshold is completely free from the 6.2% Social
                  Security tax.
                </li>
                <li>
                  <strong>Medicare Withholding (1.45%):</strong> This flat tax
                  funds public healthcare for seniors and has no wage cap.
                  However, high-income earners face an **Additional Medicare Tax
                  of 0.9%** on earnings exceeding $200,000 for single filers or
                  $250,000 for married couples filing jointly.
                </li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-[#4472C4] p-4 rounded-r-lg text-sm text-gray-700">
                <strong>💡 Self-Employment Note:</strong> If you are an
                independent contractor, freelancer, or business owner, you must
                pay the "Self-Employment Tax" (15.3%), which represents both the
                employee and employer portions of FICA.
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                3. Pre-Tax vs. Post-Tax Deductions (The Wealth-Building Secret)
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To maximize your take-home pay over your lifetime, you must
                master the difference between **pre-tax** and **post-tax**
                payroll deductions.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                **Pre-tax deductions** are taken out of your gross paycheck
                before tax withholding is calculated. This effectively lowers
                your taxable income base, meaning you pay less money in federal
                and state income taxes. Examples include traditional 401(k)
                contributions, health insurance premiums, and Health Savings
                Accounts (HSAs).
              </p>
              <p className="text-gray-600 leading-relaxed">
                **Post-tax deductions** are subtracted after taxes have already
                been calculated. These do not lower your current tax bill.
                Examples include Roth 401(k) contributions, life insurance, and
                general wage garnishments.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F4E78] mb-2">
                Real-World Paycheck Case Studies (2026 Estimates)
              </h2>
              {/* Strict YMYL Hypothetical Disclosure Note */}
              <p className="text-xs text-gray-500 italic mb-6">
                Disclaimer: The following tax models are simplified,
                hypothetical taxpayer profiles designed for illustrative
                purposes based on projected 2026 tax tables and flat-rate state
                assumptions. Individual tax liabilities are subject to local
                withholding regulations, dynamic tax credits, and custom
                itemized deductions not modeled below.
              </p>

              {/* Case Study A */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6 text-left">
                <h4 className="font-bold text-[#1F4E78] text-base mb-2">
                  Profile A: Entry-Level Earner ($50,000 Salary)
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  In this hypothetical profile, a single taxpayer earns $50,000
                  annually. They contribute 4% ($2,000) pre-tax to their 401(k)
                  and pay $100 monthly ($1,200 annually) for health insurance
                  premiums.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-gray-700">
                  <div className="space-y-1">
                    <p>• Gross Pay: $50,000</p>
                    <p>
                      • Pre-Tax Contributions: $3,200 ($2,000 401k + $1,200
                      Health)
                    </p>
                    <p>• Standard Deduction Applied: $15,400</p>
                    <p>• Net Taxable Income: $31,400 ($50k - $3.2k - $15.4k)</p>
                  </div>
                  <div className="space-y-1 text-gray-800">
                    <p className="text-red-600">• Federal Income Tax: $3,524</p>
                    <p className="text-amber-600">
                      • State Income Tax (4%): $1,872
                    </p>
                    <p className="text-sky-600">• FICA Taxes (7.65%): $3,733</p>
                    <p className="text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded inline-block mt-2">
                      ✔ Estimated Annual Take-Home Net Pay: $37,671
                    </p>
                  </div>
                </div>
              </div>

              {/* Case Study B */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6 text-left">
                <h4 className="font-bold text-[#1F4E78] text-base mb-2">
                  Profile B: Mid-Career Professional ($120,000 Salary)
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  This profile models a single taxpayer earning $120,000
                  annually. They contribute 8% ($9,600) pre-tax to their 401(k)
                  and pay $150 monthly ($1,800 annually) for health insurance
                  premiums.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-gray-700">
                  <div className="space-y-1">
                    <p>• Gross Pay: $120,000</p>
                    <p>
                      • Pre-Tax Contributions: $11,400 ($9,600 401k + $1,800
                      Health)
                    </p>
                    <p>• Standard Deduction Applied: $15,400</p>
                    <p>
                      • Net Taxable Income: $93,200 ($120k - $11.4k - $15.4k)
                    </p>
                  </div>
                  <div className="space-y-1 text-gray-800">
                    <p className="text-red-600">
                      • Federal Income Tax: $15,310
                    </p>
                    <p className="text-amber-600">
                      • State Income Tax (4%): $4,344
                    </p>
                    <p className="text-sky-600">• FICA Taxes (7.65%): $9,042</p>
                    <p className="text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded inline-block mt-2">
                      ✔ Estimated Annual Take-Home Net Pay: $79,904
                    </p>
                  </div>
                </div>
              </div>

              {/* Case Study C */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4 text-left">
                <h4 className="font-bold text-[#1F4E78] text-base mb-2">
                  Profile C: High-Earner ($200,000 Salary)
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  This profile illustrates a high-income single taxpayer earning
                  $200,000 annually. They contribute 10% ($20,000) to their
                  401(k) and pay $2,400 annually for health premiums. This
                  demonstrates the impact of the Social Security wage cap
                  ($181,200).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-gray-700">
                  <div className="space-y-1">
                    <p>• Gross Pay: $200,000</p>
                    <p>
                      • Pre-Tax Contributions: $22,400 ($20k 401k + $2.4k
                      Health)
                    </p>
                    <p>• Standard Deduction Applied: $15,400</p>
                    <p>• Net Taxable Income: $162,200</p>
                  </div>
                  <div className="space-y-1 text-gray-800">
                    <p className="text-red-600">
                      • Federal Income Tax: $31,858
                    </p>
                    <p className="text-amber-600">
                      • State Income Tax (4%): $7,104
                    </p>
                    <p className="text-sky-600">
                      • FICA Taxes: $14,103 (Social Security maxed out!)
                    </p>
                    <p className="text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded inline-block mt-2">
                      ✔ Estimated Annual Take-Home Net Pay: $124,535
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                How to Optimize Your Paycheck for Maximum Wealth
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Now that you know how your paycheck is sliced and diced by Uncle
                Sam, here are three highly effective, legal methods to reduce
                your tax burden and build long-term wealth:
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-[#4472C4] pl-4 py-1">
                  <h4 className="font-bold text-gray-900">
                    1. Leverage the Triple-Tax Advantage of HSAs
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">
                    If you use a High Deductible Health Plan (HDHP), prioritize
                    contributing to a Health Savings Account (HSA). HSAs are
                    triple tax-advantaged: contributions are pre-tax, investment
                    growth is tax-free, and withdrawals for medical expenses are
                    completely tax-free.
                  </p>
                </div>
                <div className="border-l-4 border-[#4472C4] pl-4 py-1">
                  <h4 className="font-bold text-gray-900">
                    2. Increase Pre-Tax Retirement Contributions
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">
                    As shown in our 401(k) case studies, putting money into a
                    pre-tax retirement plan reduces your taxable income, meaning
                    the government effectively sponsors a portion of your
                    retirement savings.
                  </p>
                </div>
                <div className="border-l-4 border-[#4472C4] pl-4 py-1">
                  <h4 className="font-bold text-gray-900">
                    3. Optimize Your Form W-4 Withholdings
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">
                    Getting a massive tax refund check in the spring means you
                    gave the federal government an interest-free loan throughout
                    the year. Use the IRS Tax Withholding Estimator to adjust
                    your Form W-4, putting more money back into your bi-weekly
                    paycheck where it can be invested immediately.
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-6">
                Frequently Asked Paycheck Questions
              </h2>

              <div className="space-y-4">
                <details className="bg-gray-50 rounded-lg p-5 group cursor-pointer border border-gray-100">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-sm sm:text-base">
                    <span>
                      What is the difference between Marginal and Effective Tax
                      Rates?
                    </span>
                    <span className="text-blue-500 transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                    Your <strong>Marginal Tax Rate</strong> is the tax bracket
                    applied to the very last dollar of your income. Your{' '}
                    <strong>Effective Tax Rate</strong> is the actual average
                    percentage of your overall income paid to taxes (Total taxes
                    paid divided by gross income). Because of progressive tax
                    brackets, your effective rate is always lower than your
                    marginal rate.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-5 group cursor-pointer border border-gray-100">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-sm sm:text-base">
                    <span>Are 401(k) contributions completely tax-exempt?</span>
                    <span className="text-blue-500 transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                    Traditional 401(k) contributions are exempt from federal and
                    state income taxes in the year they are made. However, they
                    are still subject to FICA taxes (Social Security and
                    Medicare). Taxes are paid later on both your contributions
                    and earnings when you withdraw money in retirement.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-5 group cursor-pointer border border-gray-100">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-sm sm:text-base">
                    <span>What is FICA and why do I have to pay it?</span>
                    <span className="text-blue-500 transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                    FICA stands for the Federal Insurance Contributions Act. It
                    is a mandatory federal payroll tax that funds Social
                    Security benefits and Medicare. Employees contribute 6.2% of
                    their income for Social Security (up to a salary limit) and
                    1.45% for Medicare. Employers match these contributions
                    dollar-for-dollar.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-5 group cursor-pointer border border-gray-100">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-sm sm:text-base">
                    <span>
                      Why does my pay frequency change my per-paycheck take
                      home?
                    </span>
                    <span className="text-blue-500 transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                    Your annual net earnings stay identical, but the money per
                    check shifts depending on pay schedules. A weekly pay
                    schedule means your annual net pay is divided by 52. A
                    bi-weekly schedule is divided by 26, semi-monthly by 24, and
                    monthly by 12.
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

              <Link
                href="/financial-utilities"
                className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition group border border-gray-100"
              >
                <span className="text-xl">🧮</span>
                <div>
                  <div className="font-bold text-sm text-gray-900 group-hover:text-[#4472C4]">
                    All Calculators
                  </div>
                  <div className="text-[11px] text-gray-500">
                    Browse financial tools
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Strong YMYL Disclaimer */}
          <section className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-5 mb-8">
            <h4 className="font-bold text-amber-900 text-sm mb-1">
              ⚖ Professional YMYL Disclaimer
            </h4>
            <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed">
              This Take Home Pay Calculator is designed for educational,
              informational, and general estimation purposes only. The tax
              values computed are approximations based on general federal tax
              structures for <strong>2026</strong> and simplified flat state
              rates. Individual taxpayers may be eligible for specific
              deductions, credits, or state-specific nuances not factored into
              this calculation. This utility does not constitute legal, tax, or
              professional investment advice. Please consult with a certified
              public accountant (CPA) or professional tax advisor regarding
              specific payroll withholding changes or retirement planning
              decisions. Individual results vary.
            </p>
          </section>

          {/* CTA Wealth Strategy */}
          <section className="bg-[#1F4E78] text-white rounded-2xl p-6 sm:p-8 text-center shadow-xl">
            <h3 className="text-xl font-bold mb-2">
              Ready to Optimize Your Wealth Strategy?
            </h3>
            <p className="mb-4 opacity-95 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Now that you understand your net cash flow, learn how to allocate
              it efficiently using our complete step-by-step guides.
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
            For educational use only. Individual calculations are subject to
            local withholding conditions.
          </p>
        </footer>
      </div>
    </>
  );
}
