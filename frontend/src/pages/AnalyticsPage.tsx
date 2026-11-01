import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../api/analytics';
import { BranchPieChart } from '../features/analytics/BranchPieChart';
import { YearBarChart } from '../features/analytics/YearBarChart';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { getYearLabel } from '../utils/formatters';
import { BarChart2, PieChart as PieIcon, Award, ShieldAlert } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['student-stats'],
    queryFn: analyticsApi.getStudentStats,
  });

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <Skeleton className="h-24 rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96 rounded-2xl" />
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <Card className="p-8 text-center">
        <p className="text-rose-500 font-bold">Failed to load analytics data.</p>
      </Card>
    );
  }

  const branchEntries = Object.entries(stats.studentsByBranch || {});
  const total = stats.totalStudents || 1;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Institutional Analytics & Metrics
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Deep telemetry on enrollment numbers, department capacities, and student cohort progression.
        </p>
      </div>

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BranchPieChart data={stats.studentsByBranch || {}} />
        <YearBarChart data={stats.studentsByYear || {}} />
      </div>

      {/* Numerical Breakdown Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Breakdown */}
        <Card>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <PieIcon className="w-4 h-4 text-brand-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Department Capacity Breakdown
            </h3>
          </div>

          <div className="space-y-3">
            {branchEntries.map(([branch, count]) => {
              const pct = ((count / total) * 100).toFixed(1);
              return (
                <div key={branch} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">{branch}</span>
                    <span className="font-mono text-slate-500 dark:text-slate-400">
                      {count} students ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-brand-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Academic Year Cohort Progress */}
        <Card>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <BarChart2 className="w-4 h-4 text-brand-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Cohort Retention & Volume
            </h3>
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4].map((year) => {
              const count = stats.studentsByYear?.[year] || 0;
              const pct = ((count / total) * 100).toFixed(1);
              return (
                <div key={year} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">{getYearLabel(year)}</span>
                    <span className="font-mono text-slate-500 dark:text-slate-400">
                      {count} students ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

