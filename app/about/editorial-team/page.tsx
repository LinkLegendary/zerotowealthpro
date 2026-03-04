import Link from "next/link"

export const metadata = {
  title: 'Editorial Standards — ZeroToWealthPro',
  description:
    'The ZeroToWealthPro editorial team researches and writes personal finance guides focused on debt elimination, budgeting, and credit recovery for real households.',
};

export default function EditorialTeamPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Banner */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F4E78] via-[#2d6a9f] to-[#4472C4]" />
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-96 h-96 bg-[#4472C4]/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-10 text-center">
          <div className="flex items-center justify-center gap-2 text-blue-200 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white/70">Editorial Standards</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
            Editorial Standards
          </h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto leading-relaxed">
            How we research, write, verify, and update every article on this site.
          </p>
        </div>

        <div className="relative z-10">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-50">
            <path d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48 Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-8">

          {/* Who we are */}
          <div>
            <p className="text-gray-600 leading-relaxed">
              ZeroToWealthPro publishes personal finance guides focused on one problem: how real
              households get out of debt, build financial stability, and stop the paycheck-to-paycheck
              cycle — without financial jargon, unrealistic assumptions, or advice calibrated for
              people who already have money.
            </p>
          </div>

          {/* What we cover */}
          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-4">What We Cover</h2>
            <div className="space-y-3">
              {[
                {
                  label: 'Debt strategy',
                  desc: 'Payoff sequencing, method comparisons (snowball vs avalanche), balance transfers, interest rate negotiation, payday loan exits, collections strategy, and credit rebuilding after debt.',
                },
                {
                  label: 'Math and traps',
                  desc: 'The actual cost of minimum payments, the true APR on common debt products, month-by-month payoff timelines, and the specific numbers behind decisions most people make without calculating.',
                },
                {
                  label: 'Tools and habits',
                  desc: 'Budgeting apps, payoff calculators, behavior change frameworks, and the structural habits that determine whether a plan survives contact with a bad month.',
                },
                {
                  label: 'Budgeting for tight incomes',
                  desc: 'Systems designed specifically for households where the standard 50/30/20 advice does not apply because fixed expenses consume 85–95% of take-home income.',
                },
              ].map(({ label, desc }) => (
                <div key={label} className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#4472C4] mt-2" />
                  <p className="text-gray-600 leading-relaxed">
                    <strong className="text-gray-800">{label}</strong> — {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Our standards */}
          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-4">Our Editorial Standards</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Every article is built around real numbers.',
                  body: 'We do not publish percentage-based advice without calculating what that percentage means in dollars for a specific household at a specific income level.',
                },
                {
                  title: 'Every external claim is sourced.',
                  body: 'We cite the Consumer Financial Protection Bureau, the Federal Trade Commission, the National Foundation for Credit Counseling, peer-reviewed journals, and major financial publications. We link to the primary source, not a secondary summary of it.',
                },
                {
                  title: 'We do not publish content we cannot verify.',
                  body: 'If a statistic cannot be traced to a primary source with a live URL, it does not appear in our articles.',
                },
                {
                  title: 'We flag and replace dead links.',
                  body: 'URLs rot. We review external links regularly and replace dead citations with verified live alternatives rather than leaving broken references in published articles.',
                },
                {
                  title: 'We do not accept payment for editorial coverage.',
                  body: 'Our articles do not recommend specific financial products in exchange for compensation. Where affiliate relationships exist, they are disclosed. Advertisers do not influence editorial content.',
                },
              ].map(({ title, body }) => (
                <div key={title} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-gray-800 font-semibold mb-1">{title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How articles are written */}
          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-4">How Our Articles Are Written</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Each article is produced through a structured research and writing process:
            </p>
            <div className="space-y-2">
              {[
                'Primary sources identified and reviewed before writing begins',
                'Key claims verified against the cited source',
                'Math examples calculated and cross-checked',
                'Internal links verified as live before publication',
                'External links verified as live before publication',
                'Article reviewed against our editorial checklist before publishing',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#1F4E78] to-[#4472C4] flex items-center justify-center text-white text-xs font-bold">
                    {i + 1}
                  </div>
                  <p className="text-gray-600 leading-relaxed pt-0.5">{step}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-600 leading-relaxed mt-4">
              Articles are updated when source URLs change, when underlying data is revised by the
              issuing organization, or when reader feedback identifies an error.
            </p>
          </div>

          {/* Corrections */}
          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Corrections</h2>
            <p className="text-gray-600 leading-relaxed">
              If you find an error — a dead link, an incorrect statistic, or a calculation that does
              not match the cited source — please{' '}
              <Link href="/contact" className="text-[#4472C4] hover:underline">
                contact us
              </Link>
              . We correct errors promptly and update the article's last-reviewed date when
              substantive changes are made.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-gray-100 pt-6">
            <p className="text-gray-500 text-sm leading-relaxed italic">
              ZeroToWealthPro is an independent personal finance publication. This site does not
              provide personalized financial advice. All content is for educational purposes only.
              See our{' '}
              <Link href="/terms" className="text-[#4472C4] hover:underline">Terms of Use</Link>
              {' '}and{' '}
              <Link href="/disclaimer" className="text-[#4472C4] hover:underline">Affiliate Disclosure</Link>
              {' '}for full details.
            </p>
          </div>

        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-[#4472C4] text-sm font-medium hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
