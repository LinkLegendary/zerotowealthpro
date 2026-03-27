import Link from 'next/link';
import Image from 'next/image';
import KitInlineForm from '@/components/KitInlineForm';
import DebtCalculatorEmbed from '@/components/DebtCalculatorEmbed';


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2]">
      {/* HERO */}
      <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[550px]">
        <Image
          src="/stock-image.jpeg"
          alt="Finance hero background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-5 z-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg leading-tight mb-4">
            Take Control of Your Debt
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white opacity-95 mb-6">
            Structured payoff systems. Real numbers. No hype.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
            <Link
              href="/debt-payoff"
              className="flex-1 text-center bg-white text-[#4472C4] px-4 py-3 rounded-full font-bold hover:scale-105 transition"
            >
              Start With the Complete Debt Payoff Guide →
            </Link>

            <Link
              href="/blog/debt-snowball-vs-debt-avalanche"
              className="flex-1 text-center flex justify-center items-center bg-transparent border border-white text-white px-4 py-3 rounded-full font-bold hover:bg-white hover:text-[#4472C4] transition"
            >
              Compare Snowball vs Avalanche
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-[900px] mx-auto px-5 py-16 space-y-16">
        {/* SECTION 1 – THE PROBLEM */}
        <section className="bg-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
              Why Most People Stay Stuck
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Debt doesn’t disappear with motivation. It disappears with
              structure.
            </p>
            <ul className="text-gray-600 space-y-2 list-disc list-inside">
              <li>No payoff timeline</li>
              <li>Minimum payment trap</li>
              <li>No visibility of interest costs</li>
              <li>No clear strategy</li>
            </ul>
          </div>

          <div className="flex-1 flex justify-center items-center w-full">
            <div className="relative w-full sm:w-3/4 md:w-full h-64 md:h-52">
              <Image
                src="/sad-people.png"
                alt="People stressed about debt"
                fill
                className="object-cover rounded-xl shadow-lg"
                priority
                sizes="(max-width: 640px) 100vw, 
                       (max-width: 768px) 75vw, 
                       (max-width: 1024px) 50vw, 
                       33vw"
              />
            </div>
          </div>
        </section>

        {/* FEATURED ARTICLE */}
        <section className="bg-white rounded-2xl p-6 shadow-xl hover:-translate-y-1 transition-all duration-300">
          <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
            📌 Featured Guide
          </h2>
          <h3 className="text-xl font-semibold mb-3 text-gray-600">
            Debt Snowball vs Debt Avalanche: Which Saves More?
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Complete breakdown with real examples, payoff timelines, and
            interest comparison charts.
          </p>
          <Link
            href="/blog/debt-snowball-vs-debt-avalanche"
            className="inline-block bg-[#4472C4] text-white px-6 py-3 rounded-full font-bold hover:bg-[#1F4E78] transition-colors"
          >
            Read Full Guide →
          </Link>
        </section>

        {/* LATEST ARTICLES */}
        <section className="bg-white rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-[#1F4E78] mb-6">
            📰 Latest Articles
          </h2>
          <div className="space-y-6">
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
                title: 'How Long Does It Take to Pay Off $50K in Credit Card Debt at 20% Interest?',
                href: '/blog/how-long-to-pay-off-50k-credit-card-debt',
                desc: 'Realistic payoff scenarios based on income and extra payments.',
              },
            ].map((article, i) => (
              <div key={i}>
                <Link
                  href={article.href}
                  className="text-lg font-semibold text-gray-600 hover:text-[#4472C4]"
                >
                  {article.title}
                </Link>
                <p className="text-gray-600 text-sm mt-1">{article.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/blog"
              className="text-[#4472C4] font-medium hover:underline"
            >
              View All Articles →
            </Link>
          </div>
        </section>

        {/* PRODUCT & ABOUT SECTIONS */}
        <section className="bg-white rounded-2xl flex flex-col md:flex-col items-center p-6 shadow-xl hover:-translate-y-1 transition-all duration-300">
          

        
          <DebtCalculatorEmbed />
        </section>

        <section className="bg-white rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
            About This Site
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Built to simplify debt payoff using structured systems, behavioral
            psychology, and real financial math.
          </p>
          <Link href="/about" className="text-[#4472C4] font-medium">
            Learn More →
          </Link>
        </section>

        {/* SUPPORTING GUIDES / CLUSTER HUB */}
        <section className="bg-white rounded-2xl p-6 shadow-xl mt-16">
          <h2 className="text-2xl font-bold text-[#1F4E78] mb-6">
            Deep Dive: Debt Payoff Guides
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/blog/how-to-pay-off-debt-fast"
              className="hover:underline text-gray-600  font-semibold"
            >
              → How to Pay Off Debt Fast (Step-by-Step Plan)
            </Link>

            <Link
              href="/blog/debt-snowball-vs-debt-avalanche"
              className="hover:underline text-gray-600 font-semibold"
            >
              → Debt Snowball vs Debt Avalanche
            </Link>

            <Link
              href="/blog/minimum-payment-trap-explained"
              className="hover:underline text-gray-600 font-semibold"
            >
              → The Minimum Payment Trap Explained
            </Link>

            <Link
              href="/blog/credit-card-interest-explained"
              className="hover:underline text-gray-600 font-semibold"
            >
              → Credit Card Interest Explained
            </Link>

            <Link
              href="/blog/invest-or-pay-off-debt-first"
              className="hover:underline text-gray-600 font-semibold"
            >
              → Invest or Pay Off Debt First?
            </Link>

            <Link
              href="/blog/how-much-does-extra-100-save"
              className="hover:underline text-gray-600 font-semibold"
            >
              → How Much Does an Extra $100 Save?
            </Link>

            <Link
              href="/blog/psychology-of-paying-off-debt"
              className="hover:underline text-gray-600 font-semibold"
            >
              → The Psychology of Paying Off Debt
            </Link>

            <Link
              href="/blog/how-to-stop-using-credit-cards"
              className="hover:underline text-gray-600 font-semibold"
            >
              → How to Stop Using Credit Cards
            </Link>

            <Link
              href="/blog/how-to-use-debt-payoff-calculator"
              className="hover:underline text-gray-600 font-semibold"
            >
              → How to Use a Debt Payoff Calculator
            </Link>
            <Link
              href="/blog/how-to-stop-living-paycheck-to-paycheck"
              className="hover:underline text-gray-600 font-semibold"
            >
              → How to Stop Living Paycheck to Paycheck
            </Link>
            <Link
              href="/blog/zero-paycheck-budget-method"
              className="hover:underline text-gray-600 font-semibold"
            >
              → The $0 Paycheck Budget Method: How It Works
            </Link>
            <Link
              href="/blog/how-to-build-emergency-fund-on-low-income"
              className="hover:underline text-gray-600 font-semibold"
            >
              → How to Build an Emergency Fund on Low Income
            </Link>
            <Link
              href="/blog/5-mistakes-keeping-you-stuck-broke"
              className="hover:underline text-gray-600 font-semibold"
            >
              → 5 Mistakes Keeping You Stuck Broke
            </Link>
            <Link
              href="/blog/how-to-reset-your-finances-in-30-days"
              className="hover:underline text-gray-600 font-semibold"
            >
              → How to Reset Your Finances in 30 Days
            </Link>
            <Link
              href="/blog/how-to-get-out-of-debt-on-low-income"
              className="hover:underline text-gray-600 font-semibold"
            >
              → How to Get Out of Debt on a Low Income
            </Link>
            <Link
              href="/blog/credit-card-debt-forgiveness"
              className="hover:underline text-gray-600 font-semibold"
            >
              → Credit Card Debt Forgiveness: Real vs. Scam
            </Link>
            <Link
              href="/blog/how-to-get-lower-interest-rate-credit-card"
              className="hover:underline text-gray-600 font-semibold"
            >
              → How to Get a Lower Interest Rate on a Credit Card
            </Link>
            <Link
              href="/blog/how-to-budget-with-irregular-income"
              className="hover:underline text-gray-600 font-semibold"
            >
              → How to Budget With an Irregular Income
            </Link>
            <Link
              href="/blog/how-to-save-1000-fast"
              className="hover:underline text-gray-600 font-semibold"
            >
              → How to Save $1,000 Fast: A Realistic Step-by-Step Plan
            </Link>
            <Link
              href="/blog/how-to-rebuild-credit-after-debt"
              className="hover:underline text-gray-600 font-semibold"
            >
              → How to Rebuild Credit After Debt: A Step-by-Step Plan
            </Link>
            <Link
              href="/blog/balance-transfer-cards-when-they-help"
              className="hover:underline text-gray-600 font-semibold"
            >
              → Balance Transfer Cards: When They Help vs. Backfire
            </Link>
            <Link
              href="/blog/what-order-to-pay-off-debts"
              className="hover:underline text-gray-600 font-semibold"
            >
              → What Order Should I Pay Off My Debts?
            </Link>
            <Link
              href="/blog/how-to-get-out-of-payday-loan-debt"
              className="hover:underline text-gray-600 font-semibold"
            >
              → How to Get Out of Payday Loan Debt: A Step-by-Step Plan
            </Link>

            <Link
              href="/blog/5-mistakes-keeping-you-stuck-broke"
              className="hover:underline text-gray-600 font-semibold"
            >
              → 5 Mistakes Keeping You Stuck Broke
            </Link>
            <Link
              href="/blog/best-budgeting-apps-for-debt-payoff"
              className="hover:underline text-gray-600 font-semibold"
            >
              → Best Budgeting Apps for Paying Off Debt in 2026
            </Link>
            <Link
              href="/blog/budgeting-when-youre-broke"
              className="hover:underline text-gray-600 font-semibold"
            >
              → Budgeting When You are Broke: A Realistic System
            </Link>
            <Link
              href="/blog/how-long-to-pay-off-50k-credit-card-debt"
              className="hover:underline text-gray-600 font-semibold"
            >
              → Pay Off $50K at 20% Interest: Month-by-Month Breakdown
            </Link>
            <Link
              href="/blog/the-complete-debt-payoff-system"
              className="hover:underline text-gray-600 font-semibold"
            >
              → The Complete Debt Payoff System
            </Link>
          </div>
        </section>

        <section className="mt-16 bg-[#1F4E78] text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Eliminate Your Debt?
          </h3>
          <p className="mb-6 opacity-90">
            See the complete step-by-step system for choosing Snowball or
            Avalanche, calculating timelines, and accelerating payoff.
          </p>

          <Link
            href="/debt-payoff"
            className="inline-block bg-white text-[#1F4E78] px-6 py-3 rounded-full font-bold hover:scale-105 transition"
          >
            View the Complete Debt Payoff Guide →
          </Link>
        </section>

        {/* FOOTER */}

        <footer className="text-center text-white mt-12 opacity-80 text-sm space-y-3">
          {/* SHORT DISCLAIMER — ADD THIS */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:underline">
              Terms of Use
            </Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:underline">
              Affiliate Disclosure
            </Link>
            <span>•</span>
            <Link href="/about/editorial-team" className="hover:underline">
              Editorial Standards
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>

          <p>
            Copyright © {new Date().getFullYear()} ZeroToWealthPro. All rights
            reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
