import { getPostBySlug, getAllPosts, Post } from "@/lib/blog"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import FontSizeWrapper from "./FontSizeWrapper"
import YouTubeEmbed from "@/components/YouTubeEmbed"
import type { Metadata } from 'next'
import ArticleDisclaimer from "@/components/ArticleDisclaimer"
import ArticleFooter from "@/components/ArticleFooter"
import ReadMoreArticles from "@/components/ReadMoreArticles"
import RelatedArticles from "@/components/RelatedArticles"
import ResourceLinks from "@/components/ResourceLinks"
import { ArrowToHome } from "@/components/ArrowToHome"
import Link from "next/link"

interface BlogPostProps {
  params: Promise<{ slug: string }>
}

// ✅ Components available inside MDX
const components = {
  YouTubeEmbed,
  ArticleDisclaimer,
  ArticleFooter,
  ReadMoreArticles,
  RelatedArticles,
  ResourceLinks,
  ArrowToHome,
  Link
}

// Metadata generation
export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params
  const post: Post | null = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested article could not be found.',
    }
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords || 'debt payoff, debt strategy, financial freedom',
    authors: [{ name: post.author || 'Debt Freedom Guide' }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `https://yoursite.com/blog/${slug}`,
      siteName: 'Debt Freedom Guide',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  const post: Post | null = getPostBySlug(slug)
  if (!post) return notFound()

  // Strip MDX formatting for schema/plain text
  const plainText = post.content
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/`{1,3}.*?`{1,3}/g, '')
    .replace(/\n+/g, ' ')
    .trim()

  return (
    <div>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            author: {
              "@type": "Organization",
              name: post.author || "Debt Freedom Guide",
            },
            datePublished: post.date,
            keywords: post.keywords || "debt payoff, debt strategy",
          }),
        }}
      />

      {/* Blog content */}
     <FontSizeWrapper
  title={post.title}
  date={post.date}
  description={post.description}
  plainText={plainText}
>
  {/* ✅ Top contextual link */}
  <div className="mb-6 text-sm text-blue-600">
    💡 Looking to pay off your debt faster? Check out our{" "}
    <Link href="/debt-payoff" className="underline font-semibold">
      complete Debt Payoff Guide
    </Link>
    .
  </div>

  {/* Original blog content */}
  <MDXRemote source={post.content} components={components} />

  {/* ✅ Bottom pillar CTA */}
  <section className="mt-16 bg-[#1F4E78] text-white rounded-xl p-8 text-center">
    <h3 className="text-2xl font-bold mb-4">Ready to Eliminate Your Debt?</h3>
    <div className="mb-6 text-white/90">
      See the complete step-by-step system for choosing Snowball or Avalanche,
      calculating timelines, and accelerating payoff.
    </div>
    <Link
      href="/debt-payoff"
      className="inline-block bg-white text-[#1F4E78] px-6 py-3 rounded-full font-bold hover:scale-105 transition"
    >
      View the Complete Debt Payoff Guide →
    </Link>
  </section>
  <ArticleDisclaimer />
  <ArticleFooter />


</FontSizeWrapper>


    </div>
  )
}



















