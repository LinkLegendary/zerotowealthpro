import type { Metadata } from 'next';
import DebtCalculatorClient from '@/components/DebtCalculatorClient';

export const metadata: Metadata = {
  title: 'Free Debt Payoff Calculator',
  description:
    'Calculate exactly how long it takes to pay off your debt using the Snowball vs Avalanche method. See total interest paid, months to payoff, and how much you save.',
  openGraph: {
    title: 'Free Debt Payoff Calculator — Zero to Wealth Pro',
    description: 'Snowball vs Avalanche. See your exact payoff timeline and total interest paid.',
    url: 'https://zerotowealthpro.com/calculator',
  },
};

export default function CalculatorPage() {
  return (
    <main>
      <DebtCalculatorClient />
    </main>
  );
}