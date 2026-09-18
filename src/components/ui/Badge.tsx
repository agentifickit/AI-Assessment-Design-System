import React from 'react';
import { cn } from '../../utils/cn';

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent' | 'ai';

export interface BadgeProps {
  tone?: BadgeTone;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** Renders a 4px leading dot in addition to the label. Never the only signal. */
  dot?: boolean;
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'bg-[var(--neutral-status-bg)] text-[var(--neutral-status-fg)] border-[var(--neutral-status-border)]',
  info: 'bg-info-bg text-info-fg border-info-border',
  success: 'bg-success-bg text-success-fg border-success-border',
  warning: 'bg-warning-bg text-warning-fg border-warning-border',
  danger: 'bg-danger-bg text-danger-fg border-danger-border',
  accent: 'bg-accent-bg text-accent-fg border-accent-border',
  ai: 'bg-ai-bg text-ai-fg border-ai-border'
};

const dotClasses: Record<BadgeTone, string> = {
  neutral: 'bg-[var(--neutral-status-fg)]',
  info: 'bg-info-solid',
  success: 'bg-success-solid',
  warning: 'bg-warning-solid',
  danger: 'bg-danger-solid',
  accent: 'bg-accent',
  ai: 'bg-ai-fg'
};

export function Badge({ tone = 'neutral', icon, children, className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-xs border px-1.5 py-0.5 text-2xs font-medium leading-4 whitespace-nowrap',
        toneClasses[tone],
        className
      )}>
      
      {dot && <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', dotClasses[tone])} aria-hidden="true" />}
      {icon}
      {children}
    </span>);

}