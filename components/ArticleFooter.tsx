import Link from 'next/link'
import { ArrowToHome } from './ArrowToHome'

export default function ArticleFooter() {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      {/* CTA Section */}
      <div className="bg-gradient-to-br from-[#1F4E78] to-[#4472C4] rounded-xl p-8 text-center mb-8">
        <h3 className="font-bold text-xl mb-2" style={{ color: '#ffffff' }}>
          Want to become debt-free faster?
        </h3>
        <p className="text-sm mb-6" style={{ color: '#dbeafe' }}>
          Get our advanced calculator with snowball, avalanche, and hybrid comparison.
        </p>
        
         <a href="https://zerowealthacademy.gumroad.com/l/DebtCalculatorPlus"
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className="inline-block bg-white text-[#1F4E78] font-bold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors shadow-lg"
        >
          🧮 Get Debt Calculator Plus &rarr;
        </a>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-[#4472C4] font-medium hover:underline"
        >
          &larr; Read All Articles
        </Link>

        <div className="flex items-center gap-4 text-gray-500">
          <Link href="/about" className="hover:text-[#4472C4] transition-colors">
            About
          </Link>
          <span>•</span>
          <Link href="/disclaimer" className="hover:text-[#4472C4] transition-colors">
            Disclaimer
          </Link>
          <span>•</span>
          <Link href="/privacy" className="hover:text-[#4472C4] transition-colors">
            Privacy
          </Link>
        </div>
      </div>
       <div className='mt-16'>
        <ArrowToHome />
       </div>
      
    </div>
  )
}