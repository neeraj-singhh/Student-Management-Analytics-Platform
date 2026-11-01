import React from 'react';
import { Card } from '../../components/ui/Card';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  iconColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  iconColor = 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400',
}) => {
  return (
    <Card hover className="relative overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm', iconColor)}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <h4 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight font-mono">
          {value}
        </h4>
        {trend && (
          <span
            className={cn(
              'text-xs font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5',
              trend.isPositive
                ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-300'
                : 'text-rose-700 bg-rose-50 dark:bg-rose-950/50 dark:text-rose-300'
            )}
          >
            {trend.value}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </Card>
  );
};
