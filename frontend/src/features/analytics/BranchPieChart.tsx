import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card } from '../../components/ui/Card';

interface BranchPieChartProps {
  data: Record<string, number>;
}

const COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export const BranchPieChart: React.FC<BranchPieChartProps> = ({ data }) => {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card className="flex flex-col h-[380px]">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
          Branch Enrollment Distribution
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Proportion of students across academic departments
        </p>
      </div>

      <div className="flex-1 w-full min-h-[260px]">
        {total === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-slate-400">
            No branch enrollment data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0];
                    const percentage = total > 0 ? ((Number(item.value) / total) * 100).toFixed(1) : 0;
                    return (
                      <div className="bg-slate-900 text-white text-xs rounded-xl p-3 shadow-xl border border-slate-800">
                        <p className="font-bold">{item.name}</p>
                        <p className="text-slate-300">
                          {item.value} students ({percentage}%)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};

