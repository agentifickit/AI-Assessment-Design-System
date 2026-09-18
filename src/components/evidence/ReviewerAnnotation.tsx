import React from 'react';
import { MessageSquareTextIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Avatar } from '../ui/Avatar';

export interface ReviewerAnnotationProps {
  author: string;
  timestamp: string;
  children: React.ReactNode;
  anchor?: string;
  className?: string;
}

export function ReviewerAnnotation({ author, timestamp, children, anchor, className }: ReviewerAnnotationProps) {
  return (
    <article className={cn('flex gap-2.5 rounded-md border border-line bg-surface-subtle p-2.5', className)}>
      <Avatar name={author} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-2xs font-medium text-fg-primary">{author}</span>
          <span className="text-2xs text-fg-muted tnum">{timestamp}</span>
        </div>
        {anchor &&
        <p className="mt-1 inline-flex items-center gap-1 text-2xs text-fg-muted">
            <MessageSquareTextIcon className="h-3 w-3" aria-hidden="true" />
            on {anchor}
          </p>
        }
        <p className="mt-1 max-w-measure-tight text-13 leading-6 text-fg-secondary">{children}</p>
      </div>
    </article>);

}