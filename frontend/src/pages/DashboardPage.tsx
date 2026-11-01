import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Layers, 
  Sparkles, 
  GraduationCap, 
  Plus, 
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { analyticsApi } from '../api/analytics';
import { StatCard } from '../features/analytics/StatCard';
import { BranchPieChart } from '../features/analytics/BranchPieChart';
import { YearBarChart } from '../features/analytics/YearBarChart';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { formatDate, getBranchBadgeColor } from '../utils/formatters';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['student-stats'],
    queryFn: analyticsApi.getStudentStats,
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
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
        <p className="text-rose-500 font-bold">Failed to load analytics dashboard data.</p>
        <p className="text-xs text-slate-500 mt-1">Please ensure the backend service is running.</p>
      </Card>
    );
  }

  const branchCount = Object.keys(stats.studentsByBranch || {}).length;
  const freshmanCount = stats.studentsByYear?.[1] || 0;
  const seniorCount = stats.studentsByYear?.[4] || 0;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-brand-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-brand-500/10">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur-md mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Executive Overview
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Institutional Dashboard & Enrollment Metrics
          </h2>
          <p className="text-xs sm:text-sm text-brand-100 max-w-xl mt-1">
            Real-time analytics and student cohort telemetry across engineering departments.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {isAdmin && (
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4 text-brand-700" />}
              onClick={() => navigate('/students/new')}
              className="bg-white text-brand-700 hover:bg-brand-50 shadow-sm"
            >
              Add Student
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/students')}
            className="border-white/30 text-white hover:bg-white/10"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Directory
          </Button>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Enrolled"
          value={stats.totalStudents}
          subtitle="Active student directory count"
          icon={Users}
          trend={{ value: '+12% YoY', isPositive: true }}
          iconColor="bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400"
        />

        <StatCard
          title="Departments"
          value={branchCount}
          subtitle="Engineering branches"
          icon={Layers}
          iconColor="bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
        />

        <StatCard
          title="Freshman Class"
          value={freshmanCount}
          subtitle="1st Year cohort strength"
          icon={TrendingUp}
          trend={{ value: 'Latest Batch', isPositive: true }}
          iconColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
        />

        <StatCard
          title="Graduating Class"
          value={seniorCount}
          subtitle="Final year candidates"
          icon={GraduationCap}
          iconColor="bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400"
        />
      </div>

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BranchPieChart data={stats.studentsByBranch || {}} />
        <YearBarChart data={stats.studentsByYear || {}} />
      </div>

      {/* Recently Added Students Section */}
      <Card>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Recent Registrations
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/students')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            View All
          </Button>
        </div>

        {stats.recentlyAdded && stats.recentlyAdded.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 font-bold uppercase border-b border-slate-100 dark:border-slate-800">
                  <th className="pb-2">Enrollment ID</th>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Department</th>
                  <th className="pb-2">Academic Year</th>
                  <th className="pb-2">Registered On</th>
                  <th className="pb-2 text-right">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {stats.recentlyAdded.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="py-2.5 font-mono font-bold text-slate-800 dark:text-slate-200">
                      {student.enrollmentNumber}
                    </td>
                    <td className="py-2.5 font-semibold text-slate-900 dark:text-slate-100">
                      {student.name}
                    </td>
                    <td className="py-2.5">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getBranchBadgeColor(student.branch)}`}>
                        {student.branch}
                      </span>
                    </td>
                    <td className="py-2.5 text-slate-600 dark:text-slate-300">
                      Year {student.year}
                    </td>
                    <td className="py-2.5 text-slate-400 font-mono">
                      {formatDate(student.createdAt)}
                    </td>
                    <td className="py-2.5 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/students/${student.id}`)}
                        className="text-xs text-brand-600 dark:text-brand-400 py-1 px-2"
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-400 py-4 text-center">No recent student registrations.</p>
        )}
      </Card>
    </div>
  );
};
