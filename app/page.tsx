import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import DebtCalculator from '@/components/DebtCalculator';

export const metadata: Metadata = {
  title: 'Zero to Wealth Pro - Free Financial Calculators & Debt Payoff Tools',
  description:
    'Free financial calculators for debt payoff, loans, mortgages, investments, and budgeting. Calculate your debt-free date using proven methods. 100% free tools.',
  keywords: [
    'debt payoff calculator',
    'financial calculator',
    'loan calculator',
    'mortgage calculator',
    'budget calculator',
    'debt snowball calculator',
    'debt avalanche calculator',
    'free financial tools',
    'debt free calculator',
    'investment calculator',
  ],
  alternates: {
    canonical: 'https://zerotowealthpro.com',
  },
  openGraph: {
    title: 'Zero to Wealth Pro - Free Financial Calculators',
    description:
      'Take control of your finances with free calculators and proven debt payoff strategies.',
    url: 'https://zerotowealthpro.com',
    siteName: 'Zero to Wealth Pro',
    type: 'website',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Zero to Wealth Pro',
  url: 'https://zerotowealthpro.com',
  description:
    'Free financial calculators and debt payoff tools using objective mathematical modeling.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://zerotowealthpro.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Zero to Wealth Pro',
    url: 'https://zerotowealthpro.com',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are these financial calculators completely free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, 100% free. All interactive calculators, debt schedules, budget planners, and long-term investment simulators on ZeroToWealthPro are freely accessible without paywalls, email sign-up requirements, or hidden subscription costs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which debt payoff strategy is mathematically optimal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The debt avalanche method is mathematically optimal because it prioritizes paying off outstanding balances with the highest interest rates (APRs) first. This strategy minimizes your total interest costs and shortens your repayment timeline. However, the debt snowball method, which focuses on clearing the smallest balances first, offers powerful psychological wins that help many savers stay motivated.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does compound interest help build long-term wealth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Compound interest is the process where your investment principal earns interest, and those accumulated interest gains earn interest on top of themselves in subsequent periods. Over a long timeline, this compounding effect creates an exponential growth curve, allowing your portfolio to grow dramatically even with modest recurring monthly contributions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is budgeting based on net income rather than gross income recommended?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Budgeting should always be based on net (after-tax) take-home pay because that represents the actual cash deposited into your bank account. Designing a budget around your pre-tax gross salary can lead to overestimating your cash flow, as it fails to account for mandatory federal taxes, state withholding, FICA payroll taxes, and pre-tax health insurance deductions.',
      },
    },
  ],
};

const FEATURED_CALCULATORS = [
  {
    title: 'Debt Payoff Calculator',
    description:
      'Compare snowball vs. avalanche strategies and find your exact debt-free date.',
    icon: '🎯',
    link: '/debt-payoff',
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Mortgage Calculator',
    description:
      'Calculate complete PITI monthly payments including property taxes, PMI, and HOA fees.',
    icon: '🏠',
    link: '/financial-utilities/mortgage-calculator',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    title: 'Loan Calculator',
    description:
      'Calculate monthly payments, total interest, and complete amortization on any loan.',
    icon: '🚗',
    link: '/financial-utilities/loan-calculator',
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Investment Calculator',
    description:
      'Model future asset growth and visualize compounding interest over time.',
    icon: '📈',
    link: '/financial-utilities/compound-interest',
    color: 'from-orange-500 to-orange-600',
  },
];

const spokes = {
  strategy: [
    {
      href: '/blog/debt-snowball-vs-debt-avalanche',
      label: 'Snowball vs Avalanche: Repayment Comparison',
    },
    {
      href: '/blog/how-to-pay-off-debt-fast',
      label: 'How to Pay Off Debt Fast: A Step-by-Step Plan',
    },
    {
      href: '/blog/invest-or-pay-off-debt-first',
      label: 'Invest or Pay Off Debt First? The Real Answer',
    },
    {
      href: '/blog/psychology-of-paying-off-debt',
      label: 'The Psychology of Paying Off Debt: Why It Feels Hard',
    },
    {
      href: '/blog/what-order-to-pay-off-debts',
      label: 'What Order Should I Pay Off My Debts?',
    },
    {
      href: '/blog/how-to-get-out-of-debt-on-low-income',
      label: 'How to Get Out of Debt on a Low Income',
    },
  ],
  math: [
    {
      href: '/blog/minimum-payment-trap-explained',
      label: 'The Minimum Payment Trap: How $10,000 Becomes $21,000',
    },
    {
      href: '/blog/how-long-to-pay-off-50k-credit-card-debt',
      label: 'Pay Off $50K at 20% Interest: repayment schedule',
    },
    {
      href: '/blog/how-much-does-extra-100-save',
      label: 'Extra $100 on Debt: How Much Does It Save?',
    },
    {
      href: '/blog/credit-card-interest-explained',
      label: 'Credit Card Interest Explained: How APR Costs You Money',
    },
  ],
  tools: [
    {
      href: '/blog/best-budgeting-apps-for-debt-payoff',
      label: 'Best Budgeting Apps for Paying Off Debt in 2026',
    },
    {
      href: '/blog/how-to-use-debt-payoff-calculator',
      label: 'How to Use a Debt Payoff Calculator the Right Way',
    },
    {
      href: '/blog/how-to-stop-using-credit-cards',
      label: 'How to Stop Using Credit Cards: A Practical Guide',
    },
    {
      href: '/blog/how-to-reset-your-finances-in-30-days',
      label: 'How to Reset Your Finances in 30 Days',
    },
  ],
  budgeting: [
    {
      href: '/blog/budgeting-when-youre-broke',
      label: "Budgeting When You're Broke: A Realistic System",
    },
    {
      href: '/blog/zero-paycheck-budget-method',
      label: 'The $0 Paycheck Budget Method: How It Works',
    },
    {
      href: '/blog/how-to-build-emergency-fund-on-low-income',
      label: 'How to Build an Emergency Fund on Low Income',
    },
    {
      href: '/blog/how-to-save-1000-fast',
      label: 'How to Save $1,000 Fast: A Realistic Step-by-Step Plan',
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-[#4472C4]/20 via-[#1F4E78]/5 to-white py-0">
        {/* HERO */}
        <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[550px]">
          <Image
            src="/stock-image.jpeg"
            alt="Finance hero background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-10" />

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-5 z-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg leading-tight mb-4">
              Take Control of Your Wealth
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white opacity-95 mb-8 max-w-2xl font-medium">
              Free Mathematical Calculators. Proven Strategies. Real Financial
              Freedom.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto">
              <Link
                href="/debt-payoff"
                className="flex-1 text-center bg-white text-[#4472C4] px-6 py-4 rounded-full font-bold hover:scale-105 transition shadow-xl text-base sm:text-lg cursor-pointer animate-fade-in"
              >
                Calculate Debt-Free Date →
              </Link>

              <Link
                href="/financial-utilities"
                className="flex-1 text-center bg-transparent border-2 border-white text-white px-6 py-4 rounded-full font-bold hover:bg-white hover:text-[#4472C4] transition text-base sm:text-lg cursor-pointer"
              >
                View All Calculators
              </Link>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT CONTAINER */}
        <main className="max-w-[1000px] mx-auto px-5 py-15 sm:py-12 space-y-12 sm:space-y-16">
          {/* FEATURED CALCULATORS (Sits prominently at the top of the page stream) */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl -mt-20 relative z-30 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F4E78] mb-3">
                🧮 Free Financial Calculators
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base font-medium">
                Make smarter, data-driven decisions with our suite of free
                interactive planning tools. No registration, credit checks, or
                premium tiers required.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              {FEATURED_CALCULATORS.map((calc, index) => (
                <Link
                  key={index}
                  href={calc.link}
                  className="group bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-xl p-5 border border-gray-100 text-left"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${calc.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform text-white shadow-md`}
                  >
                    {calc.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#4472C4] transition-colors">
                    {calc.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {calc.description}
                  </p>
                  <div className="mt-3 flex items-center text-[#4472C4] font-semibold text-sm">
                    Use Calculator
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <Link
                href="/financial-utilities"
                className="inline-flex items-center gap-2 text-[#4472C4] font-bold hover:underline text-base"
              >
                View All Financial Tools
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </section>

          {/* VALUE PROPOSITION */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Instant Calculations
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Generate your custom repayment schedules, tax estimates, or
                  compounding graphs in seconds with zero delay.
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Fiduciary Frameworks
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  All tools are built using the exact mathematical formulas
                  recommended by financial planning experts.
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">💯</div>
                <h3 className="font-bold text-gray-900 mb-2">100% Free</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Enjoy unrestricted access to all calculators, tables, and
                  planning libraries. No signup, credit cards, or hidden fees.
                </p>
              </div>
            </div>
          </section>

          {/* THE PROBLEM */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center gap-6 border border-gray-100 text-left">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                Why Most People Stay Stuck in Debt
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Paying off debt successfully does not happen by accident or pure
                willpower. It requires structured systems, mathematical
                organization, and the right strategic tools.
              </p>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 font-bold">✗</span>
                  <span>No structured payoff timeline or defined end date</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 font-bold">✗</span>
                  <span>
                    Trapped in the interest-maximizing minimum payment cycle
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 font-bold">✗</span>
                  <span>
                    No visibility into total compounding interest costs over
                    time
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 font-bold">✗</span>
                  <span>
                    Lack of a clear, mathematically coordinated repayment plan
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex-1 flex justify-center items-center w-full">
              <div className="relative w-full sm:w-3/4 md:w-full h-64 md:h-52">
                <Image
                  src="/sad-people.png"
                  alt="People stressed about debt"
                  fill
                  className="object-cover rounded-xl shadow-lg"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 75vw, 50vw"
                />
              </div>
            </div>
          </section>

          {/* FEATURED GUIDE */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 text-left">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl">📌</span>
              <div>
                <h2 className="text-2xl font-bold text-[#1F4E78] mb-2">
                  Featured Educational Guide
                </h2>
                <h3 className="text-xl font-semibold mb-3 text-gray-700">
                  Debt Snowball vs. Debt Avalanche: Which Saves More Money?
                </h3>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
              A comprehensive mathematical analysis comparing the Debt Snowball
              and Debt Avalanche frameworks. Explore real-world examples,
              projected repayment schedules, and interest comparison metrics to
              find the optimal plan for your situation.
            </p>
            <Link
              href="/blog/debt-snowball-vs-debt-avalanche"
              className="inline-block bg-[#4472C4] hover:bg-[#1F4E78] text-white px-6 py-3 rounded-full font-bold transition shadow-md cursor-pointer text-sm"
            >
              Read Full Guide →
            </Link>
          </section>

          {/* INTERACTIVE CALCULATOR EMBED */}
          <section className="bg-white rounded-2xl p-5 sm:p-8 shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-[#1F4E78] mb-4 text-center">
              Try Our Debt Payoff Calculator
            </h2>

            <Suspense
              fallback={
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
                  Loading calculator...
                </div>
              }
            >
              <DebtCalculator />
            </Suspense>
          </section>

          {/* DEDICATED PROFESSIONAL HELP WARNING (YMYL REQUIREMENT) */}
          <section className="mb-10 bg-blue-50/50 rounded-xl p-6 border border-blue-100 text-left font-normal">
            <h3 className="text-xl font-bold text-[#1F4E78] mb-3 flex items-center gap-2">
              <span>⚠️</span> When to Seek Professional Financial Advisory
              Guidance
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-4 font-normal">
              While digital estimators and self-tracking calculators are
              exceptional tools for baseline planning, they cannot replace the
              highly tailored, personalized insights of a licensed financial
              fiduciary. You should consider consulting a **Certified Financial
              Planner (CFP®)**, a tax professional, or an estate planning
              attorney in any of the following complex situations:
            </p>
            <ul className="text-xs text-gray-600 space-y-2 list-disc list-inside font-normal">
              <li>
                If you are managing erratic corporate partner dividend payouts
                or complex startup equity compensations.
              </li>
              <li>
                If you are close to retirement and need to design a
                tax-efficient withdrawal strategy across taxable, tax-deferred,
                and tax-free accounts.
              </li>
              <li>
                If you are attempting to balance aggressive debt restructuring
                with specialized asset purchase goals.
              </li>
              <li>
                If you are unsure how to coordinate your high-yield savings cash
                reserves with tax-sheltered investment plans.
              </li>
            </ul>
            <p className="text-xs text-gray-500 mt-3 font-semibold">
              An algorithm can optimize numbers, but a certified professional
              integrates your emotional risk limits, long-term career goals, and
              local tax conditions into a cohesive, secure wealth strategy.
            </p>
          </section>

          {/* LATEST ARTICLES */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 text-left">
            <h2 className="text-2xl font-bold text-[#1F4E78] mb-6 flex items-center gap-2">
              <span>📰</span> Latest Articles
            </h2>
            <div className="space-y-5">
              {[
                {
                  title: 'The Minimum Payment Trap Explained',
                  href: '/blog/minimum-payment-trap-explained',
                  desc: 'How credit card companies maximize interest — and how to escape it.',
                },
                {
                  title: 'Best Budgeting Apps for Paying Off Debt',
                  href: '/blog/best-budgeting-apps-for-debt-payoff',
                  desc: 'Compare top tools for tracking spending and accelerating payoff.',
                },
                {
                  title:
                    'How Long to Pay Off $50K in Credit Card Debt at 20% Interest?',
                  href: '/blog/how-long-to-pay-off-50k-credit-card-debt',
                  desc: 'Realistic payoff scenarios based on income and extra payments.',
                },
              ].map((article, i) => (
                <article
                  key={i}
                  className="border-l-4 border-[#4472C4] pl-4 hover:bg-gray-50 p-3 rounded transition-colors"
                >
                  <Link
                    href={article.href}
                    className="text-lg font-semibold text-gray-800 hover:text-[#4472C4] transition-colors"
                  >
                    {article.title}
                  </Link>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed font-normal">
                    {article.desc}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[#4472C4] font-bold hover:underline text-sm"
              >
                View All Articles
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </section>

          {/* ── CONTENT HUB — 4 categories with light-color backgrounds ── */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 text-left">
            <h2 className="text-2xl font-bold text-[#1F4E78] mb-1">
              Deep Dive: Debt Payoff Guides
            </h2>
            <p className="text-xs text-gray-500 mb-8">
              Explore articles featuring real math, month-by-month breakdowns,
              and sourced data.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              {/* STRATEGY (Soft Blue) */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 sm:p-6 transition-all hover:shadow-sm">
                <h3 className="text-sm font-bold tracking-widest uppercase text-[#1F4E78] mb-3 flex items-center gap-1.5">
                  <span>🎯</span> Strategy
                </h3>
                <div className="space-y-2 text-gray-700">
                  {spokes.strategy.slice(0, 6).map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="block hover:underline hover:text-[#4472C4] transition-colors pl-1 font-medium"
                    >
                      → {label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* MATH & TRAPS (Soft Red) */}
              <div className="bg-red-50/50 border border-red-100 rounded-xl p-5 sm:p-6 transition-all hover:shadow-sm">
                <h3 className="text-sm font-bold tracking-widest uppercase text-[#1F4E78] mb-3 flex items-center gap-1.5">
                  <span>📊</span> Math &amp; Traps
                </h3>
                <div className="space-y-2 text-gray-700">
                  {spokes.math.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="block hover:underline hover:text-[#4472C4] transition-colors pl-1 font-medium"
                    >
                      → {label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* TOOLS & HABITS (Soft Purple) */}
              <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-5 sm:p-6 transition-all hover:shadow-sm">
                <h3 className="text-sm font-bold tracking-widest uppercase text-[#1F4E78] mb-3 flex items-center gap-1.5">
                  <span>🛠️</span> Tools &amp; Habits
                </h3>
                <div className="space-y-2 text-gray-700">
                  {spokes.tools.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="block hover:underline hover:text-[#4472C4] transition-colors pl-1 font-medium"
                    >
                      → {label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* BUDGETING (Soft Green) */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-5 sm:p-6 transition-all hover:shadow-sm">
                <h3 className="text-sm font-bold tracking-widest uppercase text-[#1F4E78] mb-3 flex items-center gap-1.5">
                  <span>💵</span> Budgeting
                </h3>
                <div className="space-y-2 text-gray-700">
                  {spokes.budgeting.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="block hover:underline hover:text-[#4472C4] transition-colors pl-1 font-medium"
                    >
                      → {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* ── END CONTENT HUB ─────────────────────────────────────────── */}

          {/* PROMINENT YMYL WARNING & EDUCATIONAL DISCLOSURE (BOTTOM PLACEMENT) */}
          <section className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-5 text-left shadow-sm mt-8">
            <div className="flex gap-3">
              <span className="text-xl sm:text-2xl mt-0.5 font-bold">⚖️</span>
              <div>
                <h3 className="font-bold text-amber-950 text-sm sm:text-base mb-1">
                  YMYL Security & Educational Disclosure
                </h3>
                <p className="text-xs text-amber-900 leading-relaxed font-normal">
                  ZeroToWealthPro is a personal finance education and
                  self-tracking utility platform. All interactive calculators,
                  interest schedules, budget plans, and portfolio simulators are
                  design tools designed solely for illustrative and general
                  planning purposes. Calculations do not guarantee
                  creditworthiness, loan pre-approvals, tax filings, or
                  investment outcomes. Our content is compiled by professional
                  editorial teams and verified for mathematical accuracy, but is
                  not a substitute for professional legal, tax, estate planning,
                  or fiduciary investment advisory services.
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-amber-850/80 font-semibold mt-3 pt-3 border-t border-amber-500/20">
                  <span>Published by ZeroToWealthPro Editorial Board</span>
                  <span>•</span>
                  <span>Fact-Checked & Verified for 2026 Guidelines</span>
                </div>
              </div>
            </div>
          </section>

          {/* AUTHORITATIVE SOURCE CITATIONS (YMYL REQUIREMENT) */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 text-left">
            <h3 className="text-base font-bold text-[#1F4E78] mb-4">
              Sources & Authoritative Citations
            </h3>
            <ul className="text-xs text-gray-500 space-y-2 list-none pl-0 font-normal">
              <li className="flex items-start gap-2">
                <span className="text-[#4472C4] font-bold">1.</span>
                <span>
                  <strong>
                    Board of Governors of the Federal Reserve System:
                  </strong>{' '}
                  G.19 Consumer Credit and Survey of Consumer Finances (SCF)
                  datasets regarding household wealth indices and average
                  revolving debt APR baselines.
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
              <li className="flex items-start gap-2">
                <span className="text-[#4472C4] font-bold">2.</span>
                <span>
                  <strong>Consumer Financial Protection Bureau (CFPB):</strong>{' '}
                  Guidelines on mortgage calculations, consumer borrowing
                  rights, and credit card fee disclosures.
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
                    U.S. Securities and Exchange Commission (SEC):
                  </strong>{' '}
                  Investor education resources regarding compound interest
                  calculations, long-term asset growth models, and investment
                  risk profiles.
                  <a
                    href="https://www.sec.gov"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-[#4472C4] hover:underline ml-1"
                  >
                    sec.gov
                  </a>
                </span>
              </li>
            </ul>
          </section>

          {/* FINAL CTA */}
          <section className="bg-gradient-to-r from-[#1F4E78] to-[#4472C4] text-white rounded-2xl p-8 sm:p-12 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Secure Your Financial Future?
            </h2>
            <p className="text-lg mb-8 opacity-95 max-w-2xl mx-auto text-sm sm:text-base">
              Join thousands who have used our free calculators and structured
              guides to eliminate high-interest debt, plan budgets, and optimize
              long-term asset growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
              <Link
                href="/debt-payoff"
                className="bg-white text-[#1F4E78] px-8 py-4 rounded-full font-bold hover:scale-105 transition shadow-xl text-sm sm:text-base cursor-pointer"
              >
                Start Payoff Calculator →
              </Link>
              <Link
                href="/financial-utilities"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#4472C4] transition text-sm sm:text-base cursor-pointer"
              >
                Browse All Utilities
              </Link>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="text-center text-gray-600 py-12 opacity-90 text-xs px-5 border-t border-gray-200 mt-12 bg-white max-w-[1000px] mx-auto font-medium">
          <div className="flex items-center justify-center gap-6 flex-wrap mb-3 font-medium">
            <Link href="/privacy" className="hover:underline font-medium">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline font-medium">
              Terms of Use
            </Link>
            <Link href="/disclaimer" className="hover:underline font-medium">
              Affiliate Disclosure
            </Link>
            <Link
              href="/about/editorial-team"
              className="hover:underline font-medium"
            >
              Editorial Standards
            </Link>
            <Link href="/contact" className="hover:underline font-medium">
              Contact
            </Link>
          </div>

          <p className="text-xs opacity-75">
            Copyright © {new Date().getFullYear()} ZeroToWealthPro. All rights
            reserved.
          </p>
          <p className="text-xs opacity-60 font-normal">
            Not tax, legal, or registered investment advice. For educational
            purposes only. Individual outcomes depend on actual transaction
            tracking and monthly budget allocations.
          </p>
        </footer>
      </div>
    </>
  );
}
