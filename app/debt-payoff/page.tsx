import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Debt Payoff Guide (Step-By-Step System) | Debt Freedom Guide',
  description:
    'Complete step-by-step guide to paying off debt using Snowball or Avalanche strategies. Learn timelines, interest math, and how to get debt free faster.',
  keywords: [
    'debt payoff strategy',
    'how to pay off debt',
    'debt snowball',
    'debt avalanche',
    'pay off debt fast',
  ],
};

export default function DebtPayoffPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] p-5">
      <div className="max-w-[900px] mx-auto py-12 text-white">
        {/* HERO */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            The Complete Guide to Paying Off Debt
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            A structured, step-by-step system using real math — not motivation —
            to eliminate debt faster and save thousands in interest.
          </p>

          <Link
            href="#calculator"
            className="inline-block bg-white text-[#4472C4] px-8 py-4 rounded-full font-bold hover:scale-105 transition"
          >
            Calculate Your Payoff Timeline →
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
              structure. Most people stay stuck because they only make minimum
              payments — which mostly cover interest.
            </p>

            <ul className="space-y-2">
              <li>• No payoff timeline</li>
              <li>• No interest visibility</li>
              <li>• No clear strategy</li>
              <li>• Emotional decision-making</li>
            </ul>

            <div className="mt-6">
              <Link
                href="/blog/minimum-payment-trap"
                className="text-[#4472C4] font-semibold hover:underline"
              >
                → Read: The Minimum Payment Trap Explained
              </Link>
            </div>
          </section>

          {/* SECTION 2 */}
          <section>
            <h2 className="text-3xl font-bold text-[#1F4E78] mb-4">
              Step 1: List Every Debt
            </h2>
            <p className="leading-relaxed mb-4">Write down:</p>

            <ul className="space-y-2">
              <li>• Total balance</li>
              <li>• Interest rate (APR)</li>
              <li>• Minimum payment</li>
              <li>• Due date</li>
            </ul>

            <p className="mt-4">
              Once you see the full picture, you can calculate your real payoff
              timeline.
            </p>

            <div className="mt-6">
              <Link
                href="/blog/how-long-to-pay-off-50k"
                className="text-[#4472C4] font-semibold hover:underline"
              >
                → Example: How Long to Pay Off $50K?
              </Link>
            </div>
          </section>

          {/* SECTION 3 */}
          <section>
            <h2 className="text-3xl font-bold text-[#1F4E78] mb-6">
              Step 2: Choose Your Strategy
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-[#4472C4]">
                  Debt Snowball
                </h3>
                <p>Pay smallest balances first for quick psychological wins.</p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-2 text-[#4472C4]">
                  Debt Avalanche
                </h3>
                <p>
                  Pay highest interest rates first to minimize total interest
                  paid.
                </p>
              </div>

              <Link
                href="/blog/debt-snowball-vs-avalanche"
                className="text-[#4472C4] font-semibold hover:underline"
              >
                → Full Comparison: Snowball vs Avalanche
              </Link>
            </div>
          </section>

          {/* SECTION 4 */}
          <section>
            <h2 className="text-3xl font-bold text-[#1F4E78] mb-4">
              Step 3: Increase Payment Power
            </h2>

            <ul className="space-y-2">
              <li>• Cut unnecessary expenses</li>
              <li>• Redirect bonuses & tax refunds</li>
              <li>• Increase income</li>
              <li>• Automate extra payments</li>
            </ul>
          </section>

          {/* REAL EXAMPLE */}
          <section>
            <h2 className="text-3xl font-bold text-[#1F4E78] mb-4">
              Real Example
            </h2>

            <div className="bg-gray-100 rounded-xl p-6 space-y-3">
              <p className="font-semibold">$50,000 at 19% APR</p>

              <p>
                If you only make minimum payments (around 2% of the balance), it
                could take <span className="font-semibold">25+ years</span> to
                pay off and cost nearly{' '}
                <span className="font-semibold">double</span> what you borrowed.
              </p>

              <p>
                But if you commit to{' '}
                <span className="font-semibold">$1,400 per month</span>
                <br />
                using the Avalanche method, you could eliminate it in
                <span className="font-semibold"> around 4–5 years</span>.
              </p>
            </div>
          </section>

          {/* CALCULATOR CTA */}
          <section
            id="calculator"
            className="text-center bg-[#1F4E78] text-white rounded-xl p-10"
          >
            <h2 className="text-3xl font-bold mb-4">
              Stop Guessing. See Your Exact Payoff Date.
            </h2>
            <p className="mb-6 opacity-90">
              Compare Snowball vs Avalanche with real numbers instantly.
            </p>

            <a
              href="https://zerowealthacademy.gumroad.com/l/DebtCalculatorPlus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#1F4E78] px-8 py-4 rounded-full font-bold hover:scale-105 transition"
            >
              Get Debt Calculator Plus →
            </a>
          </section>

          {/* FAQ SECTION */}
          <section>
            <h2 className="text-3xl font-bold text-[#1F4E78] mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold">
                  How long does it take to pay off debt?
                </h3>
                <p>
                  It depends on balance, interest rate, and monthly payments.
                  Increasing payments drastically reduces total time.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  Is Snowball or Avalanche better?
                </h3>
                <p>
                  Avalanche saves more money. Snowball improves motivation. The
                  best strategy is the one you stick to.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  Should I invest or pay off debt first?
                </h3>
                <p>
                  If interest rates exceed expected investment returns,
                  prioritize debt payoff first.
                </p>
              </div>
            </div>
          </section>

          {/* SUPPORTING GUIDES / CLUSTER HUB */}
          <section className="bg-white rounded-2xl p-8 shadow-xl mt-16">
            <h2 className="text-2xl font-bold text-[#1F4E78] mb-8">
              Deep Dive: Debt Payoff Guides
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
              {/* STRATEGY */}
              <div>
                <h3 className="text-lg font-semibold text-[#4472C4] mb-4">
                  Strategy
                </h3>
                <div className="space-y-3 text-gray-600">
                  <Link
                    href="/blog/how-to-pay-off-debt-fast"
                    className="block hover:underline"
                  >
                    → How to Pay Off Debt Fast
                  </Link>
                  <Link
                    href="/blog/debt-snowball-vs-avalanche"
                    className="block hover:underline"
                  >
                    → Snowball vs Avalanche
                  </Link>
                  <Link
                    href="/blog/is-it-better-to-invest-or-pay-off-debt"
                    className="block hover:underline"
                  >
                    → Invest or Pay Off Debt First?
                  </Link>
                  <Link
                    href="/blog/how-much-extra-payment-saves"
                    className="block hover:underline"
                  >
                    → How Much Does an Extra $100 Save?
                  </Link>
                </div>
              </div>

              {/* PSYCHOLOGY */}
              <div>
                <h3 className="text-lg font-semibold text-[#4472C4] mb-4">
                  Psychology & Habits
                </h3>
                <div className="space-y-3 text-gray-600">
                  <Link
                    href="/blog/minimum-payment-trap"
                    className="block hover:underline"
                  >
                    → The Minimum Payment Trap
                  </Link>
                  <Link
                    href="/blog/debt-payoff-psychology"
                    className="block hover:underline"
                  >
                    → The Psychology of Paying Off Debt
                  </Link>
                  <Link
                    href="/blog/how-to-stop-using-credit-cards"
                    className="block hover:underline"
                  >
                    → How to Stop Using Credit Cards
                  </Link>
                </div>
              </div>

              {/* MATH & TOOLS */}
              <div>
                <h3 className="text-lg font-semibold text-[#4472C4] mb-4">
                  Math & Tools
                </h3>
                <div className="space-y-3 text-gray-600">
                  <Link
                    href="/blog/credit-card-interest-explained"
                    className="block hover:underline"
                  >
                    → Credit Card Interest Explained
                  </Link>
                  <Link
                    href="/blog/how-long-to-pay-off-50k"
                    className="block hover:underline"
                  >
                    → How Long to Pay Off $50K?
                  </Link>
                  <Link
                    href="/blog/debt-payoff-timeline-calculator-guide"
                    className="block hover:underline"
                  >
                    → Debt Payoff Calculator Guide
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="mt-2 mb-2 text-center">
          <Link href="/" className="text-[#eaecf1] text-sm font-medium hover:underline">
            ← Back to Home
          </Link>
        </div>


    </div>
  );
}
