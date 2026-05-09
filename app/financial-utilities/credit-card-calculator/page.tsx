import type { Metadata } from 'next';
import Link from 'next/link';
import CreditCardPayoffCalculator from '@/components/CreditCardPayoffCalculator';

export const metadata: Metadata = {
  title: 'Credit Card Payoff Calculator - Free Debt Elimination Tool',
  description:
    'Calculate how long it takes to pay off credit card debt. See the minimum payment trap and discover how much you can save. Free calculator with detailed payoff timeline.',
  keywords: [
    'credit card payoff calculator',
    'credit card debt calculator',
    'minimum payment calculator',
    'debt payoff calculator',
    'credit card interest calculator',
    'how long to pay off credit card',
    'minimum payment trap',
    'debt elimination tool',
  ],
  alternates: {
    canonical:
      'https://zerotowealthpro.com/financial-utilities/credit-card-calculator',
  },
  openGraph: {
    title: 'Credit Card Payoff Calculator | Zero to Wealth Pro',
    description:
      "Calculate your credit card payoff timeline and see how much interest you'll pay. Avoid the minimum payment trap.",
    url: 'https://zerotowealthpro.com/financial-utilities/credit-card-calculator',
    type: 'website',
  },
};

const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Credit Card Payoff Calculator',
  applicationCategory: 'FinanceApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'Free credit card payoff calculator showing minimum payment trap and debt elimination timeline.',
};

const faqSchemaData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What happens if I only make minimum payments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "You'll stay in debt for decades and pay 2-3x what you originally borrowed in interest. Credit card companies love minimum payments because it maximizes their profit.",
      },
    },
    {
      '@type': 'Question',
      name: 'Should I pay off credit cards or invest?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Pay off credit cards first. With APRs of 15-25%, you're losing money faster than you can realistically earn it investing. The guaranteed return of eliminating 18% interest beats uncertain stock market returns.",
      },
    },
    {
      '@type': 'Question',
      name: 'Will paying off credit cards hurt my credit score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, paying off credit cards improves your credit score by lowering your credit utilization ratio. Keep the accounts open after paying them off to maintain your credit history length.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I lower my credit card interest rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Call your credit card company and ask. If you have good payment history, they often reduce your rate. You can also transfer to a 0% APR balance transfer card, but watch out for fees.',
      },
    },
  ],
};

export default function CreditCardCalculatorPage() {
  const lastUpdated = 'January 15, 2026';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2]">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="max-w-[900px] mx-auto px-5 pt-4"
        >
          <ol className="flex items-center space-x-2 text-xs text-white/80">
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
            <li>Credit Card Calculator</li>
          </ol>
        </nav>

        <main className="max-w-[900px] mx-auto px-5 pb-16">
          {/* Hero */}
          <header className="py-8 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg leading-tight mb-3">
              Credit Card Payoff Calculator
            </h1>
            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
              See how long it takes to pay off your credit cards and escape the
              minimum payment trap
            </p>
            <p className="text-xs text-white/70 mt-2">
              Last Updated: {lastUpdated}
            </p>
          </header>

          {/* Calculator */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl mb-6">
            <CreditCardPayoffCalculator />
          </div>

          {/* ⚠️ YMYL Disclaimer - PROMINENT */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 sm:p-6 rounded-xl mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Important Debt Relief Disclaimer
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  This calculator is for{' '}
                  <strong>educational and illustrative purposes only</strong>{' '}
                  and does not constitute financial, legal, or debt counseling
                  advice. Calculations are
                  <strong>
                    {' '}
                    estimates based on the information you provide
                  </strong>{' '}
                  and actual payoff timelines may vary based on changes in
                  interest rates, fees, payment history, and creditor policies.{' '}
                  <strong>
                    Consult a qualified financial advisor, credit counselor, or
                    debt relief professional
                  </strong>{' '}
                  for personalized advice tailored to your specific financial
                  situation.
                </p>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <article className="bg-white rounded-2xl p-6 md:p-8 shadow-xl mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1F4E78] mb-6">
              Understanding Credit Card Debt
            </h2>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-[#1F4E78] mb-3">
                The Minimum Payment Trap
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Credit card companies set minimum payments deliberately
                low—usually 1-3% of your balance. This keeps you in debt longer
                and maximizes the interest they collect from you.
              </p>
              <p className="text-sm text-gray-500 italic mb-4">
                <strong>Source:</strong> Consumer Financial Protection Bureau
                (CFPB) guidelines on minimum payment warnings (Credit CARD Act
                of 2009)
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Example:</strong> On a $5,000 balance at 18.99% APR:
                </p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>
                    • Minimum payments (2%):{' '}
                    <strong>30+ years to pay off</strong>
                  </li>
                  <li>
                    • Total interest paid: <strong>Over $7,000</strong>
                  </li>
                  <li>
                    • You'll pay almost <strong>2.5x what you borrowed</strong>
                  </li>
                </ul>
              </div>

              <p className="text-gray-600 leading-relaxed">
                By paying just $50-100 more than the minimum each month, you can
                save thousands of dollars and get out of debt years sooner.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-[#1F4E78] mb-4">
                How Credit Card Interest Works
              </h3>

              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Daily Compounding
                  </h4>
                  <p className="text-sm text-gray-700">
                    Most credit cards charge interest daily, not monthly. Your
                    APR is divided by 365, then applied to your balance each
                    day. This means interest compounds faster than you think.
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">
                    Average Daily Balance
                  </h4>
                  <p className="text-sm text-gray-700">
                    Credit cards typically use your average daily balance to
                    calculate interest. Every purchase you make increases this
                    average, which is why carrying a balance is so expensive.
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">
                    Grace Period
                  </h4>
                  <p className="text-sm text-gray-700">
                    If you pay your full balance by the due date, you avoid
                    interest entirely. But once you carry a balance, you lose
                    the grace period on new purchases too.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-[#1F4E78] mb-4">
                Strategies to Pay Off Credit Card Debt Faster
              </h3>

              <div className="space-y-3">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    1. Pay More Than the Minimum
                  </h4>
                  <p className="text-sm text-gray-600">
                    Even an extra $25-50 per month makes a huge difference. Our
                    calculator shows exactly how much you'll save.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    2. Use the Debt Avalanche Method
                  </h4>
                  <p className="text-sm text-gray-600">
                    If you have multiple cards, pay minimums on all but focus
                    extra payments on the highest interest rate card first.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    3. Stop Using the Card
                  </h4>
                  <p className="text-sm text-gray-600">
                    Freeze it, hide it, or cut it up. You can't get out of a
                    hole you're still digging.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    4. Consider a Balance Transfer
                  </h4>
                  <p className="text-sm text-gray-600">
                    A 0% APR balance transfer card can save thousands in
                    interest, but only if you pay it off during the promotional
                    period.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    5. Negotiate a Lower Rate
                  </h4>
                  <p className="text-sm text-gray-600">
                    Call your credit card company and ask for a lower APR. If
                    you have good payment history, they often approve it.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-[#1F4E78] mb-4">
                Real-World Example
              </h3>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-4">
                  $5,000 Credit Card Debt at 18.99% APR
                </h4>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow">
                    <div className="text-sm text-gray-600 mb-2">
                      Minimum Only (2%)
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <strong className="text-red-600">30+ years</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest:</span>
                        <strong className="text-red-600">$7,000+</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Total:</span>
                        <strong>$12,000+</strong>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow">
                    <div className="text-sm text-gray-600 mb-2">$200/Month</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <strong className="text-blue-600">2.4 years</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest:</span>
                        <strong className="text-blue-600">$1,155</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Total:</span>
                        <strong>$6,155</strong>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow">
                    <div className="text-sm text-gray-600 mb-2">$300/Month</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <strong className="text-green-600">1.5 years</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest:</span>
                        <strong className="text-green-600">$704</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Total:</span>
                        <strong>$5,704</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>By paying $300/month instead of minimums:</strong>
                    <br />
                    Save over $6,000 in interest and get out of debt 28+ years
                    faster!
                  </p>
                </div>
              </div>
            </section>

            {/* ⚠️ NEW: Debt Relief Warning */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-[#1F4E78] mb-4">
                ⚠️ Warning: Debt Relief Scams
              </h3>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 sm:p-6 rounded-xl">
                <p className="text-sm text-gray-700 mb-4">
                  Be cautious of companies promising quick debt relief. The FTC
                  warns about these
                  <strong> red flags</strong>:
                </p>
                <ul className="text-sm text-gray-700 space-y-2 ml-4">
                  <li>• Guarantees to eliminate your debt completely</li>
                  <li>• Asks for upfront fees before providing services</li>
                  <li>
                    • Tells you to stop paying creditors (can damage credit)
                  </li>
                  <li>• Claims to be "government-approved" (misleading)</li>
                  <li>• Pressure tactics to sign up immediately</li>
                </ul>
                <p className="text-xs text-gray-500 mt-4 italic">
                  <strong>Source:</strong> FTC.gov - "Debt Relief Services: What
                  to Know Before You Sign Up"
                </p>
              </div>
            </section>

            {/* ⚠️ NEW: When to Seek Professional Help */}
            <section className="mb-8">
              <h3 className="text-xl font-semibold text-[#1F4E78] mb-4">
                ⚠️ When to Seek Professional Debt Help
              </h3>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 sm:p-6 rounded-xl">
                <p className="text-sm text-gray-700 mb-4">
                  This calculator provides general estimates.{' '}
                  <strong>
                    Consult a qualified credit counselor, debt relief
                    professional, or bankruptcy attorney
                  </strong>{' '}
                  if you:
                </p>
                <ul className="text-sm text-gray-700 space-y-2 ml-4">
                  <li>• Can't make minimum payments on multiple accounts</li>
                  <li>• Are receiving collection calls or letters</li>
                  <li>• Have debt exceeding 50% of your annual income</li>
                  <li>• Are considering debt settlement or bankruptcy</li>
                  <li>• Have been denied for balance transfer cards</li>
                  <li>• Are using credit cards to pay for basic necessities</li>
                </ul>
                <p className="text-xs text-gray-500 mt-4 italic">
                  <strong>Free Resources:</strong> NFCC.org (National Foundation
                  for Credit Counseling), 211.org (local assistance), FTC.gov
                  (debt rights), ConsumerFinance.gov
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-[#1F4E78] mb-4">
                Common Questions
              </h3>

              <div className="space-y-4">
                <details className="bg-gray-50 rounded-lg p-4">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    What happens if I only make minimum payments?
                  </summary>
                  <p className="text-sm text-gray-600 mt-2">
                    You'll stay in debt for decades and pay 2-3x what you
                    originally borrowed in interest. Credit card companies love
                    minimum payments because it maximizes their profit. Always
                    pay more than the minimum if possible.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-4">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    Should I pay off credit cards or invest?
                  </summary>
                  <p className="text-sm text-gray-600 mt-2">
                    Pay off credit cards first. With APRs of 15-25%, you're
                    losing money faster than you can realistically earn it
                    investing. The guaranteed "return" of eliminating 18%
                    interest beats uncertain stock market returns.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-4">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    Will paying off credit cards hurt my credit score?
                  </summary>
                  <p className="text-sm text-gray-600 mt-2">
                    No, paying off credit cards improves your credit score by
                    lowering your credit utilization ratio. Keep the accounts
                    open after paying them off to maintain your credit history
                    length.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-4">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    How can I lower my credit card interest rate?
                  </summary>
                  <p className="text-sm text-gray-600 mt-2">
                    Call your credit card company and ask. If you have good
                    payment history, they often reduce your rate to keep you as
                    a customer. You can also transfer to a 0% APR balance
                    transfer card, but watch out for fees and promotional period
                    deadlines.
                  </p>
                </details>
              </div>
            </section>

            {/* ⚠️ NEW: Author/Review Attribution */}
            <section className="mt-8 pt-8 border-t border-gray-200">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#4472C4] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    ZW
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Reviewed by ZeroToWealthPro Team
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Last Updated: <strong>{lastUpdated}</strong>
                    </p>
                    <p className="text-xs text-gray-500">
                      Our content is reviewed regularly for accuracy and updated
                      to reflect current financial best practices. We follow
                      editorial standards for YMYL (Your Money Your Life)
                      content to ensure reliability.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </article>

          {/* Related Tools */}
          <section className="bg-white rounded-2xl p-6 md:p-8 shadow-xl mb-6">
            <h3 className="text-xl font-bold text-[#1F4E78] mb-4">
              Related Financial Calculators
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link
                href="/debt-payoff"
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
              >
                <span className="text-2xl">🎯</span>
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-[#4472C4]">
                    Debt Payoff Calculator
                  </div>
                  <div className="text-xs text-gray-600">
                    Pay off all debts faster
                  </div>
                </div>
              </Link>

              <Link
                href="/financial-utilities/loan-calculator"
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
              >
                <span className="text-2xl">🚗</span>
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-[#4472C4]">
                    Loan Calculator
                  </div>
                  <div className="text-xs text-gray-600">
                    Calculate any loan
                  </div>
                </div>
              </Link>

              <Link
                href="/financial-utilities/compound-interest"
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
              >
                <span className="text-2xl">💰</span>
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-[#4472C4]">
                    Investment Calculator
                  </div>
                  <div className="text-xs text-gray-600">Grow your wealth</div>
                </div>
              </Link>

              <Link
                href="/financial-utilities"
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
              >
                <span className="text-2xl">🧮</span>
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-[#4472C4]">
                    All Tools
                  </div>
                  <div className="text-xs text-gray-600">Explore more</div>
                </div>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-[#1F4E78] text-white rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">
              Ready to Eliminate Credit Card Debt?
            </h3>
            <p className="mb-6 opacity-90 text-sm sm:text-base">
              Use our complete debt payoff system to eliminate all your debts
              faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/debt-payoff"
                className="bg-white text-[#1F4E78] px-6 py-3 rounded-full font-bold hover:scale-105 transition"
              >
                Complete Debt Payoff Guide →
              </Link>
              <Link
                href="/blog/minimum-payment-trap-explained"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-[#1F4E78] transition"
              >
                Learn About Minimum Payments
              </Link>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="text-center text-white pb-8 opacity-80 text-xs px-5">
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
          <p className="mt-1 text-xs opacity-60">
            Not financial or debt counseling advice. For educational purposes
            only. Consult a qualified professional for personalized debt relief
            guidance.
          </p>
        </footer>
      </div>
    </>
  );
}
