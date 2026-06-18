import { cn } from '@/lib/cn';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ReactNode } from 'react';

export const KpiCard = ({ label, value, trend, icon, tone='primary' }:{
  label:string; value:string|number; trend?:number; icon?:ReactNode;
  tone?:'primary'|'accent'|'emerald'|'red';
}) => {
  const tones = { primary:'bg-primary-50 text-primary-700', accent:'bg-accent-50 text-accent-700',
    emerald:'bg-emerald-50 text-emerald-700', red:'bg-red-50 text-red-700' };
  return (
    <div className="p-6 bg-white rounded-2xl border border-slate-200/70 shadow-soft">
      <div className="flex items-start justify-between">
        <p className="text-sm text-ink-soft">{label}</p>
        {icon && <div className={cn('w-9 h-9 grid place-items-center rounded-xl', tones[tone])}>{icon}</div>}
      </div>
      <p className="font-display text-3xl font-semibold mt-3">{value}</p>
      {trend !== undefined && (
        <p className={cn('mt-2 text-xs flex items-center gap-1', trend>=0 ? 'text-emerald-600' : 'text-red-600')}>
          {trend>=0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(trend)}% vs mois dernier
        </p>
      )}
    </div>
  );
};
