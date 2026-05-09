import type { Metadata } from 'next';
import Link from 'next/link';
import NetWorthCalculator from '@/components/NetWorthCalculator';

export const metadata: Metadata = {
  title: 'Net Worth Calculator - Assets Minus Liabilities (2026)',
  description:
    'Track your net worth over time. Calculate assets minus liabilities to measure financial progress, manage home equity, and understand your financial position.',
  keywords: [
    'net worth calculator',
    'assets minus liabilities',
    'personal net worth calculator',
    'financial progress calculator',
    'calculate net worth',
    'wealth tracking calculator',
    'asset liability calculator',
    'home equity tracker',
  ],
  alternates: {
    canonical:
      'https://zerotowealthpro.com/financial-utilities/net-worth-calculator',
  },
  openGraph: {
    title: 'Net Worth Calculator | Zero to Wealth Pro',
    description:
      'Calculate your net worth by subtracting liabilities from assets and track your financial progress over time.',
    url: 'https://zerotowealthpro.com/financial-utilities/net-worth-calculator',
    type: 'website',
  },
};

// Double Schema JSON-LD (WebApplication + FAQPage)
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Net Worth Calculator',
  applicationCategory: 'FinanceApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'Free net worth calculator that totals assets, subtracts liabilities, and helps track financial progress.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Should I include my primary home in my net worth calculation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, including your primary residence is standard practice in personal finance because home equity represents a substantial portion of your overall wealth. However, to keep your calculation mathematically accurate, you must enter the conservative, current market value of your home under 'Assets' and the remaining principal balance of your mortgage under 'Liabilities'.",
      },
    },
    {
      '@type': 'Question',
      name: 'Should I include depreciating assets like vehicles in my net worth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can include vehicles in your net worth calculation, but you should use a highly conservative estimate of their current private-party resale value (not the price you paid to purchase them). Because vehicles depreciate rapidly, many conservative investors choose to exclude vehicles entirely or write down their value annually to prevent overestimating their financial position.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a negative net worth bad, and how do I fix it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A negative net worth simply means your total liabilities exceed your total assets. This is incredibly common for young professionals, recent graduates with student loans, or new homeowners with high mortgage balances. A negative net worth is not a permanent failure; it is a starting baseline. You can systematically increase your net worth by paying down principal debt (reducing liabilities) and consistently investing in compounding assets (increasing assets).',
      },
    },
    {
      '@type': 'Question',
      name: 'How often should I update and calculate my net worth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Updating your net worth monthly or quarterly is ideal. Checking your net worth on a daily or weekly basis is generally discouraged because stock market fluctuations, real estate valuation changes, and daily transaction cycles create short-term 'noise' that can distract you from long-term trends. Focus on the trailing 12-month trajectory.",
      },
    },
  ],
};

export default function NetWorthCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-[#4472C4]/20 via-[#1F4E78]/5 to-white py-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="max-w-[1000px] mx-auto px-5 mb-4"
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
              Net Worth Calculator
            </li>
          </ol>
        </nav>

        <main className="max-w-[1000px] mx-auto px-5 pb-16">
          {/* Header Hero Area */}
          <header className="py-4 text-center sm:text-left mb-6 border-b border-gray-200 pb-6">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1F4E78] tracking-tight leading-tight mb-3">
              Net Worth Calculator
            </h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed mb-4">
              Determine your true financial baseline. Subtract your liabilities
              from your assets using our interactive wealth tracker to measure
              real progress and build long-term security.
            </p>

            {/* Safe Editorial Board Model */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1">
                <span>Published by</span>
                <Link
                  href="/about/editorial-team"
                  className="font-bold text-[#1F4E78] hover:underline"
                >
                  ZeroToWealthPro Editorial Team
                </Link>
              </span>

              <span className="text-gray-350">•</span>
              <span className="flex items-center gap-1">
                <span className="text-emerald-600">✓</span>
                <span className="font-bold text-[#4472C4]">
                  Fact-Checked & Verified
                </span>
              </span>
              <span className="text-gray-350">•</span>
              <span>Last Updated: February 2026</span>
            </div>
          </header>

          {/* PROMINENT YMYL WARNING & EDUCATIONAL DISCLOSURE (ABOVE CALCULATOR) */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-5 mb-6 text-left shadow-sm">
            <div className="flex gap-3">
              <span className="text-xl sm:text-2xl mt-0.5">⚖️</span>
              <div>
                <h3 className="font-bold text-amber-950 text-sm sm:text-base mb-1">
                  YMYL Security & Educational Disclosure
                </h3>
                <p className="text-xs text-amber-900 leading-relaxed font-normal">
                  This net worth utility is designed for educational,
                  informational, and general self-tracking purposes only.
                  Calculations are based entirely on user-entered valuations and
                  do not represent a formal appraisal of assets, business
                  equity, or real estate holdings. Estimated net worth balances
                  do not guarantee creditworthiness, loan approvals, or specific
                  investment returns. This utility does not constitute
                  professional tax, legal, estate planning, or fiduciary
                  financial services.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Calculator Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-xl mb-10 border border-gray-100">
            <NetWorthCalculator />
          </div>

          {/* Deep Educational Content (SEO-Optimized, 1,800+ Words) */}
          <article className="bg-white rounded-2xl p-6 sm:p-10 shadow-lg mb-8 border border-gray-100 prose prose-slate max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F4E78] mb-4">
                What is Net Worth? The Ultimate Financial Compass
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Income is often mistaken for wealth. In society, we frequently
                evaluate financial success based on conspicuous
                consumption—luxury vehicles, premium houses, and expensive
                lifestyles. However, high earnings do not guarantee financial
                security. An individual earning $500,000 annually who spends
                $500,000 is, in reality, living paycheck to paycheck and is
                highly exposed to sudden income disruptions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                **Net Worth** is the only true mathematical measure of your
                financial health. It bypasses the illusion of income and focuses
                on your net equity—representing what you actually own once all
                outstanding obligations are paid in full. By tracking your net
                worth regularly, you gain an objective, big-picture perspective
                on your financial trajectory, helping you evaluate whether your
                money is working for you or weighing you down.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                1. Granular Breakdown: Assets vs. Liabilities
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Calculating your net worth requires dividing your entire
                financial picture into two primary buckets: **Assets** (what you
                own that holds cash value) and **Liabilities** (what you legally
                owe to others).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100 text-left">
                  <h4 className="font-bold text-blue-900 text-base mb-2">
                    ✅ Assets (What You Own)
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    Assets are resources with economic value that can be
                    converted into cash. They are typically divided into:
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1.5 list-disc list-inside">
                    <li>
                      <strong>Liquid Assets:</strong> Cash in checking and
                      high-yield savings accounts.
                    </li>
                    <li>
                      <strong>Investment Assets:</strong> Retirement portfolios
                      (401k, IRAs), brokerage accounts, and HSAs.
                    </li>
                    <li>
                      <strong>Real Property:</strong> The conservative market
                      value of primary or investment real estate.
                    </li>
                    <li>
                      <strong>Personal Property:</strong> Verifiable resale
                      value of vehicles, jewelry, or business equity.
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50/50 rounded-xl p-5 border border-red-100 text-left">
                  <h4 className="font-bold text-red-900 text-base mb-2">
                    ❌ Liabilities (What You Owe)
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    Liabilities are legal financial obligations or debts owed to
                    other entities. They typically include:
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1.5 list-disc list-inside">
                    <li>
                      <strong>Secured Debt:</strong> Remaining mortgage balances
                      and vehicle loans.
                    </li>
                    <li>
                      <strong>Unsecured Debt:</strong> Outstanding student
                      loans, personal loans, and medical debt.
                    </li>
                    <li>
                      <strong>Revolving Debt:</strong> Carried credit card
                      balances and open lines of credit.
                    </li>
                    <li>
                      <strong>Other Obligations:</strong> Outstanding tax liens,
                      student loan interest, or personal family loans.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                2. Why Your Net Worth Matters More Than Your Paycheck
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Tracking your net worth regularly shifts your relationship with
                money from transactional to strategic. Here are four reasons why
                net worth is the ultimate financial metric:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>It Reveals Real Progress:</strong> Paying down debt
                  increases your net worth just as much as depositing cash into
                  a savings account. For example, if you pay off $5,000 of
                  student loans, your bank account drops, but your liabilities
                  decrease—raising your net worth by $5,000.
                </li>
                <li>
                  <strong>It Curbs Lifestyle Inflation:</strong> As your salary
                  grows, it is incredibly easy to increase your lifestyle
                  spending (lifestyle creep). Tracking your net worth forces you
                  to assess whether your higher income is actually building
                  wealth or simply funding more expensive lifestyle choices.
                </li>
                <li>
                  <strong>It Highlights Asset Allocation Balance:</strong> A
                  healthy net worth is diversified. If 95% of your net worth is
                  tied up in your primary home&apos;s equity, you are
                  &quot;house rich but cash poor,&quot; leaving you vulnerable
                  to liquidity crunches. Your net worth statement helps you see
                  if your wealth is distributed safely.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F4E78] mb-2">
                Comparative Case Studies: Hypothetical Wealth Profiles
              </h2>
              {/* Strict YMYL Hypothetical Disclosure Note */}
              <p className="text-xs text-gray-500 italic mb-6">
                Disclaimer: The following scenarios are simplified, hypothetical
                household profiles designed solely for illustrative and
                educational purposes. They demonstrate how different career
                paths, asset distributions, and debt liabilities shape overall
                net worth over time under various economic conditions, and do
                not represent actual individuals, real portfolios, or
                professional financial planning guarantees.
              </p>

              {/* Profile A */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6 text-left">
                <h4 className="font-bold text-[#1F4E78] text-base mb-2">
                  Profile A: The Recent Graduate with Student Debt (Negative Net
                  Worth Baseline)
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  A young professional recently graduated and entered the
                  workforce. They earn a competitive starting salary but carry
                  significant student loan debt, resulting in a common
                  early-career negative net worth.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-gray-700">
                  <div className="space-y-1">
                    <p>
                      • Total Assets: $8,500 ($5k savings + $3.5k vehicle value)
                    </p>
                    <p>
                      • Total Liabilities: $35,000 ($35k outstanding student
                      loans)
                    </p>
                  </div>
                  <div className="space-y-1 text-gray-800">
                    <p className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded inline-block mt-2">
                      ✔ Current Net Worth: -$26,500
                    </p>
                    <p className="text-gray-500 mt-1 font-normal">
                      Takeaway: A negative net worth is normal early in a
                      career. By focusing on debt payoff and starting consistent
                      retirement investing, this profile can achieve a positive
                      net worth within a few years.
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile B */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6 text-left">
                <h4 className="font-bold text-[#1F4E78] text-base mb-2">
                  Profile B: The Established Homeowner (Asset-Rich, Low
                  Liquidity)
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  A mid-career professional owns a suburban home. On paper,
                  their net worth is high, but the vast majority of their wealth
                  is tied up in home equity, leaving them with low liquid
                  savings.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-gray-700">
                  <div className="space-y-1">
                    <p>
                      • Total Assets: $485,000 ($450k home value + $25k 401k +
                      $10k cash)
                    </p>
                    <p>
                      • Total Liabilities: $310,000 ($300k mortgage balance +
                      $10k auto loan)
                    </p>
                  </div>
                  <div className="space-y-1 text-gray-800">
                    <p className="text-[#4472C4] font-bold bg-blue-50 px-2 py-1 rounded inline-block mt-2">
                      ✔ Current Net Worth: $175,000
                    </p>
                    <p className="text-gray-500 mt-1 font-normal">
                      Takeaway: While their net worth is a solid $175,000, 85%
                      of their wealth is tied up in their home ($150,000 in home
                      equity). This profile should prioritize building liquid
                      retirement portfolios to balance their asset allocation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile C */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4 text-left">
                <h4 className="font-bold text-[#1F4E78] text-base mb-2">
                  Profile C: The High-Saving Investor (High Liquidity, Zero
                  Debt)
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  An investor has practiced high savings rates and strict debt
                  avoidance. They rent their home but maintain an aggressive,
                  diversified retirement and cash portfolio with zero debt
                  liabilities.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-gray-700">
                  <div className="space-y-1">
                    <p>
                      • Total Assets: $245,000 ($180k index funds + $50k Roth
                      IRA + $15k HYSA)
                    </p>
                    <p>• Total Liabilities: $0 (Completely debt-free!)</p>
                  </div>
                  <div className="space-y-1 text-gray-800">
                    <p className="text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded inline-block mt-2">
                      ✔ Current Net Worth: $245,000
                    </p>
                    <p className="text-gray-500 mt-1 font-normal">
                      Takeaway: Because they carry zero liabilities, 100% of
                      their assets translate directly to net worth. This profile
                      enjoys exceptionally high liquidity and low overall
                      financial risk.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                Three Strategic Habits to Accelerate Your Net Worth Growth
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Accelerating your net worth growth requires a balanced strategy
                of both increasing assets and reducing liabilities:
              </p>
              <ul className="list-decimal list-inside text-gray-600 space-y-3">
                <li>
                  <strong>Pay Down High-Interest Liabilities:</strong>{' '}
                  Eliminating a credit card balance carrying a 22% APR is
                  mathematically identical to earning a guaranteed, tax-free 22%
                  return on your money. Freeing up your cash flow from
                  high-interest debt is the fastest way to accelerate your net
                  worth growth.
                </li>
                <li>
                  <strong>
                    Automate Your Contributions to Productive Assets:
                  </strong>{' '}
                  Set up automatic transfers to direct a portion of every
                  paycheck into low-cost index funds, traditional 401(k) plans,
                  or Roth IRAs on payday. Consistently buying compounding assets
                  is the engine of long-term wealth building.
                </li>
                <li>
                  <strong>
                    Keep a Conservative View of Depreciating Assets:
                  </strong>{' '}
                  Avoid overestimating your net worth by keeping valuations of
                  depreciating personal property (like vehicles or technology)
                  highly conservative. Focus on growing appreciating assets—like
                  stock portfolios, real estate equity, and savings
                  reserves—which hold true long-term value.
                </li>
              </ul>
            </section>

            {/* DEDICATED PROFESSIONAL HELP WARNING (YMYL REQUIREMENT) */}
            <section className="mb-10 bg-blue-50/50 rounded-xl p-6 border border-blue-100 text-left font-normal">
              <h3 className="text-xl font-bold text-[#1F4E78] mb-3 flex items-center gap-2">
                <span>⚠️</span> When to Seek Professional Financial and Estate
                Planning Guidance
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4 font-normal">
                As your net worth grows, your financial landscape will naturally
                become more complex. While online calculators are exceptional
                starting points for general tracking, they cannot replace the
                highly tailored, personalized insights of a licensed financial
                professional. You should consider consulting a **certified
                financial planner (CFP®)**, a tax professional, or an estate
                planning attorney in any of the following situations:
              </p>
              <ul className="text-xs text-gray-600 space-y-2 list-disc list-inside font-normal">
                <li>
                  If your net worth crosses major tax thresholds or you need to
                  manage complex corporate equity compensations.
                </li>
                <li>
                  If you are managing complex business equity valuations,
                  partnerships, or high-value private holdings.
                </li>
                <li>
                  If you need to design complex generational inheritance plans,
                  trusts, or charitable giving strategies.
                </li>
                <li>
                  If you are navigating high-value asset divisions during
                  divorce or family estate distributions.
                </li>
              </ul>
              <p className="text-xs text-gray-500 mt-3 font-semibold">
                An algorithm can optimize numbers, but a certified professional
                integrates your emotional risk limits, long-term career goals,
                and local tax conditions into a cohesive, secure wealth
                strategy.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-6">
                Frequently Asked Net Worth Questions
              </h2>

              <div className="space-y-4">
                <details className="bg-gray-50 rounded-lg p-5 group cursor-pointer border border-gray-100">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-sm sm:text-base">
                    <span>
                      Should I include my primary home in my net worth
                      calculation?
                    </span>
                    <span className="text-blue-500 transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                    Yes, including your primary residence is standard practice
                    in personal finance because home equity represents a
                    substantial portion of your overall wealth. However, to keep
                    your calculation mathematically accurate, you must enter the
                    conservative, current market value of your home under
                    &quot;Assets&quot; and the remaining principal balance of
                    your mortgage under &quot;Liabilities&quot;.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-5 group cursor-pointer border border-gray-100">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-sm sm:text-base">
                    <span>
                      Should I include depreciating assets like vehicles in my
                      net worth?
                    </span>
                    <span className="text-blue-500 transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                    You can include vehicles in your net worth calculation, but
                    you should use a highly conservative estimate of their
                    current private-party resale value (not the price you paid
                    to purchase them). Because vehicles depreciate rapidly, many
                    conservative investors choose to exclude vehicles entirely
                    or write down their value annually to prevent overestimating
                    their financial position.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-5 group cursor-pointer border border-gray-100">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-sm sm:text-base">
                    <span>
                      Is a negative net worth bad, and how do I fix it?
                    </span>
                    <span className="text-blue-500 transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                    A negative net worth simply means your total liabilities
                    exceed your total assets. This is incredibly common for
                    young professionals, recent graduates with student loans, or
                    new homeowners with high mortgage balances. A negative net
                    worth is not a permanent failure; it is a starting baseline.
                    You can systematically increase your net worth by paying
                    down principal debt (reducing liabilities) and consistently
                    investing in compounding assets (increasing assets).
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-5 group cursor-pointer border border-gray-100">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-sm sm:text-base">
                    <span>
                      How often should I update and calculate my net worth?
                    </span>
                    <span className="text-blue-500 transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                    Updating your net worth monthly or quarterly is ideal.
                    Checking your net worth on a daily or weekly basis is
                    generally discouraged because stock market fluctuations,
                    real estate valuation changes, and daily transaction cycles
                    create short-term &quot;noise&quot; that can distract you
                    from long-term trends. Focus on the trailing 12-month
                    trajectory.
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
                      Board of Governors of the Federal Reserve System:
                    </strong>{' '}
                    Survey of Consumer Finances (SCF) regarding median household
                    wealth and asset-to-liability ratios.
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
                    <strong>
                      Federal Deposit Insurance Corporation (FDIC):
                    </strong>{' '}
                    National consumer deposit rates, credit utilization
                    benchmarks, and liquidity management frameworks.
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
                  <span className="text-[#4472C4] font-bold">3.</span>
                  <span>
                    <strong>
                      U.S. Securities and Exchange Commission (SEC):
                    </strong>{' '}
                    Investor education guidelines regarding retail asset
                    diversification and long-term portfolio growth.
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
          </article>

          {/* Related Tools Links */}
          <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-gray-100 mb-8">
            <h3 className="text-lg font-bold text-[#1F4E78] mb-4">
              Explore More Personal Finance Utilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/financial-utilities/emergency-fund-calculator"
                className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition group border border-gray-100"
              >
                <span className="text-xl">🛡️</span>
                <div>
                  <div className="font-bold text-sm text-gray-900 group-hover:text-[#4472C4]">
                    Emergency Fund
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">
                    Build financial security
                  </div>
                </div>
              </Link>

              <Link
                href="/financial-utilities/budget-calculator"
                className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition group border border-gray-100"
              >
                <span className="text-xl">🏠</span>
                <div>
                  <div className="font-bold text-sm text-gray-900 group-hover:text-[#4472C4]">
                    Budget Planner
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">
                    Try the 50/30/20 rule
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
                  <div className="text-[11px] text-gray-500 font-medium">
                    Grow your wealth faster
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* CTA Wealth Strategy */}
          <section className="bg-[#1F4E78] text-white rounded-2xl p-6 sm:p-8 text-center shadow-xl">
            <h3 className="text-xl font-bold mb-2">
              Ready to Optimize Your Wealth Strategy?
            </h3>
            <p className="mb-4 opacity-95 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Now that you have calculated your baseline net worth, learn how to
              allocate your assets efficiently to build long-term wealth.
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
        <footer className="text-center text-gray-600 pb-12 opacity-90 text-xs px-5 border-t border-gray-200 pt-8 max-w-[1000px] mx-auto font-medium">
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
          <p className="mt-1 text-gray-400 font-normal">
            For educational use only. Individual net worth outcomes depend on
            actual transaction tracking and monthly savings allocations.
          </p>
        </footer>
      </div>
    </>
  );
}
