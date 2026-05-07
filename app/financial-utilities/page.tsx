import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Financial Utility Hub - Free Calculators & Tools | Zero To Wealth Pro',
  description:
    'Access free financial calculators and tools. Calculate loans, investments, retirement, budgets, and more. Make smarter financial decisions with our comprehensive utility hub.',
  keywords:
    'financial calculator, loan calculator, investment calculator, retirement calculator, budget planner, mortgage calculator, compound interest calculator',
  authors: [{ name: 'Zero To Wealth Pro' }],
  openGraph: {
    title: 'Financial Utility Hub - Free Calculators & Tools',
    description:
      'Free financial calculators and tools to help you make better money decisions.',
    url: 'https://zerotowealthpro.com/financial-utilities',
    siteName: 'Zero To Wealth Pro',
    type: 'website',
  },
  alternates: {
    canonical: 'https://zerotowealthpro.com/financial-utilities',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ============================================
// CALCULATOR DATABASE
// ============================================
// 👉 Add new calculators here and they'll appear automatically!

interface Calculator {
  id: string;
  title: string;
  description: string;
  link: string;
  icon: string;
  category: 'debt' | 'investment' | 'planning' | 'tax' | 'mortgage';
  status: 'active' | 'coming-soon';
  featured?: boolean;
  popular?: boolean;
}

const CALCULATORS: Calculator[] = [
  // DEBT CALCULATORS
  {
    id: 'debt-payoff',
    title: 'Debt Payoff Calculator',
    description:
      'Calculate your debt-free date using snowball or avalanche method. See how extra payments accelerate your timeline.',
    link: '/debt-payoff',
    icon: '🎯',
    category: 'debt',
    status: 'active',
    featured: true,
    popular: true,
  },
  {
    id: 'loan-calculator',
    title: 'Loan Payment Calculator',
    description:
      'Calculate monthly payments for personal loans, auto loans, and more. Compare different loan terms and interest rates.',
    link: '/financial-utilities/loan-calculator',
    icon: '🚗',
    category: 'debt',
    status: 'active',
    popular: true,
  },
  {
    id: 'credit-card-calculator',
    title: 'Credit Card Payoff Calculator',
    description:
      'See how long it takes to pay off credit cards. Escape the minimum payment trap with our calculator.',
    link: '/financial-utilities/credit-card-calculator',
    icon: '💳',
    category: 'debt',
    status: 'active',
    popular: true,
  },

  // MORTGAGE CALCULATORS
  {
    id: 'mortgage-calculator',
    title: 'Mortgage Calculator',
    description:
      'Calculate monthly mortgage payments with taxes, insurance, PMI, and HOA fees. See complete amortization schedules.',
    link: '/financial-utilities/mortgage-calculator',
    icon: '🏠',
    category: 'mortgage',
    status: 'active',
    featured: true,
  },

  // INVESTMENT CALCULATORS
  {
    id: 'compound-interest',
    title: 'Compound Interest Calculator',
    description:
      'Calculate how your investments grow over time with compound interest. Plan for long-term wealth building.',
    link: '/financial-utilities/compound-interest',
    icon: '💰',
    category: 'investment',
    status: 'active',
    featured: true,
    popular: true,
  },
  {
    id: 'investment-calculator',
    title: 'Investment Return Calculator',
    description:
      'Estimate potential returns on your investments. Compare different investment scenarios and time horizons.',
    link: '/financial-utilities/investment-calculator',
    icon: '📊',
    category: 'investment',
    status: 'active',
    featured: true,
  },
  {
    id: 'retirement-calculator',
    title: 'Retirement Calculator',
    description:
      'Plan your retirement savings. Find out how much you need to save for a comfortable retirement.',
    link: '/financial-utilities/retirement-calculator',
    icon: '🏖️',
    category: 'investment',
    status: 'active',
    featured: true,
  },

  // PLANNING CALCULATORS
  {
    id: 'budget-calculator',
    title: 'Budget Calculator',
    description:
      'Create a personalized budget using the 50/30/20 rule. Track income, expenses, and savings goals.',
    link: '/financial-utilities/budget-calculator',
    icon: '💵',
    category: 'planning',
    status: 'active',
    featured: true,
  },
  {
    id: 'savings-goal-calculator',
    title: 'Savings Goal Calculator',
    description:
      'Calculate how much to save monthly to reach your financial goals. Plan for vacations, purchases, and more.',
    link: '/financial-utilities/savings-goal-calculator',
    icon: '🎁',
    category: 'planning',
    status: 'active',
    popular: true,
  },
  {
    id: 'emergency-fund-calculator',
    title: 'Emergency Fund Calculator',
    description:
      'Determine the right emergency fund size for your situation. Build financial security with our calculator.',
    link: '/financial-utilities/emergency-fund-calculator',
    icon: '🛡️',
    category: 'planning',
    status: 'active',
    popular: true,
  },
  {
    id: 'net-worth-calculator',
    title: 'Net Worth Calculator',
    description:
      'Track your net worth over time. Calculate assets minus liabilities to measure financial progress.',
    link: '/financial-utilities/net-worth-calculator',
    icon: '💎',
    category: 'planning',
    status: 'active',
    popular: true,
  },

  // TAX CALCULATORS
  {
    id: 'income-tax',
    title: 'Income Tax Calculator',
    description:
      'Estimate your income tax liability. Plan your tax strategy effectively.',
    link: '/financial-utilities/income-tax-calculator',
    icon: '📋',
    category: 'tax',
    status: 'active',
    popular: true,
  },
  {
    id: 'take-home-pay-calculator',
    title: 'Take Home Pay Calculator',
    description:
      'Calculate your net after-tax salary. Account for progressive federal brackets, state taxes, FICA, and pre-tax deductions.',
    link: '/financial-utilities/take-home-pay-calculator',
    icon: '💸',
    category: 'tax',
    status: 'active',
    popular: true,
  },
];

// Filter calculators by status
const activeCalculators = CALCULATORS.filter(
  (calc) => calc.status === 'active'
);
const featuredCalculators = CALCULATORS.filter(
  (calc) => calc.featured && calc.status === 'active'
);
const popularCalculators = CALCULATORS.filter(
  (calc) => calc.popular && calc.status === 'active'
);
const comingSoonCalculators = CALCULATORS.filter(
  (calc) => calc.status === 'coming-soon'
);

// Group by category
const calculatorsByCategory = {
  debt: CALCULATORS.filter((c) => c.category === 'debt'),
  mortgage: CALCULATORS.filter((c) => c.category === 'mortgage'),
  investment: CALCULATORS.filter((c) => c.category === 'investment'),
  planning: CALCULATORS.filter((c) => c.category === 'planning'),
  tax: CALCULATORS.filter((c) => c.category === 'tax'),
};

const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Financial Utility Hub',
  description:
    'Free financial calculators and tools for loans, investments, retirement planning, and budgeting.',
  url: 'https://zerotowealthpro.com/financial-utilities',
  publisher: {
    '@type': 'Organization',
    name: 'Zero To Wealth Pro',
    url: 'https://zerotowealthpro.com',
  },
};

export default function FinancialUtilitiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2]">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="max-w-[900px] mx-auto px-5 pt-6"
        >
          <ol className="flex items-center space-x-2 text-sm text-white">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <span>/</span>
            </li>
            <li className="opacity-80">Financial Utilities</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header className="max-w-[900px] mx-auto px-5 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg leading-tight mb-4">
            Financial Utility Hub
          </h1>
          <p className="text-lg sm:text-xl text-white opacity-95 max-w-3xl mx-auto mb-6">
            Free financial calculators and tools to help you make smarter money
            decisions. Calculate loans, investments, retirement plans, and
            manage your budget effectively.
          </p>

          {/* Social Share Buttons */}

          <div className="flex justify-center items-center gap-3 flex-wrap">
            <span className="text-white text-sm opacity-80">Share:</span>

            {/* Twitter/X */}
            <a
              href="https://twitter.com/intent/tweet?text=Check%20out%20these%20free%20financial%20calculators!&url=https://zerotowealthpro.com/financial-utilities"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2"
              aria-label="Share on Twitter"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Twitter
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https://zerotowealthpro.com/financial-utilities"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2"
              aria-label="Share on Facebook"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/sharing/share-offsite/?url=https://zerotowealthpro.com/financial-utilities"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2"
              aria-label="Share on LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>

            {/* Gmail - Share via Gmail Compose */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&su=Check%20out%20these%20free%20financial%20calculators!&body=I%20found%20this%20helpful%20page%20with%20free%20financial%20calculators:%0A%0Ahttps://zerotowealthpro.com/financial-utilities%0A%0AThey%20have%20calculators%20for%20debt%20payoff,%20mortgages,%20loans,%20investments,%20and%20more.%20All%20100%25%20free!"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2"
              aria-label="Share via Gmail"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
              </svg>
              Gmail
            </a>

            {/* Regular Email - Share via any email client */}
            <a
              href="mailto:?subject=Check%20out%20these%20free%20financial%20calculators!&body=I%20found%20this%20helpful%20page%20with%20free%20financial%20calculators:%0A%0Ahttps://zerotowealthpro.com/financial-utilities%0A%0AThey%20have%20calculators%20for%20debt%20payoff,%20mortgages,%20loans,%20investments,%20and%20more.%20All%20100%25%20free!"
              className="bg-white/20 hover:bg-white/30 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2"
              aria-label="Share via Email"
            >
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-[900px] mx-auto px-5 pb-16 space-y-12">
          {/* Stats Bar */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
            <div className="grid grid-cols-3 gap-4 text-center text-white">
              <div>
                <div className="text-3xl font-bold">
                  {activeCalculators.length}
                </div>
                <div className="text-sm opacity-80">Active Tools</div>
              </div>
              <div>
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm opacity-80">Free Forever</div>
              </div>
              <div>
                <div className="text-3xl font-bold">0</div>
                <div className="text-sm opacity-80">Signup Required</div>
              </div>
            </div>
          </div>

          {/* Featured Calculators */}
          {featuredCalculators.length > 0 && (
            <section className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">⭐</span>
                <h2 className="text-2xl font-bold text-[#1F4E78]">
                  Featured Calculators
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredCalculators.map((calc) => (
                  <CalculatorCard key={calc.id} calculator={calc} featured />
                ))}
              </div>
            </section>
          )}

          {/* Popular Calculators */}
          {popularCalculators.length > 0 && (
            <section className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">🔥</span>
                <h2 className="text-2xl font-bold text-[#1F4E78]">
                  Most Popular
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {popularCalculators.map((calc) => (
                  <CalculatorCard key={calc.id} calculator={calc} compact />
                ))}
              </div>
            </section>
          )}

          {/* All Calculators by Category */}
          <section className="bg-white rounded-2xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-[#1F4E78] mb-6">
              All Financial Tools ({activeCalculators.length} Available)
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {calculatorsByCategory.debt.some(
                (c) => c.status === 'active'
              ) && (
                <CategorySection
                  title="💳 Debt & Loan Calculators"
                  calculators={calculatorsByCategory.debt}
                />
              )}

              {calculatorsByCategory.mortgage.some(
                (c) => c.status === 'active'
              ) && (
                <CategorySection
                  title="🏠 Mortgage Calculators"
                  calculators={calculatorsByCategory.mortgage}
                />
              )}

              {calculatorsByCategory.investment.some(
                (c) => c.status === 'active'
              ) && (
                <CategorySection
                  title="📈 Investment & Savings Calculators"
                  calculators={calculatorsByCategory.investment}
                />
              )}

              {calculatorsByCategory.planning.some(
                (c) => c.status === 'active'
              ) && (
                <CategorySection
                  title="📝 Budget & Planning Tools"
                  calculators={calculatorsByCategory.planning}
                />
              )}

              {calculatorsByCategory.tax.some((c) => c.status === 'active') && (
                <CategorySection
                  title="🧾 Tax Calculators"
                  calculators={calculatorsByCategory.tax}
                />
              )}
            </div>
          </section>

          {/* Coming Soon */}
          {comingSoonCalculators.length > 0 && (
            <section className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl">🚀</span>
                <h2 className="text-2xl font-bold text-[#1F4E78]">
                  Coming Soon
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {comingSoonCalculators.map((calc) => (
                  <div
                    key={calc.id}
                    className="bg-gray-100 rounded-lg p-4 border border-gray-200 relative"
                  >
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      Coming Soon
                    </div>
                    <div className="text-3xl mb-2 opacity-50">{calc.icon}</div>
                    <h3 className="font-semibold text-gray-400 mb-1">
                      {calc.title}
                    </h3>
                    <p className="text-sm text-gray-400">{calc.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Email Newsletter Signup */}
          <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 shadow-xl text-white">
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-2xl font-bold mb-3">
                Get New Calculators & Money Tips
              </h3>
              <p className="mb-6 opacity-90">
                Be the first to know when we launch new financial tools. Plus
                get weekly tips to improve your finances.
              </p>

              {/* Email Form - Ready to connect to your email service */}
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition whitespace-nowrap"
                >
                  Subscribe Free
                </button>
              </form>
              <p className="text-xs mt-3 opacity-80">
                No spam. Unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </section>

          {/* Why Use Our Tools */}
          <section className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-[#1F4E78] mb-6">
              Why Use Our Financial Utilities?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-[#1F4E78] mb-2 flex items-center gap-2">
                  ✅ 100% Free
                </h3>
                <p className="text-gray-600">
                  All our financial calculators and tools are completely free to
                  use. No hidden fees, no subscriptions required.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1F4E78] mb-2 flex items-center gap-2">
                  ✅ Easy to Use
                </h3>
                <p className="text-gray-600">
                  Simple, intuitive interfaces designed for everyone. Get
                  accurate results in seconds without complex financial
                  knowledge.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1F4E78] mb-2 flex items-center gap-2">
                  ✅ Accurate Calculations
                </h3>
                <p className="text-gray-600">
                  Our tools use industry-standard financial formulas to provide
                  reliable calculations you can trust for your financial
                  planning.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1F4E78] mb-2 flex items-center gap-2">
                  ✅ Privacy Focused
                </h3>
                <p className="text-gray-600">
                  Your financial data stays private. All calculations happen in
                  your browser. We don't store or share your personal
                  information.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-[#1F4E78] mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <FAQItem
                question="Are these financial calculators really free?"
                answer="Yes! All our financial tools and calculators are 100% free to use. There are no hidden charges, subscriptions, or premium tiers. We believe everyone deserves access to quality financial planning tools."
              />
              <FAQItem
                question="How accurate are these financial calculators?"
                answer="Our calculators use standard financial formulas and are designed to provide accurate estimates based on the information you input. However, they should be used for planning purposes and not as professional financial advice. Always consult with a financial advisor for personalized guidance."
              />
              <FAQItem
                question="Do I need to create an account to use these tools?"
                answer="No account required! Simply click on any calculator and start using it immediately. We don't require registration, email addresses, or any personal information to use our tools."
              />
              <FAQItem
                question="Is my financial data stored or shared?"
                answer="No. All calculations are performed locally in your browser. We don't store, track, or share any of your personal financial information. Your privacy and data security are our top priorities."
              />
              <FAQItem
                question="Can I share these calculators with others?"
                answer="Absolutely! Use the share buttons at the top of the page to share via social media or email. Help your friends and family make better financial decisions too."
              />
              <FAQItem
                question="How do I know which calculator to use?"
                answer="Browse by category or check out our featured and popular calculators. If you have debt, start with the Debt Payoff Calculator. If you're planning to buy a home, use the Mortgage Calculator. If you want to grow wealth, try the Compound Interest Calculator."
              />
            </div>
          </section>

          {/* CTA */}
          <section className="bg-[#1F4E78] text-white rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Take Control of Your Finances?
            </h3>
            <p className="mb-6 opacity-90">
              Start with our most popular tool - the complete debt payoff
              calculator with snowball and avalanche methods.
            </p>
            <Link
              href="/debt-payoff"
              className="inline-block bg-white text-[#1F4E78] px-6 py-3 rounded-full font-bold hover:scale-105 transition"
            >
              Use Debt Payoff Calculator →
            </Link>
          </section>
        </main>

        {/* Footer */}
        <footer className="text-center text-white pb-12 opacity-80 text-sm space-y-3 px-5">
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
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
          <p>
            Copyright © {new Date().getFullYear()} ZeroToWealthPro. All rights
            reserved.
          </p>
        </footer>
      </div>
    </>
  );
}

// ============================================
// REUSABLE COMPONENTS
// ============================================

interface CalculatorCardProps {
  calculator: Calculator;
  featured?: boolean;
  compact?: boolean;
}

function CalculatorCard({
  calculator,
  featured,
  compact,
}: CalculatorCardProps) {
  if (calculator.status === 'coming-soon') {
    return null;
  }

  if (compact) {
    return (
      <Link
        href={calculator.link}
        className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-100 group"
      >
        <div className="text-3xl mb-2">{calculator.icon}</div>
        <h3 className="font-semibold text-gray-900 group-hover:text-[#4472C4] mb-1">
          {calculator.title}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2">
          {calculator.description}
        </p>
      </Link>
    );
  }

  return (
    <article
      className={`bg-gray-50 rounded-lg p-5 hover:shadow-lg transition-shadow border ${featured ? 'border-[#4472C4]' : 'border-gray-100'} group`}
    >
      <div className="text-4xl mb-3">{calculator.icon}</div>
      <h3 className="text-xl font-semibold text-[#1F4E78] mb-2">
        {calculator.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {calculator.description}
      </p>
      <Link
        href={calculator.link}
        className="inline-block bg-[#4472C4] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#1F4E78] transition-colors"
      >
        Use Calculator →
      </Link>
    </article>
  );
}

interface CategorySectionProps {
  title: string;
  calculators: Calculator[];
}

function CategorySection({ title, calculators }: CategorySectionProps) {
  const activeCalcs = calculators.filter((c) => c.status === 'active');

  if (activeCalcs.length === 0) return null;

  return (
    <div>
      <h3 className="text-xl font-semibold text-[#1F4E78] mb-4">{title}</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {activeCalcs.map((calc) => (
          <CalculatorCard key={calc.id} calculator={calc} />
        ))}
      </div>
    </div>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div className="border-l-4 border-[#4472C4] pl-4">
      <h3 className="text-lg font-semibold text-[#1F4E78] mb-2">{question}</h3>
      <p className="text-gray-600 leading-relaxed">{answer}</p>
    </div>
  );
}
