import React from 'react';
import { cn } from '../../utils/cn';

export type IconButtonVariant = 'ghost' | 'outline' | 'solid' | 'destructive';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required — icon-only controls must always carry an accessible name. */
  label: string;
  icon: React.ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  active?: boolean;
}

const variantClasses: Record<IconButtonVariant, string> = {
  ghost: 'border border-transparent text-fg-muted hover:bg-surface-hover hover:text-fg-primary',
  outline: 'border border-line bg-surface text-fg-secondary hover:bg-surface-hover hover:text-fg-primary',
  solid: 'border border-action bg-action text-action-fg hover:bg-action-hover',
  destructive: 'border border-transparent text-danger-fg hover:bg-danger-bg'
};

const sizeClasses: Record<IconButtonSize, string> = {
  sm: 'h-6 w-6 rounded-xs',
  md: 'h-8 w-8 rounded-sm',
  lg: 'h-10 w-10 rounded-sm'
};

export function IconButton({
  label,
  icon,
  variant = 'ghost',
  size = 'md',
  active,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={cn(
        'inline-flex shrink-0 items-center justify-center',
        'transition-[background-color,border-color,color] duration-100 ease-enter',
        'disabled:cursor-not-allowed disabled:opacity-40',
        variantClasses[variant],
        sizeClasses[size],
        active && variant !== 'solid' && 'bg-surface-active text-fg-primary',
        className
      )}
      {...props}>
      
      {icon}
    </button>);

}