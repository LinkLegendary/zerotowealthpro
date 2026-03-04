import Link from 'next/link';
import { ArrowToHome } from './ArrowToHome';

export default function ArticleFooter() {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      {/* Navigation Links */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-[#4472C4] font-medium hover:underline"
        >
          &larr; Read All Articles
        </Link>

        <div className="flex items-center gap-4 text-gray-500">
          <Link
            href="/about"
            className="hover:text-[#4472C4] transition-colors"
          >
            About
          </Link>
          <span>•</span>
          <Link
            href="/disclaimer"
            className="hover:text-[#4472C4] transition-colors"
          >
            Disclaimer
          </Link>
          <span>•</span>
          <Link
            href="/privacy"
            className="hover:text-[#4472C4] transition-colors"
          >
            Privacy
          </Link>
        </div>
      </div>
      <div className="mt-4">
        <ArrowToHome />
      </div>
    </div>
  );
}
