import Link from "next/link"

export default function PrivacyPage() {
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
            <span className="text-white/70">Privacy Policy</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
            Privacy Policy
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
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We collect minimal information to improve your experience on our site:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Analytics:</strong> We use Google Analytics to understand how visitors use our site (pages viewed, time on site, location). This data is anonymized.</li>
              <li><strong>Cookies:</strong> We use cookies for analytics and to remember your preferences (like dark mode settings).</li>
              <li><strong>Email addresses:</strong> If you subscribe to our newsletter, we collect your email address. We never sell or share your email.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Improve the content and user experience on our site</li>
              <li>Send you occasional updates if you've subscribed (you can unsubscribe anytime)</li>
              <li>Respond to your inquiries or support requests</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Third-Party Services</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We use the following third-party services that may collect data:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li><strong>Google Analytics:</strong> To track site usage</li>
              <li><strong>Cloudflare:</strong> For site performance and security</li>
              <li><strong>Gumroad:</strong> For processing digital product purchases</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Each of these services has their own privacy policies. We do not control how they use your data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
              <li>Request access to any personal data we have about you</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of marketing emails at any time</li>
              <li>Disable cookies in your browser settings</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We take reasonable precautions to protect your information. Our site uses HTTPS encryption, 
              and we do not store sensitive financial information like credit card numbers (all payments 
              are processed through secure third-party providers).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Children's Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              Our site is not intended for children under 13. We do not knowingly collect personal 
              information from children.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any significant 
              changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1F4E78] mb-3">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about this privacy policy, please contact us at{' '}
              <a href="mailto:privacy@yoursite.com" className="text-[#4472C4] hover:underline">
                privacy@yoursite.com
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
