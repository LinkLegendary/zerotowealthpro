"use client";

export default function MinimumPaymentTimeline() {
  return (
    <section className="not-prose mx-auto my-10 w-full max-w-[760px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700">
      {/* Header */}
      <div className="bg-slate-950 px-6 py-10 text-center">
        <p className="mb-3 text-sm font-black uppercase tracking-[0.22em] !text-red-300">
          Mistake 1
        </p>

        <h3 className="mx-auto max-w-[620px] text-3xl font-black leading-tight !text-white sm:text-4xl">
          The $9,000 Credit Card Minimum Payment Trap
        </h3>

        <p className="mx-auto mt-4 max-w-[620px] text-base font-semibold leading-relaxed !text-slate-300 sm:text-lg">
          Same balance. Same APR. Completely different payoff timeline.
        </p>
      </div>

      {/* Main comparison */}
      <div className="bg-slate-50 px-5 py-8 sm:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Minimum Payment Path */}
          <div className="rounded-3xl border-2 border-red-200 bg-red-50 p-6 shadow-sm">
            <div className="mb-5 text-center">
              <p className="text-sm font-black uppercase tracking-wide !text-red-600">
                Minimum Payments
              </p>

              <p className="mt-3 text-5xl font-black !text-red-600">
                13+
              </p>

              <p className="mt-1 text-xl font-black !text-red-700">
                Years
              </p>
            </div>

            {/* Long timeline visual */}
            <div className="relative my-7 h-5 rounded-full bg-red-200">
              <div className="absolute left-0 top-0 h-5 w-full rounded-full bg-red-500" />
              <div className="absolute -left-1 -top-2 h-9 w-9 rounded-full border-4 border-white bg-red-600 shadow-md" />
              <div className="absolute -right-1 -top-2 h-9 w-9 rounded-full border-4 border-white bg-red-600 shadow-md" />
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl bg-white p-4">
                <p className="text-sm font-bold !text-slate-500">
                  Starting payment
                </p>
                <p className="mt-1 text-2xl font-black !text-slate-900">
                  ~$180/mo
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <p className="text-sm font-bold !text-slate-500">
                  Total interest paid
                </p>
                <p className="mt-1 text-2xl font-black !text-red-600">
                  ~$10,400
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <p className="text-sm font-bold !text-slate-500">
                  Main problem
                </p>
                <p className="mt-1 text-base font-black leading-relaxed !text-slate-900">
                  Most of the payment goes to interest, not principal.
                </p>
              </div>
            </div>
          </div>

          {/* Fixed Payment Path */}
          <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-6 shadow-sm">
            <div className="mb-5 text-center">
              <p className="text-sm font-black uppercase tracking-wide !text-emerald-600">
                Fixed $300/mo Payment
              </p>

              <p className="mt-3 text-5xl font-black !text-emerald-600">
                3.3
              </p>

              <p className="mt-1 text-xl font-black !text-emerald-700">
                Years
              </p>
            </div>

            {/* Short timeline visual */}
            <div className="relative my-7 h-5 rounded-full bg-emerald-200">
              <div className="absolute left-0 top-0 h-5 w-[28%] rounded-full bg-emerald-500" />
              <div className="absolute -left-1 -top-2 h-9 w-9 rounded-full border-4 border-white bg-emerald-600 shadow-md" />
              <div className="absolute left-[26%] -top-2 h-9 w-9 rounded-full border-4 border-white bg-emerald-600 shadow-md" />
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl bg-white p-4">
                <p className="text-sm font-bold !text-slate-500">
                  Fixed payment
                </p>
                <p className="mt-1 text-2xl font-black !text-slate-900">
                  $300/mo
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <p className="text-sm font-bold !text-slate-500">
                  Total interest paid
                </p>
                <p className="mt-1 text-2xl font-black !text-emerald-600">
                  ~$2,800
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <p className="text-sm font-bold !text-slate-500">
                  Main advantage
                </p>
                <p className="mt-1 text-base font-black leading-relaxed !text-slate-900">
                  More money attacks principal every month.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Savings callout */}
        <div className="mx-auto mt-7 max-w-[620px] rounded-3xl border-2 border-blue-200 bg-blue-50 px-6 py-6 text-center">
          <p className="text-sm font-black uppercase tracking-wide !text-blue-600">
            The Result
          </p>

          <p className="mt-2 text-3xl font-black !text-blue-700 sm:text-4xl">
            Save ~$7,600
          </p>

          <p className="mt-2 text-lg font-black leading-relaxed !text-slate-900">
            and remove roughly 10 years from the payoff timeline.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-950 px-6 py-8 text-center">
        <p className="text-xl font-black leading-relaxed !text-white">
          The fix: stop letting the minimum payment decline.
        </p>

        <p className="mt-3 text-sm font-bold !text-slate-300">
          Set a fixed payment above the minimum and automate it.
        </p>

        <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] !text-slate-400">
          zerotowealthpro.com
        </p>
      </div>
    </section>
  );
}