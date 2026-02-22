import Link from 'next/link'

export default function RelatedArticles({ 
  articles 
}: { 
  articles?: Array<{ title: string; slug: string; description: string }> 
}) {
  // Default articles if none provided
  const defaultArticles = [
    {
      title: "The Minimum Payment Trap Explained",
      slug: "minimum-payment-trap",
      description: "How credit card companies maximize interest"
    },
    {
      title: "How to Pay Off $50k in Debt",
      slug: "pay-off-50k-debt",
      description: "Realistic timelines and strategies"
    },
    {
      title: "Best Budgeting Apps for Debt Payoff",
      slug: "budgeting-apps",
      description: "Compare tools that actually work"
    },
  ]

  const displayArticles = articles || defaultArticles

  return (
    <div className="mt-12 mb-8">
      <h3 className="text-xl font-bold text-[#1F4E78] mb-4">
        📖 Keep Reading
      </h3>
      <div className="grid gap-4">
        {displayArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-[#4472C4] hover:shadow-md transition-all"
          >
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 group-hover:text-[#4472C4] transition-colors">
                {article.title}
              </h4>
              <p className="text-sm text-gray-200 mt-1">
                <strong className='text-gray-400'>

                  {article.description}
                </strong>
                
                
              </p>
            </div>
            <svg 
              className="w-5 h-5 text-gray-400 group-hover:text-[#4472C4] transition-colors flex-shrink-0 mt-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#4472C4] font-medium hover:underline"
        >
          ← View All Articles
        </Link>
      </div>
    </div>
  )
}