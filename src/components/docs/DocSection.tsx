import React from 'react';
import { cn } from '../../utils/cn';

export interface DocSectionProps {
  id?: string;
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DocSection({ id, title, description, children, className }: DocSectionProps) {
  return (
    <section id={id} className={cn('mb-10 scroll-mt-16', className)}>
      <h2 className="text-base font-semibold tracking-[-0.01em] text-fg-primary">{title}</h2>
      {description && <div className="mt-1.5 max-w-measure text-13 leading-6 text-fg-secondary">{description}</div>}
      <div className="mt-4">{children}</div>
    </section>);

}