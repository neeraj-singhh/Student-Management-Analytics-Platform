import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { ShieldCheck, User, Mail, KeyRound, Award, CheckCircle2 } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const ProfilePage: React.FC = () => {
  const { user, isAdmin } = useAuth();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Operator Profile & Credentials
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Authenticated credentials and security authorization details.
        </p>
      </div>

      <Card className="p-8 space-y-6">
        <div className="flex items-center gap-5 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-brand-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-brand-500/20">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {user?.username}
              </h3>
              <Badge variant={isAdmin ? 'success' : 'info'}>
                {user?.role?.replace('ROLE_', '')}
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mt-1">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Access Privileges</p>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
                {isAdmin
                  ? 'Full administrative control: View directory, register students, edit student profiles, delete records, and access analytics.'
                  : 'Staff control: Read-only access to student directory and real-time analytics.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center shrink-0">
              <KeyRound className="w-4 h-4 text-brand-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Authentication Method</p>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
                HMAC-SHA256 Cryptographic JWT Bearer Token (24-Hour Expiration)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Security State</p>
              <p className="text-xs text-emerald-600 font-semibold mt-0.5">
                Session Active & Verified
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
