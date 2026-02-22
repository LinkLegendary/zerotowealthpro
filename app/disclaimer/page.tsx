import Link from "next/link"

export default function DisclaimerPage() {
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
            <span className="text-white/70">Disclaimer</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
            Affiliate Disclosure
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
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Affiliate Links</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              This website contains affiliate links, which means we may earn a commission if you 
              click on certain links and make a purchase. This comes at no additional cost to you.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We only recommend products and services we have personally used, researched, or believe 
              will add value to our readers. Our affiliate relationships do not influence our editorial 
              content or recommendations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Product Reviews</h2>
            <p className="text-gray-600 leading-relaxed">
              When we review products or services, we provide honest, unbiased opinions based on our 
              experience and research. Some of these reviews may contain affiliate links. Whether or 
              not a product contains an affiliate link does not affect our editorial judgment.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Current Affiliate Relationships</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We participate in affiliate programs with the following companies:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Gumroad (for our Debt Calculator Plus product)</li>
              <li>Amazon Associates (for book recommendations)</li>
              <li>[Add other affiliate programs as you join them]</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Our Commitment</h2>
            <p className="text-gray-600 leading-relaxed">
              We are committed to transparency. Every article containing affiliate links will include 
              a clear disclosure. Our primary goal is to help you become debt-free, not to maximize 
              affiliate commissions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Questions?</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about our affiliate relationships or how we generate revenue, 
              please contact us at <a href="mailto:support@yoursite.com" className="text-[#4472C4] hover:underline">support@yoursite.com</a>
            </p>
          </div>

          <div className="border-t pt-6 mt-6">
            <p className="text-gray-400 text-xs leading-relaxed">
              This disclosure is in accordance with the Federal Trade Commission's 16 CFR, Part 255: 
              "Guides Concerning the Use of Endorsements and Testimonials in Advertising."
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
