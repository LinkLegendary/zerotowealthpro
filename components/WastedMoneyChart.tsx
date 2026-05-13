'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';

const data = [
  {
    name: 'Default Path',
    value: 18200,
  },
  {
    name: 'Fixed Path',
    value: 0,
  },
];

const COLORS = ['#ef4444', '#10b981'];

export default function WastedMoneyChart() {
  return (
    <section className="not-prose mx-auto my-10 w-full max-w-[720px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700">
      {/* Header */}
      <div className="bg-slate-950 px-6 py-10 text-center">
        <p className="mb-3 text-sm font-black uppercase tracking-[0.22em] !text-emerald-300">
          Case Study
        </p>

        <h3 className="mx-auto max-w-[600px] text-3xl font-black leading-tight !text-white sm:text-4xl">
          The 36-Month Cost of “Normal” Money Habits
        </h3>

        <p className="mx-auto mt-4 max-w-[600px] text-base font-semibold leading-relaxed !text-slate-300 sm:text-lg">
          A household earning $68k/year lost thousands to interest, fees, and
          unused subscriptions.
        </p>
      </div>

      {/* Big comparison cards */}
      <div className="grid grid-cols-1 gap-4 bg-slate-50 px-5 py-6 sm:grid-cols-2 sm:gap-5 sm:px-8">
        <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-5 text-center">
          <strong className="!text-gray-300">
            <p className="text-sm font-black uppercase tracking-wide !text-red-600">
              Default Path
            </p>
            <p className="mt-3 text-4xl font-black !text-red-600">$18,200</p>
            <p className="mt-2 text-base font-black !text-red-700">
              Avoidable Waste
            </p>
          </strong>
        </div>

        <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="text-sm font-black uppercase tracking-wide !text-emerald-600">
            Fixed Path
          </p>
          <p className="mt-3 text-4xl font-black !text-emerald-600">$0</p>
          <p className="mt-2 text-base font-black !text-emerald-700">
            Avoidable Waste
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white px-3 py-8 sm:px-6">
        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 35, right: 20, left: 5, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                stroke="#334155"
                fontSize={14}
                fontWeight={800}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="#64748b"
                fontSize={13}
                fontWeight={700}
                tickFormatter={(value) => `$${value / 1000}k`}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                formatter={(value) =>
                  [
                    `$${Number(value ?? 0).toLocaleString()}`,
                    'Avoidable Cost',
                  ] as [string, string]
                }
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontWeight: 800,
                }}
                cursor={{ fill: 'rgba(15, 23, 42, 0.05)' }}
              />

              <Bar dataKey="value" radius={[12, 12, 0, 0]} barSize={90}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}

                <LabelList
                  dataKey="value"
                  position="top"
                  formatter={(value) =>
                    (Number(value) === 0
                      ? '$0'
                      : `$${Number(value).toLocaleString()}`) as string
                  }
                  fill="#020617"
                  fontSize={17}
                  fontWeight={900}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mx-auto mt-4 max-w-[560px] rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-5 py-4 text-center">
          <strong className="text-base font-black leading-relaxed text-emerald-900 ">
            <strong className="text-shadow-gray-300">
              The fixed path does not mean life costs $0 — it means the
              avoidable waste is eliminated.
            </strong>
          </strong>
        </div>
      </div>

      {/* Bottom takeaway */}
      <div className="bg-slate-950 px-6 py-8 text-center not-prose">
        <p className="text-xl font-black leading-relaxed text-white ">
          <strong className="text-gray-300">
            Fixing the defaults can eliminate $18k+ in avoidable costs.
          </strong>
        </p>
        <p className="mt-3 text-sm font-bold text-slate-300">
          <strong className="text-gray-300">zerotowealthpro.com</strong>
        </p>
      </div>
    </section>
  );
}
