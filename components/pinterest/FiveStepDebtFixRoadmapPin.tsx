const steps = [
  {
    number: "01",
    title: "Audit",
    text: "Cancel unused subscriptions",
    color: "bg-red-500",
    soft: "bg-red-50",
    border: "border-red-200",
    textColor: "!text-red-700",
  },
  {
    number: "02",
    title: "Calculate",
    text: "Find your daily interest cost",
    color: "bg-amber-500",
    soft: "bg-amber-50",
    border: "border-amber-200",
    textColor: "!text-amber-700",
  },
  {
    number: "03",
    title: "Compare",
    text: "Check lower-rate options",
    color: "bg-blue-500",
    soft: "bg-blue-50",
    border: "border-blue-200",
    textColor: "!text-blue-700",
  },
  {
    number: "04",
    title: "Automate",
    text: "Set a fixed extra payment",
    color: "bg-emerald-500",
    soft: "bg-emerald-50",
    border: "border-emerald-200",
    textColor: "!text-emerald-700",
  },
  {
    number: "05",
    title: "Protect",
    text: "Build a $1,000 starter fund",
    color: "bg-violet-500",
    soft: "bg-violet-50",
    border: "border-violet-200",
    textColor: "!text-violet-700",
  },
];

export default function FiveStepDebtFixRoadmapPin() {
  return (
    <section className="not-prose relative flex h-[1500px] w-[1000px] flex-col overflow-hidden bg-slate-950 px-[54px] py-[48px]">
      {/* Background decoration */}
      <div className="absolute -right-32 -top-32 h-[340px] w-[340px] rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-[340px] w-[340px] rounded-full bg-blue-400/20 blur-3xl" />

      {/* Header */}
      <div className="relative text-center">
        <p className="mb-4 text-xl font-black uppercase tracking-[0.28em] !text-amber-300">
          90-Minute Money Fix
        </p>

        <h1 className="mx-auto max-w-[850px] text-[74px] font-black leading-[0.92] tracking-tight !text-white">
          5-Step Roadmap to Stop Money Leaks
        </h1>

        <p className="mx-auto mt-6 max-w-[780px] text-[28px] font-bold leading-snug !text-slate-300">
          Free cash, lower interest, and stop new debt from resetting your progress.
        </p>
      </div>

      {/* Main white card */}
      <div className="relative mt-10 rounded-[42px] bg-white p-8 shadow-2xl">
        <div className="space-y-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex items-center gap-6 rounded-[28px] border-[3px] ${step.border} ${step.soft} px-7 py-5`}
            >
              <div
                className={`flex h-[86px] w-[86px] shrink-0 items-center justify-center rounded-[24px] ${step.color} shadow-lg`}
              >
                <span className="text-[34px] font-black leading-none !text-white">
                  {step.number}
                </span>
              </div>

              <div>
                <p className={`text-[34px] font-black leading-tight ${step.textColor}`}>
                  {step.title}
                </p>

                <p className="mt-1 text-[28px] font-black leading-tight !text-slate-950">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Takeaway */}
        <div className="mt-7 rounded-[30px] border-[3px] border-emerald-200 bg-emerald-50 px-7 py-6 text-center">
          <p className="text-xl font-black uppercase tracking-wide !text-emerald-700">
            The Goal
          </p>

          <p className="mt-2 text-[38px] font-black leading-tight !text-emerald-700">
            Free cash. Pay less interest. Build protection.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="relative mt-auto pt-8 text-center">
        <p className="text-[28px] font-black leading-tight !text-white">
          Save this before your next payday.
        </p>

        <p className="mt-4 text-xl font-black uppercase tracking-[0.18em] !text-slate-400">
          zerotowealthpro.com
        </p>
      </div>
    </section>
  );
}