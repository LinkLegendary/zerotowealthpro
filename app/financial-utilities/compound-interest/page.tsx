import type { Metadata } from 'next';
import Link from 'next/link';
import CompoundInterestCalculator from '@/components/CompoundInterestCalculator';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator - Free Investment Growth Planner (2026)',
  description: 'Use our free compound interest calculator with monthly contributions to model your portfolio growth. See the snowball effect of compounding over time with custom case studies.',
  keywords: [
    'compound interest calculator',
    'investment calculator',
    'savings calculator',
    'retirement planning',
    'compound interest formula',
    'snowball wealth builder',
    'portfolio growth planner',
    'future value calculator',
  ],
  alternates: {
    canonical: 'https://zerotowealthpro.com/financial-utilities/compound-interest',
  },
  openGraph: {
    title: 'Compound Interest Calculator | Zero to Wealth Pro',
    description: 'Calculate how your investments grow over time. Explore the exponential growth of compound interest with monthly contributions.',
    url: 'https://zerotowealthpro.com/financial-utilities/compound-interest',
    type: 'website',
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Compound Interest Calculator",
  "applicationCategory": "FinanceApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free investment calculator that models future portfolio values using compounding interest schedules and periodic monthly contributions."
};

export default function CompoundInterestPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-[#4472C4]/20 via-[#1F4E78]/5 to-white py-8">
        
        {/* Breadcrumb - Keep minimal at top */}
        <nav aria-label="Breadcrumb" className="max-w-[1000px] mx-auto px-5 mb-6">
          <ol className="flex items-center space-x-2 text-xs text-gray-600">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><span>/</span></li>
            <li><Link href="/financial-utilities" className="hover:underline">Utilities</Link></li>
            <li><span>/</span></li>
            <li className="font-semibold text-[#1F4E78]">Compound Interest</li>
          </ol>
        </nav>

        <main className="max-w-[1000px] mx-auto px-5 pb-16">
          
          {/* Hero Section */}
          <header className="py-6 text-center sm:text-left mb-6">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1F4E78] tracking-tight leading-tight mb-3">
              Compound Interest Calculator
            </h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed">
              Calculate your portfolio growth in seconds. See the exponential power of compounding interest combined with monthly contributions. This free, professional planning tool requires no signup.
            </p>
          </header>

          {/* Calculator Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-xl mb-8 border border-gray-100">
            <CompoundInterestCalculator />
          </div>

          {/* ============================================
              OPTIONAL: EMAIL CAPTURE (READY TO ACTIVATE)
              Keep styled for light mode
              ============================================ */}
          {/* 
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md mb-8 border-2 border-[#4472C4]">
            <div className="text-center max-w-xl mx-auto">
              <h3 className="text-xl font-bold text-[#1F4E78] mb-2">
                📧 Save This Investment Plan
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Receive a clean PDF breakdown of your compounding schedule, plus monthly wealth-building insights directly in your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] text-gray-900 bg-white"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#4472C4] hover:bg-[#1F4E78] text-white px-6 py-3 rounded-lg font-bold transition whitespace-nowrap cursor-pointer"
                >
                  Send My Plan
                </button>
              </form>
            </div>
          </div>
          */}

          {/* Deep Educational Content (SEO-Optimized, 1,700+ Words) */}
          <article className="bg-white rounded-2xl p-6 sm:p-10 shadow-lg mb-8 border border-gray-100 prose prose-slate max-w-none">
            
            <section className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F4E78] mb-4">
                The Power of Compounding: How Money Generates Money
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Albert Einstein reportedly called compound interest the &quot;eighth wonder of the world,&quot; famously adding, &quot;He who understands it, earns it; he who doesn&apos;t, pays it.&quot; While this quote is often repeated in personal finance circles, the mathematics underlying it are incredibly real and represent the single most reliable path to long-term wealth creation.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Unlike simple interest, which only pays returns on your original principal, **compound interest** calculates returns on both your initial investment and all the accumulated returns from previous periods. It creates a snowball effect: as your investment grows, the amount of interest you earn increases, accelerating your portfolio growth over time.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                The Mathematics of Compound Interest
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To truly harness compound interest, you need to understand the math that drives it. The standard compound interest formula for a single lump-sum investment is:
              </p>
              
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-250 mb-6">
                <div className="text-center font-mono text-xl sm:text-2xl mb-4 font-extrabold text-[#1F4E78]">
                  A = P(1 + r/n)<sup>nt</sup>
                </div>
                <p className="text-sm text-gray-700 font-bold mb-3">Where each variable represents:</p>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-600">
                  <div className="flex gap-2">
                    <dt className="font-bold text-[#1F4E78] min-w-[24px]">A</dt>
                    <dd>= The final amount of money accumulated (Future Value)</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-bold text-[#1F4E78] min-w-[24px]">P</dt>
                    <dd>= The principal investment amount (Initial Deposit)</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-bold text-[#1F4E78] min-w-[24px]">r</dt>
                    <dd>= The annual interest rate (decimal, e.g., 8% = 0.08)</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-bold text-[#1F4E78] min-w-[24px]">n</dt>
                    <dd>= The number of times interest compounds per year</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-bold text-[#1F4E78] min-w-[24px]">t</dt>
                    <dd>= The total number of years the money is left to grow</dd>
                  </div>
                </dl>
              </div>

              <h3 className="text-lg font-bold text-[#1F4E78] mb-2">Discrete vs. Continuous Compounding</h3>
              <p className="text-gray-600 leading-relaxed">
                The frequency of compounding (**n**) determines how often interest is calculated and added to the principal. The more frequently your interest compounds—whether annually, semi-annually, quarterly, monthly, or daily—the faster your wealth builds. Continuous compounding takes this to the mathematical limit, where interest is constantly calculated and added to the principal using the constant *e* (Euler&apos;s number). For most retirement accounts and index funds, compounding is modeled on a daily or monthly basis, which closely mirrors continuous compounding.
              </p>
            </section>


                        <section className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F4E78] mb-2">
                Comparative Case Studies: The High Cost of Delay
              </h2>
              {/* Strict YMYL Hypothetical Disclosure Note */}
              <p className="text-xs text-gray-500 italic mb-6">
                Disclaimer: The following scenarios are simplified, hypothetical investor profiles created solely for illustrative and educational purposes. They are intended to demonstrate mathematical compounding principles under constant conditions and do not represent actual historical performances, real individuals, or specific investment product results.
              </p>

              {/* Profile A */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6 text-left">
                <h4 className="font-bold text-[#1F4E78] text-base mb-2">
                  Profile A: The Early Investor (Starting at Age 22)
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  In this hypothetical model, an investor begins saving immediately upon entering the workforce. They deposit an initial $5,000 lump sum and commit to contributing **$300/month** until reaching retirement at age 65 (a 43-year duration).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-gray-700">
                  <div className="space-y-1">
                    <p>• Initial Deposit: $5,000</p>
                    <p>• Monthly Contributions: $300</p>
                    <p>• Total Out-of-Pocket Invested: $159,800</p>
                  </div>
                  <div className="space-y-1 text-gray-800">
                    <p className="text-emerald-750 font-bold bg-emerald-50 px-2 py-1 rounded inline-block mt-2">
                      ✔ Projected Portfolio Value: $1,402,685
                    </p>
                    <p className="text-blue-600">• Compound Growth Earned: $1,242,885 (88% of final portfolio)</p>
                  </div>
                </div>
              </div>

              {/* Profile B */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6 text-left">
                <h4 className="font-bold text-[#1F4E78] text-base mb-2">
                  Profile B: The Delayed Investor (Starting at Age 32)
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  This model illustrates the impact of a ten-year delay. The investor starts at age 32, using the exact same $5,000 initial lump sum and contributing the same **$300/month** until age 65 (a 33-year duration).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-gray-700">
                  <div className="space-y-1">
                    <p>• Initial Deposit: $5,000</p>
                    <p>• Monthly Contributions: $300</p>
                    <p>• Total Out-of-Pocket Invested: $123,800</p>
                  </div>
                  <div className="space-y-1 text-gray-800">
                    <p className="text-amber-750 font-bold bg-amber-50 px-2 py-1 rounded inline-block mt-2">
                      ✔ Projected Portfolio Value: $601,310
                    </p>
                    <p className="text-red-600">• The 10-Year Cost of Waiting: -$801,375 (A 57% reduction in final wealth due to lost compounding periods)</p>
                  </div>
                </div>
              </div>

              {/* Profile C */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4 text-left">
                <h4 className="font-bold text-[#1F4E78] text-base mb-2">
                  Profile C: The Catch-Up Investor (Starting at Age 42 with Double Contributions)
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  This model shows a common scenario where an individual starts late at age 42. Attempting to catch up, they double their efforts by depositing a $10,000 initial lump sum and contributing **$600/month** until age 65 (a 23-year duration).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-gray-700">
                  <div className="space-y-1">
                    <p>• Initial Deposit: $10,000</p>
                    <p>• Monthly Contributions: $600</p>
                    <p>• Total Out-of-Pocket Invested: $175,600 (The highest principal invested among all profiles)</p>
                  </div>
                  <div className="space-y-1 text-gray-800">
                    <p className="text-red-750 font-bold bg-red-50 px-2 py-1 rounded inline-block mt-2">
                      ✔ Projected Portfolio Value: $517,815
                    </p>
                    <p className="text-red-600">• Takeaway: Despite investing more principal out-of-pocket, Profile C finishes with less than Profile A due to having 20 fewer years of compounding.</p>
                  </div>
                </div>
              </div>
            </section>












            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                The Hidden Wealth Killers: Inflation and Fees
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                While compounding works to expand your wealth, two hidden elements actively work to erode it: inflation and investment management fees.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                **Inflation** reduces the purchasing power of your money over time. While your portfolio may grow to $1,000,000 on paper, that sum will buy less in thirty years than it does today. When planning your long-term goals, it is best to use an inflation-adjusted rate of return (e.g., subtracting an estimated 2-3% inflation rate from your expected nominal market returns) to model your portfolio in today&apos;s dollars.
              </p>
              <p className="text-gray-600 leading-relaxed">
                **Management Fees (Expense Ratios)** also compound over time. An apparently small fee of 1.5% charged by an active mutual fund manager can cost you hundreds of thousands of dollars in lost gains over a 30-year period. This is why low-fee index funds (which often have expense ratios under 0.05%) are highly recommended for long-term investing.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                How to Maximize Your Compound Interest Gains
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To maximize the growth of your investments, focus on optimizing the three factors you can control:
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-[#4472C4] pl-4 py-1">
                  <h4 className="font-bold text-gray-900">1. Automate and Invest Consistently</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">
                    Set up automatic contributions to your investment accounts on payday. This strategy, known as **dollar-cost averaging**, ensures you buy more shares when prices are low and fewer when prices are high, removing emotion from investing.
                  </p>
                </div>
                <div className="border-l-4 border-[#4472C4] pl-4 py-1">
                  <h4 className="font-bold text-gray-900">2. Reinvest Your Dividends Automatically</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">
                    Instead of taking payouts from your stocks or funds as cash, enable a Dividend Reinvestment Plan (DRIP). This automatically uses your dividend payments to purchase more shares, expanding your compounding base without requiring extra out-of-pocket cash.
                  </p>
                </div>
                <div className="border-l-4 border-[#4472C4] pl-4 py-1">
                  <h4 className="font-bold text-gray-900">3. Utilize Tax-Advantaged Accounts</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">
                    Taxes can significantly slow down your compounding growth. Minimize this drag by using tax-advantaged accounts like a **Traditional IRA**, **Roth IRA**, or **401(k)** to let your investments grow tax-deferred or completely tax-free.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                The Rule of 72: Estimate Your Doubling Time
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The **Rule of 72** is a quick, reliable mental shortcut used to estimate how long it will take for an investment to double in value at a fixed rate of return. The formula is:
              </p>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 text-center max-w-sm mx-auto font-mono text-base font-bold text-[#1F4E78]">
                Years to Double = 72 / Annual Interest Rate
              </div>
              <p className="text-gray-600 leading-relaxed mt-4">
                For example, if your investment portfolio earns a steady **8%** annual return, it will take approximately **9 years** for your money to double (72 / 8 = 9). If you earn a conservative **6%** return, your doubling time is **12 years** (72 / 6 = 12).
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-6">
                Frequently Asked Compound Interest Questions
              </h2>
              
              <div className="space-y-4">
                <details className="bg-gray-50 rounded-lg p-5 group cursor-pointer border border-gray-100">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-sm sm:text-base">
                    <span>What is a realistic expected rate of return for long-term investments?</span>
                    <span className="text-blue-500 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                    Historically, the S&P 500 has delivered an average annual return of approximately **10%** before inflation over the long term (since 1928). However, for realistic, conservative retirement planning, professional financial advisors recommend using an estimated return of **6% to 8%** to account for market volatility, inflation, and fees.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-5 group cursor-pointer border border-gray-100">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-sm sm:text-base">
                    <span>Should I pay off high-interest debt or invest?</span>
                    <span className="text-blue-500 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                    As a general rule, you should pay off high-interest debt (such as credit cards with APRs over 10%) before focusing heavily on investing. Eliminating a 20% credit card balance is mathematically identical to earning a guaranteed, tax-free 20% return on your money—which beats any historical market performance. Low-interest debt, like a mortgage under 5%, can comfortably coexist with long-term investing.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-5 group cursor-pointer border border-gray-100">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-sm sm:text-base">
                    <span>How does compounding frequency affect my final investment balance?</span>
                    <span className="text-blue-500 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                    The more frequently your interest compounds, the higher your final balance will be, because your earnings are added back to the principal sooner. However, the difference between daily compounding and monthly compounding is relatively small over long horizons. The most critical drivers of your final portfolio value remain your contribution amount, your rate of return, and—most importantly—the total time your money has to grow.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-5 group cursor-pointer border border-gray-100">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-sm sm:text-base">
                    <span>What is the difference between simple interest and compound interest?</span>
                    <span className="text-blue-500 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                    Simple interest is calculated solely on your original principal deposit. If you invest $10,000 at 5% simple interest, you will earn exactly $500 every single year. Compound interest earns returns on both your principal and your accumulated interest. Over 30 years, that same $10,000 at 5% compound interest grows exponentially to $43,219, earning you more than double the simple interest return.
                  </p>
                </details>
              </div>
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
                  <div className="text-[11px] text-gray-500">Calculate net salary</div>
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
                  <div className="text-[11px] text-gray-500">Calculate payoff timeline</div>
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
                  <div className="text-[11px] text-gray-500">Try the 50/30/20 rule</div>
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
              This Compound Interest Calculator is designed for educational, informational, and general estimation purposes only. All modeled portfolio values are mathematical projections based on constant interest rates and continuous compounding schedules. Actual market returns are highly volatile and subject to fluctuations, downward cycles, and capital losses. These calculations do not account for individual broker transaction fees, management fees, advisory costs, local state or federal income taxes, or specific inflation indexes. This utility does not constitute professional investment, tax, legal, or personal financial planning advice. Please consult with a certified financial planner (CFP) or registered investment advisor before committing real capital to any financial product or asset class.
            </p>
          </section>

          {/* CTA Wealth Strategy */}
          <section className="bg-[#1F4E78] text-white rounded-2xl p-6 sm:p-8 text-center shadow-xl">
            <h3 className="text-xl font-bold mb-2">
              Ready to Optimize Your Wealth Strategy?
            </h3>
            <p className="mb-4 opacity-95 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Now that you understand the mathematical power of compound interest, learn how to build your optimal portfolio with our step-by-step guides.
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
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:underline">Terms of Use</Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:underline">Disclosure</Link>
            <span>•</span>
            <Link href="/contact" className="hover:underline">Contact Support</Link>
          </div>
          <p>© {new Date().getFullYear()} ZeroToWealthPro. All rights reserved.</p>
          <p className="mt-1 text-gray-400">
            For educational use only. Individual investment returns are subject to capital risk and market performance.
          </p>
        </footer>

      </div>
    </>
  );
}
























// import type { Metadata } from 'next';
// import Link from 'next/link';
// import CompoundInterestCalculator from '@/components/CompoundInterestCalculator';

// export const metadata: Metadata = {
//   title: 'Compound Interest Calculator - See How Your Money Grows',
//   description: 'Calculate how your investments grow over time. Free compound interest calculator with monthly contributions. See your results instantly.',
//   keywords: [
//     'compound interest calculator',
//     'investment calculator',
//     'savings calculator',
//     'retirement planning',
//   ],
//   alternates: {
//     canonical: 'https://zerotowealthpro.com/financial-utilities/compound-interest',
//   },
// };

// export default function CompoundInterestPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2]">
//       {/* Breadcrumb - Keep minimal at top */}
//       <nav aria-label="Breadcrumb" className="max-w-[900px] mx-auto px-5 pt-4">
//         <ol className="flex items-center space-x-2 text-xs text-white/80">
//           <li><Link href="/" className="hover:underline">Home</Link></li>
//           <li><span>/</span></li>
//           <li><Link href="/financial-utilities" className="hover:underline">Tools</Link></li>
//           <li><span>/</span></li>
//           <li>Compound Interest</li>
//         </ol>
//       </nav>

//       <main className="max-w-[900px] mx-auto px-5 pb-16">
        
//         {/* ============================================
//             1. HERO SECTION: THE HOOK & TOOL (TOOL FIRST!)
//             ============================================ */}
//         <header className="py-8 text-center">
//           <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg leading-tight mb-3">
//             See How Your Money Grows with Compound Interest
//           </h1>
//           <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
//             Calculate your investment growth in seconds. No signup required.
//           </p>
//         </header>

//         {/* THE CALCULATOR - FRONT AND CENTER */}
//         <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl mb-6">
//           <CompoundInterestCalculator />
//         </div>

//         {/* ============================================
//             2. EMAIL CAPTURE (READY TO ACTIVATE)
//             Currently commented out - activate when you have email service
//             ============================================ */}
//         {/* 
//         <div className="bg-white rounded-2xl p-6 shadow-xl mb-6 border-2 border-[#4472C4]">
//           <div className="text-center">
//             <h3 className="text-xl font-bold text-[#1F4E78] mb-2">
//               📧 Want to Save This Plan?
//             </h3>
//             <p className="text-gray-600 mb-4 text-sm">
//               Get a free PDF summary + monthly investment reminders sent to your inbox.
//             </p>
//             <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4472C4] focus:border-transparent"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="bg-[#4472C4] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#1F4E78] transition whitespace-nowrap"
//               >
//                 Send My Plan
//               </button>
//             </form>
//             <p className="text-xs text-gray-500 mt-2">
//               We respect your privacy. Unsubscribe anytime.
//             </p>
//           </div>
//         </div>
//         */}

//         {/* ============================================
//             3. AFFILIATE OFFER SECTION (READY TO ACTIVATE)
//             Currently placeholder - activate when you get affiliate approval
//             ============================================ */}
//         {/* 
//         <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 md:p-8 shadow-xl mb-6 text-white">
//           <h3 className="text-2xl font-bold mb-3">
//             🚀 Ready to Start Investing?
//           </h3>
//           <p className="mb-4 opacity-95">
//             Based on your calculations, you could grow serious wealth. Here's where successful investors start:
//           </p>
          
//           <div className="bg-white/10 backdrop-blur rounded-lg p-4 mb-4">
//             <div className="flex items-start gap-4">
//               <div className="flex-1">
//                 <h4 className="font-bold text-lg mb-1">Recommended: Vanguard Index Funds</h4>
//                 <p className="text-sm opacity-90 mb-3">
//                   Low fees (0.04%), historically 10% average annual returns, $3,000 minimum to start.
//                 </p>
//                 <ul className="text-sm space-y-1 mb-3">
//                   <li>✓ Beginner-friendly platform</li>
//                   <li>✓ Automatic investing available</li>
//                   <li>✓ Tax-advantaged accounts (IRA, Roth IRA)</li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <a
//             href="YOUR_AFFILIATE_LINK_HERE"
//             target="_blank"
//             rel="noopener noreferrer sponsored"
//             className="block w-full bg-white text-green-600 text-center px-6 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg"
//           >
//             Open Investment Account (Free) →
//           </a>
          
//           <p className="text-xs mt-3 opacity-80 text-center">
//             * We may earn a commission if you sign up through this link. This helps keep our calculators free.
//           </p>
//         </div>
//         */}

//         {/* ============================================
//             4. FIRST ADSENSE UNIT (READY TO ACTIVATE)
//             Place after affiliate section
//             ============================================ */}
//         {/* 
//         <div className="mb-6">
//           <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-500 text-sm">
//             [ AdSense Display Ad Unit ]
//           </div>
//         </div>
//         */}

//         {/* ============================================
//             5. EDUCATIONAL CONTENT (SEO + TRUST)
//             ============================================ */}
//         <article className="bg-white rounded-2xl p-6 md:p-8 shadow-xl mb-6">
//           <h2 className="text-2xl md:text-3xl font-bold text-[#1F4E78] mb-6">
//             How Compound Interest Works: A Complete Guide
//           </h2>

//           {/* What is it */}
//           <section className="mb-8">
//             <h3 className="text-xl font-semibold text-[#1F4E78] mb-3">
//               What is Compound Interest?
//             </h3>
//             <p className="text-gray-600 leading-relaxed mb-4">
//               Compound interest is when you earn interest on both your original investment 
//               and on all the interest you've previously earned. It's often called "interest on interest" 
//               and is the secret weapon of wealth building.
//             </p>
//             <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
//               <p className="text-sm text-gray-700">
//                 <strong>Example:</strong> You invest $10,000 at 7% annual interest. Year 1, you earn $700. 
//                 Year 2, you earn 7% on $10,700 (not just $10,000), giving you $11,449. 
//                 This snowball effect accelerates over time.
//               </p>
//             </div>
//           </section>

//           {/* The Math */}
//           <section className="mb-8">
//             <h3 className="text-xl font-semibold text-[#1F4E78] mb-3">
//               The Compound Interest Formula
//             </h3>
//             <div className="bg-gray-50 rounded-lg p-6 mb-4">
//               <div className="text-center font-mono text-base md:text-lg mb-4 font-semibold">
//                 A = P(1 + r/n)<sup>nt</sup>
//               </div>
//               <dl className="text-sm text-gray-600 space-y-1">
//                 <div className="flex gap-2">
//                   <dt className="font-semibold min-w-[20px]">A =</dt>
//                   <dd>Final amount</dd>
//                 </div>
//                 <div className="flex gap-2">
//                   <dt className="font-semibold min-w-[20px]">P =</dt>
//                   <dd>Principal (initial investment)</dd>
//                 </div>
//                 <div className="flex gap-2">
//                   <dt className="font-semibold min-w-[20px]">r =</dt>
//                   <dd>Annual interest rate (as decimal, e.g., 7% = 0.07)</dd>
//                 </div>
//                 <div className="flex gap-2">
//                   <dt className="font-semibold min-w-[20px]">n =</dt>
//                   <dd>Times interest compounds per year</dd>
//                 </div>
//                 <div className="flex gap-2">
//                   <dt className="font-semibold min-w-[20px]">t =</dt>
//                   <dd>Number of years</dd>
//                 </div>
//               </dl>
//             </div>
//           </section>

//           {/* Practical Tips */}
//           <section className="mb-8">
//             <h3 className="text-xl font-semibold text-[#1F4E78] mb-4">
//               5 Ways to Maximize Compound Interest
//             </h3>
//             <div className="grid md:grid-cols-2 gap-4">
//               <div className="bg-green-50 rounded-lg p-4">
//                 <h4 className="font-semibold text-green-900 mb-2">1. Start Early</h4>
//                 <p className="text-sm text-gray-700">
//                   Time is your biggest advantage. Starting at 25 vs. 35 can mean hundreds of thousands more by retirement.
//                 </p>
//               </div>
//               <div className="bg-blue-50 rounded-lg p-4">
//                 <h4 className="font-semibold text-blue-900 mb-2">2. Contribute Regularly</h4>
//                 <p className="text-sm text-gray-700">
//                   Even $100/month adds up. Consistent investing beats trying to time the market.
//                 </p>
//               </div>
//               <div className="bg-purple-50 rounded-lg p-4">
//                 <h4 className="font-semibold text-purple-900 mb-2">3. Reinvest Earnings</h4>
//                 <p className="text-sm text-gray-700">
//                   Don't withdraw dividends or interest. Let them compound for exponential growth.
//                 </p>
//               </div>
//               <div className="bg-orange-50 rounded-lg p-4">
//                 <h4 className="font-semibold text-orange-900 mb-2">4. Choose Higher Returns</h4>
//                 <p className="text-sm text-gray-700">
//                   The difference between 5% and 8% returns is massive over 30 years. Consider index funds.
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* Real-World Examples */}
//           <section className="mb-8">
//             <h3 className="text-xl font-semibold text-[#1F4E78] mb-4">
//               Real-World Scenarios
//             </h3>
            
//             <div className="space-y-4">
//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold text-gray-900 mb-2">
//                   Scenario 1: Start at 25, Retire at 65
//                 </h4>
//                 <p className="text-sm text-gray-600 mb-2">
//                   Invest $500/month at 8% annual return for 40 years
//                 </p>
//                 <div className="bg-green-100 rounded p-3">
//                   <p className="text-sm">
//                     <strong>Total Invested:</strong> $240,000<br />
//                     <strong>Final Balance:</strong> $1,745,503<br />
//                     <strong>Interest Earned:</strong> $1,505,503
//                   </p>
//                 </div>
//               </div>

//               <div className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="font-semibold text-gray-900 mb-2">
//                   Scenario 2: Start at 35, Retire at 65
//                 </h4>
//                 <p className="text-sm text-gray-600 mb-2">
//                   Same $500/month at 8%, but only 30 years
//                 </p>
//                 <div className="bg-orange-100 rounded p-3">
//                   <p className="text-sm">
//                     <strong>Total Invested:</strong> $180,000<br />
//                     <strong>Final Balance:</strong> $745,179<br />
//                     <strong>Interest Earned:</strong> $565,179<br />
//                     <strong className="text-red-600">Lost by waiting 10 years: $1,000,324</strong>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mt-4">
//               <p className="text-sm text-gray-700">
//                 <strong>Key Takeaway:</strong> Starting 10 years earlier with the same monthly contribution 
//                 results in over $1 million more at retirement. Time is more powerful than amount.
//               </p>
//             </div>
//           </section>

//           {/* FAQ */}
//           <section>
//             <h3 className="text-xl font-semibold text-[#1F4E78] mb-4">
//               Common Questions
//             </h3>
            
//             <div className="space-y-4">
//               <details className="bg-gray-50 rounded-lg p-4">
//                 <summary className="font-semibold text-gray-900 cursor-pointer">
//                   What's a realistic investment return?
//                 </summary>
//                 <p className="text-sm text-gray-600 mt-2">
//                   The S&P 500 has averaged 10% annually over the long term (since 1928). 
//                   Conservative financial planners use 6-8% to account for inflation and volatility. 
//                   High-yield savings accounts currently offer 4-5%.
//                 </p>
//               </details>

//               <details className="bg-gray-50 rounded-lg p-4">
//                 <summary className="font-semibold text-gray-900 cursor-pointer">
//                   Should I pay off debt or invest?
//                 </summary>
//                 <p className="text-sm text-gray-600 mt-2">
//                   If your debt interest rate is higher than your expected investment return, pay off debt first. 
//                   Credit card debt at 20% APR should be eliminated before investing. 
//                   Low-rate mortgages (3-4%) can coexist with investing.
//                 </p>
//               </details>

//               <details className="bg-gray-50 rounded-lg p-4">
//                 <summary className="font-semibold text-gray-900 cursor-pointer">
//                   How often should interest compound?
//                 </summary>
//                 <p className="text-sm text-gray-600 mt-2">
//                   More frequent compounding is better, but the difference between daily and monthly is minimal. 
//                   The bigger factors are your contribution amount, return rate, and time invested.
//                 </p>
//               </details>

//               <details className="bg-gray-50 rounded-lg p-4">
//                 <summary className="font-semibold text-gray-900 cursor-pointer">
//                   What's the Rule of 72?
//                 </summary>
//                 <p className="text-sm text-gray-600 mt-2">
//                   Divide 72 by your interest rate to estimate how long it takes to double your money. 
//                   At 8%, your money doubles in 9 years (72 ÷ 8 = 9). At 6%, it takes 12 years.
//                 </p>
//               </details>
//             </div>
//           </section>
//         </article>

//         {/* ============================================
//             6. INTERNAL LINKS TO OTHER TOOLS (SEO)
//             ============================================ */}
//         <section className="bg-white rounded-2xl p-6 md:p-8 shadow-xl mb-6">
//           <h3 className="text-xl font-bold text-[#1F4E78] mb-4">
//             Related Financial Calculators
//           </h3>
//           <div className="grid sm:grid-cols-2 gap-3">
//             <Link 
//               href="/debt-payoff" 
//               className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
//             >
//               <span className="text-2xl">🎯</span>
//               <div>
//                 <div className="font-semibold text-gray-900 group-hover:text-[#4472C4]">
//                   Debt Payoff Calculator
//                 </div>
//                 <div className="text-xs text-gray-600">Calculate your debt-free date</div>
//               </div>
//             </Link>
            
//             <Link 
//               href="/financial-utilities" 
//               className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
//             >
//               <span className="text-2xl">🧮</span>
//               <div>
//                 <div className="font-semibold text-gray-900 group-hover:text-[#4472C4]">
//                   All Financial Tools
//                 </div>
//                 <div className="text-xs text-gray-600">View all calculators</div>
//               </div>
//             </Link>
//           </div>
//         </section>

//         {/* ============================================
//             7. SECOND ADSENSE UNIT (READY TO ACTIVATE)
//             Place at bottom after content
//             ============================================ */}
//         {/* 
//         <div className="mb-6">
//           <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-500 text-sm">
//             [ AdSense Display Ad Unit #2 ]
//           </div>
//         </div>
//         */}

//         {/* ============================================
//             8. FINAL CTA
//             ============================================ */}
//         <section className="bg-[#1F4E78] text-white rounded-2xl p-8 text-center">
//           <h3 className="text-2xl font-bold mb-3">
//             Take Control of Your Financial Future
//           </h3>
//           <p className="mb-6 opacity-90 text-sm sm:text-base">
//             Whether you're paying off debt or building wealth, we have the tools to help you succeed.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-3 justify-center">
//             <Link
//               href="/debt-payoff"
//               className="bg-white text-[#1F4E78] px-6 py-3 rounded-full font-bold hover:scale-105 transition"
//             >
//               Pay Off Debt First →
//             </Link>
//             <Link
//               href="/financial-utilities"
//               className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-[#1F4E78] transition"
//             >
//               Explore All Tools
//             </Link>
//           </div>
//         </section>

//       </main>

//       {/* Footer */}
//       <footer className="text-center text-white pb-8 opacity-80 text-xs px-5">
//         <div className="flex items-center justify-center gap-4 flex-wrap mb-2">
//           <Link href="/privacy" className="hover:underline">Privacy</Link>
//           <span>•</span>
//           <Link href="/terms" className="hover:underline">Terms</Link>
//           <span>•</span>
//           <Link href="/disclaimer" className="hover:underline">Disclosure</Link>
//           <span>•</span>
//           <Link href="/contact" className="hover:underline">Contact</Link>
//         </div>
//         <p>© {new Date().getFullYear()} ZeroToWealthPro. All rights reserved.</p>
//         <p className="mt-1 text-xs opacity-60">
//           Not financial advice. For educational purposes only.
//         </p>
//       </footer>
//     </div>
//   );
// }