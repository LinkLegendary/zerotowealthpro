"use client";

const checklistItems = [
  {
    number: "01",
    title: "List recurring charges",
    text: "Open last month’s bank and credit card statements.",
  },
  {
    number: "02",
    title: "Cancel unused subscriptions",
    text: "Cancel anything you did not actively use in the past 30 days.",
  },
  {
    number: "03",
    title: "Check insurance rates",
    text: "If you have not compared rates in 18+ months, get new quotes.",
  },
  {
    number: "04",
    title: "Review grocery habits",
    text: "Switch 5 common items to store-brand and track the savings.",
  },
  {
    number: "05",
    title: "Automate the savings",
    text: "Send every freed dollar to your highest-rate debt.",
  },
];

export default function SubscriptionAuditChecklist() {
  return (
    <section className="not-prose mx-auto my-10 w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-emerald-200 bg-white shadow-2xl dark:border-slate-700">
      {/* Header */}
      <div className="bg-emerald-950 px-6 py-8 text-center">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] !text-emerald-300">
          Mistake 4 Fix
        </p>

        <h3 className="text-3xl font-black leading-tight !text-white sm:text-4xl">
          20-Minute Subscription Audit
        </h3>

        <p className="mx-auto mt-4 max-w-[420px] text-base font-semibold leading-relaxed !text-emerald-100">
          Find $150+/month hiding in plain sight — then redirect it to debt.
        </p>
      </div>

      {/* Savings highlight */}
      <div className="bg-emerald-50 px-6 py-6 text-center">
        <p className="text-sm font-black uppercase tracking-wide !text-emerald-700">
          Potential Monthly Cash Freed
        </p>

        <p className="mt-2 text-5xl font-black !text-emerald-600">
          $150–$300
        </p>

        <p className="mt-2 text-sm font-bold !text-emerald-800">
          from unused subscriptions, memberships, and recurring charges
        </p>
      </div>

      {/* Checklist */}
      <div className="bg-white px-5 py-6">
        <div className="space-y-4">
          {checklistItems.map((item) => (
            <div
              key={item.number}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
            >
              {/* Checkbox */}
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-emerald-500 bg-white">
                <span className="text-lg font-black !text-emerald-600">
                  ✓
                </span>
              </div>

              {/* Text */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-black !text-emerald-700">
                    {item.number}
                  </span>

                  <p className="text-base font-black !text-slate-900">
                    {item.title}
                  </p>
                </div>

                <p className="mt-1 text-sm font-semibold leading-relaxed !text-slate-600">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action box */}
      <div className="bg-slate-50 px-6 pb-7">
        <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 px-5 py-5 text-center">
          <p className="text-sm font-black uppercase tracking-wide !text-amber-700">
            Final Rule
          </p>

          <p className="mt-2 text-xl font-black leading-relaxed !text-slate-900">
            Do not leave the savings in checking.
          </p>

          <p className="mt-2 text-sm font-bold leading-relaxed !text-slate-700">
            Automate the exact amount to your highest-APR debt before it gets spent.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-emerald-950 px-6 py-6 text-center">
        <p className="text-lg font-black !text-white">
          Screenshot this checklist and run it today.
        </p>

        <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] !text-emerald-300">
          zerotowealthpro.com
        </p>
      </div>
    </section>
  );
}