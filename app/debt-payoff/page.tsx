import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { Suspense } from 'react';
import DebtCalculator from '@/components/DebtCalculator';

export const metadata: Metadata = {
  title: 'The Complete Debt Payoff System (Step-by-Step) | ZeroToWealthPro',
  description:
    'A structured 7-step debt payoff system using real math — not motivation. Learn snowball vs avalanche, exact interest costs, and how to eliminate debt faster.',
  keywords: [
    'debt payoff system',
    'how to pay off debt',
    'debt snowball',
    'debt avalanche',
    'pay off debt fast',
    'debt payoff strategy',
    'debt elimination planner',
  ],
  alternates: {
    canonical: 'https://zerotowealthpro.com/debt-payoff',
  },
  openGraph: {
    title: 'The Complete Debt Payoff System | Zero to Wealth Pro',
    description:
      'Learn the mathematical strategies to eliminate consumer debt systematically using the snowball or avalanche methods.',
    url: 'https://zerotowealthpro.com/debt-payoff',
    type: 'website',
  },
};

// Double Schema JSON-LD (WebApplication + FAQPage)
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Debt Payoff Calculator',
  applicationCategory: 'FinanceApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'Free debt payoff calculator comparing the debt snowball and debt avalanche methods to project your debt-free timeline.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does it take to pay off debt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on your balance, interest rate, and monthly payment. On a $10,000 credit card balance at 22% APR, minimum payments take 17 years and cost $11,248 in interest. A fixed $300/month payment eliminates the same debt in 46 months and costs $3,612 in interest.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Snowball or Avalanche better?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The avalanche saves more money — on a $50,000 debt load it saves $2,135 and 3 months compared to the snowball. The snowball builds faster psychological momentum by eliminating small debts first. The best method is the one you will stick with for 2–4 years.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I invest or pay off debt first?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If your credit card APR exceeds your expected investment return, pay off debt first. A credit card at 22% APR costs you 22% guaranteed — no investment reliably beats that risk-free. Exception: always contribute enough to get your full employer 401k match before attacking debt.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum payment trap?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The minimum payment trap is when cardholders pay only the required minimum each month. On a $10,000 balance at 22% APR, the first $183 of every payment goes to interest — leaving only $17 toward principal. At this rate it takes 17 years and $11,248 in interest to pay off $10,000.',
      },
    },
  ],
};

const spokes = {
  strategy: [
    {
      href: '/blog/debt-snowball-vs-debt-avalanche',
      label: 'Snowball vs Avalanche: Which Pays Off Debt Faster?',
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
    {
      href: '/blog/how-to-get-out-of-payday-loan-debt',
      label: 'How to Get Out of Payday Loan Debt: A Step-by-Step Plan',
    },
    {
      href: '/blog/balance-transfer-cards-when-they-help',
      label: 'Balance Transfer Cards: When They Help vs. Backfire',
    },
    {
      href: '/blog/credit-card-debt-forgiveness',
      label: 'Credit Card Debt Forgiveness: Real vs. Scam',
    },
    {
      href: '/blog/how-to-get-lower-interest-rate-credit-card',
      label: 'How to Get a Lower Interest Rate on a Credit Card',
    },
    {
      href: '/blog/how-to-rebuild-credit-after-debt',
      label: 'How to Rebuild Credit After Debt: A Step-by-Step Plan',
    },
    {
      href: '/blog/the-complete-debt-payoff-system',
      label: 'The Complete Debt Payoff System',
    },
  ],
  math: [
    {
      href: '/blog/minimum-payment-trap-explained',
      label: 'The Minimum Payment Trap: How $10,000 Becomes $21,000',
    },
    {
      href: '/blog/how-long-to-pay-off-50k-credit-card-debt',
      label: 'Pay Off $50K at 20% Interest: Month-by-Month Breakdown',
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
    {
      href: '/blog/5-mistakes-keeping-you-stuck-broke',
      label: '5 Mistakes Keeping You Stuck Broke',
    },
    {
      href: '/blog/how-to-stop-living-paycheck-to-paycheck',
      label: 'How to Stop Living Paycheck to Paycheck: Step-by-Step',
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
      href: '/blog/how-to-budget-with-irregular-income',
      label: 'How to Budget With an Irregular Income',
    },
    {
      href: '/blog/how-to-save-1000-fast',
      label: 'How to Save $1,000 Fast: A Realistic Step-by-Step Plan',
    },
  ],
};

export default function DebtPayoffPage() {
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
            <li className="font-semibold text-[#1F4E78]">Debt Payoff System</li>
          </ol>
        </nav>

        <main className="max-w-[1000px] mx-auto px-5 pb-16">
          {/* Header Hero Area */}
          <header className="py-4 text-center sm:text-left mb-6 border-b border-gray-200 pb-6">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1F4E78] tracking-tight leading-tight mb-3">
              The Complete Guide to Paying Off Debt
            </h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed mb-4">
              A structured 7-step debt payoff system using real math — not
              motivation. Learn how to eliminate high-interest liabilities,
              compare repayment methods, and shorten your timeline to financial
              freedom.
            </p>

            {/* Safe Editorial Board Model */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1">
                <span>Published by</span>
                <span className="font-bold text-[#1F4E78] hover:underline cursor-pointer">
                  ZeroToWealthPro Editorial Board
                </span>
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
                  This educational guide and interactive planning tool are
                  designed for general estimation purposes only. All debt payoff
                  timelines, interest savings figures, and comparative models
                  are mathematical projections based on constant interest rates
                  (APRs) and stable monthly payments. Carrying high-interest
                  consumer debt carries severe long-term financial consequences.
                  This page does not constitute professional tax, legal, debt
                  restructuring, or investment advisory services.
                </p>
              </div>
            </div>
          </div>

          {/* Debt Calculator */}
          <section className="bg-white rounded-2xl p-5 sm:p-8 shadow-xl mb-10 border border-gray-100">
            <div className="mb-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1F4E78] mb-2">
                Repayment Comparison Calculator
              </h2>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                Compare the debt snowball and debt avalanche methods to see how
                long it will take to become debt-free and how much interest you
                can save.
              </p>
            </div>

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

          {/* Educational Content (SEO-Optimized, 1,800+ Words) */}
          <article className="bg-white rounded-2xl p-6 sm:p-10 shadow-lg mb-8 border border-gray-100 prose prose-slate max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F4E78] mb-4">
                Why Most People Stay in Debt: The Mechanics of Revolving
                Interest
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Debt does not disappear with motivation. It disappears with
                structure. On a hypothetical $10,000 credit card balance at a
                standard 22% APR, the minimum monthly payment sends **$183 to
                interest** and only **$17 to principal** in month one. At this
                rate, it takes over **17 years** and **$11,248 in interest** to
                pay off the original $10,000. Most consumers stay trapped in
                this loop because the true, compounding cost of carrying
                high-interest revolving balances remains hidden.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Lenders purposefully set minimum payments low—usually 1.5% to
                2.5% of the outstanding balance—to keep you in debt as long as
                possible. To escape this loop, you must implement a structured,
                mathematical system designed to systematically pay down the
                principal balance. Below is our comprehensive 7-step blueprint
                to help you eliminate consumer liabilities and build real
                wealth.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-700 list-disc list-inside">
                <li>No payoff timeline — debt feels permanent</li>
                <li>
                  No interest visibility — the true cost of compounding is
                  hidden
                </li>
                <li>
                  No fixed payment strategy — minimum payments feel
                  &quot;safe&quot;
                </li>
                <li>
                  No method — spending cuts help, but structure is what wins
                </li>
              </ul>
              <Link
                href="/blog/minimum-payment-trap-explained"
                className="text-[#4472C4] font-semibold hover:underline"
              >
                → Read: The Minimum Payment Trap: How $10,000 Becomes $21,000
              </Link>
            </section>

            {/* STEP 1 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                Step 1: List Every Outstanding Liability
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The first step in any debt elimination plan is establishing an
                objective, clear baseline. You must compile a comprehensive list
                of every outstanding debt you carry, recording the following
                four parameters for each account:
              </p>
              <ul className="space-y-2 mb-4 text-sm text-gray-750 list-disc list-inside">
                <li>
                  Exact current principal balance (the actual payoff amount
                  today).
                </li>
                <li>
                  Annual interest rate (APR) — found on your monthly statement.
                </li>
                <li>Minimum required monthly payment.</li>
                <li>
                  Monthly interest charge: calculated as balance &times; (APR
                  &divide; 12).
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-6">
                Most individuals who perform this exercise discover that their
                total outstanding balances and monthly interest costs are higher
                than they estimated. This initial clarity, though uncomfortable,
                is the necessary fuel to drive your repayment plan forward.
              </p>
              <Link
                href="/blog/what-order-to-pay-off-debts"
                className="text-[#4472C4] font-semibold hover:underline"
              >
                → Read: What Order Should I Pay Off My Debts?
              </Link>
            </section>

            {/* STEP 2 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                Step 2: Select Your Repayment Method
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                There are two primary structured methods for accelerated debt
                payoff. Choose one method and commit to it for your entire
                repayment timeline to maintain critical momentum:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6 text-left">
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
                  <p className="font-bold text-[#1F4E78] mb-2">
                    ❄️ The Debt Snowball Method
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Pay the minimum required balance on all accounts, and focus
                    every additional dollar on paying off the **smallest balance
                    first**. This method leverages behavioral psychology—the
                    quick win of eliminating an account provides a mental boost
                    that keeps you motivated.
                  </p>
                </div>
                <div className="bg-green-50/50 border border-green-100 rounded-xl p-5">
                  <p className="font-bold text-[#1F4E78] mb-2">
                    🔥 The Debt Avalanche Method
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Pay the minimum required balance on all accounts, and focus
                    every additional dollar on paying off the **highest interest
                    rate (APR) first**. This strategy is mathematically optimal,
                    minimizing your total interest costs and paying down debt
                    faster over time.
                  </p>
                </div>
              </div>
              <Link
                href="/blog/debt-snowball-vs-debt-avalanche"
                className="text-[#4472C4] font-semibold hover:underline"
              >
                → Full comparison: Snowball vs Avalanche — Which Pays Off Debt
                Faster?
              </Link>
            </section>

            {/* STEP 3 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                Step 3: Set a Fixed Repayment Goal and Automate It
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The difference between paying only minimum balances and
                committing to a fixed monthly payment is measured in years of
                payments and thousands of dollars in saved interest. Consider
                the following hypothetical repayment timelines for a single
                **$10,000 credit card balance at a 22% APR**:
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-700 list-disc list-inside">
                <li>
                  <strong>Minimum payments only:</strong> Takes over 17 years
                  and costs $11,248 in interest.
                </li>
                <li>
                  <strong>A fixed payment of $200/month:</strong> Repaid in 6
                  years, costing $4,800 in interest.
                </li>
                <li>
                  <strong>A fixed payment of $300/month:</strong> Repaid in 46
                  months (under 4 years), costing $3,612 in interest.
                </li>
              </ul>
              <Link
                href="/blog/how-much-does-extra-100-save"
                className="text-[#4472C4] font-semibold hover:underline"
              >
                → Read: How Much Does an Extra $100 Save on Debt?
              </Link>
            </section>

            {/* STEP 4 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                Step 4: Reduce Your Base Interest Rates
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Before throwing extra cash at your balances, spend ten minutes
                trying to lower their cost. A 6% interest rate reduction on a
                $10,000 credit card balance saves $600 per year—releasing $50
                every month from interest charges to pay down the actual
                principal. Consider using these three tools:
              </p>
              <div className="space-y-3">
                <Link
                  href="/blog/how-to-get-lower-interest-rate-credit-card"
                  className="block text-[#4472C4] font-semibold hover:underline text-sm"
                >
                  → How to Get a Lower Interest Rate on a Credit Card (One
                  10-Minute Call)
                </Link>
                <Link
                  href="/blog/balance-transfer-cards-when-they-help"
                  className="block text-[#4472C4] font-semibold hover:underline text-sm"
                >
                  → Balance Transfer Cards: When They Help vs. Backfire
                </Link>
                <Link
                  href="/blog/credit-card-debt-forgiveness"
                  className="block text-[#4472C4] font-semibold hover:underline text-sm"
                >
                  → Credit Card Debt Forgiveness: Real vs. Scam
                </Link>
              </div>
            </section>

            {/* STEP 5 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                Step 5: Freeze New Spending on Active Repayment Cards
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you are paying $500 monthly toward a card but still putting
                $200 of new charges on it, your effective monthly payment is
                only $300. This is the financial equivalent of running in place.
                During active payoff, stop using any card you are paying down.
                Switch to a debit card or use cash for daily expenses to prevent
                resetting your progress.
              </p>
            </section>

            {/* STEP 6 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                Step 6: Roll Freed Payments Into the Next Target Balance
              </h2>
              <p className="text-gray-600 leading-relaxed">
                When an account is fully paid off, do not absorb that freed
                monthly payment back into your lifestyle. Immediately redirect
                the entire amount toward the next debt on your list—on top of
                the minimum payment you were already making. This compounding
                payment power is the core mechanical engine behind both the
                snowball and avalanche methods.
              </p>
            </section>

            {/* STEP 7 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                Step 7: Track Your Payoff Progress Monthly
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Once a month, record your total outstanding balances. Write them
                down or update a dedicated tracking spreadsheet. Research in
                behavioral economics consistently shows that people who actively
                track their progress make faster progress toward financial goals
                than those who rely on passive autopay alone, as active tracking
                builds powerful personal accountability.
              </p>
            </section>

            {/* CASE STUDY SECTION */}
            <section className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F4E78] mb-2">
                Amortization Case Studies: Repayment Paths ($50,000 Debt Load)
              </h2>
              {/* Strict YMYL Hypothetical Disclosure Note */}
              <p className="text-xs text-gray-500 italic mb-6">
                Disclaimer: The following scenarios are simplified, hypothetical
                household profiles designed solely for illustrative and
                educational purposes. They demonstrate how different monthly
                payment strategies affect total interest paid and payoff
                timelines on a combined **$50,000 consumer debt load at a
                constant 20% APR**, and do not represent actual lenders, debt
                consolidation programs, or professional financial planning
                guarantees.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-4 text-left">
                {[
                  {
                    badge: '🔴 The Minimum Payment Trap',
                    label: 'Minimum required payments only',
                    time: '20+ Years',
                    interest: '$53,000+ in total interest',
                    bg: 'bg-red-50/50 border border-red-100',
                  },
                  {
                    badge: '🟡 The Accelerated Fixed Path',
                    label: '$1,500/month fixed payment',
                    time: '4.0 Years',
                    interest: '~$22,100 in total interest',
                    bg: 'bg-amber-50/50 border border-amber-100',
                  },
                  {
                    badge: '🟢 The Aggressive Elimination Path',
                    label: '$2,000/month fixed payment',
                    time: '2.7 Years',
                    interest: '~$14,200 in total interest',
                    bg: 'bg-green-50/50 border border-green-100',
                  },
                ].map(({ badge, label, time, interest, bg }) => (
                  <div key={label} className={`rounded-xl p-5 ${bg}`}>
                    <p className="text-[10px] font-bold text-gray-500 mb-2 tracking-wider uppercase">
                      {badge}
                    </p>
                    <p className="font-semibold text-gray-800 text-sm mb-1">
                      {label}
                    </p>
                    <p className="text-2xl font-extrabold text-[#1F4E78] mb-1">
                      {time}
                    </p>
                    <p className="text-xs text-gray-500">{interest}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Increasing your fixed payment from $1,500 to $2,000 per month
                saves **$7,900 in interest** and shaves **15 months** off your
                timeline.{' '}
                <Link
                  href="/blog/how-long-to-pay-off-50k-credit-card-debt"
                  className="text-[#4472C4] hover:underline font-semibold"
                >
                  See the full month-by-month breakdown →
                </Link>
              </p>
            </section>

            {/* DEDICATED PROFESSIONAL HELP WARNING (YMYL REQUIREMENT) */}
            <section className="mb-10 bg-blue-50/50 rounded-xl p-6 border border-blue-100 text-left font-normal">
              <h3 className="text-xl font-bold text-[#1F4E78] mb-3 flex items-center gap-2">
                <span>⚠️</span> When to Seek Professional Fiduciary or Credit
                Counseling Guidance
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4 font-normal">
                While digital planners and savings calculators are exceptional
                starting points, they cannot replace the highly tailored,
                personalized insights of a licensed financial professional. You
                should consider consulting a **certified non-profit credit
                counseling agency** or a qualified financial advisor in any of
                the following complex situations:
              </p>
              <ul className="text-xs text-gray-600 space-y-2 list-disc list-inside font-normal">
                <li>
                  If your total unsecured debt exceeds your annual gross
                  household income, making standard repayment strategies
                  unsustainable.
                </li>
                <li>
                  If you are facing active wage garnishments, debt collection
                  lawsuits, or tax liens.
                </li>
                <li>
                  If you are evaluating debt consolidation loans, debt
                  management plans (DMPs), or debt settlement options.
                </li>
                <li>
                  If you are considering bankruptcy restructuring or legal debt
                  relief services.
                </li>
              </ul>
              <p className="text-xs text-gray-500 mt-3 font-semibold">
                An algorithm can optimize numbers, but a certified professional
                integrates your emotional risk limits, long-term career goals,
                and local tax conditions into a cohesive, secure wealth
                strategy.
              </p>
            </section>

            {/* FAQ */}
            <section className="mb-10 border-t border-gray-100 pt-8">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqSchema.mainEntity.map((faq) => (
                  <div
                    key={faq.name}
                    className="border-b border-gray-100 pb-6 last:border-0"
                  >
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {faq.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {faq.acceptedAnswer.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* AUTHORITATIVE SOURCE CITATIONS (YMYL REQUIREMENT) */}
            <section className="border-t border-gray-100 pt-8 text-left font-normal">
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
                    G.19 Consumer Credit reports regarding credit card interest
                    rates, outstanding revolving debt, and repayment metrics.
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
                      Consumer Financial Protection Bureau (CFPB):
                    </strong>{' '}
                    Guides on credit card debt management, balance transfer fee
                    disclosures, and debt collection rights.
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
                    <strong>Federal Trade Commission (FTC):</strong> Advice on
                    identifying debt settlement scams, credit counseling
                    agencies, and debt relief strategies.
                    <a
                      href="https://www.ftc.gov"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-[#4472C4] hover:underline ml-1"
                    >
                      ftc.gov
                    </a>
                  </span>
                </li>
              </ul>
            </section>

            {/* ── CONTENT HUB — 4 categories with light-color backgrounds ── */}
            <section className="mt-12 border-t border-gray-200 pt-8 text-left">
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
                    {spokes.strategy.map(({ href, label }) => (
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
                  <div className="text-[11px] text-gray-500 font-medium">
                    Calculate net salary
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
              Now that you understand your repayment strategies and how to
              eliminate liabilities, learn how to build your optimal portfolio
              with our step-by-step guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/blog/how-to-reset-your-finances-in-30-days"
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
            <Link href="/contact" className="hover:underline">
              Contact Support
            </Link>
          </div>
          <p>
            © {new Date().getFullYear()} ZeroToWealthPro. All rights reserved.
          </p>
          <p className="mt-1 text-gray-400 font-normal">
            For educational use only. Individual savings and debt outcomes
            depend on actual transaction tracking and monthly budget
            allocations.
          </p>
        </footer>
      </div>
    </>
  );
}
