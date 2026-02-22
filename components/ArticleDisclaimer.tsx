import Link from 'next/link';

export default function ArticleDisclaimer() {
  return (
    <div className="mt-12 pt-6 border-t border-gray-200">
      <div className="bg-gray-50 rounded-xl p-6 text-sm text-gray-600 leading-relaxed">
        <p className="mb-3 ">
          <strong className="text-gray-800">Disclaimer:</strong>
          <strong className="dark:text-gray-500 ">
            I'm not a financial advisor, accountant, or attorney. This content
            is for educational and informational purposes only and should not be
            considered professional financial advice. Always consult with a
            qualified professional before making financial decisions.
          </strong>
        </p>
        <p>
          <strong className="text-gray-800">Affiliate Disclosure:</strong>
          <strong className="text-gray-500">
            This article may contain affiliate links. If you make a purchase
            through these links, we may earn a small commission at no extra cost
            to you. We only recommend products and services we've personally
            used or thoroughly researched. Read our full{' '}
            <Link href="/disclaimer" className="text-[#4472C4] hover:underline">
              Affiliate Disclosure
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-[#4472C4] hover:underline">
              Privacy Policy
            </Link>
            .
          </strong>
        </p>
      </div>
    </div>
  );
}
