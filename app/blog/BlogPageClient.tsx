'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import KitInlineForm from '@/components/KitInlineForm';
import type { Post } from '@/lib/blog';


// Since this is now a client component, we pass posts as props
// Update your page to use a wrapper — see instructions below

// interface Post {
//   slug: string;
//   title: string;
//   description: string;
//   date: string;
//   readingTime: number; // add this
// }

export default function BlogPageClient({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return posts;
    const q = query.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query, posts]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── BANNER ── */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F4E78] via-[#2d6a9f] to-[#4472C4]" />
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-96 h-96 bg-[#4472C4]/20 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-8 text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-blue-200 text-sm mb-5">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>›</span>
            <span className="text-white/70">Articles</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            📰 Resource Library
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-3 drop-shadow-lg">
            All Articles
          </h1>

          {/* Subheading */}
          <p className="text-blue-100 text-lg max-w-xl mx-auto mb-6 leading-relaxed">
            Practical guides, real numbers, and structured systems to help you
            eliminate debt faster.
          </p>

          {/* ── SEARCH BAR ── */}
          <div className="max-w-lg mx-auto mb-6">
            <div className="relative">
              {/* Search icon */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
              </div>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/40 rounded-full py-3 pl-11 pr-12 text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all"
              />

              {/* Clear button */}
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Live result count */}
            {query && (
              <p className="text-blue-200 text-xs mt-2 text-center">
                {filtered.length === 0
                  ? 'No articles found'
                  : `${filtered.length} article${filtered.length !== 1 ? 's' : ''} found`}
              </p>
            )}
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 mt-2">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{posts.length}</p>
              <p className="text-blue-200 text-xs uppercase tracking-wider mt-0.5">
                Articles
              </p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white"></p>
              <p className="text-blue-200 text-xs uppercase tracking-wider mt-0.5">
                {/* Always */}
              </p>
            </div>
            <div className="w-px h-8 bg-white/20" />

            <div className="text-center">
              <p className="text-2xl font-bold text-white">
                {posts.length > 0
                  ? Math.round(
                      posts.reduce((sum, p) => sum + p.readingTime, 0) /
                        posts.length
                    )
                  : 0}{' '}
                min
              </p>
              <p className="text-blue-200 text-xs uppercase tracking-wider mt-0.5">
                Avg Read
              </p>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="relative z-10">
          <svg
            viewBox="0 0 1440 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-50"
          >
            <path
              d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* ── ARTICLES GRID ── */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            {query ? `Results for "${query}"` : 'Latest Guides'}
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Cards */}
        <div className="grid gap-6">
          {filtered.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#4472C4]/30 hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-start gap-5">
                  {/* Index number */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#1F4E78] to-[#4472C4] flex items-center justify-center text-white text-sm font-bold shadow-sm">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        {/* Highlight matching text in title */}
                        <h2 className="text-lg font-bold text-gray-800 group-hover:text-[#1F4E78] transition-colors leading-snug mb-1.5">
                          <HighlightText text={post.title} query={query} />
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                          <HighlightText
                            text={post.description}
                            query={query}
                          />
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-200 group-hover:border-[#4472C4] group-hover:bg-[#4472C4] flex items-center justify-center transition-all duration-300 mt-0.5">
                        <svg
                          className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Footer meta */}
                    <div className="flex items-center gap-3 mt-3">
                      {post.date && (
                        <span className="text-xs text-gray-400">
                          📅{' '}
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      )}
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-400">
                        📖 {post.readingTime} min read
                      </span>
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs font-medium text-[#4472C4] bg-blue-50 px-2 py-0.5 rounded-full">
                        💰 Debt Strategy
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No results */}
        {filtered.length === 0 && query && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-gray-600 text-lg font-medium">
              No results for "{query}"
            </p>
            <p className="text-gray-400 text-sm mt-1 mb-4">
              Try a different keyword.
            </p>
            <button
              onClick={() => setQuery('')}
              className="text-[#4472C4] text-sm font-medium hover:underline"
            >
              ← Show all articles
            </button>
          </div>
        )}

        {/* Empty state — no posts at all */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-gray-500 text-lg font-medium">No articles yet</p>
            <p className="text-gray-400 text-sm mt-1">Check back soon.</p>
          </div>
        )}

        {/* Bottom CTA — inline email opt-in */}
        <div className="mt-12">
          <KitInlineForm />
        </div>

        {/* ADD DISCLAIMER HERE */}
        <div className="mt-6 text-center max-w-2xl mx-auto">
          <p className="text-xs text-gray-400 leading-relaxed">
            This site provides educational content about debt payoff and
            personal finance. Some links may be affiliate links, meaning we may
            earn a commission at no extra cost to you. We only recommend tools
            designed to help readers reduce debt faster. This content is not
            financial advice.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-[#4472C4] text-sm font-medium hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Highlight matching text ──
function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi'
  );
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 text-gray-900 rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
