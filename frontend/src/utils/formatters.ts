export function formatDate(dateString?: string): string {
  if (!dateString) return '—';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString?: string): string {
  if (!dateString) return '—';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function getBranchBadgeColor(branch: string): string {
  const normalized = branch.toLowerCase();
  if (normalized.includes('computer') || normalized.includes('cse')) {
    return 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200 dark:border-blue-800';
  }
  if (normalized.includes('information') || normalized.includes('it')) {
    return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
  }
  if (normalized.includes('electronic') || normalized.includes('ece')) {
    return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
  }
  if (normalized.includes('mechanical')) {
    return 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800';
  }
  if (normalized.includes('civil')) {
    return 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200 dark:border-purple-800';
  }
  return 'bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-300 border-slate-200 dark:border-slate-800';
}

export function getYearLabel(year: number): string {
  switch (year) {
    case 1: return '1st Year (Freshman)';
    case 2: return '2nd Year (Sophomore)';
    case 3: return '3rd Year (Junior)';
    case 4: return '4th Year (Senior)';
    default: return `Year ${year}`;
  }
}
