import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';

import KitInlineForm from '@/components/KitInlineForm';

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
  ],
};

// ─── FAQ Schema for Google People Also Ask ────────────────────────────────────
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

// ─── All live spoke articles — sorted into 4 hub categories ──────────────────
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
      href: '/blog/pay-off-50k-credit-card-debt',
      label: 'Pay Off $50K at 20% Interest: Month-by-Month Breakdown',
    },

    {
      href: '/blog/how-much-does-extra-100-save',
      label: 'How Much Does an Extra $100 Save on Debt?',
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
      {/* FAQ structured data for Google People Also Ask */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-[#1F4E78] to-[#4472C4] p-5">
        <div className="max-w-[900px] mx-auto py-12 text-white">
          {/* HERO */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The Complete Guide to Paying Off Debt
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-4">
              A structured 7-step system using real math — not motivation — to
              eliminate debt faster and save thousands in interest.
            </p>

            <Link
              href="/blog/debt-snowball-vs-debt-avalanche"
              className="inline-block bg-white text-[#4472C4] px-8 py-4 rounded-full font-bold hover:scale-105 transition"
            >
              Start With Strategy: Snowball vs Avalanche →
            </Link>
          </section>

          {/* CONTENT WRAPPER */}
          <div className="bg-white text-gray-700 rounded-2xl shadow-xl p-8 space-y-12">
            {/* SECTION 1 */}
            <section>
              <h2 className="text-3xl font-bold text-[#1F4E78] mb-4">
                Why Most People Stay in Debt
              </h2>
              <p className="leading-relaxed mb-4">
                Debt does not disappear with motivation. It disappears with
                structure. On a $10,000 credit card balance at 22% APR, the
                minimum payment sends <strong>$183 to interest</strong> and only{' '}
                <strong>$17 to principal</strong> in month one. At that rate, it
                takes <strong>17 years</strong> and{' '}
                <strong>$11,248 in interest</strong> to pay off $10,000. Most
                people stay stuck because no one showed them this number.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  'No payoff timeline — debt feels permanent',
                  'No interest visibility — the true cost is hidden',
                  'No fixed payment strategy — minimum feels "safe"',
                  'No method — spending cuts help, but structure wins',
                ].map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <Link
                href="/blog/minimum-payment-trap-explained"
                className="text-[#4472C4] font-semibold hover:underline"
              >
                → Read: The Minimum Payment Trap: How $10,000 Becomes $21,000
              </Link>
            </section>

            {/* STEP 1 */}
            <section>
              <h2 className="text-3xl font-bold text-[#1F4E78] mb-4">
                Step 1: List Every Debt
              </h2>
              <p className="leading-relaxed mb-4">
                Write down every debt you carry. For each one record:
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  'Exact current balance (not the original loan amount)',
                  'Interest rate (APR) — found on your monthly statement',
                  'Minimum payment',
                  'Monthly interest charge: balance × (APR ÷ 12)',
                ].map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <p className="leading-relaxed mb-6">
                Most people who do this for the first time discover their total
                debt is higher than estimated — and their monthly interest
                charges are higher than they realized. That discomfort is
                useful.
              </p>
              <Link
                href="/blog/what-order-to-pay-off-debts"
                className="text-[#4472C4] font-semibold hover:underline"
              >
                → Read: What Order Should I Pay Off My Debts?
              </Link>
            </section>

            {/* STEP 2 */}
            <section>
              <h2 className="text-3xl font-bold text-[#1F4E78] mb-4">
                Step 2: Choose Your Method
              </h2>
              <p className="leading-relaxed mb-4">
                Two methods work. Choose one and commit to it for the full
                payoff timeline — switching midway resets momentum.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <p className="font-bold text-[#1F4E78] mb-2">
                    ❄️ Debt Snowball
                  </p>
                  <p className="text-sm text-gray-600">
                    Pay minimums on all accounts. Attack the{' '}
                    <strong>smallest balance</strong> first with every extra
                    dollar. Best for motivation — early wins keep you going.
                  </p>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                  <p className="font-bold text-[#1F4E78] mb-2">
                    🔥 Debt Avalanche
                  </p>
                  <p className="text-sm text-gray-600">
                    Pay minimums on all accounts. Attack the{' '}
                    <strong>highest APR</strong> first with every extra dollar.
                    Saves the most interest — optimal for math-driven payoff.
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
            <section>
              <h2 className="text-3xl font-bold text-[#1F4E78] mb-4">
                Step 3: Set a Fixed Extra Payment and Automate It
              </h2>
              <p className="leading-relaxed mb-4">
                The difference between minimum payments and a fixed extra
                payment is measured in years and thousands of dollars. On a
                $10,000 balance at 22% APR:
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  'Minimum only: 17 years, $11,248 in interest',
                  '$200/month fixed: 6 years, $4,800 in interest',
                  '$300/month fixed: 46 months, $3,612 in interest',
                ].map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <Link
                href="/blog/how-much-does-extra-100-save"
                className="text-[#4472C4] font-semibold hover:underline"
              >
                → Read: How Much Does an Extra $100 Save on Debt?
              </Link>
            </section>

            {/* STEP 4 */}
            <section>
              <h2 className="text-3xl font-bold text-[#1F4E78] mb-4">
                Step 4: Cut the Interest Rate Where Possible
              </h2>
              <p className="leading-relaxed mb-6">
                Before throwing extra money at debt, spend 10 minutes trying to
                reduce its cost. A 6-point APR reduction on a $10,000 balance
                saves $600/year — $50/month freed from interest and redirected
                to principal. Three tools that work:
              </p>
              <div className="space-y-3">
                <Link
                  href="/blog/how-to-get-lower-interest-rate-credit-card"
                  className="block text-[#4472C4] font-semibold hover:underline"
                >
                  → How to Get a Lower Interest Rate on a Credit Card (one
                  10-minute call)
                </Link>
                <Link
                  href="/blog/balance-transfer-cards-when-they-help"
                  className="block text-[#4472C4] font-semibold hover:underline"
                >
                  → Balance Transfer Cards: When They Help vs. Backfire
                </Link>
                <Link
                  href="/blog/credit-card-debt-forgiveness"
                  className="block text-[#4472C4] font-semibold hover:underline"
                >
                  → Credit Card Debt Forgiveness: Real vs. Scam
                </Link>
              </div>
            </section>

            {/* STEP 5 */}
            <section>
              <h2 className="text-3xl font-bold text-[#1F4E78] mb-4">
                Step 5: Stop Adding to Cards You Are Paying Down
              </h2>
              <p className="leading-relaxed">
                If you pay $500/month toward a card and add $200 in new charges,
                your effective payment is $300. You are not attacking debt — you
                are running in place. During payoff, stop using any card you are
                actively paying down. Use a debit card or cash for daily
                expenses.
              </p>
            </section>

            {/* STEP 6 */}
            <section>
              <h2 className="text-3xl font-bold text-[#1F4E78] mb-4">
                Step 6: Roll Every Freed Payment Into the Next Debt
              </h2>
              <p className="leading-relaxed">
                When a debt is fully paid off, do not absorb that payment back
                into your spending. Immediately redirect the full amount toward
                the next debt on your list — on top of whatever you were already
                paying. Your payment power compounds with every debt you
                eliminate. This is the core mechanical principle behind both the
                snowball and avalanche methods.
              </p>
            </section>

            {/* STEP 7 */}
            <section>
              <h2 className="text-3xl font-bold text-[#1F4E78] mb-4">
                Step 7: Track Your Balance Monthly
              </h2>
              <p className="leading-relaxed">
                Once a month, record every balance. Write it down or update a
                spreadsheet. Research in behavioral economics consistently finds
                that people who actively track financial goals make faster
                progress than those on passive autopay alone. Watching the
                number drop creates accountability that autopay cannot
                replicate.
              </p>
            </section>

            {/* REAL EXAMPLE */}
            <section>
              <h2 className="text-3xl font-bold text-[#1F4E78] mb-4">
                Real Example: $50,000 at 20% APR
              </h2>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                {[
                  {
                    badge: '🔴 The trap',
                    label: 'Minimum payments only',
                    time: '20+ years',
                    interest: '$53,000+ in interest',
                    bg: 'bg-red-50 border border-red-200',
                  },
                  {
                    badge: '🟡 The escape ramp',
                    label: '$1,500/month fixed',
                    time: '4 years',
                    interest: '~$22,100 in interest',
                    bg: 'bg-yellow-50 border border-yellow-200',
                  },
                  {
                    badge: '🟢 The fast exit',
                    label: '$2,000/month fixed',
                    time: '2.7 years',
                    interest: '~$14,200 in interest',
                    bg: 'bg-green-50 border border-green-200',
                  },
                ].map(({ badge, label, time, interest, bg }) => (
                  <div key={label} className={`rounded-xl p-5 ${bg}`}>
                    <p className="text-xs font-bold text-gray-500 mb-2">
                      {badge}
                    </p>
                    <p className="font-semibold text-gray-800 mb-1">{label}</p>
                    <p className="text-2xl font-extrabold text-[#1F4E78] mb-1">
                      {time}
                    </p>
                    <p className="text-sm text-gray-500">{interest}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Going from $1,500 to $2,000/month saves{' '}
                <strong className="text-gray-700">$7,900 in interest</strong>{' '}
                and <strong className="text-gray-700">15 months</strong> of
                payments.{' '}
                <Link
                  href="/blog/pay-off-50k-credit-card-debt"
                  className="text-[#4472C4] hover:underline"
                >
                  See the full month-by-month breakdown →
                </Link>
              </p>
            </section>

            {/* EMAIL OPT-IN */}
            <KitInlineForm />

            {/* FAQ */}
            <section>
              <h2 className="text-3xl font-bold text-[#1F4E78] mb-6">
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
                    <p className="text-gray-600 leading-relaxed">
                      {faq.acceptedAnswer.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── CONTENT HUB — 4 categories ─────────────────────────────── */}
            <section className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-2">
                Deep Dive: Debt Payoff Guides
              </h2>
              <p className="text-sm text-gray-500 mb-10">
                Articles with real math, month-by-month breakdowns, and sourced
                data.
              </p>

              <div className="grid md:grid-cols-2 gap-10">
                {/* STRATEGY */}
                <div>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-[#4472C4] mb-4">
                    Strategy
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    {spokes.strategy.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className="block hover:underline hover:text-[#4472C4] transition-colors"
                      >
                        → {label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* MATH & TRAPS */}
                <div>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-[#4472C4] mb-4">
                    Math &amp; Traps
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    {spokes.math.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className="block hover:underline hover:text-[#4472C4] transition-colors"
                      >
                        → {label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* TOOLS & HABITS */}
                <div>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-[#4472C4] mb-4">
                    Tools &amp; Habits
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    {spokes.tools.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className="block hover:underline hover:text-[#4472C4] transition-colors"
                      >
                        → {label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* BUDGETING */}
                <div>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-[#4472C4] mb-4">
                    Budgeting
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    {spokes.budgeting.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className="block hover:underline hover:text-[#4472C4] transition-colors"
                      >
                        → {label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            {/* ── END CONTENT HUB ─────────────────────────────────────────── */}
          </div>
          {/* end bg-white content wrapper */}
        </div>
        {/* end max-w container */}

        {/* DISCLAIMER */}
        <section className="max-w-[900px] mx-auto mt-8 mb-4 px-6">
          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <p className="text-white/80 text-sm leading-relaxed max-w-2xl mx-auto text-center">
              <strong className="text-white">Disclaimer:</strong> This guide is
              for educational purposes only and does not constitute financial
              advice. Results vary based on income, expenses, interest rates,
              and consistency of payments. Always consult a qualified financial
              professional before making significant financial decisions. This
              page may contain affiliate links — we may earn a commission at no
              extra cost to you.
            </p>
          </div>
        </section>

        <div className="mt-4 mb-2 text-center">
          <Link
            href="/"
            className="text-[#eaecf1] text-sm font-medium hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
