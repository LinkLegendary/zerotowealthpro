import { getAuthorBySlug, getAllAuthors, Author } from "@/lib/blog"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import type { Metadata } from "next"
import ArticleDisclaimer from "@/components/ArticleDisclaimer"
import ArticleFooter from "@/components/ArticleFooter"
import { ArrowToHome } from "@/components/ArrowToHome"
import Link from "next/link"

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

// ✅ Same components available inside author MDX files
const components = {
  ArticleDisclaimer,
  ArticleFooter,
  ArrowToHome,
  Link,
}

// ✅ Metadata — matches blog pattern exactly
export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author: Author | null = getAuthorBySlug(slug)

  if (!author) {
    return {
      title: "Author Not Found",
      description: "This author profile could not be found.",
    }
  }

  return {
    title: author.title,
    description: author.description,
    openGraph: {
      title: author.title,
      description: author.description,
      type: "profile",
      url: `https://www.zerotowealthpro.com/about/${slug}`,
      siteName: "ZeroToWealthPro",
    },
    twitter: {
      card: "summary",
      title: author.title,
      description: author.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

// ✅ Static params — tells Next.js which slugs to pre-render
export async function generateStaticParams() {
  const authors = getAllAuthors()
  return authors.map((author) => ({ slug: author.slug }))
}

// ✅ Page component — matches blog layout and purple gradient
export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author: Author | null = getAuthorBySlug(slug)
  if (!author) return notFound()

  return (
    <div>
      {/* Structured Data — Person schema for E-E-A-T */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: author.title.replace("About ", ""),
            description: author.description,
            url: `https://www.zerotowealthpro.com/about/${slug}`,
            worksFor: {
              "@type": "Organization",
              name: "ZeroToWealthPro",
            },
          }),
        }}
      />

      {/* Page layout — matches homepage purple gradient */}
      <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] p-5">
        <div className="max-w-[900px] mx-auto py-12">

          {/* Back navigation */}
          <div className="mb-6">
            <Link
              href="/"
              className="text-white/70 text-sm hover:text-white transition-colors"
            >
              ← Back to Home
            </Link>
          </div>

          {/* Author content card */}
          <div className="bg-white text-gray-700 rounded-2xl shadow-xl p-8 prose prose-lg max-w-none
            prose-headings:text-[#1F4E78]
            prose-a:text-[#4472C4]
            prose-strong:text-gray-800">
            <MDXRemote source={author.content} components={components} />
          </div>

          {/* Bottom CTA — same as blog pages */}
          <section className="mt-8 bg-white/10 border border-white/20 rounded-xl p-8 text-center text-white">
            <h3 className="text-xl font-bold mb-3">
              Start Your Debt Payoff Journey
            </h3>
            <p className="text-white/80 mb-6 text-sm">
              Use our complete step-by-step system to pick a method, calculate
              your timeline, and eliminate debt faster.
            </p>
            <Link
              href="/debt-payoff"
              className="inline-block bg-white text-[#4472C4] px-6 py-3 rounded-full font-bold hover:scale-105 transition"
            >
              View the Complete Debt Payoff Guide →
            </Link>
          </section>

          {/* Back to home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-[#eaecf1] text-sm font-medium hover:underline"
            >
              ← Back to Home
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}