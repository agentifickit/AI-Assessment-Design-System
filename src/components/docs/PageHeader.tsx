import React from 'react';

export interface PageHeaderProps {
  eyebrow: string;
  title: string;
  intro: string;
  aside?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, intro, aside }: PageHeaderProps) {
  return (
    <header className="mb-8 border-b border-line pb-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-2xs font-medium text-fg-muted">{eyebrow}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-[-0.01em] text-fg-primary">{title}</h1>
          <p className="mt-2 max-w-measure text-sm leading-6 text-fg-secondary">{intro}</p>
        </div>
        {aside && <div className="shrink-0">{aside}</div>}
      </div>
    </header>);

}