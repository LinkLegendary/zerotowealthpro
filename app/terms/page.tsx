import Link from "next/link"

export default function TermsPage() {
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
            <span className="text-white/70">Terms of Service</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
            Terms of Service
          </h1>
        </div>

        <div className="relative z-10">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-50">
            <path d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48 Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
          
          <div className="bg-blue-50 border-l-4 border-[#4472C4] p-4 rounded">
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>Last updated:</strong> February 17, 2026
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Agreement to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing this website, you agree to be bound by these Terms of Service and our Privacy Policy. 
              If you do not agree to these terms, please do not use our site.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Educational Content Only</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              <strong>We are not financial advisors.</strong> All content on this site is for educational 
              and informational purposes only. Nothing on this site constitutes professional financial advice.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Before making any financial decisions, consult with a qualified financial advisor, accountant, 
              or attorney who understands your specific situation.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">No Guarantees</h2>
            <p className="text-gray-600 leading-relaxed">
              We make no guarantees about the results you will achieve by following our strategies or using 
              our tools. Your financial situation is unique, and results vary based on income, spending habits, 
              discipline, and external factors beyond our control.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Use of Tools and Calculators</h2>
            <p className="text-gray-600 leading-relaxed">
              Our debt calculators and tools are provided as-is. While we strive for accuracy, we do not 
              guarantee that calculations are error-free. Always verify important financial decisions with 
              a professional.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              All content on this site, including articles, calculators, graphics, and logos, is owned by 
              Debt Freedom Guide or its content creators and is protected by copyright law.
            </p>
            <p className="text-gray-600 leading-relaxed">
              You may share our articles and link to our content, but you may not copy, reproduce, or 
              redistribute our content without permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Affiliate Links</h2>
            <p className="text-gray-600 leading-relaxed">
              This site contains affiliate links. We may earn a commission if you make a purchase through 
              these links at no additional cost to you. See our{' '}
              <Link href="/disclaimer" className="text-[#4472C4] hover:underline">
                Affiliate Disclosure
              </Link>{' '}
              for full details.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              To the fullest extent permitted by law, Debt Freedom Guide shall not be liable for any direct, 
              indirect, incidental, or consequential damages arising from your use of this site or reliance 
              on our content.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">External Links</h2>
            <p className="text-gray-600 leading-relaxed">
              Our site contains links to third-party websites. We are not responsible for the content, 
              accuracy, or practices of these external sites. Use them at your own risk.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update these terms at any time. Continued use of the site after changes constitutes 
              acceptance of the new terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              Questions about these terms? Contact us at{' '}
              <a href="mailto:legal@zertowealthpro.com" className="text-[#4472C4] hover:underline">
                legal@zertowealthpro.com
              </a>
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
