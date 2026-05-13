"use client";

const steps = [
  {
    number: "01",
    title: "Audit",
    subtitle: "Cancel unused subscriptions",
    detail:
      "Review the last two months of statements and remove charges you no longer use.",
    color: "red",
  },
  {
    number: "02",
    title: "Calculate",
    subtitle: "Find your daily interest cost",
    detail:
      "Use APR ÷ 365 × balance to see what your debt costs every single day.",
    color: "amber",
  },
  {
    number: "03",
    title: "Compare",
    subtitle: "Check consolidation options",
    detail:
      "If any debt is above 18% APR, compare rates at your bank, credit union, and one online lender.",
    color: "blue",
  },
  {
    number: "04",
    title: "Automate",
    subtitle: "Set a fixed extra payment",
    detail:
      "Send freed cash to your highest-APR balance as a second automatic payment.",
    color: "emerald",
  },
  {
    number: "05",
    title: "Protect",
    subtitle: "Build a $1,000 starter fund",
    detail:
      "Open a separate savings account and automate monthly transfers until you hit $1,000.",
    color: "violet",
  },
];

function getStepClasses(color: string) {
  switch (color) {
    case "red":
      return {
        border: "border-red-200",
        bg: "bg-red-50",
        badge: "bg-red-600",
        text: "!text-red-700",
        soft: "bg-red-100",
      };
    case "amber":
      return {
        border: "border-amber-200",
        bg: "bg-amber-50",
        badge: "bg-amber-500",
        text: "!text-amber-700",
        soft: "bg-amber-100",
      };
    case "blue":
      return {
        border: "border-blue-200",
        bg: "bg-blue-50",
        badge: "bg-blue-600",
        text: "!text-blue-700",
        soft: "bg-blue-100",
      };
    case "emerald":
      return {
        border: "border-emerald-200",
        bg: "bg-emerald-50",
        badge: "bg-emerald-600",
        text: "!text-emerald-700",
        soft: "bg-emerald-100",
      };
    case "violet":
      return {
        border: "border-violet-200",
        bg: "bg-violet-50",
        badge: "bg-violet-600",
        text: "!text-violet-700",
        soft: "bg-violet-100",
      };
    default:
      return {
        border: "border-slate-200",
        bg: "bg-slate-50",
        badge: "bg-slate-600",
        text: "!text-slate-700",
        soft: "bg-slate-100",
      };
  }
}

export default function FiveStepDebtFixRoadmap() {
  return (
    <section className="not-prose mx-auto my-10 w-full max-w-[760px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700">
      {/* Header */}
      <div className="bg-slate-950 px-6 py-10 text-center">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] !text-amber-300">
          90-Minute System
        </p>

        <h3 className="mx-auto max-w-[620px] text-3xl font-black leading-tight !text-white sm:text-4xl">
          The 5-Step Roadmap to Fix the Money Leaks
        </h3>

        <p className="mx-auto mt-4 max-w-[620px] text-base font-semibold leading-relaxed !text-slate-300 sm:text-lg">
          One focused session can close the defaults that keep debt expensive.
        </p>
      </div>

      {/* Roadmap */}
      <div className="bg-slate-50 px-5 py-8 sm:px-8">
        <div className="relative">
          {/* Vertical line on desktop/mobile */}
          <div className="absolute left-6 top-4 hidden h-[calc(100%-2rem)] w-1 rounded-full bg-slate-200 sm:block" />

          <div className="space-y-5">
            {steps.map((step, index) => {
              const classes = getStepClasses(step.color);

              return (
                <div key={step.number} className="relative">
                  <div
                    className={`rounded-3xl border-2 ${classes.border} ${classes.bg} p-5 shadow-sm sm:ml-14`}
                  >
                    {/* Number bubble */}
                    <div
                      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${classes.badge} shadow-md sm:absolute sm:-left-0 sm:top-5`}
                    >
                      <span className="text-base font-black !text-white">
                        {step.number}
                      </span>
                    </div>

                    <div className="sm:pl-2">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p
                            className={`text-2xl font-black ${classes.text}`}
                          >
                            {step.title}
                          </p>

                          <p className="mt-1 text-lg font-black !text-slate-900">
                            {step.subtitle}
                          </p>
                        </div>

                        <div
                          className={`inline-flex w-fit rounded-full ${classes.soft} px-3 py-1`}
                        >
                          <span className={`text-xs font-black uppercase tracking-wide ${classes.text}`}>
                            Step {index + 1}
                          </span>
                        </div>
                      </div>

                      <p className="mt-3 text-sm font-semibold leading-relaxed !text-slate-700 sm:text-base">
                        {step.detail}
                      </p>
                    </div>
                  </div>

                  {/* Arrow between steps */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center py-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 shadow-md">
                        <span className="text-xl font-black !text-white">
                          ↓
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary callout */}
        <div className="mx-auto mt-8 max-w-[640px] rounded-3xl border-2 border-emerald-200 bg-emerald-50 px-6 py-6 text-center">
          <p className="text-sm font-black uppercase tracking-wide !text-emerald-700">
            The Goal
          </p>

          <p className="mt-2 text-3xl font-black leading-tight !text-emerald-700 sm:text-4xl">
            Free cash. Lower interest. Stop new debt.
          </p>

          <p className="mt-3 text-base font-bold leading-relaxed !text-slate-800">
            Each step turns a costly default into an automatic system.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-950 px-6 py-8 text-center">
        <p className="text-xl font-black leading-relaxed !text-white">
          Do the steps once. Let automation keep working.
        </p>

        <p className="mt-3 text-sm font-bold !text-slate-300">
          Save this roadmap before your next payday.
        </p>

        <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] !text-slate-400">
          zerotowealthpro.com
        </p>
      </div>
    </section>
  );
}