'use client';

import { useState } from 'react';

export default function EmailCapture({ isDark = false }: { isDark?: boolean }) {
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [kitStatus, setKitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [kitError, setKitError] = useState('');
  const KIT_FORM_ID = process.env.NEXT_PUBLIC_KIT_FORM_ID;
const KIT_API_KEY = process.env.NEXT_PUBLIC_KIT_API_KEY;

   const submitToKit = async () => {
  if (!email || !email.includes('@')) return;
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
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setKitStatus('success');
    } else {
      setKitError(data?.message || `Error ${res.status}`);
      setKitStatus('error');
    }
  } catch (e: unknown) {
    setKitError(e instanceof Error ? e.message : 'Network error');
    setKitStatus('error');
  }
};




  
  return (
    <section className={`mt-16 rounded-xl p-8 text-center transition-colors duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-[#1F4E78] to-[#4472C4] text-white'
        : 'bg-white border border-[#4472C4] text-[#1F4E78]'
    }`}>
      <div className="text-4xl mb-3">📬</div>
      <h3 className="text-2xl font-bold mb-2">
        <strong className='text-gray-500'>
          Send FREE PDF Complete Debt Payoff Guide to My Email
        </strong>
        
      </h3>

      {kitStatus !== 'success' ? (
        <div className="flex flex-col items-center gap-3 max-w-sm mx-auto mt-6">
          <input
            className="w-full px-4 py-3 rounded-full text-[#1F4E78] font-medium outline-none placeholder:text-gray-400 border border-gray-200"
            type="text"
            placeholder="First name"
            value={fname}
            onChange={e => setFname(e.target.value)}
          />
          <input
            className="w-full px-4 py-3 rounded-full text-[#1F4E78] font-medium outline-none placeholder:text-gray-400 border border-gray-200"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button
            className={`w-full px-6 py-3 rounded-full font-bold hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed ${
              isDark
                ? 'bg-white text-[#1F4E78]'
                : 'bg-[#1F4E78] text-white'
            }`}
            onClick={submitToKit}
            disabled={kitStatus === 'loading'}
          >
            <strong className={isDark ? 'text-blue-300' : 'text-white'}>
              {kitStatus === 'loading' ? '⏳ Sending…' : kitStatus === 'error' ? '⚠️ Try again' : '📧 Email Me the Free Guide →'}
            </strong>
          </button>

          {kitStatus === 'error' && (
            <p className={`text-xs mt-1 ${isDark ? 'text-red-300' : 'text-red-500'}`}>
              {kitError || 'Something went wrong. Please try again.'}
            </p>
          )}

          <p className={`text-[2px] mt-1 ${isDark ? 'text-white/60' : 'text-gray-400'}`}>
          <strong className='text-gray-400 text-sm'>
            No spam. Unsubscribe anytime. — zerotowealthpro.com
          </strong>
            
          </p>
        </div>
      ) : (
        <div className="text-center mt-6">
          <div className="text-5xl mb-3">🎉</div>
          <h4 className="text-2xl font-bold mb-2">You&apos;re in!</h4>
        </div>
      )}
    </section>
  );
}