'use client';

import dynamic from 'next/dynamic';

// Lazy-load the full calculator — only loads JS when this component is on screen
const DebtCalculator = dynamic(() => import('@/components/DebtCalculator'), {
  ssr: false,
  loading: () => (
    <div style={{
      background: '#111d2b',
      border: '1px solid #1e3448',
      borderRadius: 16,
      padding: '48px 24px',
      textAlign: 'center',
      color: '#7a9ab8',
      fontFamily: "'SF Mono', 'Consolas', monospace",
      fontSize: 13,
    }}>
      ⏳ Loading calculator…
    </div>
  ),
});

interface Props {
  /** Optional wrapper class for positioning on the parent page */
  className?: string;
}

/**
 * Drop this anywhere in your Next.js app to embed the full
 * Debt Payoff Calculator as a self-contained block.
 *
 * Usage:
 *   import DebtCalculatorEmbed from '@/components/DebtCalculatorEmbed'
 *   <DebtCalculatorEmbed />
 *
 * On a blog post:
 *   <DebtCalculatorEmbed className="my-12" />
 */
export default function DebtCalculatorEmbed({ className }: Props) {
  return (
    <div className={className} style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}>
      <DebtCalculator />
    </div>
  );
}