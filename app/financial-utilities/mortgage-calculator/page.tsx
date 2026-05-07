import type { Metadata } from 'next';
import Link from 'next/link';
import MortgageCalculator from '@/components/MortgageCalculator';

export const metadata: Metadata = {
  title: 'Mortgage Calculator - Free Monthly Payment & Amortization Planner (2026)',
  description: 'Calculate your monthly mortgage payment including principal, interest, property taxes, home insurance, PMI, and HOA fees. See a complete 2026 amortization schedule.',
  keywords: [
    'mortgage calculator',
    'home loan calculator',
    'mortgage payment calculator',
    'house payment calculator',
    'mortgage affordability calculator',
    'PITI calculator',
    'PMI calculator',
    'amortization schedule home loan',
  ],
  alternates: {
    canonical: 'https://zerotowealthpro.com/financial-utilities/mortgage-calculator',
  },
  openGraph: {
    title: 'Mortgage Calculator | Zero to Wealth Pro',
    description: 'Calculate your complete monthly mortgage payment including taxes, insurance, PMI, and HOA fees with our interactive planner.',
    url: 'https://zerotowealthpro.com/financial-utilities/mortgage-calculator',
    type: 'website',
  },
};

// Double Schema JSON-LD (WebApplication + FAQPage)
const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Mortgage Calculator",
  "applicationCategory": "FinanceApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free mortgage calculator with property taxes, homeowners insurance, PMI, and HOA fees."
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is PITI and why is it important?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PITI stands for Principal, Interest, Taxes, and Insurance. These are the four foundational components of a monthly mortgage payment. Principal reduces your loan balance, interest pays the lender for borrowing, taxes go to your local municipality, and insurance protects the physical asset. Calculating PITI ensures you budget for the true cost of homeownership rather than just the base loan payment."
      }
    },
    {
      "@type": "Question",
      "name": "How can I avoid paying Private Mortgage Insurance (PMI)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The most effective way to avoid PMI on a conventional mortgage is to make a down payment of at least 20% of the home's purchase price. If you purchase a home with less than 20% down, you can request your lender remove PMI once your amortization payments or home market appreciation increase your equity to 20% (an 80% Loan-to-Value ratio)."
      }
    },
    {
      "@type": "Question",
      "name": "Should I choose a 15-year or a 30-year mortgage term?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 15-year mortgage offers a lower interest rate and dramatically reduces the total interest paid over the life of the loan, allowing you to build equity twice as fast. However, it requires a much higher monthly payment. A 30-year mortgage offers lower, more flexible monthly payments, but results in significantly higher interest costs over time. The choice depends on your monthly cash flow stability and long-term financial goals."
      }
    },
    {
      "@type": "Question",
      "name": "How much should I budget for home maintenance beyond the mortgage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As a general rule, homeowners should budget 1% to 2% of the home's total purchase price annually for ongoing maintenance and repairs. For a $400,000 home, this equates to $4,000 to $8,000 per year (approximately $330 to $660 per month). This baseline should be held in a liquid savings account separately from your primary emergency fund."
      }
    }
  ]
};

export default function MortgageCalculatorPage() {
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
        <nav aria-label="Breadcrumb" className="max-w-[1000px] mx-auto px-5 mb-4">
          <ol className="flex items-center space-x-2 text-xs text-gray-600">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><span>/</span></li>
            <li><Link href="/financial-utilities" className="hover:underline">Utilities</Link></li>
            <li><span>/</span></li>
            <li className="font-semibold text-[#1F4E78]">Mortgage Calculator</li>
          </ol>
        </nav>

        <main className="max-w-[1000px] mx-auto px-5 pb-16">
          
          {/* Header Hero Area */}
          <header className="py-4 text-center sm:text-left mb-6 border-b border-gray-200 pb-6">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1F4E78] tracking-tight leading-tight mb-3">
              Mortgage Calculator
            </h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed mb-4">
              Calculate your complete monthly housing payment. Model your principal, interest, property taxes, homeowners insurance, private mortgage insurance (PMI), and HOA fees using our interactive amortization tool.
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
                <span className="font-bold text-[#4472C4]">Fact-Checked & Verified</span>
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
                  This mortgage tool provides general educational estimations based on standard housing math. It does not constitute an offer of credit, pre-approval, or a formal underwriting determination. Actual mortgage interest rates, property tax assessments, homeowners insurance premiums, and escrow allocations depend on your individual credit profile, debt-to-income (DTI) ratio, local municipal millage rates, geographic hazard maps, and lender-specific underwriting requirements.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Calculator Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-xl mb-10 border border-gray-100">
            <MortgageCalculator />
          </div>

          {/* Deep Educational Content (SEO-Optimized, 1,750+ Words) */}
          <article className="bg-white rounded-2xl p-6 sm:p-10 shadow-lg mb-8 border border-gray-100 prose prose-slate max-w-none">
            
            <section className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F4E78] mb-4">
                The Anatomy of a Mortgage Payment: Understanding PITI
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Purchasing a residential property is typically the single largest transaction an individual makes. However, many first-time homebuyers make the critical error of budgeting solely for their base loan payment (principal and interest). In reality, the true monthly cost of owning a home is much higher, comprising property taxes, homeowners insurance, and optional costs like private mortgage insurance and HOA fees.
              </p>
              <p className="text-gray-600 leading-relaxed">
                To understand where your monthly housing payments actually go, you must master the acronym **PITI**: Principal, Interest, Taxes, and Insurance. These four components dictate your baseline payment, which is typically managed through a dedicated **escrow account** by your mortgage servicer to ensure critical local tax and insurance bills are paid on time.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                Breaking Down the Four Core Components of PITI
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Each element of your monthly housing bill serves a different financial purpose:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100 text-left">
                  <h4 className="font-bold text-blue-900 mb-2">📊 Principal</h4>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    This is the portion of your payment that directly reduces your outstanding loan balance. Every dollar paid toward principal increases your home equity (your actual ownership share in the property). In the early years of a mortgage, the principal portion represents only a tiny fraction of your payment, but it grows larger with every subsequent monthly payment.
                  </p>
                </div>

                <div className="bg-purple-50/50 rounded-lg p-4 border border-purple-100 text-left">
                  <h4 className="font-bold text-purple-900 mb-2">💰 Interest</h4>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    This is the fee charged by your lender for borrowing the principal amount. Interest is calculated monthly based on your remaining loan balance, meaning it is highest at the beginning of the term and gradually decreases over time as the outstanding principal is paid down.
                  </p>
                </div>

                <div className="bg-green-50/50 rounded-lg p-4 border border-green-100 text-left">
                  <h4 className="font-bold text-green-900 mb-2">🏛️ Taxes (Property Taxes)</h4>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Property taxes are assessed by your local county, city, or school district to fund public services like schools, roads, and emergency response. Property taxes are based on your home&apos;s assessed value and are typically collected monthly into escrow, then paid to the local municipality annually or semi-annually.
                  </p>
                </div>

                <div className="bg-orange-50/50 rounded-lg p-4 border border-orange-100 text-left">
                  <h4 className="font-bold text-orange-900 mb-2">🛡️ Insurance (Homeowners Insurance)</h4>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Lenders require you to carry homeowners insurance to protect the physical asset from hazards like fire, windstorms, and vandalism. Like property taxes, homeowners insurance premiums are typically divided by 12, collected monthly into escrow, and paid annually to your insurance carrier by your servicer.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                PMI and HOA Fees: The Hidden Monthly Costs
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Beyond standard PITI, homebuyers often encounter two other recurring monthly costs:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-3 mb-6">
                <li>
                  <strong>Private Mortgage Insurance (PMI):</strong> PMI is a monthly fee required by conventional lenders if your down payment is less than 20% of the home&apos;s purchase price. This insurance protects the lender—not you—if you default on the loan. PMI typically costs **0.5% to 1.5%** of the loan amount annually. Fortunately, conventional PMI must be removed once your loan principal reaches 80% Loan-to-Value (LTV) through regular payments or validated home value appreciation.
                </li>
                <li>
                  <strong>Homeowners Association (HOA) Fees:</strong> If you purchase a property within a planned community, townhouse development, or condominium building, you will likely be required to pay monthly or annual HOA fees. These fees are collected directly by the HOA board to maintain common amenities (such as pools, landscaping, and trash pickup) and fund community reserves. HOA fees are paid separately from your mortgage escrow account.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F4E78] mb-2">
                15-Year vs. 30-Year Mortgage: A Mathematical Comparison
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Selecting your mortgage term is one of the most critical decisions you will make when financing a home. It directly impacts both your monthly cash flow and your long-term wealth building:
              </p>
              
              <div className="overflow-x-auto my-6 border border-gray-200 rounded-xl shadow-sm">
                <table className="w-full text-xs sm:text-sm border-collapse text-left">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold">
                      <th className="p-3">Feature</th>
                      <th className="p-3 text-center">30-Year Fixed</th>
                      <th className="p-3 text-center">15-Year Fixed</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-650 divide-y divide-gray-100">
                    <tr>
                      <td className="p-3 font-semibold text-gray-900">Monthly Payment</td>
                      <td className="p-3 text-center text-green-600 font-semibold">Lower (maximizes monthly cash flow)</td>
                      <td className="p-3 text-center text-red-600 font-semibold">Higher (requires higher monthly income)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-gray-900">Total Interest Paid</td>
                      <td className="p-3 text-center text-red-600 font-semibold">Much Higher (more compounding periods)</td>
                      <td className="p-3 text-center text-green-600 font-semibold font-bold">Much Lower (massive long-term savings)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-gray-900">Base Interest Rate</td>
                      <td className="p-3 text-center">Typically 0.5% to 1.0% higher</td>
                      <td className="p-3 text-center font-bold text-emerald-700">Typically significantly lower</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-gray-900">Equity Building</td>
                      <td className="p-3 text-center">Slower (majority of early payments go to interest)</td>
                      <td className="p-3 text-center font-bold text-emerald-700">Faster (principal balance paid down twice as fast)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F4E78] mb-2">
                Comparative Case Studies: 2026 Mortgage Projections
              </h2>
              {/* Strict YMYL Hypothetical Disclosure Note */}
              <p className="text-xs text-gray-500 italic mb-6">
                Disclaimer: The following scenarios are simplified, hypothetical borrowing profiles designed solely for illustrative and educational purposes. They demonstrate how down payment size, loan terms, and interest rates affect PITI payments and total interest costs under 2026 market rate projections, and do not represent actual lenders, loan offers, or professional financial planning guarantees.
              </p>

              {/* Profile A */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6 text-left">
                <h4 className="font-bold text-[#1F4E78] text-base mb-2">
                  Profile A: The Minimal Down Payment Purchaser ($350,000 Purchase Price)
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  A homebuyer purchases a $350,000 home with a minimal **5% down payment ($17,500)** using a 30-year conventional fixed mortgage at a projected 6.5% interest rate. Because their down payment is under 20%, they are required to pay monthly PMI.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-gray-700">
                  <div className="space-y-1">
                    <p>• Purchase Price: $350,000 | Down Payment: $17,500</p>
                    <p>• Loan Balance: $332,500</p>
                    <p>• Monthly PMI: $138/month</p>
                  </div>
                  <div className="space-y-1 text-gray-800">
                    <p className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded inline-block mt-2">
                      ✔ Base Monthly P&I: $2,101/month
                    </p>
                    <p className="text-red-500 mt-1 font-semibold">• Total Interest Paid over 30 Years: $424,124</p>
                  </div>
                </div>
              </div>

              {/* Profile B */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6 text-left">
                <h4 className="font-bold text-[#1F4E78] text-base mb-2">
                  Profile B: The 20% Down Conventional Purchaser ($350,000 Purchase Price)
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  A homebuyer purchases the exact same $350,000 property but makes a **20% down payment ($70,000)**, completely avoiding PMI and borrowing a lower principal balance at the same 6.5% interest rate.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-gray-700">
                  <div className="space-y-1">
                    <p>• Purchase Price: $350,000 | Down Payment: $70,000</p>
                    <p>• Loan Balance: $280,000</p>
                    <p>• Monthly PMI: $0 (Completely avoided!)</p>
                  </div>
                  <div className="space-y-1 text-gray-800">
                    <p className="text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded inline-block mt-2">
                      ✔ Base Monthly P&I: $1,770/month
                    </p>
                    <p className="text-green-700 mt-1 font-semibold">• Total Interest Paid over 30 Years: $357,157 (Save $66,967 in interest and $331/month compared to Profile A)</p>
                  </div>
                </div>
              </div>

              {/* Profile C */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4 text-left">
                <h4 className="font-bold text-[#1F4E78] text-base mb-2">
                  Profile C: The 15-Year Wealth Builder ($350,000 Purchase Price)
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  An investor purchases the same $350,000 property with a 20% down payment ($70,000) using an accelerated 15-year conventional fixed mortgage at a lower projected interest rate of 5.75%.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-gray-700">
                  <div className="space-y-1">
                    <p>• Purchase Price: $350,000 | Down Payment: $70,000</p>
                    <p>• Loan Balance: $280,000</p>
                    <p>• Monthly PMI: $0</p>
                  </div>
                  <div className="space-y-1 text-gray-800">
                    <p className="text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded inline-block mt-2">
                      ✔ Base Monthly P&I: $2,326/month
                    </p>
                    <p className="text-green-700 mt-1 font-semibold">• Total Interest Paid over 15 Years: $138,710 (Save $218,447 in total interest compared to Profile B and pay off the home 15 years faster)</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-4">
                Determining Home Affordability: The 28/36 Rule vs. The Conservative Approach
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Before shopping for a home, you must establish a safe, realistic budget. Do not rely on the maximum amount a lender pre-approves you for—lenders look at your gross income and debt history, but they do not account for your specific lifestyle, childcare costs, or personal savings goals.
              </p>
              <div className="space-y-4">
                <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100 text-left">
                  <h4 className="font-bold text-blue-900 mb-2">The 28/36 Rule (The Standard Underwriting Benchmark)</h4>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">
                    Lenders typically evaluate your housing affordability using two key ratios:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                    <li><strong>The Front-End Ratio (28%):</strong> Your total monthly housing costs (PITI + HOA fees) should not exceed 28% of your gross monthly household income.</li>
                    <li><strong>The Back-End Ratio (36%):</strong> Your total monthly debt obligations (housing costs + car payments + student loans + minimum card payments) should not exceed 36% of your gross monthly income.</li>
                  </ul>
                </div>

                <div className="bg-green-50/50 rounded-xl p-5 border border-green-100 text-left">
                  <h4 className="font-bold text-green-900 mb-2">The Conservative Wealth-Building Approach (Highly Recommended)</h4>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">
                    If your goal is to build long-term wealth and avoid being &quot;house poor,&quot; aim for a more conservative budget:
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1 list-disc list-inside">
                    <li>Limit your total monthly PITI payment to **25% or less of your net after-tax take-home pay**.</li>
                    <li>Save a 20% down payment to completely avoid PMI and establish instant equity.</li>
                    <li>Maintain a separate, robust emergency fund of 3 to 6 months of expenses *after* your down payment and closing costs are paid.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* DEDICATED PROFESSIONAL HELP WARNING (YMYL REQUIREMENT) */}
            <section className="mb-10 bg-blue-50/50 rounded-xl p-6 border border-blue-100 text-left font-normal">
              <h3 className="text-xl font-bold text-[#1F4E78] mb-3 flex items-center gap-2">
                <span>⚠️</span> When to Seek Professional Mortgage and Fiduciary Guidance
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4 font-normal">
                Home buying is a highly complex process with significant legal, tax, and financial implications. While online mortgage calculators are excellent for general planning, they cannot replace the highly tailored, personalized insights of a licensed financial advisor or mortgage broker. You should consult with qualified specialists in the following scenarios:
              </p>
              <ul className="text-xs text-gray-600 space-y-2 list-disc list-inside font-normal">
                <li>Before making an offer, speak with a **licensed mortgage broker** to understand your specific loan options (such as FHA, VA, USDA, or conventional loans) and obtain a formal pre-approval.</li>
                <li>Consult a **Certified Public Accountant (CPA)** to understand how property tax deductions, mortgage interest deductions, and primary home sale exclusions apply to your tax situation.</li>
                <li>Work with an experienced **real estate attorney** to review your purchase contract, evaluate deed options, and ensure a clear title transfer during closing.</li>
                <li>Speak with a **fee-only financial planner** to assess how your home purchase budget fits into your retirement, education savings, and portfolio allocation goals.</li>
              </ul>
              <p className="text-xs text-gray-500 mt-3 font-semibold">
                An algorithm can optimize numbers, but a certified professional integrates your emotional risk limits, local municipal rules, and specific family conditions into a cohesive, secure wealth strategy.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold text-[#1F4E78] mb-6">
                Frequently Asked Mortgage Questions
              </h2>
              
              <div className="space-y-4">
                <details className="bg-gray-50 rounded-lg p-5 group cursor-pointer border border-gray-100">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-sm sm:text-base">
                    <span>Should I pay off my mortgage early or invest the extra cash?</span>
                    <span className="text-blue-500 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                    This depends on your interest rate and alternative investment opportunities. If you have an older mortgage with an interest rate below 4%, you will historically earn more over the long term by investing extra cash in diversified index funds (which historically average 8% to 10% returns). However, if your mortgage interest rate is 6.5% or higher, paying it down early is mathematically attractive, as it provides a guaranteed, risk-free return on your money equal to your interest rate.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-5 group cursor-pointer border border-gray-100">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-sm sm:text-base">
                    <span>What is a debt-to-income (DTI) ratio and how is it calculated?</span>
                    <span className="text-blue-500 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                    Your DTI ratio is a key metric lenders use to assess your borrowing risk. It is calculated by dividing your total monthly debt obligations (including your projected PITI, HOA fees, car payments, student loans, and credit card minimums) by your gross monthly household income. Most conventional lenders require a DTI ratio of **43% or lower** to approve a home loan.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-5 group cursor-pointer border border-gray-100">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-sm sm:text-base">
                    <span>How can I remove Private Mortgage Insurance (PMI) from my conventional loan?</span>
                    <span className="text-blue-500 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                    For conventional loans, you can request your lender cancel PMI once your loan balance reaches **80% Loan-to-Value (LTV)** of the home&apos;s original value through regular payments. If your home&apos;s market value has increased significantly due to renovations or local appreciation, you can request an appraisal to prove your LTV ratio has dropped to 80% or lower, allowing you to cancel PMI early.
                  </p>
                </details>

                <details className="bg-gray-50 rounded-lg p-5 group cursor-pointer border border-gray-100">
                  <summary className="font-bold text-gray-900 list-none flex justify-between items-center text-sm sm:text-base">
                    <span>What are discount points and should I buy them?</span>
                    <span className="text-blue-500 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed font-normal">
                    Discount points are fees paid directly to the lender at closing in exchange for a permanently reduced interest rate (known as &quot;buying down the rate&quot;). Each point costs **1%** of your total loan amount and typically lowers your interest rate by **0.25%**. Buying points makes financial sense if you plan to keep the mortgage long enough for your monthly interest savings to exceed the upfront closing costs.
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
                    <strong>Consumer Financial Protection Bureau (CFPB):</strong> Comprehensive guides on home buying, mortgage disclosure documents, and PMI removal parameters. 
                    <a href="https://www.consumerfinance.gov" target="_blank" rel="noopener noreferrer nofollow" className="text-[#4472C4] hover:underline ml-1">consumerfinance.gov</a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4472C4] font-bold">2.</span>
                  <span>
                    <strong>U.S. Department of Housing and Urban Development (HUD):</strong> FHA loan guidelines, fair housing standards, and homeownership education resources. 
                    <a href="https://www.hud.gov" target="_blank" rel="noopener noreferrer nofollow" className="text-[#4472C4] hover:underline ml-1">hud.gov</a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4472C4] font-bold">3.</span>
                  <span>
                    <strong>Federal National Mortgage Association (Fannie Mae):</strong> Underwriting parameters, standard conventional mortgage guidelines, and credit utilization thresholds. 
                    <a href="https://www.fanniemae.com" target="_blank" rel="noopener noreferrer nofollow" className="text-[#4472C4] hover:underline ml-1">fanniemae.com</a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4472C4] font-bold">4.</span>
                  <span>
                    <strong>Board of Governors of the Federal Reserve System:</strong> Historical mortgage interest rates, primary credit risk scales, and housing market analysis. 
                    <a href="https://www.federalreserve.gov" target="_blank" rel="noopener noreferrer nofollow" className="text-[#4472C4] hover:underline ml-1">federalreserve.gov</a>
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
                href="/financial-utilities/loan-calculator" 
                className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition group border border-gray-100"
              >
                <span className="text-xl">🚗</span>
                <div>
                  <div className="font-bold text-sm text-gray-900 group-hover:text-[#4472C4]">
                    Loan Calculator
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">Calculate any installment loan</div>
                </div>
              </Link>
              
              <Link 
                href="/financial-utilities/take-home-pay-calculator" 
                className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition group border border-gray-100"
              >
                <span className="text-xl">💸</span>
                <div>
                  <div className="font-bold text-sm text-gray-900 group-hover:text-[#4472C4]">
                    Take Home Pay
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">Calculate net salary</div>
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
                  <div className="text-[11px] text-gray-500 font-medium">Grow your wealth faster</div>
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
              Now that you understand your mortgage options and complete monthly payments, learn how to build your optimal portfolio with our step-by-step guides.
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
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:underline">Terms of Use</Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:underline">Disclosure</Link>
            <span>•</span>
            <Link href="/contact" className="hover:underline">Contact Support</Link>
          </div>
          <p>© {new Date().getFullYear()} ZeroToWealthPro. All rights reserved.</p>
          <p className="mt-1 text-gray-400 font-normal">
            For educational use only. Individual mortgage rates and housing approvals depend on actual credit scores, DTI ratios, and lender criteria.
          </p>
        </footer>

      </div>
    </>
  );
}