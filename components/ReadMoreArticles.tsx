

import Link from 'next/link'

export default function ReadMoreArticles() {
  return (
    <div className="mt-10 bg-blue-50 border-2 border-[#4472C4] rounded-xl p-6 text-center">
      <h3 className="text-xl font-bold text-[#1F4E78] mb-2">
        📚 More Debt Payoff Guides
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        Explore our complete library of debt freedom strategies
      </p>
      <Link
        href="/blog"
        className="inline-block bg-[#4472C4] text-white font-bold px-6 py-3 rounded-full hover:bg-[#1F4E78] transition-colors shadow"
      >
        View All Articles →
      </Link>
    </div>
  )
}