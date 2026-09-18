import React from 'react';
import { cn } from '../../utils/cn';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  label: string;
  variant?: 'line' | 'segmented';
  className?: string;
}

export function Tabs({ items, value, onChange, label, variant = 'line', className }: TabsProps) {
  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = items.findIndex((i) => i.id === value);
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      onChange(items[(idx + 1) % items.length].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onChange(items[(idx - 1 + items.length) % items.length].id);
    }
  };

  if (variant === 'segmented') {
    return (
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className={cn('inline-flex items-center gap-0.5 rounded-sm border border-line bg-surface-subtle p-0.5', className)}>
        
        {items.map((t) =>
        <button
          key={t.id}
          role="tab"
          type="button"
          aria-selected={t.id === value}
          tabIndex={t.id === value ? 0 : -1}
          onClick={() => onChange(t.id)}
          className={cn(
            'inline-flex h-7 items-center gap-1.5 rounded-xs px-3 text-xs font-medium transition-[background-color,color] duration-100 ease-enter',
            t.id === value ?
            'bg-surface text-fg-primary shadow-sticky' :
            'text-fg-muted hover:text-fg-primary'
          )}>
          
            {t.icon}
            {t.label}
          </button>
        )}
      </div>);

  }

  return (
    <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className={cn('flex items-end gap-4 border-b border-line', className)}>
      {items.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(t.id)}
            className={cn(
              'relative -mb-px inline-flex items-center gap-1.5 border-b-2 px-0.5 pb-2 pt-1 text-13 font-medium transition-[color,border-color] duration-100 ease-enter',
              active ?
              'border-accent text-fg-primary' :
              'border-transparent text-fg-muted hover:border-line-strong hover:text-fg-primary'
            )}>
            
            {t.icon}
            {t.label}
            {typeof t.count === 'number' &&
            <span className="rounded-xs border border-line bg-surface-subtle px-1 text-2xs text-fg-muted tnum">
                {t.count}
              </span>
            }
          </button>);

      })}
    </div>);

}