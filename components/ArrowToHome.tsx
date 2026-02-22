import Link from 'next/link'
export function ArrowToHome() {
  return (
    <div className="mt-6 text-center">
          <Link href="/" className="text-[#4472C4] text-sm font-medium hover:underline">
            ← Back to Home
          </Link>
        </div>
  )
}