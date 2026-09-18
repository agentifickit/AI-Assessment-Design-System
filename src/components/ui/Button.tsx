import React from 'react';
import { Loader2Icon } from 'lucide-react';
import { cn } from '../../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  // Primary carries a label, so it sits on --action-primary (7.4:1 with white
  // text) rather than the brand accent (3.4:1, non-text only).
  primary:
  'bg-action text-action-fg border border-action hover:bg-action-hover active:bg-action-active',
  secondary:
  'bg-surface text-fg-primary border border-line hover:bg-surface-hover active:bg-surface-active',
  tertiary:
  'bg-transparent text-fg-secondary border border-transparent hover:bg-surface-hover hover:text-fg-primary active:bg-surface-active',
  destructive:
  'bg-transparent text-danger-fg border border-danger-border hover:bg-danger-bg active:bg-danger-bg'
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-7 px-2.5 text-xs gap-1.5 rounded-sm',
  md: 'h-8 px-3 text-13 gap-2 rounded-sm',
  lg: 'h-10 px-4 text-sm gap-2 rounded-sm'
};

export function Button({
  variant = 'secondary',
  size = 'md',
  loading = false,
  iconLeft,
  iconRight,
  fullWidth,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center font-medium whitespace-nowrap select-none',
        'transition-[background-color,border-color,color,transform] duration-100 ease-enter',
        'active:translate-y-px',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-y-0',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}>
      
      {loading ?
      <Loader2Icon className="h-3.5 w-3.5 shrink-0 animate-spin" aria-hidden="true" /> :

      iconLeft
      }
      {children}
      {iconRight}
    </button>);

}