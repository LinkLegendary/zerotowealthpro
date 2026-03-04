import Link from "next/link"

export const metadata = {
  title: 'Contact Us — ZeroToWealthPro',
  description:
    'Get in touch with ZeroToWealthPro for questions, content corrections, partnerships, or media inquiries.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Banner — matches rest of site */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F4E78] via-[#2d6a9f] to-[#4472C4]" />
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-96 h-96 bg-[#4472C4]/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-10 text-center">
          <div className="flex items-center justify-center gap-2 text-blue-200 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white/70">Contact</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto leading-relaxed">
            Questions, corrections, or partnership inquiries — we read every email.
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
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">

          {/* FIX 1 — uncommented response time */}
          <div className="bg-blue-50 border-l-4 border-[#4472C4] p-4 rounded">
            <p className="text-gray-700 text-sm leading-relaxed">
              We typically respond within <strong>24–48 hours</strong> on business days.
            </p>
          </div>

          {/* Primary contact */}
          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">General Questions</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Questions about our articles, tools, or content? Reach us at:
            </p>
            <a
              href="mailto:contact@zerotowealthpro.com"
              className="inline-flex items-center gap-2 text-[#4472C4] font-medium hover:underline"
            >
              📩 contact@zerotowealthpro.com
            </a>
          </div>

          {/* FIX 2 — added corrections email (important for AdSense E-E-A-T) */}
          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Content Corrections</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Found a dead link, an incorrect statistic, or a calculation error? We correct
              errors promptly and update the article's last-reviewed date. Please email:
            </p>
            <a
              href="mailto:contact@zerotowealthpro.com"
              className="inline-flex items-center gap-2 text-[#4472C4] font-medium hover:underline"
            >
              📩 contact@zerotowealthpro.com
            </a>
          </div>

          {/* FIX 3 — added legal/privacy separate email */}
          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Privacy & Legal</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              For privacy requests, data deletion, copyright concerns, or legal matters:
            </p>
            <a
              href="mailto:legal@zerotowealthpro.com"
              className="inline-flex items-center gap-2 text-[#4472C4] font-medium hover:underline"
            >
              📩 legal@zerotowealthpro.com
            </a>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Partnerships & Media</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              For partnership inquiries, media requests, or content collaborations:
            </p>
            <a
              href="mailto:contact@zerotowealthpro.com"
              className="inline-flex items-center gap-2 text-[#4472C4] font-medium hover:underline"
            >
              📩 contact@zerotowealthpro.com
            </a>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-gray-100 pt-6">
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Financial Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              All content on ZeroToWealthPro is for educational purposes only and does not
              constitute personalized financial, legal, or tax advice. Consult a licensed
              financial advisor before making significant financial decisions. See our{' '}
              <Link href="/terms" className="text-[#4472C4] hover:underline">Terms of Use</Link>
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
