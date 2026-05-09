import { getPostBySlug, getAllPosts, Post } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import FontSizeWrapper from './FontSizeWrapper';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import type { Metadata } from 'next';
import ArticleDisclaimer from '@/components/ArticleDisclaimer';
import ArticleFooter from '@/components/ArticleFooter';
import ReadMoreArticles from '@/components/ReadMoreArticles';
import RelatedArticles from '@/components/RelatedArticles';
import ResourceLinks from '@/components/ResourceLinks';
import { ArrowToHome } from '@/components/ArrowToHome';
import Link from 'next/link';
import EmailCapture from './EmailCapture'; // add this import

const FINANCIAL_TOOLS = [
  {
    title: 'Net Worth Calculator',
    description: 'Measure assets minus liabilities',
    href: '/financial-utilities/net-worth-calculator',
    icon: '💎',
  },
  {
    title: 'Budget Calculator',
    description: 'Plan spending with the 50/30/20 rule',
    href: '/financial-utilities/budget-calculator',
    icon: '💵',
  },
  {
    title: 'Take Home Pay Calculator',
    description: 'Estimate after-tax income',
    href: '/financial-utilities/take-home-pay-calculator',
    icon: '💸',
  },
  {
    title: 'Emergency Fund Calculator',
    description: 'Set your ideal cash reserve target',
    href: '/financial-utilities/emergency-fund-calculator',
    icon: '🛡️',
  },
];






interface BlogPostProps {
  params: Promise<{ slug: string }>;
  readingTime: number;
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
  Link,
  EmailCapture,
};

// Metadata generation
export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post: Post | null = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested article could not be found.',
    };
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
      url: `https://zerotowealthpro.com/blog/${slug}`,
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
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const post: Post | null = getPostBySlug(slug);
  if (!post) return notFound();

  // Strip MDX formatting for schema/plain text
  const plainText = post.content
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/`{1,3}.*?`{1,3}/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  return (
    <div className='bg-gray-100'>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            author: {
              '@type': 'Organization',
              name: post.author || 'Debt Freedom Guide',
            },
            datePublished: post.date,
            keywords: post.keywords || 'debt payoff, debt strategy',
          }),
        }}
      />

      {/* Blog content */}
      <FontSizeWrapper
        title={post.title}
        date={post.date}
        description={post.description}
        plainText={plainText}
        readingTime={post.readingTime}
      >
        {/* ✅ Top contextual link */}
        <div className="mb-6 text-sm text-blue-600">
          💡 Looking to pay off your debt faster? Check out our{' '}
          <Link href="/debt-payoff" className="underline font-semibold">
            complete Debt Payoff Guide
          </Link>
          .
        </div>

        {/* Original blog content */}
        <MDXRemote source={post.content} components={components} />

        {/* ✅ Bottom pillar CTA */}
        <section className="mt-16 bg-gradient-to-br from-[#1F4E78] to-[#4472C4] text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
         <strong className='text-white'> Ready to Eliminate Your Debt?</strong>  
          </h3>
          <div className="mb-6 mt-12 text-white/90 text-lg ">
            See the complete step-by-step system for choosing Snowball or
            Avalanche, calculating timelines, and accelerating payoff.
          </div>
          <Link
            href="/debt-payoff"
            className="inline-block bg-white text-[#1F4E78] px-6 py-3 rounded-full font-bold hover:scale-105 transition"
          >
           <strong className='text-blue-400'> View the Complete Debt Payoff Guide →</strong>
           
          </Link>
          
        </section>
        <section className="mt-16 bg-gradient-to-br from-[#1F4E78] to-[#4472C4] text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
         <strong className='text-white'> Calculate My Debt-Free Date → </strong>  
          </h3>
          <div className="mb-6 mt-12 text-white/90 text-lg ">
            Enter your debts → click Calculate → see exactly how long & how much


          </div>
         
          <Link
            href="/debt-payoff"
            className="inline-block bg-white text-[#1F4E78] px-6 py-3 rounded-full font-bold hover:scale-105 transition"
          >
           <strong className='text-blue-400'> Free Debt Payoff Calculator →</strong>
           
          </Link>
        </section>

         {/* Financial Tools CTA */}
<div className="mt-12 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
  <div className="text-center mb-6">
    <h3 className="text-2xl font-bold text-[#1F4E78] mb-2">
      Want to Calculate Your Financial Position?
    </h3>
    <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
      Reading guides is helpful — but seeing your numbers is even better. Use our free financial calculators
      to measure your net worth, budget, take-home pay, and savings progress.
    </p>
  </div>

  <div className="grid sm:grid-cols-2 gap-4">
    {FINANCIAL_TOOLS.map((tool) => (
      <Link
        key={tool.href}
        href={tool.href}
        className="group rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md hover:border-[#4472C4]/30 transition-all p-4 text-left"
      >
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4472C4] to-[#1F4E78] text-white flex items-center justify-center text-xl shadow-sm flex-shrink-0">
            {tool.icon}
          </div>

          <div className="min-w-0">
            <h4 className="font-bold text-gray-900 group-hover:text-[#4472C4] transition-colors text-sm sm:text-base">
              {tool.title}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
              {tool.description}
            </p>
            <div className="mt-2 text-xs font-semibold text-[#4472C4]">
              Open calculator →
            </div>
          </div>
        </div>
      </Link>
    ))}
  </div>

  <div className="mt-6 text-center pt-5 border-t border-gray-200">
    <Link
      href="/financial-utilities"
      className="inline-flex items-center gap-2 text-[#4472C4] font-bold hover:underline text-sm"
    >
      View All Financial Calculator Tools
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </Link>
  </div>
</div>






        {/* Email capture */}
        <EmailCapture />

        

        <ArticleDisclaimer />
        <ArticleFooter />
      </FontSizeWrapper>
    </div>
  );
}
