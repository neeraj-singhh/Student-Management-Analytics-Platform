import React from 'react';
import { Card } from '../components/ui/Card';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Database, Shield, Server, Terminal } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          System Preferences & Configuration
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize UI preferences and review backend system endpoints.
        </p>
      </div>

      {/* Theme Settings */}
      <Card className="p-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-2">
          Interface Appearance
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Choose between Light and Dark interface display modes.
        </p>

        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center gap-3">
            {theme === 'dark' ? (
              <Moon className="w-5 h-5 text-indigo-400" />
            ) : (
              <Sun className="w-5 h-5 text-amber-500" />
            )}
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {theme === 'dark' ? 'Dark Mode Active' : 'Light Mode Active'}
              </p>
              <p className="text-[11px] text-slate-400">
                Adjusts system contrast and typography palette
              </p>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={toggleTheme}>
            Toggle to {theme === 'dark' ? 'Light' : 'Dark'}
          </Button>
        </div>
      </Card>

      {/* Backend & Deployment Info */}
      <Card className="p-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-2">
          Infrastructure Specifications
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Runtime infrastructure and integration service status.
        </p>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-brand-600" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">Backend Framework</span>
            </div>
            <span className="font-mono text-slate-500 dark:text-slate-400">Spring Boot 3.2 (Java 17)</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-brand-600" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">Database Engine</span>
            </div>
            <span className="font-mono text-slate-500 dark:text-slate-400">PostgreSQL (Flyway Migrations)</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-600" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">Authentication</span>
            </div>
            <span className="font-mono text-slate-500 dark:text-slate-400">Spring Security + JJWT 0.12.5</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-brand-600" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">API Documentation</span>
            </div>
            <a
              href="http://localhost:8080/swagger-ui.html"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-brand-600 dark:text-brand-400 underline hover:text-brand-700"
            >
              /swagger-ui.html
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

