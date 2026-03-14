'use client';

import dynamic from 'next/dynamic';

const DebtCalculator = dynamic(
  () => import('@/components/DebtCalculator'),
  {
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
        margin: '24px',
      }}>
        ⏳ Loading calculator…
      </div>
    ),
  }
);

export default function DebtCalculatorClient() {
  return <DebtCalculator />;
}