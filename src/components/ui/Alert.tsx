import React from 'react';
import { AlertTriangleIcon, CheckCircle2Icon, InfoIcon, OctagonAlertIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export interface AlertProps {
  tone?: AlertTone;
  title: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  /** Use assertive only for time-limit and data-loss events. */
  live?: 'polite' | 'assertive';
}

const toneMap: Record<AlertTone, {cls: string;Icon: React.ElementType;}> = {
  info: { cls: 'border-info-border bg-info-bg text-info-fg', Icon: InfoIcon },
  success: { cls: 'border-success-border bg-success-bg text-success-fg', Icon: CheckCircle2Icon },
  warning: { cls: 'border-warning-border bg-warning-bg text-warning-fg', Icon: AlertTriangleIcon },
  danger: { cls: 'border-danger-border bg-danger-bg text-danger-fg', Icon: OctagonAlertIcon },
  neutral: { cls: 'border-line bg-surface-subtle text-fg-secondary', Icon: InfoIcon }
};

export function Alert({ tone = 'info', title, children, actions, className, live }: AlertProps) {
  const { cls, Icon } = toneMap[tone];
  return (
    <div
      role={live === 'assertive' ? 'alert' : 'status'}
      aria-live={live}
      className={cn('flex gap-3 rounded-md border px-3 py-2.5', cls, className)}>
      
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-13 font-semibold">{title}</p>
        {children && <div className="mt-1 max-w-measure text-13 text-fg-secondary">{children}</div>}
        {actions && <div className="mt-2.5 flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </div>);

}