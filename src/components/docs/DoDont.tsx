import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface DoDontProps {
  doTitle?: string;
  dontTitle?: string;
  doText: React.ReactNode;
  dontText: React.ReactNode;
  className?: string;
}

export function DoDont({ doTitle = 'Do', dontTitle = 'Not this', doText, dontText, className }: DoDontProps) {
  return (
    <div className={cn('grid gap-3 sm:grid-cols-2', className)}>
      <div className="rounded-md border border-line bg-surface p-3">
        <p className="flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-wide text-success-fg">
          <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {doTitle}
        </p>
        <div className="mt-1.5 text-13 leading-6 text-fg-secondary">{doText}</div>
      </div>
      <div className="rounded-md border border-line bg-surface p-3">
        <p className="flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-wide text-danger-fg">
          <XIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {dontTitle}
        </p>
        <div className="mt-1.5 text-13 leading-6 text-fg-secondary">{dontText}</div>
      </div>
    </div>);

}