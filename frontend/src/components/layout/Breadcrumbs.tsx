import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap: Record<string, string> = {
    students: 'Students',
    new: 'Add Student',
    edit: 'Edit Student',
    analytics: 'Analytics',
    profile: 'Profile',
    settings: 'Settings',
  };

  return (
    <nav className="hidden sm:flex items-center space-x-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
      <Link
        to="/"
        className="flex items-center hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
      >
        <Home className="w-3.5 h-3.5 mr-1" />
        <span>Dashboard</span>
      </Link>

      {pathnames.map((segment, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = breadcrumbNameMap[segment] || segment;

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {isLast ? (
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {displayName}
              </span>
            ) : (
              <Link
                to={to}
                className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

