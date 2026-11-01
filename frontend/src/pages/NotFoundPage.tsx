import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Home, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400 flex items-center justify-center mb-4 shadow-sm">
        <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '8s' }} />
      </div>

      <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tight font-mono">
        404
      </h1>

      <h2 className="mt-2 text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">
        Page Not Found
      </h2>

      <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm">
        The route or student record you are looking for does not exist or has been relocated.
      </p>

      <Button
        className="mt-6"
        leftIcon={<Home className="w-4 h-4" />}
        onClick={() => navigate('/')}
      >
        Return to Dashboard
      </Button>
    </div>
  );
};

