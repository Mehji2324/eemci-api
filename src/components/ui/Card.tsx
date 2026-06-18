import { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export const Card = ({ className, ...p }: HTMLAttributes<HTMLDivElement>) =>
  <div className={cn('bg-white rounded-2xl border border-slate-200/70 shadow-soft', className)} {...p} />;

export const CardHeader = ({ className, ...p }: HTMLAttributes<HTMLDivElement>) =>
  <div className={cn('p-6 border-b border-slate-100', className)} {...p} />;

export const CardBody = ({ className, ...p }: HTMLAttributes<HTMLDivElement>) =>
  <div className={cn('p-6', className)} {...p} />;

export const CardTitle = ({ className, ...p }: HTMLAttributes<HTMLHeadingElement>) =>
  <h3 className={cn('font-display text-xl font-semibold', className)} {...p} />;
