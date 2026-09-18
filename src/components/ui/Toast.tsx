import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangleIcon, CheckCircle2Icon, InfoIcon, XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { IconButton } from './IconButton';

export type ToastTone = 'neutral' | 'success' | 'warning' | 'danger';

export interface ToastProps {
  tone?: ToastTone;
  title: string;
  description?: string;
  action?: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const iconMap: Record<ToastTone, React.ElementType> = {
  neutral: InfoIcon,
  success: CheckCircle2Icon,
  warning: AlertTriangleIcon,
  danger: AlertTriangleIcon
};

const toneFg: Record<ToastTone, string> = {
  neutral: 'text-fg-muted',
  success: 'text-success-fg',
  warning: 'text-warning-fg',
  danger: 'text-danger-fg'
};

export function Toast({ tone = 'neutral', title, description, action, onDismiss, className }: ToastProps) {
  const Icon = iconMap[tone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      role="status"
      aria-live="polite"
      className={cn(
        'flex w-full max-w-sm items-start gap-2.5 rounded-lg border border-line bg-surface-raised px-3 py-2.5 shadow-toast',
        className
      )}>
      
      <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', toneFg[tone])} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-13 font-medium text-fg-primary">{title}</p>
        {description && <p className="mt-0.5 text-xs text-fg-muted">{description}</p>}
        {action && <div className="mt-2">{action}</div>}
      </div>
      {onDismiss &&
      <IconButton label="Dismiss notification" size="sm" icon={<XIcon className="h-3.5 w-3.5" />} onClick={onDismiss} />
      }
    </motion.div>);

}