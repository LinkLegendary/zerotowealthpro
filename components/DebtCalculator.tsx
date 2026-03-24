'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// ── Types ──────────────────────────────────────────────────────────────────
interface Debt {
  id: number;
  name: string;
  balance: string;
  rate: string;
  min: string;
}

interface SimResult {
  months: number;
  totalInterest: number;
  monthlyLog: MonthRow[];
}

interface MonthRow {
  month: number;
  totalPaid: number;
  interest: number;
  principal: number;
  remaining: number;
  debtsLeft: number;
}

interface Results {
  snow: SimResult;
  aval: SimResult;
  totalDebt: number;
  intSaved: number;
  winner: 'avalanche' | 'snowball' | 'tie';
  tip: string;
  resultsURL: string;
}

// ── Constants ──────────────────────────────────────────────────────────────
const KIT_FORM_ID = process.env.NEXT_PUBLIC_KIT_FORM_ID;
const KIT_API_KEY = process.env.NEXT_PUBLIC_KIT_API_KEY;

const DEFAULT_DEBTS: Omit<Debt, 'id'>[] = [
  { name: 'Credit Card 1',  balance: '3500',  rate: '22.99', min: '102' },
  { name: 'Credit Card 2',  balance: '8200',  rate: '19.99', min: '219' },
  { name: 'Car Loan',       balance: '12500', rate: '6.5',   min: '193' },
  { name: 'Student Loan',   balance: '25000', rate: '4.5',   min: '344' },
  { name: 'Personal Loan',  balance: '5000',  rate: '12.0',  min: '100' },
];

const TIPS = [
  'Paying just $50 extra per month on a $10,000 card at 20% APR cuts your payoff time by over 2 years and saves more than $3,000 in interest.',
  'The avalanche method always saves the most interest — but only if you stick with it. Automate the extra payment so the decision is already made.',
  'Every time you pay off a card, immediately redirect that minimum payment to the next debt. Never let freed-up money disappear into spending.',
  'Round up your minimum payments. Paying $250 instead of $228 on a card costs you $22 more per month — but can shave months off your payoff timeline.',
  'Calling your card issuer to request a lower APR takes 5 minutes and costs nothing. A 3% rate reduction on a $10,000 balance saves over $1,500 in interest.',
  'The worst thing you can do after paying off a card is keep it in your wallet. Freeze it, close it, or cut it — remove the temptation entirely.',
  'Your daily interest cost is your real enemy — not the balance. Focus on the card draining the most per day, not the one with the biggest number.',
  'A balance transfer to a 0% APR card can pause interest entirely for 12–21 months. Use that window to attack the principal aggressively.',
  'Windfalls — tax refunds, bonuses, side income — should go straight to your highest-APR debt. One $1,000 lump sum can eliminate months of payments.',
  'Set your extra payment to auto-transfer on payday, not at the end of the month. Money that touches your checking account has a way of disappearing.',
  'Never skip a payment, even a minimum. A single missed payment can trigger a penalty APR — sometimes jumping your rate to 29.99% overnight.',
  'Debt snowball works best when you have many small balances killing motivation. Debt avalanche works best when you want to minimize total cost.',
  'Your credit utilization ratio drops as you pay down balances — which can improve your credit score and qualify you for lower interest rates.',
  'Track your daily interest cost every month. Watching that number shrink from $20/day to $8/day is the most motivating progress report you can get.',
  'The minimum payment trap: a $15,000 balance at 18% APR on minimums-only can take over 5 years to clear and cost $8,000+ in interest.',
];

// ── Simulation engine ──────────────────────────────────────────────────────
function simulate(
  debtsInput: { balance: number; rate: number; min: number }[],
  strategy: 'snowball' | 'avalanche',
  extra: number
): SimResult {
  const pool = debtsInput.map(d => ({ ...d }));
  if (strategy === 'snowball') pool.sort((a, b) => a.balance - b.balance);
  else pool.sort((a, b) => b.rate - a.rate);

  let totalInterest = 0, months = 0;
  const monthlyLog: MonthRow[] = [];

  while (pool.some(d => d.balance > 0.01) && months < 600) {
    months++;
    let monthInterest = 0, monthPrincipal = 0, freedThisMonth = 0;

    for (const d of pool) {
      if (d.balance <= 0.01) continue;
      const interest = d.balance * (d.rate / 12);
      monthInterest += interest;
      totalInterest += interest;
      const payment = Math.min(d.min, d.balance + interest);
      monthPrincipal += payment - interest;
      d.balance = d.balance + interest - payment;
      if (d.balance < 0.01) { freedThisMonth += d.min; d.balance = 0; }
    }

    const availExtra = extra + freedThisMonth;
    for (const d of pool) {
      if (d.balance > 0.01) {
        const pay = Math.min(availExtra, d.balance);
        d.balance -= pay;
        monthPrincipal += pay;
        if (d.balance < 0.01) d.balance = 0;
        break;
      }
    }

    const remaining = Math.max(pool.reduce((s, d) => s + d.balance, 0), 0);
    monthlyLog.push({
      month: months,
      totalPaid: monthInterest + monthPrincipal,
      interest: monthInterest,
      principal: monthPrincipal,
      remaining,
      debtsLeft: pool.filter(d => d.balance > 0.01).length,
    });
  }

  return { months, totalInterest: Math.round(totalInterest * 100) / 100, monthlyLog };
}

// ── Formatters ──────────────────────────────────────────────────────────────
const fmt$ = (v: number) =>
  '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function fmtMonths(m: number) {
  const yrs = Math.floor(m / 12), mos = m % 12;
  if (yrs === 0) return `${mos} mo`;
  if (mos === 0) return `${yrs} yr${yrs > 1 ? 's' : ''}`;
  return `${yrs} yr${yrs > 1 ? 's' : ''} ${mos} mo`;
}

let lastTipIndex = -1;
function randomTip() {
  let idx: number;
  do { idx = Math.floor(Math.random() * TIPS.length); } while (idx === lastTipIndex);
  lastTipIndex = idx;
  return TIPS[idx];
}

function buildURL(debts: Debt[], extra: string, td: number, snow: SimResult, aval: SimResult, intSaved: number, winner: string): string {
  if (typeof window === 'undefined') return '';
  const p = new URLSearchParams({
    td:  String(Math.round(td)),
    sm:  String(snow.months),
    am:  String(aval.months),
    si:  String(Math.round(snow.totalInterest)),
    ai:  String(Math.round(aval.totalInterest)),
    ins: String(Math.round(Math.abs(intSaved))),
    win: winner,
    ex:  extra,
    dbt: debts
      .filter(d => parseFloat(d.balance) > 0)
      .map(d => [d.name, Math.round(parseFloat(d.balance)||0), parseFloat(d.rate)||0, Math.round(parseFloat(d.min)||0)].join('|'))
      .join('~'),
  });
  return `${window.location.origin}${window.location.pathname}?${p.toString()}`;
}

// ── Component ──────────────────────────────────────────────────────────────
export default function DebtCalculator() {
  const [debts, setDebts] = useState<Debt[]>(() =>
    DEFAULT_DEBTS.map((d, i) => ({ ...d, id: i + 1 }))
  );
  const [extra, setExtra] = useState('200');
  const [results, setResults] = useState<Results | null>(null);
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [kitStatus, setKitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [kitError,  setKitError]  = useState('');
  const searchParams                    = useSearchParams();
  const [copied, setCopied]             = useState(false);
  const [restoredFromURL, setRestoredFromURL] = useState(false);
  const resultsRef  = useRef<HTMLDivElement>(null);
  const counterRef  = useRef(DEFAULT_DEBTS.length);

  // ── Restore results from URL on page load ──────────────────────────────
  useEffect(() => {
    const td = searchParams.get('td'), sm = searchParams.get('sm'), am = searchParams.get('am');
    const si = searchParams.get('si'), ai = searchParams.get('ai'), ins = searchParams.get('ins');
    const win = searchParams.get('win'), ex = searchParams.get('ex'), dbt = searchParams.get('dbt');
    if (!td || !sm || !am) return;
    if (dbt) {
      const parsed = dbt.split('~').map((chunk, i) => {
        const [name, balance, rate, min] = chunk.split('|');
        return { id: i + 1, name: name||'', balance: balance||'', rate: rate||'', min: min||'' };
      });
      setDebts(parsed);
      counterRef.current = parsed.length;
    }
    if (ex) setExtra(ex);
    const snowR: SimResult = { months: parseInt(sm), totalInterest: parseInt(si||'0'), monthlyLog: [] };
    const avalR: SimResult = { months: parseInt(am), totalInterest: parseInt(ai||'0'), monthlyLog: [] };
    const intSavedVal = parseInt(ins||'0');
    const winner = (win||'avalanche') as Results['winner'];
    setResults({ snow: snowR, aval: avalR, totalDebt: parseInt(td),
      intSaved: winner === 'snowball' ? -intSavedVal : intSavedVal,
      winner, tip: randomTip(), resultsURL: typeof window !== 'undefined' ? window.location.href : '' });
    setRestoredFromURL(true);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const copyLink = useCallback(() => {
    if (!results?.resultsURL) return;
    navigator.clipboard.writeText(results.resultsURL).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
  }, [results]);

  const addDebt = useCallback(() => {
    counterRef.current += 1;
    setDebts(prev => [...prev, { id: counterRef.current, name: '', balance: '', rate: '', min: '' }]);
  }, []);

  const removeDebt = useCallback((id: number) => {
    setDebts(prev => prev.filter(d => d.id !== id));
  }, []);

  const updateDebt = useCallback((id: number, field: keyof Omit<Debt, 'id'>, value: string) => {
    setDebts(prev => prev.map(d => d.id === id ? { ...d, [field]: value } : d));
  }, []);

  const calculate = useCallback(() => {
    const parsed = debts
      .map(d => ({ balance: parseFloat(d.balance) || 0, rate: (parseFloat(d.rate) || 0) / 100, min: parseFloat(d.min) || 0 }))
      .filter(d => d.balance > 0);

    if (!parsed.length) return;

    const totalDebt = parsed.reduce((s, d) => s + d.balance, 0);
    const extraVal  = parseFloat(extra) || 0;
    const snow = simulate(parsed, 'snowball',  extraVal);
    const aval = simulate(parsed, 'avalanche', extraVal);
    const intSaved = Math.round((snow.totalInterest - aval.totalInterest) * 100) / 100;
    const winner: Results['winner'] = intSaved > 0 ? 'avalanche' : intSaved < 0 ? 'snowball' : 'tie';
    const resultsURL = buildURL(debts, extra, totalDebt, snow, aval, intSaved, winner);

    setResults({
      snow, aval, totalDebt, intSaved,
      winner,
      tip: randomTip(),
      resultsURL,
    });

    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }, [debts, extra]);

  const resetAll = useCallback(() => {
    setDebts(DEFAULT_DEBTS.map((d, i) => ({ ...d, id: i + 1 })));
    setExtra('200');
    setResults(null);
    setKitStatus('idle');
    setKitError('');
  }, []);

  const submitToKit = useCallback(async () => {
    if (!email || !email.includes('@') || !results) return;
    setKitStatus('loading');
    setKitError('');
    try {
      const res = await fetch(`https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key:    KIT_API_KEY,
          email,
          first_name: fname || undefined,
          fields:     { results_url: results.resultsURL || '' },
          tags: [
            `debt-${Math.round(results.totalDebt / 1000)}k`,
            `strategy-${results.winner}`,
            'payoff-calculator',
          ],
        }),
      });
      if (res.ok) {
        setKitStatus('success');
      } else {
        const data = await res.json().catch(() => ({}));
        setKitError(data?.message || `Error ${res.status}`);
        setKitStatus('error');
      }
    } catch (e: unknown) {
      setKitError(e instanceof Error ? e.message : 'Network error — check your connection');
      setKitStatus('error');
    }
  }, [email, fname, results]);

  const absIntSaved   = results ? Math.abs(results.intSaved) : 0;
  const maxInterest   = results ? Math.max(results.snow.totalInterest, results.aval.totalInterest) : 1;
  const snowBarWidth  = results ? (results.snow.totalInterest / maxInterest * 100).toFixed(1) + '%' : '0%';
  const avalBarWidth  = results ? (results.aval.totalInterest / maxInterest * 100).toFixed(1) + '%' : '0%';

  return (
    <>
      <style>{STYLES}</style>
      <div className="dc-wrap">
        <div className="dc-glow-a" /><div className="dc-glow-b" />

        {/* HEADER */}
        <header className="dc-header">
          <div className="dc-badge">zerotowealthpro.com</div>
          <h1 className="dc-title">Debt Payoff<br />Calculator</h1>
          <p className="dc-subtitle">Enter your debts → click Calculate → see exactly how long &amp; how much</p>
        </header>

        {/* RESTORED BANNER */}
        {restoredFromURL && (
          <div className="dc-restored-banner">
            <span style={{fontSize:20}}>✅</span>
            <div>
              <div className="dc-restored-title">Your saved results have been restored!</div>
              <div className="dc-restored-sub">Scroll down to see your payoff plan — or edit and recalculate.</div>
            </div>
          </div>
        )}

        {/* INPUT CARD */}
        <div className="dc-card">
          <div className="dc-section-label">Your Debts</div>

          {/* Desktop column headers — hidden on mobile */}
          <div className="dc-col-headers">
            <span>Debt Name</span><span>Balance ($)</span><span>Rate (% APR)</span><span>Min Payment</span><span />
          </div>

          {debts.map(d => (
            <div key={d.id} className="dc-debt-row">
              {/* Desktop: plain inputs. Mobile: label-value pairs */}
              <div className="dc-field">
                <span className="dc-field-label">Debt Name</span>
                <input className="dc-input" placeholder="e.g. Credit Card" value={d.name} onChange={e => updateDebt(d.id, 'name', e.target.value)} />
              </div>
              <div className="dc-field">
                <span className="dc-field-label">Balance ($)</span>
                <input className="dc-input" placeholder="0" value={d.balance} onChange={e => updateDebt(d.id, 'balance', e.target.value)} type="number" min="0" />
              </div>
              <div className="dc-field">
                <span className="dc-field-label">Rate (% APR)</span>
                <input className="dc-input" placeholder="0.00" value={d.rate} onChange={e => updateDebt(d.id, 'rate', e.target.value)} type="number" min="0" step="0.01" />
              </div>
              <div className="dc-field">
                <span className="dc-field-label">Min Payment</span>
                <input className="dc-input" placeholder="0" value={d.min} onChange={e => updateDebt(d.id, 'min', e.target.value)} type="number" min="0" />
              </div>
              <button className="dc-del-btn" onClick={() => removeDebt(d.id)}>×</button>
            </div>
          ))}

          <button className="dc-add-btn" onClick={addDebt}>+ Add Another Debt</button>

          <div className="dc-extra-row">
            <label>💰 Extra Monthly Payment:</label>
            <input className="dc-extra-input" type="number" value={extra} min="0" onChange={e => setExtra(e.target.value)} />
          </div>

          <div className="dc-btn-row">
            <button className="dc-btn dc-btn-primary" onClick={calculate}>⚡ Calculate Results</button>
            <button className="dc-btn dc-btn-ghost"   onClick={resetAll}>↺ Reset</button>
          </div>
        </div>

        {/* RESULTS */}
        {results && (
          <div ref={resultsRef}>
            <p className="dc-scroll-hint">▼ your results are below</p>
            <div className="dc-section-label">Results</div>

            {/* Strategy cards */}
            <div className="dc-results-grid">
              <div className="dc-r-card dc-snow">
                <div className="dc-strategy-tag">❄️ Debt Snowball</div>
                <div className="dc-r-stat"><div className="dc-r-label">Months to Pay Off</div>
                  <div className="dc-r-value">{fmtMonths(results.snow.months)}</div>
                  <div className="dc-r-sub">{results.snow.months} total months</div></div>
                <div className="dc-r-stat"><div className="dc-r-label">Total Interest Paid</div>
                  <div className="dc-r-value">{fmt$(results.snow.totalInterest)}</div></div>
                <div className="dc-r-stat"><div className="dc-r-label">Total Amount Paid</div>
                  <div className="dc-r-value" style={{ fontSize: 18 }}>{fmt$(results.totalDebt + results.snow.totalInterest)}</div></div>
              </div>

              <div className="dc-r-card dc-aval">
                <div className="dc-strategy-tag">🌊 Debt Avalanche</div>
                <div className="dc-r-stat"><div className="dc-r-label">Months to Pay Off</div>
                  <div className="dc-r-value">{fmtMonths(results.aval.months)}</div>
                  <div className="dc-r-sub">{results.aval.months} total months</div></div>
                <div className="dc-r-stat"><div className="dc-r-label">Total Interest Paid</div>
                  <div className="dc-r-value">{fmt$(results.aval.totalInterest)}</div></div>
                <div className="dc-r-stat"><div className="dc-r-label">Total Amount Paid</div>
                  <div className="dc-r-value" style={{ fontSize: 18 }}>{fmt$(results.totalDebt + results.aval.totalInterest)}</div></div>
              </div>
            </div>

            {/* Tip card */}
            <div className="dc-tip-card">
              <div className="dc-tip-header">
                <span className="dc-tip-badge">💡 FREE TIP</span>
                <span className="dc-tip-new">NEW</span>
              </div>
              <div className="dc-tip-text">{results.tip}</div>
              <div className="dc-tip-source">— ZeroToWealthPro.com</div>
            </div>

            {/* Savings banner */}
            <div className="dc-savings-banner">
              <span className="dc-savings-icon">🏆</span>
              <div>
                <div className="dc-savings-top">
                  {results.winner === 'avalanche' && `Avalanche saves you ${fmt$(absIntSaved)} in interest`}
                  {results.winner === 'snowball'  && `Snowball saves you ${fmt$(absIntSaved)} in interest`}
                  {results.winner === 'tie'       && 'Both methods cost the same interest'}
                </div>
                <div className="dc-savings-sub">
                  {results.winner !== 'tie' && results.aval.months !== results.snow.months
                    ? `...and pays off ${Math.abs(results.aval.months - results.snow.months)} month${Math.abs(results.aval.months - results.snow.months) !== 1 ? 's' : ''} faster`
                    : 'Both strategies finish in the same timeframe — but Avalanche costs less'}
                </div>
              </div>
            </div>

            {/* Interest spotlight */}
            <div className="dc-spotlight">
              <div className="dc-spot-label">💰 By choosing Avalanche over Snowball, you keep</div>
              <div className="dc-spot-amount">{fmt$(absIntSaved)}</div>
              <div className="dc-spot-sub">
                {absIntSaved > 0 ? `in interest saved by choosing ${results.winner} — even if payoff time looks the same` : 'Both strategies cost the same interest for your debt mix'}
              </div>
              <div className="dc-bar-compare">
                {[
                  { label: '❄️ Snowball', val: results.snow.totalInterest, cls: 'dc-bar-snow', width: snowBarWidth, color: 'var(--dc-amber)' },
                  { label: '🌊 Avalanche', val: results.aval.totalInterest, cls: 'dc-bar-aval', width: avalBarWidth, color: 'var(--dc-accent)' },
                ].map(b => (
                  <div key={b.label} className="dc-bar-row">
                    <div className="dc-bar-meta">
                      <span className="dc-bar-name">{b.label} — Interest Paid</span>
                      <span style={{ color: b.color, fontWeight: 600, fontSize: 11 }}>{fmt$(b.val)}</span>
                    </div>
                    <div className="dc-bar-track">
                      <div className={`dc-bar-fill ${b.cls}`} style={{ width: b.width, transition: 'width 1s cubic-bezier(.4,0,.2,1)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Month table */}
            <div className="dc-card">
              <div className="dc-section-label">Month-by-Month — Avalanche Strategy</div>
              <div className="dc-table-wrap">
                <table className="dc-table">
                  <thead><tr>
                    <th>Month</th><th>Total Paid</th><th>Interest</th><th>Principal</th><th>Remaining</th><th>Debts Left</th>
                  </tr></thead>
                  <tbody>
                    {results.aval.monthlyLog.slice(0, 24).map(row => (
                      <tr key={row.month}>
                        <td style={{ textAlign: 'left', color: 'var(--dc-muted)' }}>Month {row.month}</td>
                        <td>{fmt$(row.totalPaid)}</td>
                        <td>{fmt$(row.interest)}</td>
                        <td>{fmt$(row.principal)}</td>
                        <td style={row.remaining < 0.01 ? { color: 'var(--dc-green)', fontWeight: 600 } : {}}>
                          {row.remaining < 0.01 ? '🎉 PAID OFF' : fmt$(row.remaining)}
                        </td>
                        <td>{row.debtsLeft === 0 ? '✅' : row.debtsLeft}</td>
                      </tr>
                    ))}
                    {results.aval.monthlyLog.length > 24 && (
                      <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--dc-muted)', fontSize: 11, padding: 12 }}>
                        … and {results.aval.monthlyLog.length - 24} more months until fully paid off
                      </td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Compare grid */}
            <div className="dc-card">
              <div className="dc-section-label">Strategy Comparison</div>
              <div className="dc-cmp-grid">
                {[['', '❄️ Snowball', '🌊 Avalanche'],
                  ['Payoff Time',    fmtMonths(results.snow.months),                        fmtMonths(results.aval.months)],
                  ['Total Interest', fmt$(results.snow.totalInterest),                      fmt$(results.aval.totalInterest)],
                  ['Total Paid',     fmt$(results.totalDebt + results.snow.totalInterest),  fmt$(results.totalDebt + results.aval.totalInterest)],
                  ['First Target',   'Smallest Balance',                                    'Highest Rate'],
                  ['Best For',       'Motivation & Wins',                                   'Maximum Savings'],
                ].map((row, i) => row.map((cell, j) => (
                  <div key={`${i}-${j}`} className={`dc-cmp-cell ${i === 0 ? (j === 1 ? 'dc-cmp-hdr-snow' : j === 2 ? 'dc-cmp-hdr-aval' : 'dc-cmp-hdr') : j === 0 ? 'dc-cmp-label' : j === 1 ? 'dc-cmp-snow' : 'dc-cmp-aval'}`}>
                    {cell}
                  </div>
                )))}
              </div>
            </div>

            {/* Save results link */}
            {results.resultsURL && (
              <div className="dc-save-card">
                <div className="dc-save-label">🔗 Save your results — this link reopens your exact plan</div>
                <div className="dc-save-url">{results.resultsURL.length > 72 ? results.resultsURL.slice(0, 72) + '…' : results.resultsURL}</div>
                <button className="dc-copy-btn" onClick={copyLink}>{copied ? '✅ Copied!' : '📋 Copy My Results Link'}</button>
              </div>
            )}

            {/* Email capture */}
            <div className="dc-email-capture">
              <div style={{ fontSize: 36, marginBottom: 12 }}>📬</div>
              <div className="dc-email-heading">Send FREE PDF Complete Debt Payoff Guide to My Email</div>
              <div className="dc-email-sub"></div>

              {kitStatus !== 'success' ? (
                <div className="dc-email-form">
                  <input className="dc-email-input" type="text"  placeholder="First name"          value={fname} onChange={e => setFname(e.target.value)} />
                  <input className="dc-email-input" type="email" placeholder="Your email address"  value={email} onChange={e => setEmail(e.target.value)} />
                  <button className="dc-btn-email" onClick={submitToKit} disabled={kitStatus === 'loading'}>
                    {kitStatus === 'loading' ? '⏳ Sending…' : kitStatus === 'error' ? '⚠️ Try again' : '📧 Email Me'}
                  </button>
                  {kitStatus === 'error' && (
                    <p style={{ fontSize: 11, color: 'var(--dc-red)', marginTop: 8 }}>
                      {kitError || 'Something went wrong. Check your API key or try again.'}
                    </p>
                  )}
                  <p className="dc-email-disclaimer">No spam. Unsubscribe anytime. — zerotowealthpro.com</p>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
                  <div className="dc-success-heading">You&apos;re in!</div>
                  <div className="dc-email-sub"></div>
                  {/* {results.resultsURL && (
                    <div className="dc-save-card" style={{ marginTop: 16, textAlign: 'left' }}>
                      <div className="dc-save-label">🔗 Or copy your results link directly:</div>
                      <div className="dc-save-url">{results.resultsURL.length > 60 ? results.resultsURL.slice(0, 60) + '…' : results.resultsURL}</div>
                      <button className="dc-copy-btn" onClick={copyLink}>{copied ? '✅ Copied!' : '📋 Copy My Results Link'}</button>
                    </div>
                  )} */}
                </div>
              )}
            </div>
          </div>
        )}

        <footer className="dc-footer">
          * Calculations assume fixed minimum payments + your extra payment each month.<br />
          Actual payoff may vary. Not financial advice. — zerotowealthpro.com
        </footer>
      </div>
    </>
  );
}

// ── Styles (scoped with dc- prefix) ────────────────────────────────────────
const STYLES = `
  .dc-wrap {
    --dc-bg:      #080e17;
    --dc-surface: #0e1823;
    --dc-card:    #111d2b;
    --dc-border:  #1e3448;
    --dc-accent:  #00e5ff;
    --dc-green:   #00ff9d;
    --dc-amber:   #ffb300;
    --dc-red:     #ff4d6d;
    --dc-text:    #e2eaf4;
    --dc-muted:   #7a9ab8;
    position: relative;
    background: var(--dc-bg);
    color: var(--dc-text);
    font-family: 'SF Mono','Fira Code','Consolas','Courier New',monospace;
    min-height: 100vh;
    overflow-x: hidden;
  }
  .dc-wrap *, .dc-wrap *::before, .dc-wrap *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .dc-glow-a,.dc-glow-b { position:absolute; border-radius:50%; filter:blur(120px); pointer-events:none; z-index:0; }
  .dc-glow-a { width:500px;height:500px;top:-100px;left:-100px;background:rgba(0,229,255,.06); }
  .dc-glow-b { width:400px;height:400px;bottom:0;right:-80px;background:rgba(0,255,157,.05); }
  .dc-header { position:relative;z-index:1;text-align:center;padding:48px 24px 0;margin-bottom:40px; }
  .dc-badge { display:inline-block;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--dc-accent);border:1px solid var(--dc-accent);padding:4px 14px;border-radius:999px;margin-bottom:20px;opacity:.8; }
  .dc-title { font-family:'Futura','Century Gothic','Trebuchet MS',sans-serif;font-size:clamp(28px,5vw,48px);font-weight:800;line-height:1.1;letter-spacing:-.02em;background:linear-gradient(135deg,#fff 30%,var(--dc-accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:12px; }
  .dc-subtitle { font-size:13px;color:var(--dc-muted);letter-spacing:.04em; }
  .dc-section-label { position:relative;z-index:1;font-family:'Futura','Century Gothic',sans-serif;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--dc-muted);margin-bottom:16px;display:flex;align-items:center;gap:10px;padding:0 24px; }
  .dc-section-label::after { content:'';flex:1;height:1px;background:var(--dc-border); }
  .dc-card { position:relative;z-index:1;background:var(--dc-card);border:1px solid var(--dc-border);border-radius:16px;padding:28px;margin:0 24px 24px;overflow:hidden; }
  .dc-card::before { content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--dc-accent),transparent);opacity:.4; }
  .dc-col-headers { display:grid;grid-template-columns:1fr 110px 110px 110px 36px;gap:8px;margin-bottom:8px; }
  .dc-col-headers span { font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--dc-muted);padding-left:4px; }
  .dc-debt-row { display:grid;grid-template-columns:1fr 110px 110px 110px 36px;gap:8px;align-items:center;margin-bottom:8px; }  .dc-input { background:var(--dc-surface);border:1px solid var(--dc-border);border-radius:8px;color:var(--dc-text);font-family:'SF Mono','Consolas',monospace;font-size:13px;padding:10px 12px;outline:none;transition:border-color .2s,box-shadow .2s;width:100%; }
  .dc-input:focus { border-color:var(--dc-accent);box-shadow:0 0 0 3px rgba(0,229,255,.1); }
  .dc-input::placeholder { color:#8fb3cc; }
  .dc-del-btn { background:none;border:1px solid var(--dc-border);border-radius:8px;color:var(--dc-muted);cursor:pointer;font-size:16px;width:36px;height:36px;display:flex;align-items:center;justify-content:center;transition:border-color .2s,color .2s; }
  .dc-del-btn:hover { border-color:var(--dc-red);color:var(--dc-red); }
  .dc-add-btn { background:none;border:1px dashed var(--dc-border);border-radius:8px;color:var(--dc-muted);cursor:pointer;font-family:'SF Mono','Consolas',monospace;font-size:12px;padding:10px;width:100%;transition:border-color .2s,color .2s;margin-top:8px; }
  .dc-add-btn:hover { border-color:var(--dc-accent);color:var(--dc-accent); }
  .dc-extra-row { display:flex;align-items:center;gap:16px;margin-top:16px; }
  .dc-extra-row label { font-size:12px;color:var(--dc-muted);letter-spacing:.06em;white-space:nowrap; }
  .dc-extra-input { background:var(--dc-surface);border:1px solid var(--dc-accent);border-radius:8px;color:var(--dc-accent);font-family:'SF Mono','Consolas',monospace;font-size:14px;font-weight:500;padding:10px 14px;outline:none;width:140px; }
  .dc-btn-row { display:flex;gap:12px;margin-top:24px;flex-wrap:wrap; }
  .dc-btn { font-family:'Futura','Century Gothic',sans-serif;font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;border:none;border-radius:10px;padding:14px 28px;cursor:pointer;transition:transform .15s,box-shadow .2s; }
  .dc-btn:active { transform:scale(.97); }
  .dc-btn-primary { background:var(--dc-accent);color:#080e17;box-shadow:0 0 28px rgba(0,229,255,.25); }
  .dc-btn-primary:hover { box-shadow:0 0 40px rgba(0,229,255,.4); }
  .dc-btn-ghost { background:transparent;border:1px solid var(--dc-border);color:var(--dc-muted); }
  .dc-btn-ghost:hover { border-color:var(--dc-muted);color:var(--dc-text); }
  .dc-scroll-hint { text-align:center;font-size:11px;color:var(--dc-muted);margin:0 0 16px;letter-spacing:.06em;animation:dc-pulse 2s infinite; }
  @keyframes dc-pulse { 0%,100%{opacity:.4} 50%{opacity:1} }
  @keyframes dc-fadeup { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  .dc-results-grid { display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:0 24px 20px;animation:dc-fadeup .4s ease; }
  /* ── dc-field: label + input wrapper ── */
  .dc-field { display:contents; }
  .dc-field-label { display:none; }

  @media(max-width:600px){
    .dc-wrap { font-size:14px; }
    .dc-card { padding:18px 14px;margin:0 10px 18px; }
    .dc-section-label { padding:0 10px; }
    .dc-results-grid { grid-template-columns:1fr;margin:0 10px 16px; }
    .dc-tip-card,.dc-savings-banner,.dc-spotlight,.dc-save-card,.dc-email-capture,.dc-restored-banner { margin-left:10px;margin-right:10px; }
    .dc-email-capture { padding:24px 16px; }

    /* Hide desktop column headers */
    .dc-col-headers { display:none; }

    /* Each debt row becomes a card with label+input rows */
    .dc-debt-row {
      display:flex;
      flex-direction:column;
      gap:10px;
      background:var(--dc-surface);
      border:1px solid var(--dc-border);
      border-radius:12px;
      padding:14px;
      margin-bottom:12px;
    }

    /* Each field = label on left, input on right */
    .dc-field {
      display:flex;
      align-items:center;
      gap:10px;
      contents:unset;
    }
    .dc-field-label {
      display:block;
      font-size:13px;
      letter-spacing:.08em;
      text-transform:uppercase;
      color:var(--dc-text);
      white-space:nowrap;
      width:100px;
      flex-shrink:0;
    }
    .dc-field .dc-input {
      flex:1;
      min-width:0;
    }

    /* Delete button sits at top-right */
    .dc-debt-row .dc-del-btn {
      align-self:flex-end;
      margin-top:-4px;
    }

    .dc-extra-row { flex-direction:column;align-items:flex-start;gap:8px; }
    .dc-extra-input { width:100%!important; }
    .dc-btn-row { flex-direction:column; }
    .dc-btn { width:100%;text-align:center; }
    .dc-table { font-size:11px; }
    .dc-table thead th { font-size:9px;padding:6px 5px; }
    .dc-table tbody td { padding:7px 5px;font-size:11px; }
    .dc-cmp-cell { padding:8px 5px;font-size:10px; }
    .dc-cmp-hdr,.dc-cmp-hdr-snow,.dc-cmp-hdr-aval { font-size:9px;letter-spacing:.06em;padding:8px 5px; }
    .dc-cmp-label { font-size:10px; }
    .dc-spot-amount { font-size:clamp(28px,10vw,48px); }
    .dc-r-value { font-size:22px; }
    .dc-email-heading { font-size:clamp(15px,4vw,22px); }
    .dc-save-url { font-size:10px; }
    .dc-bar-meta { font-size:11px; }
  }
  @media(max-width:380px){
    .dc-table thead th,.dc-table tbody td { padding:5px 3px;font-size:10px; }
    .dc-cmp-cell { padding:5px 3px;font-size:9px; }
    .dc-field-label { width:82px;font-size:12px; }
  }
  .dc-r-card { border-radius:14px;padding:22px;position:relative;overflow:hidden; }
  .dc-snow { background:linear-gradient(135deg,#1a1400,#231c00);border:1px solid rgba(255,179,0,.25); }
  .dc-aval { background:linear-gradient(135deg,#001a1f,#002030);border:1px solid rgba(0,229,255,.25); }
  .dc-strategy-tag { font-size:9px;letter-spacing:.18em;text-transform:uppercase;margin-bottom:14px;font-weight:600; }
  .dc-snow .dc-strategy-tag { color:var(--dc-amber); }
  .dc-aval .dc-strategy-tag { color:var(--dc-accent); }
  .dc-r-stat { margin-bottom:14px; }
  .dc-r-label { font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--dc-muted);margin-bottom:4px; }
  .dc-r-value { font-family:'Futura','Century Gothic',sans-serif;font-size:26px;font-weight:800;line-height:1; }
  .dc-snow .dc-r-value { color:var(--dc-amber); }
  .dc-aval .dc-r-value { color:var(--dc-accent); }
  .dc-r-sub { font-size:11px;color:var(--dc-muted);margin-top:3px; }
  .dc-tip-card { background:linear-gradient(135deg,#0d1f0d,#0a1a1a);border:1px solid rgba(0,255,157,.25);border-radius:14px;padding:22px 24px;margin:0 24px 20px;position:relative;overflow:hidden;animation:dc-fadeup .4s ease; }
  .dc-tip-card::before { content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--dc-green),transparent); }
  .dc-tip-header { display:flex;align-items:center;gap:10px;margin-bottom:12px; }
  .dc-tip-badge { font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--dc-green);background:rgba(0,255,157,.1);border:1px solid rgba(0,255,157,.25);padding:3px 10px;border-radius:99px; }
  .dc-tip-new { font-size:9px;font-weight:700;letter-spacing:.14em;color:var(--dc-amber);background:rgba(255,179,0,.12);border:1px solid rgba(255,179,0,.3);padding:2px 8px;border-radius:99px;animation:dc-pulse 2s infinite; }
  .dc-tip-text { font-size:14px;color:var(--dc-text);line-height:1.7;margin-bottom:10px; }
  .dc-tip-source { font-size:10px;color:var(--dc-muted);letter-spacing:.06em; }
  .dc-savings-banner { background:linear-gradient(135deg,#003320,#00150f);border:1px solid rgba(0,255,157,.3);border-radius:12px;padding:18px 24px;display:flex;align-items:center;gap:16px;margin:0 24px 20px;flex-wrap:wrap; }
  .dc-savings-icon { font-size:28px;flex-shrink:0; }
  .dc-savings-top { font-family:'Futura','Century Gothic',sans-serif;font-size:16px;font-weight:700;color:var(--dc-green); }
  .dc-savings-sub { font-size:11px;color:var(--dc-muted);margin-top:2px; }
  .dc-spotlight { background:linear-gradient(135deg,#001a0a,#002a10);border:2px solid rgba(0,255,157,.5);border-radius:16px;padding:28px;margin:0 24px 20px;text-align:center;position:relative;overflow:hidden; }
  .dc-spotlight::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(0,255,157,.08) 0%,transparent 70%);pointer-events:none; }
  .dc-spot-label { font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--dc-green);margin-bottom:8px;opacity:.8; }
  .dc-spot-amount { font-family:'Futura','Century Gothic',sans-serif;font-size:clamp(36px,8vw,56px);font-weight:800;color:var(--dc-green);line-height:1;margin-bottom:6px;text-shadow:0 0 40px rgba(0,255,157,.4); }
  .dc-spot-sub { font-size:13px;color:var(--dc-muted);margin-bottom:24px; }
  .dc-bar-compare { display:flex;flex-direction:column;gap:10px;text-align:left; }
  .dc-bar-row { display:flex;flex-direction:column;gap:4px; }
  .dc-bar-meta { display:flex;justify-content:space-between;font-size:11px; }
  .dc-bar-name { color:var(--dc-muted); }
  .dc-bar-track { height:10px;background:rgba(255,255,255,.06);border-radius:99px;overflow:hidden; }
  .dc-bar-fill { height:100%;border-radius:99px; }
  .dc-bar-snow { background:linear-gradient(90deg,var(--dc-amber),#ff8c00); }
  .dc-bar-aval { background:linear-gradient(90deg,var(--dc-accent),#0099bb); }
  .dc-table-wrap { overflow-x:auto; }
  .dc-table { width:100%;border-collapse:collapse;font-size:12px; }
  .dc-table thead th { font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--dc-muted);padding:8px 12px;text-align:right;border-bottom:1px solid var(--dc-border); }
  .dc-table thead th:first-child { text-align:left; }
  .dc-table tbody tr:hover { background:rgba(0,229,255,.03); }
  .dc-table tbody td { padding:9px 12px;text-align:right;border-bottom:1px solid rgba(30,52,72,.5);font-variant-numeric:tabular-nums;color:var(--dc-text); }
  .dc-cmp-grid { display:grid;grid-template-columns:1fr 1fr 1fr;border:1px solid var(--dc-border);border-radius:12px;overflow:hidden; }
  .dc-cmp-cell { padding:12px 16px;font-size:12px;border-bottom:1px solid var(--dc-border); }
  .dc-cmp-hdr { background:var(--dc-surface);font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--dc-muted); }
  .dc-cmp-hdr-snow { background:var(--dc-surface);font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--dc-amber); }
  .dc-cmp-hdr-aval { background:var(--dc-surface);font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--dc-accent); }
  .dc-cmp-label { color:var(--dc-muted);font-size:11px; }
  .dc-cmp-snow { color:var(--dc-amber); }
  .dc-cmp-aval { color:var(--dc-accent); }
  .dc-email-capture { background:linear-gradient(135deg,#0a0f1a,#0d1a2e);border:2px solid rgba(0,229,255,.3);border-radius:20px;padding:40px 32px;text-align:center;margin:0 24px 24px;position:relative;overflow:hidden; }
  .dc-email-capture::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(0,229,255,.07) 0%,transparent 65%);pointer-events:none; }
  .dc-email-heading { font-family:'Futura','Century Gothic',sans-serif;font-size:clamp(18px,3.5vw,26px);font-weight:800;color:var(--dc-text);margin-bottom:10px; }
  .dc-email-sub { font-size:13px;color:var(--dc-muted);max-width:480px;margin:0 auto 28px;line-height:1.6; }
  .dc-email-form { display:flex;flex-direction:column;gap:12px;max-width:420px;margin:0 auto; }
  .dc-email-input { background:var(--dc-surface);border:1px solid var(--dc-border);border-radius:10px;color:var(--dc-text);font-family:'SF Mono','Consolas',monospace;font-size:14px;padding:14px 16px;outline:none;width:100%;text-align:center; }
  .dc-email-input:focus { border-color:var(--dc-accent);box-shadow:0 0 0 3px rgba(0,229,255,.1); }
  .dc-email-input::placeholder { color:#8fb3cc; }
  .dc-btn-email { background:linear-gradient(135deg,var(--dc-accent),#0099bb);color:#080e17;font-family:'Futura','Century Gothic',sans-serif;font-weight:800;font-size:14px;letter-spacing:.06em;border:none;border-radius:10px;padding:16px 28px;cursor:pointer;transition:opacity .2s,transform .15s;box-shadow:0 0 28px rgba(0,229,255,.25);width:100%; }
  .dc-btn-email:hover { opacity:.9; }
  .dc-btn-email:disabled { opacity:.5;cursor:not-allowed; }
  .dc-email-disclaimer { font-size:11px;color:var(--dc-muted);margin-top:4px; }
  .dc-success-heading { font-family:'Futura','Century Gothic',sans-serif;font-size:24px;font-weight:800;color:var(--dc-green);margin-bottom:8px; }
  .dc-restored-banner { position:relative;z-index:1;background:linear-gradient(135deg,#003320,#00150f);border:1px solid rgba(0,255,157,.3);border-radius:12px;padding:14px 20px;margin:0 24px 20px;display:flex;align-items:center;gap:12px;flex-wrap:wrap; }
  .dc-restored-title { font-family:'Futura','Century Gothic',sans-serif;font-size:14px;font-weight:700;color:var(--dc-green); }
  .dc-restored-sub { font-size:11px;color:var(--dc-muted);margin-top:2px; }
  .dc-save-card { background:rgba(0,229,255,.05);border:1px solid rgba(0,229,255,.2);border-radius:12px;padding:18px 20px;margin:0 24px 20px; }
  .dc-save-label { font-size:11px;color:var(--dc-muted);margin-bottom:8px; }
  .dc-save-url { font-size:11px;color:var(--dc-accent);word-break:break-all;margin-bottom:12px;line-height:1.5; }
  .dc-copy-btn { background:var(--dc-accent);color:#080e17;border:none;border-radius:8px;padding:10px 20px;font-size:12px;font-weight:700;cursor:pointer;width:100%;transition:opacity .2s;font-family:'Futura','Century Gothic',sans-serif;letter-spacing:.06em; }
  .dc-copy-btn:hover { opacity:.85; }
  .dc-footer { position:relative;z-index:1;text-align:center;font-size:10px;color:var(--dc-muted);margin-top:48px;padding:0 24px 80px;letter-spacing:.06em; }
`;
