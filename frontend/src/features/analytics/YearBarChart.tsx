import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card } from '../../components/ui/Card';
import { getYearLabel } from '../../utils/formatters';

interface YearBarChartProps {
  data: Record<number, number>;
}

export const YearBarChart: React.FC<YearBarChartProps> = ({ data }) => {
  const chartData = [1, 2, 3, 4].map((year) => ({
    year: `Year ${year}`,
    label: getYearLabel(year),
    students: data[year] || 0,
  }));

  return (
    <Card className="flex flex-col h-[380px]">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
          Academic Year Cohort Strength
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Distribution of student body by graduation cohort
        </p>
      </div>

      <div className="flex-1 w-full min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: 'rgba(99, 102, 241, 0.08)' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-white text-xs rounded-xl p-3 shadow-xl border border-slate-800">
                      <p className="font-bold">{item.label}</p>
                      <p className="text-brand-300 font-mono mt-1 font-semibold">
                        {item.students} Enrolled Students
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="students"
              fill="#6366f1"
              radius={[8, 8, 0, 0]}
              maxBarSize={55}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

