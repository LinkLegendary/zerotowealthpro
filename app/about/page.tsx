import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── BANNER ── */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F4E78] via-[#2d6a9f] to-[#4472C4]" />
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-96 h-96 bg-[#4472C4]/20 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-10 text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-blue-200 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>›</span>
            <span className="text-white/70">About</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            🎯 Our Mission
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
            About This Site
          </h1>

          <p className="text-blue-100 text-lg max-w-xl mx-auto leading-relaxed">
            Built to simplify debt payoff using structured systems, behavioral
            psychology, and real financial math.
          </p>
        </div>

        {/* Wave */}
        <div className="relative z-10">
          <svg
            viewBox="0 0 1440 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-50"
          >
            <path
              d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        {/* Why this site exists */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1F4E78] to-[#4472C4] flex items-center justify-center text-white text-lg shadow-sm">
              💡
            </div>
            <h2 className="text-xl font-bold text-[#1F4E78]">
              Why This Site Exists
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-3">
            Most people in debt aren't lacking motivation — they're lacking a
            clear system. They make minimum payments, watch interest pile up,
            and never see the finish line.
          </p>
          <p className="text-gray-600 leading-relaxed">
            This site was built to change that. Every article, calculator, and
            guide here is designed around one goal: giving you the exact
            structure you need to become debt-free as fast as possible.
          </p>
        </div>

        {/* What we cover */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1F4E78] to-[#4472C4] flex items-center justify-center text-white text-lg shadow-sm">
              📚
            </div>
            <h2 className="text-xl font-bold text-[#1F4E78]">What We Cover</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: '❄️',
                title: 'Debt Snowball',
                desc: 'Pay smallest balances first for momentum',
              },
              {
                icon: '🏔️',
                title: 'Debt Avalanche',
                desc: 'Target highest interest to minimize cost',
              },
              {
                icon: '📊',
                title: 'Payoff Calculators',
                desc: 'Real timelines based on your numbers',
              },
              {
                icon: '🧠',
                title: 'Behavioral Finance',
                desc: 'Why we stay in debt and how to break free',
              },
              {
                icon: '💳',
                title: 'Credit Card Traps',
                desc: 'Minimum payments, APR, and hidden fees',
              },
              {
                icon: '🛠️',
                title: 'Budgeting Tools',
                desc: 'Apps and systems that actually work',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 p-3 rounded-xl bg-gray-50"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {item.title}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our approach */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1F4E78] to-[#4472C4] flex items-center justify-center text-white text-lg shadow-sm">
              🎯
            </div>
            <h2 className="text-xl font-bold text-[#1F4E78]">Our Approach</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                label: 'No hype',
                desc: 'We show real numbers, not motivational fluff. Every strategy is backed by math.',
              },
              {
                label: 'Transparent monetization',
                desc: 'This site uses affiliate links and display ads to stay free. We never recommend products that conflict with your goal of becoming debt free.',
              },
              {
                label: 'Structured systems',
                desc: 'Step-by-step frameworks you can follow regardless of income or debt size.',
              },
              {
                label: 'Behavioral awareness',
                desc: 'We acknowledge that money is emotional and build systems around real human behavior.',
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#4472C4]/10 border border-[#4472C4]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-[#4472C4]" />
                </div>
                <div>
                  <span className="font-semibold text-gray-800 text-sm">
                    {item.label} —{' '}
                  </span>
                  <span className="text-gray-500 text-sm">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-[#1F4E78] to-[#4472C4] rounded-2xl p-8 shadow-lg">
          <h2 className="text-white font-bold text-xl text-center mb-6">
            By The Numbers
          </h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-white">$0</p>
              <p className="text-blue-200 text-xs mt-1 uppercase tracking-wider">
                Cost to read
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">100%</p>
              <p className="text-blue-200 text-xs mt-1 uppercase tracking-wider">
                Math-backed
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">1</p>
              <p className="text-blue-200 text-xs mt-1 uppercase tracking-wider">
                Clear goal
              </p>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Link
            href="/blog"
            className="flex-1 text-center bg-[#4472C4] text-white font-bold px-6 py-3 rounded-full hover:bg-[#1F4E78] transition-colors shadow"
          >
            📰 Read All Articles →
          </Link>
          <a
            href="https://zerotowealthpro.com/calculator"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-white text-[#1F4E78] font-bold px-6 py-3 rounded-full border-2 border-[#4472C4] hover:bg-blue-50 transition-colors shadow"
          >
            🧮 Free Debt Payoff Calculator →
          </a>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-[#4472C4] text-sm font-medium hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
        {/* Footer note */}
        {/* FOOTER */}
        <div className="text-center text-gray-500 mt-12 opacity-80 text-sm">
          <div className="flex items-center justify-center gap-4 mb-2">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:underline">
              Affiliate Disclosure
            </Link>
          </div>
          <p>© 2026 Debt Freedom Guide</p>
        </div>

        {/* <p className="text-center text-gray-400 text-sm pb-4">
          © 2026 Debt Freedom Guide · Built with purpose.
        </p> */}
      </div>
    </div>
  );
}
